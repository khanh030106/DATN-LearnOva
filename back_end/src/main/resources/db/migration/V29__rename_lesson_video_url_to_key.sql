DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns
               WHERE table_name = 'lessons' AND column_name = 'video_url')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns
                        WHERE table_name = 'lessons' AND column_name = 'video_key')
    THEN
        ALTER TABLE lessons RENAME COLUMN video_url TO video_key;
    END IF;
END $$;
