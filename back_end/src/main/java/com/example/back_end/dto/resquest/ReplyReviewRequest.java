package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReplyReviewRequest {

    @NotBlank(message = "Reply cannot be empty")
    @Size(max = 2000, message = "Reply must be at most 2000 characters")
    private String reply;
}
