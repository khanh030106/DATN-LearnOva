-- ALTER TABLE Tags ADD COLUMN category_id BIGINT REFERENCES Categories(category_id) ON DELETE SET NULL
ALTER TABLE tags DROP COLUMN category_id

