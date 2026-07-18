package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WishlistRequest {

    @NotNull(message = "Course id không được để trống")
    private Long courseId;

}