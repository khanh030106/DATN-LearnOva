package com.example.back_end.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.TagResponse;
import com.example.back_end.dto.resquest.TagRequest;
import com.example.back_end.entity.Tag;
import com.example.back_end.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TagService {
    
    private final TagRepository tagRepository;
    
    public List<TagResponse> getAllTags() {
        return tagRepository.findAllActive()
            .stream()
            .map(this::toTagResponse)
            .collect(Collectors.toList());
    }
    
    public TagResponse getTagById(Long id) {
        Tag tag = tagRepository.findActiveById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        return toTagResponse(tag);
    }
    
    public TagResponse createTag(TagRequest request) {
        if (tagRepository.countBySlug(request.slug()) > 0) {
            throw new RuntimeException("Tag with slug '" + request.slug() + "' already exists");
        }
        
        Tag tag = new Tag();
        tag.setName(request.name());
        tag.setSlug(request.slug());
        tag.setIsDeleted(false);
        tag.setUpdatedAt(Instant.now());
        
        Tag saved = tagRepository.save(tag);
        return toTagResponse(saved);
    }
    
    public TagResponse updateTag(Long id, TagRequest request) {
        Tag tag = tagRepository.findActiveById(id).orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        
        if (!tag.getSlug().equals(request.slug()) && 
            tagRepository.countBySlugAndNotId(request.slug(), id) > 0) {
            throw new RuntimeException("Tag with slug '" + request.slug() + "' already exists");
        }
        
        tag.setName(request.name());
        tag.setSlug(request.slug());
        tag.setUpdatedAt(Instant.now());
        
        Tag updated = tagRepository.save(tag);
        return toTagResponse(updated);
    }
    
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findActiveById(id).orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        
        tag.setIsDeleted(true);
        tag.setUpdatedAt(Instant.now());
        tagRepository.save(tag);
    }
    
    private TagResponse toTagResponse(Tag tag) {
        return new TagResponse(
            tag.getId(),
            tag.getName(),
            tag.getSlug(),
            tag.getIsDeleted(),
            tag.getUpdatedAt()
        );
    }
}