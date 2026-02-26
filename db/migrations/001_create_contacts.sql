-- Migration: create contacts table
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'interested',
    'not_interested',
    'admission_done'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.contacts (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  phone      VARCHAR(20)   NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  city       VARCHAR(100)  NOT NULL,
  status     lead_status   NOT NULL DEFAULT 'new',
  created_at TIMESTAMP     DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
