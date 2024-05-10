"use client"

import { accessTokenCookieName } from "@/shared/model"
import { axios } from "@/shared/api"
import { Either, left, right, UnexpectedError } from "@/shared/errors"
import { AxiosError } from "axios"
import { setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

interface LoginResponse {
  access_token: string
}

interface LoginRequest {
  username: string
  password: string
}

type LoginServiceRequest = Either<Error | UnexpectedError, {}>

export async function login(
  values: LoginRequest,
): Promise<LoginServiceRequest> {
  try {
    const { data } = await axios.post<LoginResponse>(
      "/gardeners/authenticate",
      values,
    )

    const decodedToken = jwtDecode(data.access_token)
    const unixTimestampMilliseconds = new Date(
      (decodedToken.exp as number) * 1000,
    )

    setCookie(accessTokenCookieName, data.access_token, {
      expires: unixTimestampMilliseconds,
    })

    return right({})
  } catch (err: any) {
    const apiErrorMessage =
      err instanceof AxiosError && err.response?.data.message

    if (apiErrorMessage) {
      return left(new Error(apiErrorMessage as string))
    }

    return left(new UnexpectedError())
  }
}
