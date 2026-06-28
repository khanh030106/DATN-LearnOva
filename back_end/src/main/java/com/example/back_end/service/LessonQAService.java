package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateAnswerRequest;
import com.example.back_end.dto.resquest.CreateQuestionRequest;
import com.example.back_end.dto.response.AnswerResponse;
import com.example.back_end.dto.response.LessonQAResponse;
import com.example.back_end.dto.response.QuestionResponse;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.LessonQA;
import com.example.back_end.entity.User;
import com.example.back_end.repository.LessonQARepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonQAService {

    private final LessonQARepository qaRepo;
    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;

    public LessonQAResponse getLessonQnA(Long lessonId) {

        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        List<LessonQA> all = qaRepo.findByLessonIdAndIsDeletedFalse(lessonId);

        List<LessonQA> questions = all.stream()
                .filter(q -> q.getParent() == null)
                .toList();

        Map<Long, List<LessonQA>> replyMap = all.stream()
                .filter(q -> q.getParent() != null)
                .collect(Collectors.groupingBy(q -> q.getParent().getId()));

        List<QuestionResponse> questionResponses = questions.stream()
                .map(question -> {

                    QuestionResponse qr = new QuestionResponse();

                    qr.setId(question.getId());
                    qr.setContent(question.getContent());
                    qr.setUserId(question.getUser().getId());
                    qr.setUserName(question.getUser().getFullName());
                    qr.setCreatedAt(question.getCreatedAt());
                    qr.setIsSolved(question.getIsSolved());

                    // build cây reply
                    qr.setAnswers(buildReplies(question.getId(), replyMap));

                    return qr;
                })
                .toList();

        LessonQAResponse response = new LessonQAResponse();
        response.setLessonId(lesson.getId());
        response.setLessonTitle(lesson.getTitle());
        response.setQuestions(questionResponses);

        return response;
    }

    public void createAnswer(Long userId, CreateAnswerRequest req) {

        LessonQA parent = qaRepo.findById(req.getParentId())
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Instant now = Instant.now();

        LessonQA answer = new LessonQA();

        answer.setLesson(parent.getLesson());
        answer.setUser(user);

        // Reply trực tiếp tới comment được chọn
        answer.setParent(parent);

        answer.setContent(req.getContent());

        answer.setType("ANSWER");
        answer.setIsSolved(false);
        answer.setIsPinned(false);
        answer.setLikeCount(0);
        answer.setIsDeleted(false);

        answer.setCreatedAt(now);
        answer.setUpdatedAt(now);

        // ==========================
        // Root của cả thread
        // ==========================
        if (parent.getRootId() == null) {
            answer.setRootId(parent.getId());
        } else {
            answer.setRootId(parent.getRootId());
        }

        // ==========================
        // Level
        // ==========================
        answer.setLevel(parent.getLevel() + 1);

        // ==========================
        // Người đang được reply
        // ==========================
        answer.setReplyToUser(parent.getUser());

        qaRepo.save(answer);
    }

    public void createQuestion(Long userId, CreateQuestionRequest req) {

        Lesson lesson = lessonRepo.findById(req.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Instant now = Instant.now();

        LessonQA q = new LessonQA();
        q.setLesson(lesson);
        q.setUser(user);
        q.setContent(req.getContent());
        q.setParent(null);
        q.setType("QUESTION");
        q.setIsSolved(false);
        q.setIsPinned(false);
        q.setLikeCount(0);
        q.setIsDeleted(false);
        q.setLevel(0);
        q.setRootId(null);
        q.setReplyToUser(null);
        q.setCreatedAt(now);
        q.setUpdatedAt(now);

        qaRepo.save(q);
    }
    private List<AnswerResponse> buildReplies(
            Long parentId,
            Map<Long, List<LessonQA>> replyMap
    ) {

        return replyMap
                .getOrDefault(parentId, List.of())
                .stream()
                .map(reply -> {

                    AnswerResponse ar = toAnswerResponse(reply);

                    // lấy tiếp các reply của reply này
                    ar.setReplies(
                            buildReplies(reply.getId(), replyMap)
                    );

                    return ar;

                })
                .toList();
    }
    private AnswerResponse toAnswerResponse(LessonQA qa) {

        AnswerResponse ar = new AnswerResponse();

        ar.setId(qa.getId());
        ar.setContent(qa.getContent());

        ar.setUserId(qa.getUser().getId());
        ar.setUserName(qa.getUser().getFullName());

        ar.setCreatedAt(qa.getCreatedAt());

        ar.setLikeCount(qa.getLikeCount());

        ar.setParentId(
                qa.getParent() != null
                        ? qa.getParent().getId()
                        : null
        );

        ar.setReplyToUserId(
                qa.getReplyToUser() != null
                        ? qa.getReplyToUser().getId()
                        : null
        );

        ar.setReplyToUserName(
                qa.getReplyToUser() != null
                        ? qa.getReplyToUser().getFullName()
                        : null
        );

        ar.setRootId(qa.getRootId());

        ar.setLevel(qa.getLevel());

        ar.setInstructor(
                qa.getUser().getId().equals(
                        qa.getLesson()
                                .getSection()
                                .getCourse()
                                .getInstructor()
                                .getId()
                )
        );

        ar.setReplies(List.of());

        return ar;
    }
    public void deleteAnswer(Long userId, Long answerId) {

        LessonQA answer = qaRepo.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        // Không cho xóa câu hỏi
        if ("QUESTION".equals(answer.getType())) {
            throw new RuntimeException("Cannot delete question.");
        }

        // Chỉ chủ comment mới được xóa
        if (!answer.getUser().getId().equals(userId)) {
            throw new RuntimeException("You cannot delete this answer.");
        }

        qaRepo.delete(answer);
    }
    public void deleteQuestion(Long userId, Long questionId) {

        LessonQA question = qaRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!"QUESTION".equals(question.getType())) {
            throw new RuntimeException("Not a question");
        }

        if (!question.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        List<LessonQA> children = qaRepo.findByRootId(questionId);

        // xóa children trước
        qaRepo.deleteAll(children);

        // xóa question sau
        qaRepo.delete(question);
    }
    public void updateAnswer(Long userId, Long answerId, CreateAnswerRequest req) {

        LessonQA answer = qaRepo.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        if (!answer.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        answer.setContent(req.getContent());
        answer.setUpdatedAt(Instant.now());

        qaRepo.save(answer);
    }
    public void updateQuestion(Long userId, Long questionId, CreateQuestionRequest req) {

        LessonQA q = qaRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (!q.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        q.setContent(req.getContent());
        q.setUpdatedAt(Instant.now());

        qaRepo.save(q);
    }
}