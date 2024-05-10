"use client"

import { axios, getToken } from "@/shared/api"
import {
  Either,
  left,
  right,
  InvalidRequestData,
  UnexpectedError,
} from "@/shared/errors"
import { AxiosError } from "axios"

interface UploadAvatarImagesRequest {
  file: File
}

type UploadAvatarImagesServiceRequest = Either<
  Error | UnexpectedError | InvalidRequestData,
  {}
>

const MAX_SIZE_FILE = 1024 * 1024 * 5 // 5mb
const ALLOWED_MIMETYPES = ["image/jpg", "image/png", "image/jpeg"]

export async function uploadAvatarImage({
  file,
}: UploadAvatarImagesRequest): Promise<UploadAvatarImagesServiceRequest> {
  const { token, decodedToken: user } = getToken()

  const formData = new FormData()
  formData.append("file", file)

  if (!ALLOWED_MIMETYPES.includes(file.type)) {
    return left(new InvalidRequestData("File type not allowed."))
  }

  if (file.size > MAX_SIZE_FILE) {
    return left(new InvalidRequestData("The image size is too big."))
  }

  try {
    await axios.post(`/gardeners/${user?.username}/upload-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
