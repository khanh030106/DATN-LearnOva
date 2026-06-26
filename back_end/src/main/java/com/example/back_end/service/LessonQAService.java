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

    // =====================================================
    // GET Q&A THEO LESSON
    // =====================================================
    public LessonQAResponse getLessonQnA(Long lessonId) {

        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        List<LessonQA> questions =
                qaRepo.findByLesson_IdAndParentIsNull(lessonId);

        List<Long> questionIds = questions.stream()
                .map(LessonQA::getId)
                .toList();

        List<LessonQA> answers = questionIds.isEmpty()
                ? List.of()
                : qaRepo.findByParent_IdIn(questionIds);

        Map<Long, List<LessonQA>> answerMap =
                answers.stream()
                        .collect(Collectors.groupingBy(a -> a.getParent().getId()));

        List<QuestionResponse> questionResponses =
                questions.stream().map(q -> {

                    QuestionResponse qr = new QuestionResponse();
                    qr.setId(q.getId());
                    qr.setContent(q.getContent());
                    qr.setUserId(q.getUser().getId());
                    qr.setUserName(q.getUser().getFullName());
                    qr.setCreatedAt(q.getCreatedAt());
                    qr.setIsSolved(q.getIsSolved());

                    List<AnswerResponse> answerResponses =
                            answerMap.getOrDefault(q.getId(), List.of())
                                    .stream()
                                    .map(a -> {

                                        AnswerResponse ar = new AnswerResponse();
                                        ar.setId(a.getId());
                                        ar.setContent(a.getContent());
                                        ar.setUserId(a.getUser().getId());
                                        ar.setUserName(a.getUser().getFullName());
                                        ar.setCreatedAt(a.getCreatedAt());
                                        ar.setLikeCount(a.getLikeCount());

                                        return ar;

                                    }).toList();

                    qr.setAnswers(answerResponses);

                    return qr;

                }).toList();

        LessonQAResponse response = new LessonQAResponse();
        response.setLessonId(lesson.getId());
        response.setLessonTitle(lesson.getTitle());
        response.setQuestions(questionResponses);

        return response;
    }

    // =====================================================
    // TẠO QUESTION
    // =====================================================
    public void createQuestion(Long userId, CreateQuestionRequest req) {

        Lesson lesson = lessonRepo.findById(req.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Instant now = Instant.now();

        LessonQA q = new LessonQA();
        q.setLesson(lesson);
        q.setUser(user);
        q.setParent(null);
        q.setContent(req.getContent());
        q.setType("QUESTION");
        q.setIsSolved(false);
        q.setIsPinned(false);
        q.setLikeCount(0);
        q.setIsDeleted(false);
        q.setCreatedAt(now);
        q.setUpdatedAt(now);

        qaRepo.save(q);
    }

    // =====================================================
    // TẠO ANSWER
    // =====================================================
    public void createAnswer(Long userId, CreateAnswerRequest req) {

        LessonQA parent = qaRepo.findById(req.getParentId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Instant now = Instant.now();

        LessonQA answer = new LessonQA();
        answer.setLesson(parent.getLesson());
        answer.setUser(user);
        answer.setParent(parent);
        answer.setContent(req.getContent());
        answer.setType("ANSWER");
        answer.setIsSolved(false);
        answer.setIsPinned(false);
        answer.setLikeCount(0);
        answer.setIsDeleted(false);
        answer.setCreatedAt(now);
        answer.setUpdatedAt(now);

        qaRepo.save(answer);
    }
}