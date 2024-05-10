import { get } from "@/shared/api"

interface GardenPageProps {
  params: {
    slug: string
  }
}

export default async function GardenPage({ params }: GardenPageProps) {
  const response = await get(`/gardens/public/${params.slug}`, {
    next: {
      tags: ["garden", params.slug],
    },
  })
  const data = await response.json()
  console.log(data)

  return <pre>{JSON.stringify(data.garden)}</pre>
}
