package com.example.back_end.service.admin;

import com.example.back_end.dto.resquest.admin.VoucherRequest;
import com.example.back_end.dto.response.admin.VoucherResponse;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Voucher;
import com.example.back_end.entity.enums.DiscountType;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.VoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final UserRepository userRepository;

    public VoucherService(
            VoucherRepository voucherRepository,
            UserRepository userRepository
    ) {
        this.voucherRepository = voucherRepository;
        this.userRepository = userRepository;
    }

    public List<VoucherResponse> getAllVouchers() {
        List<Voucher> voucherList = voucherRepository.findAll();

        return voucherList.stream()
                .map(voucher -> new VoucherResponse(
                        voucher.getId(),
                        voucher.getCode(),
                        voucher.getDescription(),
                        voucher.getDiscountType() == null ? null : voucher.getDiscountType().name(),
                        voucher.getDiscountValue(),
                        voucher.getMinimumOrder(),
                        voucher.getMaximumDiscountAmount(),
                        voucher.getUsageLimit(),
                        voucher.getUsedCount(),
                        voucher.getStartDate(),
                        voucher.getEndDate(),
                        voucher.getIsActive(),
                        voucher.getCreatedBy() == null ? null : voucher.getCreatedBy().getId(),
                        voucher.getCreatedAt(),
                        voucher.getUpdatedAt()
                ))
                .collect(Collectors.toList());
    }

    public VoucherResponse getVoucherById(Long voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new RuntimeException("Voucher not found id=" + voucherId));

        return new VoucherResponse(
                voucher.getId(),
                voucher.getCode(),
                voucher.getDescription(),
                voucher.getDiscountType() == null ? null : voucher.getDiscountType().name(),
                voucher.getDiscountValue(),
                voucher.getMinimumOrder(),
                voucher.getMaximumDiscountAmount(),
                voucher.getUsageLimit(),
                voucher.getUsedCount(),
                voucher.getStartDate(),
                voucher.getEndDate(),
                voucher.getIsActive(),
                voucher.getCreatedBy() == null ? null : voucher.getCreatedBy().getId(),
                voucher.getCreatedAt(),
                voucher.getUpdatedAt()
        );
    }

    public VoucherResponse createVoucher(VoucherRequest voucherRequest) {
        Voucher voucher = new Voucher();

        String voucherCode = voucherRequest.code().trim();
        String voucherDescription = voucherRequest.description().trim();
        DiscountType discountType;

        try {
            discountType = DiscountType.valueOf(voucherRequest.discountType());
        } catch (Exception exception) {
            throw new RuntimeException("Invalid discount type: " + voucherRequest.discountType());
        }

        OffsetDateTime startDate;
        OffsetDateTime endDate;

        try {
            startDate = OffsetDateTime.parse(voucherRequest.startDate());
            endDate = OffsetDateTime.parse(voucherRequest.endDate());
        } catch (DateTimeParseException exception) {
            throw new RuntimeException("Invalid date format", exception);
        }

        User createdByUser = userRepository.findById(voucherRequest.createdById())
                .orElseThrow(() -> new RuntimeException("User not found id=" + voucherRequest.createdById()));

        voucher.setCode(voucherCode);
        voucher.setDescription(voucherDescription);
        voucher.setDiscountType(discountType);
        voucher.setDiscountValue(voucherRequest.discountValue());
        voucher.setMinimumOrder(voucherRequest.minimumOrder());
        voucher.setMaximumDiscountAmount(voucherRequest.maximumDiscountAmount());
        voucher.setUsageLimit(voucherRequest.usageLimit());
        voucher.setUsedCount(0);
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
        voucher.setIsActive(voucherRequest.isActive());
        voucher.setCreatedBy(createdByUser);
        voucher.setCreatedAt(Instant.now());
        voucher.setUpdatedAt(Instant.now());

        Voucher savedVoucher = voucherRepository.save(voucher);

        return new VoucherResponse(
                savedVoucher.getId(),
                savedVoucher.getCode(),
                savedVoucher.getDescription(),
                savedVoucher.getDiscountType() == null ? null : savedVoucher.getDiscountType().name(),
                savedVoucher.getDiscountValue(),
                savedVoucher.getMinimumOrder(),
                savedVoucher.getMaximumDiscountAmount(),
                savedVoucher.getUsageLimit(),
                savedVoucher.getUsedCount(),
                savedVoucher.getStartDate(),
                savedVoucher.getEndDate(),
                savedVoucher.getIsActive(),
                savedVoucher.getCreatedBy() == null ? null : savedVoucher.getCreatedBy().getId(),
                savedVoucher.getCreatedAt(),
                savedVoucher.getUpdatedAt()
        );
    }

    public VoucherResponse updateVoucher(
            Long voucherId,
            VoucherRequest voucherRequest
    ) {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new RuntimeException("Voucher not found id=" + voucherId));

        String voucherCode = voucherRequest.code().trim();
        String voucherDescription = voucherRequest.description().trim();
        DiscountType discountType;

        try {
            discountType = DiscountType.valueOf(voucherRequest.discountType());
        } catch (Exception exception) {
            throw new RuntimeException("Invalid discount type: " + voucherRequest.discountType());
        }

        OffsetDateTime startDate;
        OffsetDateTime endDate;

        try {
            startDate = OffsetDateTime.parse(voucherRequest.startDate());
            endDate = OffsetDateTime.parse(voucherRequest.endDate());
        } catch (DateTimeParseException exception) {
            throw new RuntimeException("Invalid date format", exception);
        }

        User createdByUser = userRepository.findById(voucherRequest.createdById())
                .orElseThrow(() -> new RuntimeException("User not found id=" + voucherRequest.createdById()));

        voucher.setCode(voucherCode);
        voucher.setDescription(voucherDescription);
        voucher.setDiscountType(discountType);
        voucher.setDiscountValue(voucherRequest.discountValue());
        voucher.setMinimumOrder(voucherRequest.minimumOrder());
        voucher.setMaximumDiscountAmount(voucherRequest.maximumDiscountAmount());
        voucher.setUsageLimit(voucherRequest.usageLimit());
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
        voucher.setIsActive(voucherRequest.isActive());
        voucher.setCreatedBy(createdByUser);
        voucher.setUpdatedAt(Instant.now());

        Voucher updatedVoucher = voucherRepository.save(voucher);

        return new VoucherResponse(
                updatedVoucher.getId(),
                updatedVoucher.getCode(),
                updatedVoucher.getDescription(),
                updatedVoucher.getDiscountType() == null ? null : updatedVoucher.getDiscountType().name(),
                updatedVoucher.getDiscountValue(),
                updatedVoucher.getMinimumOrder(),
                updatedVoucher.getMaximumDiscountAmount(),
                updatedVoucher.getUsageLimit(),
                updatedVoucher.getUsedCount(),
                updatedVoucher.getStartDate(),
                updatedVoucher.getEndDate(),
                updatedVoucher.getIsActive(),
                updatedVoucher.getCreatedBy() == null ? null : updatedVoucher.getCreatedBy().getId(),
                updatedVoucher.getCreatedAt(),
                updatedVoucher.getUpdatedAt()
        );
    }

    public void deleteVoucher(Long voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new RuntimeException("Voucher not found id=" + voucherId));

        voucherRepository.delete(voucher);
    }
}