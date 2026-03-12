import { db } from '@/lib/db'
import { users } from '@shared/schema'
import { eq } from 'drizzle-orm'
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto'

const ITERATIONS = 100_000
const KEY_LEN = 64
const ALGO = 'sha256'

/**
 * Hashes a plain-text password.
 * Returns format: "pbkdf2:sha256:<iterations>:<salt>:<hex-hash>"
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(32).toString('hex')
  const derived = pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, ALGO)
  return `pbkdf2:${ALGO}:${ITERATIONS}:${salt}:${derived.toString('hex')}`
}

/**
 * Verifies a password against a stored hash.
 */
function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':')
    if (parts.length !== 5 || parts[0] !== 'pbkdf2') return false
    const [, algo, iterStr, salt, expectedHex] = parts
    const iterations = parseInt(iterStr, 10)
    const derived = pbkdf2Sync(password, salt, iterations, KEY_LEN, algo)
    const expected = Buffer.from(expectedHex, 'hex')
    return derived.length === expected.length && timingSafeEqual(derived, expected)
  } catch {
    return false
  }
}

/**
 * Returns true if no admin users exist yet.
 */
export async function noUsersExist(): Promise<boolean> {
  const [row] = await db.select({ id: users.id }).from(users).limit(1)
  return !row
}

/**
 * Authenticates an admin using HTTP Basic Auth header.
 * Returns true if valid, false otherwise.
 */
export async function authenticateAdmin(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) return false

  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8')
    const colonIndex = credentials.indexOf(':')
    if (colonIndex === -1) return false
    const username = credentials.slice(0, colonIndex)
    const password = credentials.slice(colonIndex + 1)

    if (!username || !password) return false

    const [user] = await db
      .select({ password_hash: users.password_hash })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (!user?.password_hash) return false

    return verifyPassword(password, user.password_hash)
  } catch (err) {
    console.error('Auth error:', err)
    return false
  }
}
