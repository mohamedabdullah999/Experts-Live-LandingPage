-- Readable view of startup applications for the database browser (Vercel / Neon data editor)
-- and for exports: one column per form answer instead of the raw `details` JSON.
-- details.pitchDeckUrl is the optional pitch deck link added in Nov 2026; older rows return NULL.

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
  details ->> 'pitchDeckUrl' AS pitch_deck_url,
  details ->> 'sector'       AS sector,
  details ->> 'stage'        AS stage,
  details ->> 'pitch'        AS pitch,
  locale
FROM applications
WHERE kind = 'startup';
