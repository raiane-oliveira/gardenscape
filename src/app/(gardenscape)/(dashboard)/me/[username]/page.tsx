import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { GardenerDetails } from "@/core/types/api-interfaces"
import { get } from "@/utils/get-api"
import { PageProps } from "../../../../../../.next/types/app/layout"
import { getToken } from "@/utils/get-token"
import { cookies } from "next/headers"
import Link from "next/link"
import { Gear } from "@phosphor-icons/react/dist/ssr"

interface MePageProps extends PageProps {
  params: {
    username: string
  }
}

export default async function MePage({ params }: MePageProps) {
  const username = params.username
  const { decodedToken } = getToken("server", cookies())

  const response = await get(`/gardeners/${username}`)
  const data: { gardener: GardenerDetails } = await response.json()

  const { gardener } = data

  return (
    <div>
      <div className="bg-yellow-300/30">
        <header className="container flex h-80 items-end gap-6 py-8">
          <div className="h-40 w-40 overflow-hidden rounded border border-neutral-400 bg-neutral-200 shadow-md">
            {/* IMAGE GOES HERE */}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold">{gardener.name}</h1>

            <div className="flex items-center gap-5">
              <span className="text-lg text-neutral-500">
                {gardener.username}
              </span>
              <span className="text-lg text-neutral-500">
                {gardener.createdAt.toLocaleString()}
              </span>
            </div>
          </div>

          {decodedToken && username === decodedToken.username && (
            <Link
              href="/settings/account"
              className="group ml-auto text-neutral-500 hover:text-neutral-900"
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
            24
          </CardContent>
        </Card>
        <Card className="w-full flex-1 shadow-md">
          <CardHeader>
            <CardDescription className="text-lg text-neutral-700">
              Gardens
            </CardDescription>
          </CardHeader>

          <CardContent className="text-2xl font-semibold text-neutral-800">
            {gardener.gardens.length}
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
    </div>
  )
}
