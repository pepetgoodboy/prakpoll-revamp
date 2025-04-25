import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith("/login")) {
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const role = payload.role;

      if (role === "Admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token && request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const role = payload.role;
      const path = request.nextUrl.pathname;

      if (role === "User" && path.startsWith("/dashboard/admin")) {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
      }

      if (role === "Admin" && path.startsWith("/dashboard/user")) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
