-- Migration: add lead_status to contacts table
-- Run this against your Neon database once

-- 1. Create the enum type for lead status
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'interested',
    'not_interested',
    'admission_done'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. Add the status column with a default of 'new'
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS status lead_status NOT NULL DEFAULT 'new';

-- 3. Add an index for fast filtering by status
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
