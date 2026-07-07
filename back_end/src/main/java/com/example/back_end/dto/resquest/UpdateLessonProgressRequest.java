package com.example.back_end.dto.resquest;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateLessonProgressRequest {
    @NotNull
    private Long lessonId;

    @NotNull
    private Integer watchedSeconds;
}
