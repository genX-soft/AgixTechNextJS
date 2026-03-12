import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const result = await client.query('SELECT id, username FROM users ORDER BY id');
  console.log('\n=== Users in Database ===');
  console.table(result.rows);
  console.log('Note: passwords are bcrypt-hashed in the db.');
  await client.end();
}

main().catch(e => { console.error(e); process.exit(1); });
