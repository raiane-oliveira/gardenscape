import { Garden } from "@/shared/api"
import { axios, getToken } from "@/shared/api"
import { Either, left, right, UnexpectedError } from "@/shared/errors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { z } from "zod"

export const createGardenSchema = z.object({
  name: z.string(),
  private: z.boolean().default(false),
})

export type CreateGardenData = z.infer<typeof createGardenSchema>

interface CreateGardenApiResponse {
  garden: Garden
}

type CreateGardenResponse = Either<
  Error | UnexpectedError,
  CreateGardenApiResponse
>

export function useCreateGarden() {
  const { decodedToken: user, token } = getToken()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["gardens", user?.sub],
    mutationFn: async (
      data: CreateGardenData,
    ): Promise<CreateGardenResponse> => {
      try {
        const { data: body } = await axios.post<CreateGardenApiResponse>(
          "/gardens",
          {
            name: data.name,
            visibility: data.private ? "private" : "public",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
    onSuccess(data) {
      queryClient.setQueryData(["gardens", user?.sub], (cached: any) => {
        if (data.isLeft()) {
          return {
            gardens: cached.gardens,
          }
        }

        cached.gardens.unshift(data.value.garden)

        return {
          gardens: cached.gardens,
        }
      })
    },
  })

  return {
    ...mutation,
  }
}
