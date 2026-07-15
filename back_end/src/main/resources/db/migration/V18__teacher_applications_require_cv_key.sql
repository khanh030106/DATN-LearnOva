ALTER TABLE teacher_applications RENAME COLUMN portfolio_link TO cv_key;
UPDATE teacher_applications SET cv_key = '' WHERE cv_key IS NULL;
ALTER TABLE teacher_applications ALTER COLUMN cv_key SET NOT NULL;
