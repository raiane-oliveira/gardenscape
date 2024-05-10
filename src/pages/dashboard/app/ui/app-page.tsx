import Image from "next/image"
import plant from "@/assets/plant.png"
import { DashboardContent } from "./dashboard-content"
import { Suspense } from "react"
import { LoadingDashboardContent } from "./loading-dashboard-content"
import { SearchPlantsForm } from "@/features/search-plants"

export function AppPage() {
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
    </main>
  )
}
