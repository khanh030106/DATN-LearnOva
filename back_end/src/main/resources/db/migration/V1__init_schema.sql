--
-- PostgreSQL database dump
--


-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: account_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.account_type AS ENUM (
    'LOCAL',
    'GOOGLE',
    'FACEBOOK',
    'GITHUB'
);


ALTER TYPE public.account_type OWNER TO postgres;

--
-- Name: accounttype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.accounttype AS ENUM (
    'FACEBOOK',
    'GITHUB',
    'GOOGLE',
    'LOCAL'
);


ALTER TYPE public.accounttype OWNER TO postgres;

--
-- Name: course_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.course_level AS ENUM (
    'Beginner',
    'Intermediate',
    'Advanced'
);


ALTER TYPE public.course_level OWNER TO postgres;

--
-- Name: course_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.course_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public.course_status OWNER TO postgres;

--
-- Name: courselevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.courselevel AS ENUM (
    'Advanced',
    'Beginner',
    'Intermediate'
);


ALTER TYPE public.courselevel OWNER TO postgres;

--
-- Name: coursestatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.coursestatus AS ENUM (
    'ARCHIVED',
    'DRAFT',
    'PUBLISHED'
);


ALTER TYPE public.coursestatus OWNER TO postgres;

--
-- Name: discount_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.discount_type AS ENUM (
    'Fixed',
    'Percent'
);


ALTER TYPE public.discount_type OWNER TO postgres;

--
-- Name: discounttype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.discounttype AS ENUM (
    'Fixed',
    'Percent'
);


ALTER TYPE public.discounttype OWNER TO postgres;

--
-- Name: gender_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_type AS ENUM (
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.gender_type OWNER TO postgres;

--
-- Name: gendertype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gendertype AS ENUM (
    'Female',
    'Male',
    'Other'
);


ALTER TYPE public.gendertype OWNER TO postgres;

--
-- Name: lesson_source_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.lesson_source_type AS ENUM (
    'Documentary',
    'Resources'
);


ALTER TYPE public.lesson_source_type OWNER TO postgres;

--
-- Name: lessonsourcetype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.lessonsourcetype AS ENUM (
    'Documentary',
    'Resources'
);


ALTER TYPE public.lessonsourcetype OWNER TO postgres;

--
-- Name: order_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'CANCELLED'
);


ALTER TYPE public.order_status OWNER TO postgres;

--
-- Name: orderstatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.orderstatus AS ENUM (
    'CANCELLED',
    'FAILED',
    'PAID',
    'PENDING'
);


ALTER TYPE public.orderstatus OWNER TO postgres;

--
-- Name: payment_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method AS ENUM (
    'MOMO',
    'VNPAY',
    'PAYPAL'
);


ALTER TYPE public.payment_method OWNER TO postgres;

--
-- Name: payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_status AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED',
    'REFUNDED'
);


ALTER TYPE public.payment_status OWNER TO postgres;

--
-- Name: paymentmethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.paymentmethod AS ENUM (
    'MOMO',
    'PAYPAL',
    'VNPAY'
);


ALTER TYPE public.paymentmethod OWNER TO postgres;

--
-- Name: paymentstatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.paymentstatus AS ENUM (
    'FAILED',
    'PENDING',
    'REFUNDED',
    'SUCCESS'
);


ALTER TYPE public.paymentstatus OWNER TO postgres;

--
-- Name: role_name; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role_name AS ENUM (
    'ROLE_ADMIN',
    'ROLE_TEACHER',
    'ROLE_USER'
);


ALTER TYPE public.role_name OWNER TO postgres;

--
-- Name: rolename; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rolename AS ENUM (
    'ROLE_ADMIN',
    'ROLE_TEACHER',
    'ROLE_USER'
);


ALTER TYPE public.rolename OWNER TO postgres;

--
-- Name: verification_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verification_type AS ENUM (
    'ACTIVE_ACCOUNT',
    'RESET_PASSWORD'
);


ALTER TYPE public.verification_type OWNER TO postgres;

--
-- Name: verificationtype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verificationtype AS ENUM (
    'ACTIVE_ACCOUNT',
    'RESET_PASSWORD'
);


ALTER TYPE public.verificationtype OWNER TO postgres;

--
-- Name: CAST (public.accounttype AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.accounttype AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.courselevel AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.courselevel AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.coursestatus AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.coursestatus AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.discounttype AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.discounttype AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.gendertype AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.gendertype AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.lessonsourcetype AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.lessonsourcetype AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.orderstatus AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.orderstatus AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.paymentmethod AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.paymentmethod AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.paymentstatus AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.paymentstatus AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.rolename AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.rolename AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.accounttype); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.accounttype) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.courselevel); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.courselevel) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.coursestatus); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.coursestatus) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.discounttype); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.discounttype) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.gendertype); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.gendertype) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.lessonsourcetype); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.lessonsourcetype) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.orderstatus); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.orderstatus) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.paymentmethod); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.paymentmethod) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.paymentstatus); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.paymentstatus) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.rolename); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.rolename) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.verificationtype); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.verificationtype) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (public.verificationtype AS character varying); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (public.verificationtype AS character varying) WITH INOUT AS IMPLICIT;


--
-- Name: check_lesson_progress_enrollment(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_lesson_progress_enrollment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_course_id BIGINT;
BEGIN
    SELECT s.course_id INTO v_course_id
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE l.lesson_id = NEW.lesson_id;

    IF NOT EXISTS (
        SELECT 1 FROM Enrollments
        WHERE user_id = NEW.user_id AND course_id = v_course_id
    ) THEN
        RAISE EXCEPTION 'User % chÆ°a enrolled vÃ o course %', NEW.user_id, v_course_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_lesson_progress_enrollment() OWNER TO postgres;

--
-- Name: check_review_enrollment(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_review_enrollment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Enrollments
        WHERE user_id = NEW.user_id AND course_id = NEW.course_id
    ) THEN
        RAISE EXCEPTION 'User % chÆ°a enrolled vÃ o course % nÃªn khÃ´ng thá»ƒ review',
            NEW.user_id, NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_review_enrollment() OWNER TO postgres;

--
-- Name: check_watched_seconds(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_watched_seconds() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_duration INTEGER;
BEGIN
    SELECT duration_seconds INTO v_duration
    FROM Lessons
    WHERE lesson_id = NEW.lesson_id;

    IF NEW.watched_seconds > v_duration THEN
        -- Tá»± clamp vá» duration thay vÃ¬ raise exception
        -- TrÃ¡nh lá»—i do network lag hoáº·c player report thá»«a vÃ i giÃ¢y
        NEW.watched_seconds := v_duration;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_watched_seconds() OWNER TO postgres;

--
-- Name: courses_search_vector_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.courses_search_vector_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.search_vector :=
            to_tsvector(
                    'simple',
                    unaccent(coalesce(NEW.title, '')) || ' ' ||
                    unaccent(coalesce(NEW.description, ''))
            );
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.courses_search_vector_update() OWNER TO postgres;

--
-- Name: immutable_unaccent(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.immutable_unaccent(text) RETURNS text
    LANGUAGE sql IMMUTABLE PARALLEL SAFE
    AS $_$
SELECT unaccent($1);
$_$;


ALTER FUNCTION public.immutable_unaccent(text) OWNER TO postgres;

--
-- Name: refresh_course_rating_summary(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.refresh_course_rating_summary() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY CourseRatingSummary;
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.refresh_course_rating_summary() OWNER TO postgres;

--
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_updated_at() OWNER TO postgres;

--
-- Name: sync_enrollment_progress(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sync_enrollment_progress() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_course_id      BIGINT;
    v_total_lessons  INTEGER;
    v_done_lessons   INTEGER;
    v_new_percent    INTEGER;
BEGIN
    -- XÃ¡c Ä‘á»‹nh course tá»« lesson
    SELECT s.course_id INTO v_course_id
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE l.lesson_id = NEW.lesson_id;

    -- Tá»•ng sá»‘ lesson cá»§a course (khÃ´ng tÃ­nh lesson Ä‘Ã£ xÃ³a)
    SELECT COUNT(*) INTO v_total_lessons
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE s.course_id = v_course_id
      AND l.is_deleted = FALSE
      AND s.is_deleted = FALSE;

    -- Sá»‘ lesson user Ä‘Ã£ hoÃ n thÃ nh
    SELECT COUNT(*) INTO v_done_lessons
    FROM LessonProgress lp
             JOIN Lessons l ON lp.lesson_id = l.lesson_id
             JOIN Sections s ON l.section_id = s.section_id
    WHERE lp.user_id = NEW.user_id
      AND s.course_id = v_course_id
      AND lp.is_completed = TRUE
      AND l.is_deleted = FALSE
      AND s.is_deleted = FALSE;

    -- TÃ­nh pháº§n trÄƒm, trÃ¡nh chia 0
    IF v_total_lessons = 0 THEN
        v_new_percent := 0;
    ELSE
        v_new_percent := FLOOR(v_done_lessons * 100.0 / v_total_lessons);
    END IF;

    -- Cáº­p nháº­t progress vÃ  completed_at náº¿u Ä‘áº¡t 100%
    UPDATE Enrollments
    SET
        progress_percent = v_new_percent,
        completed_at = CASE
                           WHEN v_new_percent = 100 AND completed_at IS NULL THEN CURRENT_TIMESTAMP
                           WHEN v_new_percent < 100 THEN NULL
                           ELSE completed_at
            END
    WHERE user_id = NEW.user_id AND course_id = v_course_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.sync_enrollment_progress() OWNER TO postgres;

--
-- Name: sync_voucher_used_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sync_voucher_used_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.status = 'PAID'
        AND OLD.status != 'PAID'
        AND NEW.voucher_id IS NOT NULL
    THEN
        UPDATE Vouchers
        SET used_count = used_count + 1
        WHERE voucher_id = NEW.voucher_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.sync_voucher_used_count() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auditlogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auditlogs (
    audit_log_id bigint NOT NULL,
    user_id bigint,
    action text NOT NULL,
    entity_name text NOT NULL,
    entity_id bigint NOT NULL,
    old_data jsonb,
    new_data jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.auditlogs OWNER TO postgres;

--
-- Name: auditlogs_audit_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auditlogs ALTER COLUMN audit_log_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.auditlogs_audit_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    user_id bigint NOT NULL,
    course_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id bigint NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    parent_id bigint,
    display_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.categories ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: coursecategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coursecategories (
    course_id bigint NOT NULL,
    category_id bigint NOT NULL,
    is_primary boolean DEFAULT false NOT NULL
);


ALTER TABLE public.coursecategories OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id bigint NOT NULL,
    course_id bigint NOT NULL,
    user_id bigint NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: courseratingsummary; Type: MATERIALIZED VIEW; Schema: public; Owner: postgres
--

CREATE MATERIALIZED VIEW public.courseratingsummary AS
 SELECT course_id,
    count(*) AS review_count,
    round(avg(rating), 2) AS avg_rating,
    count(*) FILTER (WHERE (rating = 5)) AS star_5,
    count(*) FILTER (WHERE (rating = 4)) AS star_4,
    count(*) FILTER (WHERE (rating = 3)) AS star_3,
    count(*) FILTER (WHERE (rating = 2)) AS star_2,
    count(*) FILTER (WHERE (rating = 1)) AS star_1
   FROM public.reviews
  GROUP BY course_id
  WITH NO DATA;


ALTER MATERIALIZED VIEW public.courseratingsummary OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    course_id bigint NOT NULL,
    thumbnail_url text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    language character varying(10) DEFAULT 'vi'::character varying NOT NULL,
    requirements text[],
    what_you_learn text[],
    base_price numeric(10,2) NOT NULL,
    level public.course_level NOT NULL,
    status public.course_status DEFAULT 'DRAFT'::public.course_status NOT NULL,
    instructor_id bigint NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    published_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    search_vector tsvector GENERATED ALWAYS AS (to_tsvector('simple'::regconfig, ((public.immutable_unaccent(COALESCE(title, ''::text)) || ' '::text) || public.immutable_unaccent(COALESCE(description, ''::text))))) STORED,
    CONSTRAINT courses_base_price_check CHECK ((base_price >= (0)::numeric)),
    CONSTRAINT courses_check CHECK ((((status = 'PUBLISHED'::public.course_status) AND (published_at IS NOT NULL)) OR ((status <> 'PUBLISHED'::public.course_status) AND (published_at IS NULL))))
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.courses ALTER COLUMN course_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.courses_course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: coursetags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coursetags (
    course_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE public.coursetags OWNER TO postgres;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    course_id bigint NOT NULL,
    user_id bigint NOT NULL,
    order_id bigint NOT NULL,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    progress_percent integer DEFAULT 0 NOT NULL,
    completed_at timestamp with time zone,
    CONSTRAINT enrollments_check CHECK ((((completed_at IS NOT NULL) AND (progress_percent = 100)) OR ((completed_at IS NULL) AND (progress_percent < 100)))),
    CONSTRAINT enrollments_progress_percent_check CHECK (((progress_percent >= 0) AND (progress_percent <= 100)))
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- Name: lessonprogress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessonprogress (
    user_id bigint NOT NULL,
    lesson_id bigint NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    watched_seconds integer DEFAULT 0 NOT NULL,
    CONSTRAINT lessonprogress_watched_seconds_check CHECK ((watched_seconds >= 0))
);


ALTER TABLE public.lessonprogress OWNER TO postgres;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    lesson_id bigint NOT NULL,
    section_id bigint NOT NULL,
    title text NOT NULL,
    video_url text NOT NULL,
    lesson_order double precision NOT NULL,
    duration_seconds integer NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    is_preview boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT lessons_duration_seconds_check CHECK ((duration_seconds > 0)),
    CONSTRAINT lessons_view_count_check CHECK ((view_count >= 0))
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: lessons_lesson_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons ALTER COLUMN lesson_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lessons_lesson_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lessonsources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessonsources (
    lesson_source_id bigint NOT NULL,
    lesson_id bigint NOT NULL,
    file_url text NOT NULL,
    resource_type public.lesson_source_type NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lessonsources OWNER TO postgres;

--
-- Name: lessonsources_lesson_source_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessonsources ALTER COLUMN lesson_source_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lessonsources_lesson_source_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    notification_id bigint NOT NULL,
    user_id bigint NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications ALTER COLUMN notification_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notifications_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orderitems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orderitems (
    order_item_id bigint NOT NULL,
    order_id bigint NOT NULL,
    course_id bigint NOT NULL,
    original_price numeric(10,2) NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT orderitems_original_price_check CHECK ((original_price >= (0)::numeric)),
    CONSTRAINT orderitems_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.orderitems OWNER TO postgres;

--
-- Name: orderitems_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orderitems ALTER COLUMN order_item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orderitems_order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    user_id bigint NOT NULL,
    voucher_id bigint,
    subtotal numeric(10,2) NOT NULL,
    discount_amount numeric(10,2) DEFAULT 0 NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status public.order_status DEFAULT 'PENDING'::public.order_status NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT orders_discount_amount_check CHECK ((discount_amount >= (0)::numeric)),
    CONSTRAINT orders_subtotal_check CHECK ((subtotal >= (0)::numeric)),
    CONSTRAINT orders_total_amount_check CHECK ((total_amount >= (0)::numeric))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    payment_id bigint NOT NULL,
    order_id bigint NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying(3) DEFAULT 'VND'::bpchar NOT NULL,
    payment_method public.payment_method NOT NULL,
    transaction_id text,
    status public.payment_status DEFAULT 'PENDING'::public.payment_status NOT NULL,
    paid_at timestamp with time zone,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT payments_amount_check CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payments ALTER COLUMN payment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.payments_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: promotioncourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotioncourses (
    promotion_id bigint NOT NULL,
    course_id bigint NOT NULL
);


ALTER TABLE public.promotioncourses OWNER TO postgres;

--
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    promotion_id bigint NOT NULL,
    promotion_name text NOT NULL,
    discount_percent integer NOT NULL,
    start_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by bigint,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT promotions_check CHECK ((end_date > start_date)),
    CONSTRAINT promotions_discount_percent_check CHECK (((discount_percent > 0) AND (discount_percent <= 100)))
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- Name: promotions_promotion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.promotions ALTER COLUMN promotion_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.promotions_promotion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reviews ALTER COLUMN review_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id bigint NOT NULL,
    role_name public.role_name NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.roles ALTER COLUMN role_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sections (
    section_id bigint NOT NULL,
    course_id bigint NOT NULL,
    title text NOT NULL,
    section_order double precision NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.sections OWNER TO postgres;

--
-- Name: sections_section_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sections ALTER COLUMN section_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sections_section_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    tag_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    slug text NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tags ALTER COLUMN tag_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tags_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: userauthproviders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userauthproviders (
    provider_id bigint NOT NULL,
    user_id bigint NOT NULL,
    provider public.account_type NOT NULL,
    provider_user_id text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.userauthproviders OWNER TO postgres;

--
-- Name: userauthproviders_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.userauthproviders ALTER COLUMN provider_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.userauthproviders_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: userrole; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userrole (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.userrole OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    full_name character varying(100) NOT NULL,
    email text NOT NULL,
    phone character varying(20),
    avatar text,
    cover_image text,
    date_of_birth date,
    gender public.gender_type,
    password_hash text,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: verificationtokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verificationtokens (
    token_id bigint NOT NULL,
    user_id bigint NOT NULL,
    token text NOT NULL,
    token_type public.verification_type NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expired_at timestamp with time zone NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    CONSTRAINT verificationtokens_check CHECK ((expired_at > created_at))
);


ALTER TABLE public.verificationtokens OWNER TO postgres;

--
-- Name: verificationtokens_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.verificationtokens ALTER COLUMN token_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.verificationtokens_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vouchers (
    voucher_id bigint NOT NULL,
    code text NOT NULL,
    description text NOT NULL,
    discount_type public.discount_type NOT NULL,
    discount_value numeric(10,2) NOT NULL,
    minimum_order numeric(10,2) NOT NULL,
    maximum_discount_amount numeric(10,2) NOT NULL,
    usage_limit integer NOT NULL,
    used_count integer DEFAULT 0 NOT NULL,
    start_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_by bigint,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT vouchers_check CHECK ((((discount_type = 'Percent'::public.discount_type) AND (discount_value <= (100)::numeric)) OR (discount_type = 'Fixed'::public.discount_type))),
    CONSTRAINT vouchers_check1 CHECK ((used_count <= usage_limit)),
    CONSTRAINT vouchers_check2 CHECK ((end_date > start_date)),
    CONSTRAINT vouchers_discount_value_check CHECK ((discount_value > (0)::numeric)),
    CONSTRAINT vouchers_maximum_discount_amount_check CHECK ((maximum_discount_amount >= (0)::numeric)),
    CONSTRAINT vouchers_minimum_order_check CHECK ((minimum_order >= (0)::numeric)),
    CONSTRAINT vouchers_usage_limit_check CHECK ((usage_limit >= 0)),
    CONSTRAINT vouchers_used_count_check CHECK ((used_count >= 0))
);


ALTER TABLE public.vouchers OWNER TO postgres;

--
-- Name: vouchers_voucher_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.vouchers ALTER COLUMN voucher_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vouchers_voucher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    user_id bigint NOT NULL,
    course_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- Name: auditlogs auditlogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditlogs
    ADD CONSTRAINT auditlogs_pkey PRIMARY KEY (audit_log_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (user_id, course_id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: coursecategories coursecategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecategories
    ADD CONSTRAINT coursecategories_pkey PRIMARY KEY (course_id, category_id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);


--
-- Name: courses courses_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_slug_key UNIQUE (slug);


--
-- Name: coursetags coursetags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursetags
    ADD CONSTRAINT coursetags_pkey PRIMARY KEY (course_id, tag_id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (course_id, user_id);


--
-- Name: lessonprogress lessonprogress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessonprogress
    ADD CONSTRAINT lessonprogress_pkey PRIMARY KEY (user_id, lesson_id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (lesson_id);


--
-- Name: lessons lessons_section_id_lesson_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_section_id_lesson_order_key UNIQUE (section_id, lesson_order);


--
-- Name: lessonsources lessonsources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessonsources
    ADD CONSTRAINT lessonsources_pkey PRIMARY KEY (lesson_source_id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- Name: orderitems orderitems_order_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_order_id_course_id_key UNIQUE (order_id, course_id);


--
-- Name: orderitems orderitems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_pkey PRIMARY KEY (order_item_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- Name: payments payments_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_transaction_id_key UNIQUE (transaction_id);


--
-- Name: promotioncourses promotioncourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotioncourses
    ADD CONSTRAINT promotioncourses_pkey PRIMARY KEY (promotion_id, course_id);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (promotion_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: reviews reviews_user_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_course_id_key UNIQUE (user_id, course_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: sections sections_course_id_section_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_course_id_section_order_key UNIQUE (course_id, section_order);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (section_id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tags tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_slug_key UNIQUE (slug);


--
-- Name: userauthproviders uk6aff95jlrrrwl9sd34oridmd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT uk6aff95jlrrrwl9sd34oridmd UNIQUE (provider, provider_user_id);


--
-- Name: userauthproviders ukd7jtydyg0hyillv8ur4pa12k9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT ukd7jtydyg0hyillv8ur4pa12k9 UNIQUE (user_id, provider);


--
-- Name: reviews ukgvg1ect42p0nkk171cbuwho8o; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT ukgvg1ect42p0nkk171cbuwho8o UNIQUE (user_id, course_id);


--
-- Name: orderitems ukm8ll9i069wu4wo73ampoohkkl; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT ukm8ll9i069wu4wo73ampoohkkl UNIQUE (order_id, course_id);


--
-- Name: userauthproviders userauthproviders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT userauthproviders_pkey PRIMARY KEY (provider_id);


--
-- Name: userauthproviders userauthproviders_provider_provider_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT userauthproviders_provider_provider_user_id_key UNIQUE (provider, provider_user_id);


--
-- Name: userauthproviders userauthproviders_user_id_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT userauthproviders_user_id_provider_key UNIQUE (user_id, provider);


--
-- Name: userrole userrole_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: verificationtokens verificationtokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verificationtokens
    ADD CONSTRAINT verificationtokens_pkey PRIMARY KEY (token_id);


--
-- Name: verificationtokens verificationtokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verificationtokens
    ADD CONSTRAINT verificationtokens_token_key UNIQUE (token);


--
-- Name: vouchers vouchers_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_code_key UNIQUE (code);


--
-- Name: vouchers vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_pkey PRIMARY KEY (voucher_id);


--
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (user_id, course_id);


--
-- Name: courseratingsummary_course_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX courseratingsummary_course_id_idx ON public.courseratingsummary USING btree (course_id);


--
-- Name: idx_audit_entity; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_audit_entity ON public.auditlogs USING btree (entity_name, entity_id);


--
-- Name: idx_audit_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_audit_user ON public.auditlogs USING btree (user_id);


--
-- Name: idx_course_categories_cat; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_categories_cat ON public.coursecategories USING btree (category_id);


--
-- Name: idx_course_categories_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_categories_course ON public.coursecategories USING btree (course_id);


--
-- Name: idx_course_tags_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_tags_course ON public.coursetags USING btree (course_id);


--
-- Name: idx_course_tags_tag; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_tags_tag ON public.coursetags USING btree (tag_id);


--
-- Name: idx_courses_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_active ON public.courses USING btree (course_id) WHERE (is_deleted = false);


--
-- Name: idx_courses_instructor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_instructor ON public.courses USING btree (instructor_id);


--
-- Name: idx_courses_level; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_level ON public.courses USING btree (level);


--
-- Name: idx_courses_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_price ON public.courses USING btree (base_price);


--
-- Name: idx_courses_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_slug ON public.courses USING btree (slug);


--
-- Name: idx_courses_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_title ON public.courses USING btree (title);


--
-- Name: idx_email_token; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_email_token ON public.verificationtokens USING btree (token);


--
-- Name: idx_email_token_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_email_token_user ON public.verificationtokens USING btree (user_id) WHERE (is_used = false);


--
-- Name: idx_enrollment_course_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_enrollment_course_id ON public.enrollments USING btree (course_id);


--
-- Name: idx_enrollment_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_enrollment_user_id ON public.enrollments USING btree (user_id);


--
-- Name: idx_enrollments_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_enrollments_order ON public.enrollments USING btree (order_id);


--
-- Name: idx_lesson_progress_lesson; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_lesson_progress_lesson ON public.lessonprogress USING btree (lesson_id);


--
-- Name: idx_lesson_progress_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_lesson_progress_user ON public.lessonprogress USING btree (user_id);


--
-- Name: idx_lessons_section; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_lessons_section ON public.lessons USING btree (section_id);


--
-- Name: idx_notif_unread; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notif_unread ON public.notifications USING btree (user_id) WHERE (is_read = false);


--
-- Name: idx_notif_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notif_user_id ON public.notifications USING btree (user_id);


--
-- Name: idx_order_items_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_items_course ON public.orderitems USING btree (course_id);


--
-- Name: idx_order_items_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_items_order ON public.orderitems USING btree (order_id);


--
-- Name: idx_orders_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_status ON public.orders USING btree (status);


--
-- Name: idx_orders_status_pending; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_status_pending ON public.orders USING btree (status) WHERE (status = 'PENDING'::public.order_status);


--
-- Name: idx_orders_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_user ON public.orders USING btree (user_id);


--
-- Name: idx_payments_order; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_payments_order ON public.payments USING btree (order_id);


--
-- Name: idx_promotion_course_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promotion_course_course ON public.promotioncourses USING btree (course_id);


--
-- Name: idx_promotions_dates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_promotions_dates ON public.promotions USING btree (start_date, end_date);


--
-- Name: idx_review_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_review_course ON public.reviews USING btree (course_id);


--
-- Name: idx_review_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_review_user ON public.reviews USING btree (user_id);


--
-- Name: idx_sections_course; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_sections_course ON public.sections USING btree (course_id);


--
-- Name: idx_user_role_role; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_role_role ON public.userrole USING btree (role_id);


--
-- Name: idx_users_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_active ON public.users USING btree (user_id) WHERE ((is_deleted = false) AND (is_active = true));


--
-- Name: idx_vouchers_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_vouchers_active ON public.vouchers USING btree (end_date) WHERE (is_active = true);


--
-- Name: idx_wishlist_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_wishlist_user_id ON public.wishlist USING btree (user_id);


--
-- Name: uq_course_primary_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX uq_course_primary_category ON public.coursecategories USING btree (course_id) WHERE (is_primary = true);


--
-- Name: categories trg_categories_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: lessonprogress trg_check_lesson_progress_enrollment; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_check_lesson_progress_enrollment BEFORE INSERT ON public.lessonprogress FOR EACH ROW EXECUTE FUNCTION public.check_lesson_progress_enrollment();


--
-- Name: reviews trg_check_review_enrollment; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_check_review_enrollment BEFORE INSERT ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.check_review_enrollment();


--
-- Name: lessonprogress trg_check_watched_seconds; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_check_watched_seconds BEFORE INSERT OR UPDATE OF watched_seconds ON public.lessonprogress FOR EACH ROW EXECUTE FUNCTION public.check_watched_seconds();


--
-- Name: courses trg_courses_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: lessons trg_lessons_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: orders trg_orders_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: promotions trg_promotions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_promotions_updated_at BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: reviews trg_refresh_rating_summary; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_refresh_rating_summary AFTER INSERT OR DELETE OR UPDATE ON public.reviews FOR EACH STATEMENT EXECUTE FUNCTION public.refresh_course_rating_summary();


--
-- Name: reviews trg_reviews_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: sections trg_sections_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_sections_updated_at BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: lessonprogress trg_sync_enrollment_progress; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_sync_enrollment_progress AFTER INSERT OR UPDATE OF is_completed ON public.lessonprogress FOR EACH ROW EXECUTE FUNCTION public.sync_enrollment_progress();


--
-- Name: orders trg_sync_voucher_used_count; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_sync_voucher_used_count AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.sync_voucher_used_count();


--
-- Name: users trg_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: vouchers trg_vouchers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_vouchers_updated_at BEFORE UPDATE ON public.vouchers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: auditlogs auditlogs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditlogs
    ADD CONSTRAINT auditlogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: cart cart_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(category_id) ON DELETE SET NULL;


--
-- Name: coursecategories coursecategories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecategories
    ADD CONSTRAINT coursecategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- Name: coursecategories coursecategories_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursecategories
    ADD CONSTRAINT coursecategories_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: courses courses_instructor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.users(user_id);


--
-- Name: coursetags coursetags_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursetags
    ADD CONSTRAINT coursetags_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: coursetags coursetags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coursetags
    ADD CONSTRAINT coursetags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(tag_id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE RESTRICT;


--
-- Name: enrollments enrollments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: lessonprogress lessonprogress_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessonprogress
    ADD CONSTRAINT lessonprogress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(lesson_id) ON DELETE CASCADE;


--
-- Name: lessonprogress lessonprogress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessonprogress
    ADD CONSTRAINT lessonprogress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: lessons lessons_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(section_id) ON DELETE CASCADE;


--
-- Name: lessonsources lessonsources_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessonsources
    ADD CONSTRAINT lessonsources_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(lesson_id) ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: orderitems orderitems_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id);


--
-- Name: orderitems orderitems_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orderitems
    ADD CONSTRAINT orderitems_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: orders orders_voucher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_voucher_id_fkey FOREIGN KEY (voucher_id) REFERENCES public.vouchers(voucher_id) ON DELETE SET NULL;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: promotioncourses promotioncourses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotioncourses
    ADD CONSTRAINT promotioncourses_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: promotioncourses promotioncourses_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotioncourses
    ADD CONSTRAINT promotioncourses_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(promotion_id) ON DELETE CASCADE;


--
-- Name: promotions promotions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: reviews reviews_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: sections sections_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: userauthproviders userauthproviders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userauthproviders
    ADD CONSTRAINT userauthproviders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: userrole userrole_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: userrole userrole_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userrole
    ADD CONSTRAINT userrole_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: verificationtokens verificationtokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verificationtokens
    ADD CONSTRAINT verificationtokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: vouchers vouchers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id);


--
-- Name: wishlist wishlist_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- Name: wishlist wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--



REFRESH MATERIALIZED VIEW courseratingsummary;

REFRESH MATERIALIZED VIEW courseratingsummary;
