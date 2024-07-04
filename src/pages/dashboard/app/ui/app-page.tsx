import Image from "next/image"
import plant from "@/assets/plant.png"
import { DashboardContent } from "./dashboard-content"
import { Suspense } from "react"
import { LoadingDashboardContent } from "./loading-dashboard-content"
import { SearchPlantsForm } from "@/features/search-plants"
import { BillingPlansGrid } from "@/widgets/dashboard"

export async function AppPage({ searchParams }: { searchParams: string }) {
  console.log("search params", searchParams)
  return (
    <main className="space-y-12 pb-8">
      <header className="container space-y-6">
        <SearchPlantsForm />

        <section className="relative flex w-full justify-between overflow-hidden rounded-lg bg-green-600 p-8 drop-shadow-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-12 z-0 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl"
          />

          <div className="relative z-10 max-w-lg space-y-6">
            <h1 className="text-5xl font-bold text-white">
              Gardenscape: Your Personal Garden Organizer
            </h1>
            <p className="text-lg font-medium text-zinc-100">
              Discover inspiring gardens shared by fellow gardening enthusiasts
              in the Gardenscape community. Explore different garden styles,
              plant varieties, and gardening techniques to spark creativity for
              your own garden projects.
            </p>
          </div>

          <div className="max-w-sm">
            <Image src={plant} alt="" className="h-full w-full" />
          </div>
        </section>
      </header>

      <Suspense fallback={<LoadingDashboardContent />}>
        <DashboardContent />
      </Suspense>

      <section className="container mx-auto grid w-full gap-6">
        <header className="container flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold text-zinc-700">
            Unlock new powers subscribing in our plans!
          </h2>

          <p className="mx-auto max-w-md text-center font-medium text-zinc-400">
            Subscribe in our plans and unlock new features like{" "}
            <strong>schedule timers to water your gardens</strong>, and much
            more!
          </p>
        </header>

        <BillingPlansGrid />
      </section>
    </main>
  )
}
