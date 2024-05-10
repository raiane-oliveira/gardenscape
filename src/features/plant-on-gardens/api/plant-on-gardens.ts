"use client"

import { axios, getToken } from "@/shared/api"
import { Either, left, right, UnexpectedError } from "@/shared/errors"
import { AxiosError } from "axios"

interface PlantOnGardensRequest {
  gardens: {
    gardenId: string
  }[]
  plant: {
    id: number
    imageUrl?: string | null
  }
}

type PlantOnGardensServiceRequest = Either<Error | UnexpectedError, {}>

export async function plantOnGardens({
  gardens,
  plant,
}: PlantOnGardensRequest): Promise<PlantOnGardensServiceRequest> {
  const { token } = getToken()

  try {
    const plantOnGardens = gardens.map((garden) => {
      return axios.post(
        `/gardens/${garden.gardenId}/plant`,
        {
          plantId: plant.id,
          plantUrl: plant.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    })

    await Promise.all(plantOnGardens)

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
