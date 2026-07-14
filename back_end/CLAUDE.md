# Backend conventions

## Package layout by actor
Role-specific code lives in its own subpackage, mirroring `admin/`:
`controller/teacher/`, `service/teacher/`, `dto/response/teacher/`, `dto/request/teacher/`.
Code shared across roles (public course browsing, auth, uploads, etc.) stays in the
package root. Don't add a `Teacher*`/`Admin*` class to the root packages — put it in
the matching subpackage instead, even if it only has one method.

## API routes
- Teacher-only endpoints: `/api/learnova/teacher/{resource}` (e.g. `/teacher/courses`,
  `/teacher/revenue`, `/teacher/applications`). No exceptions/hyphenated variants.
- Admin-only endpoints: `/api/learnova/admin/{resource}`.
- Public/shared endpoints: `/api/learnova/{resource}` with no role segment.
- Give every `@RestController` a real `@RequestMapping` base path that names its
  resource (not `/api` or `/api/learnova` alone) — each `@GetMapping`/`@PostMapping`
  should only add the sub-path, not repeat the base.

## Controllers
- Controllers stay thin: validate input via `@Valid`, delegate to a service, map the
  result to a `ResponseEntity`. Business logic (ownership checks, aggregation,
  stream/filter pipelines) belongs in the service.
- Don't manually check `authentication == null || !authentication.isAuthenticated()`
  in a method that already has `@PreAuthorize` — Spring Security has already rejected
  the request before the method body runs.
- Prefer `@PreAuthorize("hasRole('TEACHER')")` at the class level when every method in
  the controller requires it; use method-level only when a controller mixes roles.

## Services
- Keep one service focused on one actor's view of one resource (e.g.
  `TeacherCourseService` vs the shared `CourseService`). If a service needs data
  another actor's service already computes (e.g. a teacher stats service needing
  `TeacherCourseService.getMyCourses`), inject that service rather than duplicating
  the query/mapping logic.
- A method that assembles more than 3-4 unrelated pieces of a response (trend +
  totals + rankings + recent-items, etc.) should delegate each piece to a private
  `buildX(...)` helper instead of growing as one long method. Use a small private
  `record` to carry a helper's multi-value result back to the caller.
- Shared numeric helpers (e.g. `percentDelta`) belong in `util/`, not copy-pasted
  across services.

## DTOs
- Response/request DTOs are Java `record`s. Don't reach for Lombok `@Data`/`@Builder`
  classes for DTOs — the existing ones are a historical inconsistency, not a pattern
  to follow.
- The request package is `dto.request` (not `dto.resquest` — a fixed typo, don't
  reintroduce it).
