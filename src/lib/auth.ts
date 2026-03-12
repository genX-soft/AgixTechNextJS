import { storage } from '@/lib/storage'
import { compareSync } from 'bcryptjs'

export async function authenticateAdmin(request: Request) {
  const authHeader = request.headers.get('Authorization');
  // Fallback to legacy x-passcode for a moment if needed, but we'll remove it.
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  
  try {
    const base64Credentials = authHeader.split(' ')[1];
    // Use Buffer.from for Node environments
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    if (!username || !password) return false;
    
    const user = await storage.getUserByUsername(username);
    if (!user) return false;
    
    return compareSync(password, user.password);
  } catch (err) {
    return false;
  }
}
