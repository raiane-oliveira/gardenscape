import { Gardener, axios, getToken } from "@/shared/api"
import { Either, left, right, UnexpectedError } from "@/shared/errors"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface GetUserApiResponse {
  gardener: Gardener
}

export type GetUserResponse = Either<
  Error | UnexpectedError,
  GetUserApiResponse
>

export function useGetCurrentUser() {
  const { decodedToken: user } = getToken()

  const query = useQuery({
    queryKey: ["gardener", user?.sub],
    queryFn: async (): Promise<GetUserResponse> => {
      try {
        const { data: body } = await axios.get<GetUserApiResponse>(
          `/gardeners/${user?.username}`,
        )

        return right(body)
      } catch (err: any) {
        const apiErrorMessage =
          err instanceof AxiosError && err.response?.data.message

        if (apiErrorMessage) {
          return left(new Error(apiErrorMessage as string))
        }

        return left(new UnexpectedError())
      }
    },
  })

  return {
    ...query,
  }
}
