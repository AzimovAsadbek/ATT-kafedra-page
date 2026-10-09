// Sessiya tokenini imzolash/tekshirish. Proxy va server kodida umumiy ishlatiladi,
// shuning uchun bu yerda Next.js yoki DB'ga bog'liqlik yo'q.
import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "att_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 kun

const DEV_SECRET = "dev-only-insecure-secret-change-me-please-32+";

function getKey() {
  let secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET muhit oʻzgaruvchisi kamida 32 belgidan iborat boʻlishi shart");
    }
    secret = DEV_SECRET;
  }
  return new TextEncoder().encode(secret);
}

export function signSession(userId) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getKey());
}

/** @returns {Promise<{ sub: string, iat: number } | null>} */
export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    return payload.sub && payload.iat ? payload : null;
  } catch {
    return null;
  }
}
