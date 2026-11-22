-- The pitch deck link gets its own column so it shows in the table browser (Vercel / Neon data editor)
-- instead of being buried in the `details` JSON. Startups only; NULL for investors and for rows
-- submitted before the field existed.

ALTER TABLE applications ADD COLUMN IF NOT EXISTS pitch_deck_url TEXT;

-- Move any links already saved inside details (rows from the first release of the field)
UPDATE applications
   SET pitch_deck_url = details ->> 'pitchDeckUrl'
 WHERE pitch_deck_url IS NULL
   AND details ? 'pitchDeckUrl';

UPDATE applications
   SET details = details - 'pitchDeckUrl'
 WHERE details ? 'pitchDeckUrl';

-- Same view, now reading the real column
CREATE OR REPLACE VIEW startup_applications AS
SELECT
  id,
  status,
  created_at,
  full_name,
  email,
  phone,
  organisation              AS startup_name,
  details ->> 'website'      AS website,
  pitch_deck_url,
  details ->> 'sector'       AS sector,
  details ->> 'stage'        AS stage,
  details ->> 'pitch'        AS pitch,
  locale
FROM applications
WHERE kind = 'startup';
