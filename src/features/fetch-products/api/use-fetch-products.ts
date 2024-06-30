import { ProductWithFeatures, get } from "@/shared/api"
import { useQuery } from "@tanstack/react-query"

export function useFetchProducts() {
  const query = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await get("/products")

      const data = await response.json()
      return data as {
        products: ProductWithFeatures[]
      }
    },
  })

  return query
}
