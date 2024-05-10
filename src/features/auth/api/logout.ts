import { accessTokenCookieName } from "@/shared/model"
import { deleteCookie } from "cookies-next"

export function logout() {
  deleteCookie(accessTokenCookieName)
}
