// TODO: fix env schema
// import { env } from "@/env"

import axios from "axios"

export function apiTrefle(path: string) {
  const baseUrl = process.env.TREFLE_BASE_API_URL
  const url = new URL(`/api/v1${path}`, baseUrl)

  url.searchParams.append("token", process.env.TREFLE_API_TOKEN ?? "")

  return axios.get(url.toString())
}
