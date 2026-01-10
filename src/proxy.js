import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define role-based access
const roleBasedRoutes = {
  user: [
    "/dashboard",
    "/dashboard/my-bookings",
    "/dashboard/profile",
    "/booking",
    "/booking/*",
  ],
  admin: [
    "/dashboard",
    "/dashboard/manage-bookings",
    "/dashboard/manage-users",
    "/booking",
    "/booking/*",
  ],
};

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  console.log("Requested Path:", pathname);

  // Get the JWT token from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(request.nextUrl.pathname);
  // Not authenticated
  if (!token) {
    console.log("❌ No token - redirecting to login");
    return NextResponse.redirect(new URL(`/login?callbackUrl=${request.nextUrl.pathname}`, request.url));
  }

  // Invalid role
  if (!token?.role || !roleBasedRoutes[token.role]) {
    console.log("❌ Invalid role - redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoutes = roleBasedRoutes[token.role];

  // Check access
  const hasAccess = allowedRoutes.some((route) => {
    if (route.endsWith("/*")) {
      // Handle wildcard routes
      const baseRoute = route.replace("/*", "");
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  console.log("Access Allowed:", hasAccess);

  // No access
  if (!hasAccess) {
    console.log("❌ No access to this route - redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Access granted
  console.log("✅ Access granted");
  return NextResponse.next();
}

// Apply middleware to these paths
export const config = {
  matcher: ["/dashboard/:path*", "/booking/:path*"],
};
