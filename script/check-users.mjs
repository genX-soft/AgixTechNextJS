import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
const result = await client.query('SELECT id, username FROM users ORDER BY id');
console.log('\n=== Admin Users in Database ===');
console.table(result.rows);
console.log('================================\n');
console.log('Note: Passwords are bcrypt-hashed and cannot be read directly.');
await client.end();
process.exit(0);
