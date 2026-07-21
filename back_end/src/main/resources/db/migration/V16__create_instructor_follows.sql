CREATE TABLE public.instructor_follows (
    follower_id bigint NOT NULL,
    instructor_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE ONLY public.instructor_follows
    ADD CONSTRAINT instructor_follows_pkey PRIMARY KEY (follower_id, instructor_id);

ALTER TABLE ONLY public.instructor_follows
    ADD CONSTRAINT instructor_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.instructor_follows
    ADD CONSTRAINT instructor_follows_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

CREATE INDEX idx_instructor_follows_instructor_id ON public.instructor_follows USING btree (instructor_id);
