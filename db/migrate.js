const { Pool } = require('@neondatabase/serverless');

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

async function run() {
  console.log('Running migration...');

  await pool.query(`
    DO $$ BEGIN
      CREATE TYPE lead_status AS ENUM (
        'new', 'contacted', 'interested', 'not_interested', 'admission_done'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `);
  console.log('✓ Enum created (or already existed)');

  await pool.query(`
    ALTER TABLE contacts
      ADD COLUMN IF NOT EXISTS status lead_status NOT NULL DEFAULT 'new'
  `);
  console.log('✓ Column added');

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status)
  `);
  console.log('✓ Index created');

  console.log('Migration complete.');
  await pool.end();
}

run().catch((e) => {
  console.error('Migration failed:', e.message);
  process.exit(1);
});
