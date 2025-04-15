import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/create-account",
  "/forgot-password",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/_next",
  "/favicon.ico",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for session token
  const sessionToken = request.cookies.get("session_token")?.value;

  if (!sessionToken) {
    return redirectToLogin(request);
  }

  try {
    // Verify the token using jose
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(sessionToken, secretKey);

    // Add user info to headers for route handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-role", payload.role as string);

    // Continue to route with added headers
    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    // Token is invalid or expired
    console.error("JWT verification failed:", error);
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
