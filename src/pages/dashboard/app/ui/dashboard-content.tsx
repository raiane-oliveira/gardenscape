import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Button,
  DialogTrigger,
} from "@/shared/ui"
import { CaretRight, Plus } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import Image from "next/image"
import { ChooseGardenToPlantForm } from "@/features/plant-on-gardens"
import { apiTrefle, get, GardenDetails, Specie } from "@/shared/api"

export async function DashboardContent() {
  const [apiResponse, trefleResponse] = await Promise.all([
    get(`/gardens`)
      .then((res) => res.json())
      .catch((err) => console.log(err)),
    apiTrefle(
      "/species?filter_not[common_name]=null&filter_not[image_url]=null",
    ).catch((err) => {
      console.log(err)

      return {
        data: {
          data: [],
        },
      }
    }),
  ])

  const gardens: GardenDetails[] = apiResponse.gardens

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
              <CarouselItem key={plant.id} className="group relative max-w-xs">
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
                      <span className="text-zinc-500">
                        Family {plant.family}
                      </span>
                    </div>
                  </div>
                </Link>

                <ChooseGardenToPlantForm
                  plant={{ id: plant.id, imageUrl: plant.image_url }}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="absolute bottom-12 right-6 z-10 h-12 w-12 rounded-full bg-green-500 shadow-md"
                      size="icon"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                </ChooseGardenToPlantForm>
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
            {gardens.map((garden) => {
              const firstPlantImageUrl =
                garden.plants.length > 0 ? garden.plants[0].plantUrl : ""

              return (
                <CarouselItem key={garden.id} className="relative max-w-xs">
                  <Link
                    href={`/garden/${garden.slug}`}
                    className="block h-full w-full"
                  >
                    <div className="relative space-y-3">
                      <div className="h-56 w-full overflow-hidden rounded-lg">
                        <Image
                          src={firstPlantImageUrl ?? ""}
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
                          @{garden.gardener.username}
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="left-6 disabled:hidden" />
          <CarouselNext className="right-6 z-20" />
        </Carousel>
      </section>
    </>
  )
}
