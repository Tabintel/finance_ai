import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) return NextResponse.next();

  const isOnboardingPage = req.nextUrl.pathname === "/onboarding";
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token.isOnboarded && isDashboardPage) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (token.isOnboarded && isOnboardingPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/onboarding"] };
