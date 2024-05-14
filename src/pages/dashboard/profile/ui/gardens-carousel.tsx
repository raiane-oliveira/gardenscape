import { GardenDetails, getToken } from "@/shared/api"
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/shared/ui"
import { DotsThreeVertical } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { GardenSettingsDropdownContent } from "./garden-settings-dropdown-content"

interface GardensCarouselProps {
  gardens: GardenDetails[]
  isOwner: boolean | null
}

export function GardensCarousel({ gardens, isOwner }: GardensCarouselProps) {
  const { decodedToken } = getToken()
  const username = decodedToken?.username

  return (
    <>
      {gardens.length === 0 ? (
        <p className="half-container py-6 text-neutral-700">
          {isOwner
            ? "It seems you don't have any garden yet."
            : `It seems ${username} does not have any garden yet.`}
        </p>
      ) : (
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="half-container relative ml-auto px-6">
            {gardens.map((garden) => {
              if (!isOwner && garden.visibility === "private") {
                return null
              }

              const firstPlantImageUrl =
                garden.plants.length > 0 ? garden.plants[0].plantUrl : ""

              const updatedAt = dayjs(garden.updatedAt).format("LL")
              const createdAt = dayjs(garden.createdAt).format("LL")

              return (
                <CarouselItem key={garden.id} className="relative max-w-xs">
                  {isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="absolute right-2 top-2 z-10"
                          size="icon"
                          variant="ghost"
                        >
                          <DotsThreeVertical className="h-6 w-6" />
                        </Button>
                      </DropdownMenuTrigger>

                      <GardenSettingsDropdownContent garden={garden} />
                    </DropdownMenu>
                  )}

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
                        <div className="flex items-center gap-2">
                          <strong className="text-lg font-medium">
                            {garden.name}
                          </strong>

                          {isOwner && (
                            <Badge
                              variant={
                                garden.visibility === "private"
                                  ? "secondary"
                                  : "default"
                              }
                              className="ml-auto uppercase"
                            >
                              {garden.visibility}
                            </Badge>
                          )}
                        </div>

                        <span className="text-zinc-500">
                          {garden.updatedAt
                            ? `Updated at ${updatedAt}`
                            : `Created at ${createdAt}`}
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
      )}
    </>
  )
}
