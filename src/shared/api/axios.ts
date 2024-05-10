import axiosInstance from "axios"

export const axios = axiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})
