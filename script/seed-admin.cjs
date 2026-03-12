/**
 * Re-seeds admin user using Node.js built-in crypto (PBKDF2-SHA256).
 * No external dependencies needed.
 */
const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load .env
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

const USERNAME = 'admin';
const PLAIN_PASSWORD = process.env.ADMIN_PASSWORD || 'agix-admin-123';
const ITERATIONS = 100000;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.pbkdf2Sync(password, salt, ITERATIONS, 64, 'sha256');
  return `pbkdf2:sha256:${ITERATIONS}:${salt}:${derived.toString('hex')}`;
}

async function seed() {
  const hashedPassword = hashPassword(PLAIN_PASSWORD);

  try {
    // Remove any existing admin user and re-insert with new hash format
    await pool.query('DELETE FROM users WHERE username = $1', [USERNAME]);
    await pool.query(
      `INSERT INTO users (username, password_hash) VALUES ($1, $2)`,
      [USERNAME, hashedPassword]
    );
    console.log(`\n✅ Admin user seeded with PBKDF2-SHA256 hash.`);
    console.log(`   Username: ${USERNAME}`);
    console.log(`   Password: ${PLAIN_PASSWORD}`);
    console.log(`   Hash    : ${hashedPassword.slice(0, 40)}...`);
    console.log(`\nYou can now log in at: http://192.168.0.101:5000/admin/leads/`);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
}

seed();
