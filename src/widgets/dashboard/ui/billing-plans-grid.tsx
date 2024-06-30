"use client"

import { useFetchProducts } from "@/features/fetch-products"
import { Button, Skeleton } from "@/shared/ui"
import Link from "next/link"

const subscriptionOrders = {
  free: 1,
  recommended: 2,
  normal: 3,
}

interface BillingPlansGridProps {
  asLink?: {
    href: string
  }
}

export function BillingPlansGrid({ asLink }: BillingPlansGridProps) {
  const { data, isLoading } = useFetchProducts()

  const subscriptions = data?.products.sort((a, b) => {
    const firstStatus = a.status ?? ""
    const secondStatus = b.status ?? ""

    return (
      subscriptionOrders[firstStatus as keyof typeof subscriptionOrders] -
      subscriptionOrders[secondStatus as keyof typeof subscriptionOrders]
    )
  })

  if (isLoading) {
    return (
      <div className="mx-auto mt-6 flex gap-6">
        <Skeleton className="h-96 w-80" />
        <Skeleton className="h-96 w-80" />
        <Skeleton className="h-96 w-80" />
      </div>
    )
  }

  return (
    <div className="mx-auto mt-6 flex gap-6">
      {subscriptions?.map((product) => {
        return (
          <div
            key={product.id}
            data-status={product.status}
            className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white px-6 py-8 data-[status=recommended]:scale-110"
          >
            <header className="space-y-3">
              <h3 className="text-xl font-semibold">{product.name}</h3>

              <div className="flex items-center gap-1">
                <strong className="text-3xl">${product.price}</strong>

                <p className="text-sm text-zinc-600">per month</p>
              </div>

              <p className="text-zinc-600">{product.description}</p>

              {asLink ? (
                <Button className="w-full uppercase" asChild>
                  <Link href={asLink.href}>Get started</Link>
                </Button>
              ) : (
                <Button className="w-full uppercase">Get started</Button>
              )}
              {/* <Button className="w-full uppercase" asChild variant="outline"> */}
              {/*   <div>Current plan</div> */}
              {/* </Button> */}
            </header>

            <hr />

            <main className="space-y-3">
              <span className="text-lg font-semibold">Features</span>

              <ul className="ml-4 flex list-disc flex-col">
                {product.features.map((feature) => {
                  return <li key={feature.id}>{feature.name}</li>
                })}
              </ul>
            </main>
          </div>
        )
      })}
    </div>
  )
}
