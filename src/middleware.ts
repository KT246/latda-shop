import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "./app/middleware/authMiddleware";

export function middleware(request: NextRequest) {
  return checkAuth(request);
}

export const config = {
  matcher: ["/admin/:path*", "/cashier/:path*"],
};
