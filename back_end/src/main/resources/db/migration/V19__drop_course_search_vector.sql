-- search_vector was never queried by any application code (no tsvector/@@/to_tsquery
-- usage anywhere, no GIN index), yet it was recomputed on every course insert/update.
-- courses_search_vector_update() is an orphaned trigger function left over from before
-- search_vector became a GENERATED STORED column — no trigger on `courses` ever called it.
ALTER TABLE courses DROP COLUMN search_vector;

DROP FUNCTION IF EXISTS public.courses_search_vector_update();
