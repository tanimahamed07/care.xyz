import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);
  if(!token){
  return NextResponse.redirect(new URL("/api/auth", request.url));
  }

  // return NextResponse.redirect(new URL("/", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: "/dashboard",
};
