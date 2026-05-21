ALTER TYPE verification_type ADD VALUE 'REFRESH_TOKEN';

SELECT enumlabel
FROM pg_enum
WHERE enumtypid = 'verification_type'::regtype
ORDER BY enumsortorder;