import pg from 'pg';

const { Pool } = pg;

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const result = await pool.query('SELECT id, username FROM users ORDER BY id');
  console.log('\n=== Users in Database ===');
  console.table(result.rows);
  console.log('\nNote: passwords are stored as bcrypt hashes and cannot be read directly.');
  await pool.end();
}

main().catch(e => { console.error(e.message); process.exit(1); });
