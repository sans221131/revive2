import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL,
});

export default pool;
