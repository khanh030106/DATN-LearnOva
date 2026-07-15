package com.example.back_end.repository;

import com.example.back_end.document.CourseDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseSearchRepository extends ElasticsearchRepository<CourseDocument, Long> {
}
