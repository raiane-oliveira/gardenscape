import { accessTokenCookieName } from "@/data/static-info"
import { deleteCookie } from "cookies-next"

export function usersService() {
  // TODO: get profile service
  async function getProfile() {}

  function logout() {
    deleteCookie(accessTokenCookieName)
  }

  return {
    getProfile,
    logout,
  }
}
