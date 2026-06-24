package com.example.back_end.service.admin;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.admin.AdminTagResponse;
import com.example.back_end.dto.resquest.admin.AdminTagRequest;
import com.example.back_end.entity.Tag;
import com.example.back_end.repository.admin.AdminTagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminTagService {
    
    private final AdminTagRepository tagRepository;
    
    public List<AdminTagResponse> getAllTags() {
        return tagRepository.findAllActive()
            .stream()
            .map(tag -> new AdminTagResponse(
                tag.getId(),
                tag.getName(),
                tag.getSlug(),
                tag.getIsDeleted(),
                tag.getUpdatedAt()
            ))
            .collect(Collectors.toList());
    }
    
    public AdminTagResponse getTagById(Long id) {
        Tag tag = tagRepository.findActiveById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));

        return new AdminTagResponse(
            tag.getId(),
            tag.getName(),
            tag.getSlug(),
            tag.getIsDeleted(),
            tag.getUpdatedAt()
        );
    }
    
    public AdminTagResponse createTag(AdminTagRequest request) {
        if (tagRepository.countBySlug(request.slug()) > 0) {
            throw new RuntimeException("Tag with slug '" + request.slug() + "' already exists");
        }
        
        Tag tag = new Tag();
        tag.setName(request.name());
        tag.setSlug(request.slug());
        tag.setIsDeleted(false);
        tag.setUpdatedAt(Instant.now());
        
        Tag saved = tagRepository.save(tag);
        return new AdminTagResponse(
            saved.getId(),
            saved.getName(),
            saved.getSlug(),
            saved.getIsDeleted(),
            saved.getUpdatedAt()
        );
    }
    
    public AdminTagResponse updateTag(Long id, AdminTagRequest request) {
        Tag tag = tagRepository.findActiveById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        
        if (!tag.getSlug().equals(request.slug()) && 
            tagRepository.countBySlugAndNotId(request.slug(), id) > 0) {
            throw new RuntimeException("Tag with slug '" + request.slug() + "' already exists");
        }
        
        tag.setName(request.name());
        tag.setSlug(request.slug());
        tag.setUpdatedAt(Instant.now());
        
        Tag updated = tagRepository.save(tag);
        return new AdminTagResponse(
            updated.getId(),
            updated.getName(),
            updated.getSlug(),
            updated.getIsDeleted(),
            updated.getUpdatedAt()
        );
    }
    
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findActiveById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        
        tag.setIsDeleted(true);
        tag.setUpdatedAt(Instant.now());
        tagRepository.save(tag);
    }
}