import { SubscriptionWithDetails, get, getToken } from "@/shared/api"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/shared/ui"
import { cookies } from "next/headers"

export async function SettingsPage() {
  const { decodedToken: user, token } = getToken("server", cookies())

  const response = await get(`/subscriptions/${user?.sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  const data: {
    subscriptions: SubscriptionWithDetails[]
  } = await response.json()

  return (
    <div className="">
      <div className="bg-green-300/30">
        <header className="container flex h-80 items-end gap-6 py-8">
          <h1 className="text-4xl font-semibold">Settings</h1>
        </header>
      </div>

      <main className="container space-y-8 py-8">
        <section className="grid gap-6">
          <header className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-zinc-700">
              Subscriptions
            </h2>
          </header>

          <div className="flex flex-col gap-4">
            {data.subscriptions.map((subscription) => {
              return (
                <Card key={subscription.id} className="w-full flex-1 shadow-md">
                  <CardHeader>
                    <CardTitle>{subscription.product.name}</CardTitle>
                    <CardDescription className="text-lg text-neutral-700">
                      {subscription.active ? "Active" : "Canceled"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="text-2xl font-semibold text-neutral-800">
                    ${subscription.product.price}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
