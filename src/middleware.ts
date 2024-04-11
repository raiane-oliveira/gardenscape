import { accessTokenCookieName } from "@/data/static-info"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"
import { checkTimestampBeforeToday } from "./utils/check-timestamp-before-today"
import { Token } from "@/core/types/token"

// routes where only unauthenticated user can access
const unauthorizedRoutesWhenAuthenticate = ["/login", "/sign-up", "/"]

const protectedRoutes = ["/app"]

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(accessTokenCookieName)

  const decodedAccessToken: Token | undefined =
    accessToken && jwtDecode(accessToken?.value)

  const isAccessTokenExpires =
    decodedAccessToken?.exp && checkTimestampBeforeToday(decodedAccessToken.exp)

  if (!accessToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    isAccessTokenExpires
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (
    unauthorizedRoutesWhenAuthenticate.includes(request.nextUrl.pathname) &&
    accessToken &&
    !isAccessTokenExpires
  ) {
    return NextResponse.redirect(new URL("/app", request.url))
  }
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/app"],
}
