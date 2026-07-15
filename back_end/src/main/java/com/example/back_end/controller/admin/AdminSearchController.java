package com.example.back_end.controller.admin;

import com.example.back_end.service.CourseIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/learnova/admin/search")
@RequiredArgsConstructor
public class AdminSearchController {

    private final CourseIndexService courseIndexService;

    /** Backfill toàn bộ course PUBLISHED vào Elasticsearch */
    @PostMapping("/reindex")
    public ResponseEntity<Void> reindex() {
        courseIndexService.reindexAll();
        return ResponseEntity.ok().build();
    }
}
