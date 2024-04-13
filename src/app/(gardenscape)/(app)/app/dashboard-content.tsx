import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CaretRight, Plus } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import Image from "next/image"
import { CreateFirstGardenForm } from "../components/choose-garden-to-plant-card"
import { apiTrefle } from "@/utils/api-trefle"
import { Garden } from "@/core/types/api-interfaces"
import { Specie } from "@/core/types/trefle-api-types"
import { DialogTrigger } from "@/components/ui/dialog"
import { get } from "@/utils/get-api"

export async function DashboardContent() {
  const [apiResponse, trefleResponse] = await Promise.all([
    get(`/gardens`).then((res) => res.json()),
    apiTrefle(
      "/species?filter_not[common_name]=null&filter_not[image_url]=null",
    ),
  ])

  const gardens: Garden[] = apiResponse.gardens

  const species: Specie[] = trefleResponse.data.data

  return (
    <>
      <section className="space-y-6">
        <header className="container ml-auto flex items-center justify-between gap-2">
          <h2 className="text-3xl font-semibold text-zinc-700">
            Choose a Plant to Start
          </h2>

          <Button variant="link" asChild className="group">
            <Link href="/plants" className="flex items-center gap-1">
              See all{" "}
              <CaretRight
                weight="bold"
                className="transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </header>

        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="half-container relative ml-auto px-6">
            {species.map((plant) => (
              <CarouselItem key={plant.id} className="relative max-w-xs">
                <Link
                  href={`/plant/${plant.slug}`}
                  className="block h-full w-full"
                >
                  <div className="relative space-y-3">
                    <div className="h-56 w-full overflow-hidden rounded-lg">
                      <Image
                        src={plant.image_url}
                        alt=""
                        className="h-full w-full object-cover"
                        width={300}
                        height={300}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <strong className="text-lg font-medium">
                        {plant.common_name}
                      </strong>
                      <span className="text-zinc-500">
                        Family {plant.family}
                      </span>
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
                      <Link href={`/app?plantId=${plant.id}`} replace shallow>
                        <Plus className="h-5 w-5" />
                      </Link>
                    </Button>
                  </DialogTrigger>
                </CreateFirstGardenForm>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-6 disabled:hidden" />
          <CarouselNext className="right-6 z-20" />
        </Carousel>
      </section>

      <section className="space-y-6">
        <header className="container ml-auto flex items-center justify-between gap-2">
          <h2 className="text-3xl font-semibold text-zinc-700">
            Explore the community
          </h2>

          <Button variant="link" asChild className="group">
            <Link href="/community/gardens" className="flex items-center gap-1">
              See all{" "}
              <CaretRight
                weight="bold"
                className="transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </header>

        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="half-container relative ml-auto px-6">
            {gardens.map((garden) => (
              <CarouselItem key={garden.id} className="relative max-w-xs">
                <Link
                  href={`/garden/${garden.slug}`}
                  className="block h-full w-full"
                >
                  <div className="relative space-y-3">
                    <div className="h-56 w-full overflow-hidden rounded-lg">
                      <Image
                        src={""}
                        alt=""
                        className="h-full w-full object-cover"
                        width={300}
                        height={300}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <strong className="text-lg font-medium">
                        {garden.name}
                      </strong>
                      <span className="text-zinc-500">
                        Author {garden?.author?.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-6 disabled:hidden" />
          <CarouselNext className="right-6 z-20" />
        </Carousel>
      </section>
    </>
  )
}
