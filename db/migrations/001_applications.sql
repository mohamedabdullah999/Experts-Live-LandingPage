-- Demo Day applications (startups) and investor invite requests.
-- Common contact fields are columns; form-specific answers live in `details`.

CREATE TABLE IF NOT EXISTS applications (
  id            BIGSERIAL PRIMARY KEY,
  kind          TEXT        NOT NULL CHECK (kind IN ('startup', 'investor')),
  status        TEXT        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'accepted', 'declined', 'spam')),
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  organisation  TEXT        NOT NULL,          -- startup name or investor organisation
  locale        TEXT        NOT NULL CHECK (locale IN ('en', 'ar')),
  details       JSONB       NOT NULL DEFAULT '{}'::jsonb,
  consent_at    TIMESTAMPTZ NOT NULL,
  ip_hash       TEXT,                          -- salted SHA-256, never the raw IP
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_kind_created_idx ON applications (kind, created_at DESC);
CREATE INDEX IF NOT EXISTS applications_email_idx ON applications (lower(email));
