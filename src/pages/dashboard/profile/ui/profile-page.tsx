"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/shared/ui"
import { getToken } from "@/shared/api"
import { Gear, User } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { AddNewGardenButton } from "./add-new-garden-button"
import { AvatarImage } from "./avatar-image"
import { useCurrentUser } from "@/entities/user"
import { useUserGardens } from "@/entities/gardens"
import { ErrorPage } from "@/pages/error"
import { GardensCarousel } from "./gardens-carousel"
import { ProfileSkeletonPage } from "@/pages/skeletons"

export interface ProfilePageProps {
  params: {
    username: string
  }
}

export function ProfilePage({ params }: ProfilePageProps) {
  const username = params.username
  const { decodedToken } = getToken()

  const { query: gardenerQuery } = useCurrentUser()

  const queryGardens = useUserGardens()

  if (gardenerQuery.isLoading || queryGardens.isLoading) {
    return <ProfileSkeletonPage />
  }

  const gardener = gardenerQuery.data?.isRight()
    ? gardenerQuery.data?.value.gardener
    : null

  const gardens = gardenerQuery.data?.isRight()
    ? queryGardens.data?.gardens
    : null

  if (!gardener || !gardens) {
    return <ErrorPage />
  }

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

      <main className="space-y-8 py-8">
        <section className="grid gap-6">
          <header className="container flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-zinc-700">
              Your gardens
            </h2>

            {isOwner && <AddNewGardenButton />}
          </header>

          <GardensCarousel isOwner={isOwner} gardens={gardens} />
        </section>
      </main>
    </div>
  )
}
