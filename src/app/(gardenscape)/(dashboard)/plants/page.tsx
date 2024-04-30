"use client"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Specie } from "@/core/types/trefle-api-types"
import { Plus } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import { CreateFirstGardenForm } from "../components/choose-garden-to-plant-card"
import { DialogTrigger } from "@/components/ui/dialog"
import { SearchPlantsForm } from "../components/search-plants-form"
import { useQuery } from "@tanstack/react-query"
import { axios } from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlantsPage() {
  const { data, isLoading } = useQuery<{ plants: { data: Specie[] } }>({
    queryKey: ["plants"],
    queryFn: async () => {
      const response = await axios.get("/plants")

      return response.data
    },
  })

  const species: Specie[] = !data ? [] : data.plants.data

  return (
    <main className="container flex flex-col gap-8 pb-40 pt-8">
      <header className="flex items-end justify-between gap-4">
        <h1 className="flex flex-col text-5xl text-neutral-800">
          <span className="text-3xl">Find your</span>
          <span className="font-semibold">Favorite Plants</span>
        </h1>

        <SearchPlantsForm />
      </header>

      <aside className="flex items-center gap-2">
        <ToggleGroup defaultValue="all" type="single">
          <ToggleGroupItem
            className="rounded-3xl data-[state=on]:bg-green-900 data-[state=on]:text-white"
            value="all"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            className="rounded-3xl data-[state=on]:bg-green-900 data-[state=on]:text-white"
            value="indoor"
          >
            Indoor
          </ToggleGroupItem>
          <ToggleGroupItem
            className="rounded-3xl data-[state=on]:bg-green-900 data-[state=on]:text-white"
            value="outdoor"
          >
            Outdoor
          </ToggleGroupItem>
        </ToggleGroup>
      </aside>

      <section className="grid gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px]" />
          ))}

        {species.map((plant) => {
          return (
            <div key={plant.id} className="group relative">
              <Link
                href={`/plants/${plant.slug}`}
                className="block h-full w-full"
              >
                <div className="relative space-y-3">
                  <div className="h-56 w-full overflow-hidden rounded-lg">
                    <Image
                      src={plant.image_url}
                      alt=""
                      className="h-full w-full object-cover transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-75"
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <strong className="text-lg font-medium">
                      {plant.common_name}
                    </strong>
                    <span className="text-zinc-500">Family {plant.family}</span>
                  </div>
                </div>
              </Link>

              <CreateFirstGardenForm>
                <DialogTrigger asChild>
                  <Button
                    className="absolute bottom-12 right-6 z-10 h-12 w-12 rounded-full bg-green-500 shadow-md"
                    asChild
                    size="icon"
                  >
                    <Link href={`/plants?plantId=${plant.id}`} replace shallow>
                      <Plus className="h-5 w-5" />
                    </Link>
                  </Button>
                </DialogTrigger>
              </CreateFirstGardenForm>
            </div>
          )
        })}
      </section>
    </main>
  )
}
