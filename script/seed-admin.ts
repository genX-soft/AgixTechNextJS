import 'dotenv/config'
import { db } from '../src/lib/db'
import { users } from '../shared/schema'
import { hashPassword } from '../src/lib/auth'

async function seedAdmin() {
  const username = 'admin'
  const plainPassword = process.env.ADMIN_PASSWORD || 'agix-admin-123'
  const hashedPassword = hashPassword(plainPassword)

  console.log(`Seeding admin user: ${username}...`)

  try {
    await db.insert(users).values({ username, password_hash: hashedPassword })
    console.log(`Successfully seeded admin user: ${username}`)
    console.log(`Password is: ${plainPassword}`)
  } catch (error: any) {
    if (error.code === '23505') {
      console.log('Admin user already exists!')
    } else {
      console.error('Failed to seed admin user:', error)
    }
  }
  process.exit(0)
}

seedAdmin()
