package com.example.back_end.service;

import com.example.back_end.entity.Course;
import com.example.back_end.entity.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.OffsetDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PayOSService {

    private static final String CREATE_PAYMENT_LINK_ENDPOINT =
            "https://api-merchant.payos.vn/v2/payment-requests";

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${payos.client-id:}")
    private String clientId;

    @Value("${payos.api-key:}")
    private String apiKey;

    @Value("${payos.checksum-key:}")
    private String checksumKey;

    @Value("${payos.return-url}")
    private String returnUrl;

    @Value("${payos.cancel-url}")
    private String cancelUrl;

    public PayOSCreatePaymentResult createPaymentLink(Order order, List<Course> courses, long amount) {
        try {
            long orderCode = order.getId();
            String description = "ORDER" + order.getId();

            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("orderCode", orderCode);
            payload.put("amount", amount);
            payload.put("description", description);
            payload.put("returnUrl", returnUrl);
            payload.put("cancelUrl", cancelUrl);
            String itemName = courses.size() == 1
                    ? courses.getFirst().getTitle()
                    : "LearnOva order " + order.getId();
            payload.put("items", java.util.List.of(Map.of(
                    "name", itemName,
                    "quantity", 1,
                    "price", amount
            )));
            payload.put("signature", createSignature(Map.of(
                    "amount", amount,
                    "cancelUrl", cancelUrl,
                    "description", description,
                    "orderCode", orderCode,
                    "returnUrl", returnUrl
            )));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(CREATE_PAYMENT_LINK_ENDPOINT))
                    .header("Content-Type", "application/json")
                    .header("x-client-id", clientId)
                    .header("x-api-key", apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(payload)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            JsonNode body = objectMapper.readTree(response.body());

            String code = body.path("code").asText("");
            if (!"00".equals(code)) {
                String message = body.path("desc").asText("payOS create payment link failed");
                throw new IllegalStateException(message);
            }

            JsonNode data = body.path("data");
            return new PayOSCreatePaymentResult(
                    data.path("checkoutUrl").asText(null),
                    data.path("qrCode").asText(null),
                    data.path("paymentLinkId").asText(null),
                    parseExpiresAt(data)
            );
        } catch (IOException e) {
            throw new IllegalStateException("Cannot call payOS create payment link", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("payOS create payment link interrupted", e);
        }
    }

    public PayOSPaymentInfo getPaymentInfo(long orderCode) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(CREATE_PAYMENT_LINK_ENDPOINT + "/" + orderCode))
                    .header("Content-Type", "application/json")
                    .header("x-client-id", clientId)
                    .header("x-api-key", apiKey)
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            JsonNode body = objectMapper.readTree(response.body());

            String code = body.path("code").asText("");
            if (!"00".equals(code)) {
                String message = body.path("desc").asText("payOS get payment info failed");
                throw new IllegalStateException(message);
            }

            JsonNode data = body.path("data");
            return new PayOSPaymentInfo(
                    data.path("status").asText(null),
                    data.path("paymentLinkId").asText(null)
            );
        } catch (IOException e) {
            throw new IllegalStateException("Cannot call payOS get payment info", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("payOS get payment info interrupted", e);
        }
    }

    public boolean verifyWebhook(JsonNode body) {
        JsonNode data = body.path("data");
        String signature = body.path("signature").asText(null);
        if (data.isMissingNode() || data.isNull() || signature == null || signature.isBlank()) {
            return false;
        }

        return hmacSha256(toSignatureData(data), checksumKey).equalsIgnoreCase(signature);
    }

    public boolean isSuccessfulWebhook(JsonNode body) {
        return body.path("success").asBoolean(false) || "00".equals(body.path("code").asText(""));
    }

    private String createSignature(Map<String, Object> values) {
        return hmacSha256(toSignatureData(values), checksumKey);
    }

    private String toSignatureData(Map<String, Object> values) {
        TreeMap<String, Object> sorted = new TreeMap<>(values);
        StringBuilder data = new StringBuilder();
        sorted.forEach((key, value) -> {
            if (!data.isEmpty()) {
                data.append("&");
            }
            data.append(key).append("=").append(formatSignatureValue(value));
        });
        return data.toString();
    }

    private String toSignatureData(JsonNode node) {
        TreeMap<String, JsonNode> sorted = new TreeMap<>();
        Iterator<Map.Entry<String, JsonNode>> fields = node.fields();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            sorted.put(field.getKey(), field.getValue());
        }

        StringBuilder data = new StringBuilder();
        sorted.forEach((key, value) -> {
            if (!data.isEmpty()) {
                data.append("&");
            }
            data.append(key).append("=").append(formatSignatureValue(value));
        });
        return data.toString();
    }

    private String formatSignatureValue(Object value) {
        if (value == null) {
            return "";
        }
        if (value instanceof JsonNode node) {
            if (node.isNull() || node.isMissingNode()) {
                return "";
            }
            if (node.isTextual()) {
                return node.asText();
            }
            if (node.isNumber() || node.isBoolean()) {
                return node.asText();
            }
            try {
                return objectMapper.writeValueAsString(node);
            } catch (JsonProcessingException e) {
                throw new IllegalStateException("Cannot build payOS signature data", e);
            }
        }
        if (value instanceof BigDecimal number) {
            return number.stripTrailingZeros().toPlainString();
        }
        return String.valueOf(value);
    }

    private String hmacSha256(String data, String key) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA256");
            hmac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] bytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder(bytes.length * 2);
            for (byte b : bytes) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new IllegalStateException("Cannot create payOS signature", e);
        }
    }

    private OffsetDateTime parseExpiresAt(JsonNode data) {
        String expiredAt = data.path("expiredAt").asText(null);
        if (expiredAt == null || expiredAt.isBlank()) {
            return null;
        }
        try {
            return OffsetDateTime.parse(expiredAt);
        } catch (RuntimeException ignored) {
            return null;
        }
    }

    public record PayOSCreatePaymentResult(
            String checkoutUrl,
            String qrCode,
            String paymentLinkId,
            OffsetDateTime expiresAt
    ) {}

    public record PayOSPaymentInfo(
            String status,
            String paymentLinkId
    ) {}
}
