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
public class CoursetagId implements Serializable {
    private static final long serialVersionUID = 5596732877305512036L;
    @NotNull
    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @NotNull
    @Column(name = "tag_id", nullable = false)
    private Long tagId;


}