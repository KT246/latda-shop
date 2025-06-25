import { NextRequest, NextResponse } from "next/server";

export function checkAuth(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userString = request.cookies.get("user")?.value;
  const user = userString ? JSON.parse(userString) : null;
  const path = request.nextUrl.pathname;

  if (!token && (path.startsWith("/admin") || path.startsWith("/cashier"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/admin") && user?.path !== 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/cashier") && user?.path !== 2) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
