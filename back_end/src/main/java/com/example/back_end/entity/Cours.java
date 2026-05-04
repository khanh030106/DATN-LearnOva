package com.example.back_end.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "courses")
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "thumbnail_url", nullable = false, length = Integer.MAX_VALUE)
    private String thumbnailUrl;

    @NotNull
    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @NotNull
    @Column(name = "slug", nullable = false, length = Integer.MAX_VALUE)
    private String slug;

    @NotNull
    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Size(max = 10)
    @NotNull
    @ColumnDefault("'vi'")
    @Column(name = "language", nullable = false, length = 10)
    private String language;

    @Column(name = "requirements")
    private List<String> requirements;

    @Column(name = "what_you_learn")
    private List<String> whatYouLearn;

    @NotNull
    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "level", columnDefinition = "course_level not null")
    private Object level;

    @ColumnDefault("'DRAFT'")
    @Column(name = "status", columnDefinition = "course_status not null")
    private Object status;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @ColumnDefault("to_tsvector('simple', ((immutable_unaccent(COALESCE(title, ''::text)) || ' '::text) || immutable_unaccent(COALESCE(description, ''))))")
    @Column(name = "search_vector", columnDefinition = "tsvector")
    private Object searchVector;

    @OneToMany(mappedBy = "course")
    private Set<Cart> carts = new LinkedHashSet<>();

    @OneToOne(mappedBy = "course")
    private Coursecategory coursecategory;

    @ManyToMany
    private Set<Tag> tags = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Enrollment> enrollments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Orderitem> orderitems = new LinkedHashSet<>();

    @ManyToMany
    private Set<Promotion> promotions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Review> reviews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Section> sections = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Wishlist> wishlists = new LinkedHashSet<>();


}