import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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
  // Additional public routes
  "/about",
  "/contact",
  "/solutions",
  "/pricing",
  "/get-started",
  "/demo",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for Firebase auth token in cookies
  const authToken = request.cookies.get("firebase_auth_token")?.value;

  if (!authToken) {
    return redirectToLogin(request);
  }

  // At this point, we have a token but we won't verify it here
  // Firebase client SDK will handle token verification when the page loads
  // This is a simpler approach for client-side Firebase auth
  return NextResponse.next();
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
