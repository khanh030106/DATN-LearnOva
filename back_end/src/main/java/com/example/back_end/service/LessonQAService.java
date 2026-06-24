package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateAnswerRequest;
import com.example.back_end.dto.resquest.CreateQuestionRequest;
import com.example.back_end.dto.response.*;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.LessonQA;
import com.example.back_end.entity.User;
import com.example.back_end.repository.LessonQARepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonQAService {

    private final LessonQARepository qaRepo;
    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;

    // =========================
    // 1. GET Q&A COURSE
    // =========================
    public LessonQAResponse getCourseQnA(Long courseId) {

        List<Lesson> lessons = lessonRepo.findBySectionCourseId(courseId);

        List<QuestionResponse> allQuestions = new ArrayList<>();

        for (Lesson lesson : lessons) {

            List<LessonQA> questions =
                    qaRepo.findByLesson_IdAndParentIsNull(lesson.getId());

            List<Long> questionIds = questions.stream()
                    .map(LessonQA::getId)
                    .toList();

            List<LessonQA> answers =
                    questionIds.isEmpty()
                            ? List.of()
                            : qaRepo.findByParent_IdIn(questionIds);

            Map<Long, List<LessonQA>> answerMap =
                    answers.stream()
                            .collect(Collectors.groupingBy(a -> a.getParent().getId()));

            for (LessonQA q : questions) {

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
                allQuestions.add(qr);
            }
        }

        LessonQAResponse response = new LessonQAResponse();
        response.setQuestions(allQuestions);

        return response;
    }

    // =========================
    // 2. CREATE QUESTION
    // =========================
    public void createQuestion(Long userId, CreateQuestionRequest req) {

        Lesson lesson = lessonRepo.findById(req.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

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

        qaRepo.save(q);
    }

    // =========================
    // 3. CREATE ANSWER
    // =========================
    public void createAnswer(Long userId, CreateAnswerRequest req) {

        LessonQA parent = qaRepo.findById(req.getParentId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LessonQA a = new LessonQA();
        a.setLesson(parent.getLesson());
        a.setUser(user);
        a.setContent(req.getContent());
        a.setParent(parent);
        a.setType("ANSWER");
        a.setIsSolved(false);
        a.setIsPinned(false);
        a.setLikeCount(0);
        a.setIsDeleted(false);

        qaRepo.save(a);
    }
}