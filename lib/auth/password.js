// scrypt asosidagi parol xeshlash (tashqi kutubxonasiz).
// Format: scrypt$N$r$p$<salt base64url>$<hash base64url>
// "server-only" ishlatilmaydi: CLI skriptlari ham shu moduldan foydalanadi.
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const PARAMS = { N: 16384, r: 8, p: 1 };
const KEY_LENGTH = 64;

export const MIN_PASSWORD_LENGTH = 8;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LENGTH, PARAMS);
  return ["scrypt", PARAMS.N, PARAMS.r, PARAMS.p, salt.toString("base64url"), hash.toString("base64url")].join("$");
}

export async function verifyPassword(password, stored) {
  const [algo, N, r, p, saltB64, hashB64] = String(stored).split("$");
  if (algo !== "scrypt" || !saltB64 || !hashB64) return false;

  const expected = Buffer.from(hashB64, "base64url");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64url"), expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
  });
  return timingSafeEqual(actual, expected);
}

export function generatePassword(length = 16) {
  return randomBytes(length).toString("base64url").slice(0, length);
}
