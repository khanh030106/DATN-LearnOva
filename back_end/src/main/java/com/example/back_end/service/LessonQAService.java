package com.example.back_end.service;

import com.example.back_end.dto.resquest.CreateAnswerRequest;
import com.example.back_end.dto.resquest.CreateQuestionRequest;
import com.example.back_end.dto.response.*;
import com.example.back_end.entity.Lesson;
import com.example.back_end.entity.LessonQA;
import com.example.back_end.entity.User;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.LessonQARepository;
import com.example.back_end.repository.LessonRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonQAService {

    private final LessonQARepository qaRepo;
    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;

    // =========================
    // 1. GET Q&A COURSE
    // =========================
    public LessonQAResponse getCourseQnA(Long courseId) {

        // ── Query 1 ─────────────────────────────────────────────────────────
        // Lessons define the ordering of questions in the response.
        // Loaded once here; never queried again inside any loop.
        List<Lesson> lessons = lessonRepo.findBySectionCourseId(courseId);

        if (lessons.isEmpty()) {
            LessonQAResponse empty = new LessonQAResponse();
            empty.setQuestions(new ArrayList<>());
            return empty;
        }

        // ── Query 2 ─────────────────────────────────────────────────────────
        // All top-level questions for the entire course in one SQL statement.
        // JOIN FETCH q.user means no additional user queries anywhere below.
        // q.lesson.section.course.id navigation in the WHERE clause is resolved
        // by Hibernate as an implicit JOIN; no extra round-trip occurs.
        List<LessonQA> questions = qaRepo.findQuestionsForCourseWithUser(courseId);

        List<Long> questionIds = questions.stream()
                .map(LessonQA::getId)
                .toList();

        // ── Query 3 ─────────────────────────────────────────────────────────
        // All answers for every question in the course in one SQL statement.
        // Skipped entirely when the course has no questions at all.
        // JOIN FETCH a.user means no additional user queries anywhere below.
        List<LessonQA> answers = questionIds.isEmpty()
                ? List.of()
                : qaRepo.findAnswersByParentIdsWithUser(questionIds);

        // ── In-memory grouping — zero DB calls ───────────────────────────────
        // q.getLesson().getId():  LessonQA.lesson is @ManyToOne(LAZY). Hibernate
        // stores the FK (lesson_id) in the owning row and sets it on the proxy at
        // load time. Calling getId() on an uninitialised proxy returns that stored
        // FK value without issuing any SQL.
        Map<Long, List<LessonQA>> questionsByLesson = questions.stream()
                .collect(Collectors.groupingBy(q -> q.getLesson().getId()));

        // a.getParent().getId(): same proxy-ID guarantee as above for parent_id FK.
        Map<Long, List<LessonQA>> answersByQuestion = answers.stream()
                .collect(Collectors.groupingBy(a -> a.getParent().getId()));

        // ── Response assembly — no repository calls inside either loop ────────
        List<QuestionResponse> allQuestions = new ArrayList<>();

        for (Lesson lesson : lessons) {

            List<LessonQA> lessonQuestions =
                    questionsByLesson.getOrDefault(lesson.getId(), List.of());

            for (LessonQA q : lessonQuestions) {

                QuestionResponse qr = new QuestionResponse();
                qr.setId(q.getId());
                qr.setContent(q.getContent());
                qr.setUserId(q.getUser().getId());
                qr.setUserName(q.getUser().getFullName());
                qr.setCreatedAt(q.getCreatedAt());
                qr.setIsSolved(q.getIsSolved());

                List<AnswerResponse> answerResponses =
                        answersByQuestion.getOrDefault(q.getId(), List.of())
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
    @Transactional
    public void createQuestion(Long userId, CreateQuestionRequest req) {

        Lesson lesson = lessonRepo.findById(req.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

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
    @Transactional
    public void createAnswer(Long userId, CreateAnswerRequest req) {

        LessonQA parent = qaRepo.findById(req.getParentId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

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