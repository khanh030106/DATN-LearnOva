package com.example.back_end.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class PromotioncoursId implements Serializable {
    private static final long serialVersionUID = 1178677901156127561L;
    @NotNull
    @Column(name = "promotion_id", nullable = false)
    private Long promotionId;

    @NotNull
    @Column(name = "course_id", nullable = false)
    private Long courseId;


}