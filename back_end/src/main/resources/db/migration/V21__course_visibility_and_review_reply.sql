-- Separate "hidden from students" from "deleted" so a single boolean isn't reused for two
-- different teacher actions (previously both actions toggled courses.is_deleted).
ALTER TABLE public.courses
    ADD COLUMN is_hidden boolean NOT NULL DEFAULT false;

-- Let instructors respond publicly to a student review.
ALTER TABLE public.reviews
    ADD COLUMN instructor_reply text,
    ADD COLUMN replied_at timestamptz;
