import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { AuthSession } from './types';

const SESSION_COOKIE_NAME = 'cms_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const SALT_ROUNDS = 10;

/**
 * Get the admin password from environment variables.
 */
export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }
  return password;
}

/**
 * Hash a password using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against the stored hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new session.
 */
export async function createSession(): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  const session: AuthSession = {
    id,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return id;
}

/**
 * Get the current session from cookies.
 */
export async function getSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const session: AuthSession = JSON.parse(sessionCookie.value);

    // Check if session has expired
    if (new Date(session.expiresAt) < new Date()) {
      await destroySession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Destroy the current session.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if a password matches the admin password.
 */
export async function authenticateAdmin(password: string): Promise<boolean> {
  const adminPassword = getAdminPassword();
  // For simple auth, compare directly (the env password is plaintext)
  // But we also support hashed passwords stored in .env
  if (password === adminPassword) return true;
  // If the admin password looks like a bcrypt hash, verify against it
  if (adminPassword.startsWith('$2')) {
    return bcrypt.compare(password, adminPassword);
  }
  return false;
}
