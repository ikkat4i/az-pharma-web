import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'az_admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 8;

type SessionPayload = { email: string; exp: number };

function secret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function encode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(data: string) {
  return createHmac('sha256', secret()).update(data).digest('base64url');
}

export function createAdminSession(email: string) {
  if (!secret()) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const body = encode(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!token || !secret()) return false;
  const [body, signature] = token.split('.');
  if (!body || !signature) return false;
  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(decode(body)) as SessionPayload;
    return payload.email === process.env.ADMIN_EMAIL && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE_SECONDS,
};
