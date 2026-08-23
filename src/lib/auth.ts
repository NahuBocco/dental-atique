import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const COOKIE_NAME = 'ADMIN_PASSWORD';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const passwordCookie = cookieStore.get(COOKIE_NAME);
  return passwordCookie?.value === ADMIN_PASSWORD;
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getExpectedPassword(): string {
  return ADMIN_PASSWORD;
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
