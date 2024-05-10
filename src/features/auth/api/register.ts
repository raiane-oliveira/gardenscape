"use client"

import { axios } from "@/shared/api"
import { Either, left, right, UnexpectedError } from "@/shared/errors"
import { AxiosError } from "axios"

interface RegisterRequest {
  name: string
  username: string
  email: string
  password: string
}

type RegisterServiceRequest = Either<Error | UnexpectedError, {}>

export async function register(
  values: RegisterRequest,
): Promise<RegisterServiceRequest> {
  try {
    await axios.post("/gardeners/register", {
      ...values,
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
