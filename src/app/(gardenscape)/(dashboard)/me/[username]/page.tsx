import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { get } from "@/utils/get-api"
import { getToken } from "@/utils/get-token"
import { DotsThreeVertical, Gear, User } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { GardenSettingsDropdownContent } from "../../components/garden-settings-dropdown-content"
import { AddNewGardenButton } from "./add-new-garden-button"
import { AvatarImage } from "../../components/avatar-image"
import { GardenDetails, Gardener } from "@/core/types/api-interfaces"

interface MePageProps {
  params: {
    username: string
  }
}

export default async function MePage({ params }: MePageProps) {
  const username = params.username
  const { decodedToken, token } = getToken("server", cookies())

  const [responseGardener, responseGardens] = await Promise.all([
    get(`/gardeners/${username}`, {
      next: {
        tags: ["gardeners", username],
      },
    }).then((res) => res.json()),
    get(`/user/gardens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
  ])

  if (!responseGardener || !responseGardens) {
    return <h1 className="animate-pulse text-4xl">Loading...</h1>
  }

  const { gardener }: { gardener: Gardener } = responseGardener
  const { gardens }: { gardens: GardenDetails[] } = responseGardens

  const isOwner = decodedToken && username === decodedToken.username
  const memberSince = dayjs(gardener.createdAt).format("[Member since ]LL")

  const amountPlants = gardens.reduce((previous, current) => {
    return previous + current.plants.length
  }, 0)

  return (
    <div>
      <div className="bg-green-300/30">
        <header className="container flex h-80 items-end gap-6 py-8">
          {isOwner ? (
            <AvatarImage url={gardener.avatar} />
          ) : (
            <div className="grid h-40 w-40 place-content-center overflow-hidden rounded border border-neutral-400 bg-neutral-50 shadow-md">
              {gardener.avatar ? (
                <Image
                  src={gardener.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                  quality={100}
                />
              ) : (
                <User className="h-12 w-12 text-neutral-700" />
              )}
            </div>
          )}

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold">{gardener.name}</h1>

            <div className="flex items-center gap-5">
              <span className="text-lg text-neutral-500">
                {gardener.username}
              </span>
              <span className="text-lg text-neutral-500">{memberSince}</span>
            </div>
          </div>

          {isOwner && (
            <Link
              href="/settings/account"
              className="ml-auto text-neutral-500 hover:text-neutral-900"
            >
              <Gear className="h-7 w-7 transition-colors duration-300" />
            </Link>
          )}
        </header>
      </div>

      <aside className="container my-10 flex gap-10">
        <Card className="w-full flex-1 shadow-md">
          <CardHeader>
            <CardDescription className="text-lg text-neutral-700">
              Planting
            </CardDescription>
          </CardHeader>

          <CardContent className="text-2xl font-semibold text-neutral-800">
            {amountPlants}
          </CardContent>
        </Card>
        <Card className="w-full flex-1 shadow-md">
          <CardHeader>
            <CardDescription className="text-lg text-neutral-700">
              Gardens
            </CardDescription>
          </CardHeader>

          <CardContent className="text-2xl font-semibold text-neutral-800">
            {gardens.length}
          </CardContent>
        </Card>
        <Card className="w-full flex-1 shadow-md">
          <CardHeader>
            <CardDescription className="text-lg text-neutral-700">
              Following
            </CardDescription>
          </CardHeader>

          <CardContent className="text-2xl font-semibold text-neutral-800">
            0
          </CardContent>
        </Card>
      </aside>

      <main className="py-8">
        <section className="grid gap-6">
          <header className="container flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-zinc-700">
              Your gardens
            </h2>

            {isOwner && <AddNewGardenButton />}
          </header>

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

                  console.log(garden)

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
        </section>
      </main>
    </div>
  )
}
