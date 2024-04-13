import { Token } from "@/core/types/token"
import { accessTokenCookieName } from "@/data/static-info"
import { getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export function getToken(
  type: "server" | "client" = "client",
  serverCookies?: ReadonlyRequestCookies,
) {
  const token =
    type === "client"
      ? getCookie(accessTokenCookieName)
      : serverCookies?.get(accessTokenCookieName)?.value

  const decodedToken: Token | null = token ? jwtDecode(token) : null

  return {
    token,
    decodedToken,
  }
}
