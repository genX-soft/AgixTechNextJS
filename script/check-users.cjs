const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const idx = line.indexOf('=');
  if (idx === -1) return;
  const key = line.slice(0, idx).trim();
  const val = line.slice(idx + 1).trim();
  if (key && !process.env[key]) process.env[key] = val;
});

const pg = require('pg');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  try {
    await pool.query('ALTER TABLE users DROP COLUMN IF EXISTS password');
    console.log('✅ Dropped "password" column from users table.');
    
    const schema = await pool.query(
      `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position`
    );
    console.log('\nUpdated users table columns:');
    console.table(schema.rows);
  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
}

run();
