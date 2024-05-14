import { GardenDetails } from "@/shared/api"
import { axios, getToken } from "@/shared/api"
import { useQuery } from "@tanstack/react-query"

export function useUserGardens() {
  const { decodedToken, token } = getToken()

  const query = useQuery({
    queryKey: ["gardens", decodedToken?.sub],
    queryFn: async () => {
      const { data } = await axios.get<{ gardens: GardenDetails[] }>(
        "/user/gardens",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return data
    },
  })

  return {
    ...query,
  }
}
