package com.example.back_end.service;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Properties;

@Service
public class EmailService {

    private static final String EMAIL =
            "nguyenphithong167@gmail.com";

    private static final String APP_PASSWORD =
            "lpag jica rptg bbwb";

    public void sendVerificationEmail(
            String toEmail,
            String fullName,
            String verifyLink
    ) {

        Properties props = new Properties();
        props.setProperty("mail.smtp.auth", "true");
        props.setProperty("mail.smtp.port", "587");
        props.setProperty("mail.smtp.starttls.enable", "true");
        props.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");
        props.setProperty("mail.smtp.host", "smtp.gmail.com");

        Session session = Session.getInstance(
                props,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                EMAIL,
                                APP_PASSWORD
                        );
                    }
                }
        );

        String subject = "Verify Your LearnOva Account";

        String content = """
        <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
            <div style="
                max-width:600px;
                margin:auto;
                background:white;
                border-radius:10px;
                padding:30px;
                box-shadow:0 4px 10px rgba(0,0,0,0.1);
            ">

                <h2 style="color:#2563eb;text-align:center;">
                    Welcome to LearnOva
                </h2>

                <p>Hello %s,</p>

                <p>
                    Thank you for creating an account with LearnOva.
                </p>

                <p>
                    Please verify your email address by clicking the button below:
                </p>

                <div style="text-align:center;margin:30px 0;">
                    <a href="%s"
                       style="
                            background:#2563eb;
                            color:white;
                            text-decoration:none;
                            padding:12px 24px;
                            border-radius:8px;
                            display:inline-block;
                       ">
                        Verify Account
                    </a>
                </div>

                <p>
                    If you did not create this account, please ignore this email.
                </p>

                <br>

                <p>
                    Best regards,<br>
                    <b>LearnOva Team</b>
                </p>

            </div>
        </div>
       """.formatted(
                       fullName == null || fullName.isBlank()
                               ? "User"
                               : fullName,
                       verifyLink
               );

        try {
            MimeMessage message =
                    new MimeMessage(session);

            message.setFrom(
                    new InternetAddress(
                            EMAIL,
                            "LearnOva",
                            StandardCharsets.UTF_8.name()
                    )
            );

            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(toEmail)
            );

            message.setSubject(
                    subject,
                    StandardCharsets.UTF_8.name()
            );

            message.setContent(
                    content,
                    "text/html; charset=UTF-8"
            );

            Transport.send(message);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to send verification email",
                    e
            );

        }
    }
}
