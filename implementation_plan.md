# Refactor Course Curriculum Creation: Sections and Lessons

This plan proposes the necessary changes to enable dynamically adding and renaming course sections and lessons, ensuring changes are persisted to the database.

## User Review Required

> [!NOTE]
> Section titles will be updated locally on keypress (`onChange`) to keep typing responsive, and persisted to the database on input blur (`onBlur`). Lesson titles are updated when the user presses Enter or clicks outside after clicking the edit pencil.

## Proposed Changes

### Backend Components

#### [NEW] [UpdateSectionRequest.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/dto/resquest/UpdateSectionRequest.java)
- A request DTO record class carrying the new section `title`.

#### [NEW] [UpdateLessonRequest.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/dto/resquest/UpdateLessonRequest.java)
- A request DTO record class carrying the new lesson `title`.

#### [MODIFY] [SectionService.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/service/SectionService.java)
- Implement `updateSection(Long sectionId, UpdateSectionRequest request)` to find the section and update its title.

#### [MODIFY] [SectionController.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/controller/SectionController.java)
- Expose `PUT /api/learnova/courses/sections/{sectionId}` endpoint to update section title.

#### [MODIFY] [LessonService.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/service/LessonService.java)
- Implement `updateLesson(Long lessonId, UpdateLessonRequest request)` to find the lesson and update its title.

#### [MODIFY] [LessonController.java](file:///d:/CODING/DATN/DATN-LearnOva/back_end/src/main/java/com/example/back_end/controller/LessonController.java)
- Expose `PUT /api/learnova/courses/lessons/{lessonId}` endpoint to update lesson title.

---

### Frontend Components

#### [MODIFY] [CourseApi.js](file:///d:/CODING/DATN/DATN-LearnOva/front_end/src/api/teacher/CourseApi.js)
- Add `updateSection(sectionId, payload)` function calling `PUT /courses/sections/${sectionId}`.
- Add `updateLesson(lessonId, payload)` function calling `PUT /courses/lessons/${lessonId}`.

#### [MODIFY] [useCourseCreationForm.js](file:///d:/CODING/DATN/DATN-LearnOva/front_end/src/page/teacher/courses/create/hooks/useCourseCreationForm.js)
- Implement `updateSectionTitle(sectionId, title)` to update the local React state.
- Implement `persistSectionTitle(sectionId, title)` to send the update to the backend API (called on blur).
- Implement `updateLessonTitle(sectionId, lessonId, title)` to update the local React state and send the update to the backend API.
- Stub/implement dummy handlers for media updates: `updateLessonVideo`, `updateLessonSource`, `updateLessonResources` to avoid runtime destructuring errors.

#### [MODIFY] [useCourseMediaUpload.js](file:///d:/CODING/DATN/DATN-LearnOva/front_end/src/page/teacher/courses/create/hooks/useCourseMediaUpload.js)
- Implement `handleLessonVideoSelected(sectionId, lessonId, file)` to support lesson video uploading and call `onLessonVideoChange`.

#### [MODIFY] [SectionsStep.jsx](file:///d:/CODING/DATN/DATN-LearnOva/front_end/src/page/teacher/courses/create/components/curriculum/SectionsStep.jsx)
- Support `onSectionTitleBlur` on the Section Title input so it triggers persistence when the user clicks away.

#### [MODIFY] [CourseCreationPage.jsx](file:///d:/CODING/DATN/DATN-LearnOva/front_end/src/page/teacher/courses/create/CourseCreationPage.jsx)
- Pass `onSectionTitleBlur` (linked to `persistSectionTitle`) down to `<SectionsStep />`.

---

## Verification Plan

### Automated Tests
- Build backend using `./mvnw clean test` to ensure there are no compilation or test failures.

### Manual Verification
1. Access Course Creation Step 2 (Curriculum).
2. Click "Add Section", verify it creates a section and displays "Section Title" editor.
3. Change Section Title, click away, and verify the title persists via a PUT request to the database.
4. Click "Add Lesson" in the active section, verify it creates a lesson.
5. Click pencil icon on lesson, type a new title, hit Enter, and verify it updates the lesson name in the database via a PUT request.
