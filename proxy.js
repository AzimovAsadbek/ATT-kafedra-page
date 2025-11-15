import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/jwt";

// Optimistik tekshiruv: tokeni yo'q yoki yaroqsiz foydalanuvchini darhol login
// sahifasiga yo'naltiradi. To'liq avtorizatsiya (foydalanuvchi mavjudligi, parol
// almashtirilgani) har bir sahifa va server action ichida `requireAdmin()` orqali.
export async function proxy(request) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
