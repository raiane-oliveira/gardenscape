import { Skeleton } from "@/components/ui/skeleton"

export function LoadingDashboardContent() {
  const amountSkeleton = Array.from({ length: 8 }).map((_, index) => index)
  return (
    <>
      <section className="half-container ml-auto flex gap-4 overflow-hidden">
        {amountSkeleton.map((skeleton) => (
          <Skeleton
            key={skeleton}
            className="h-56 w-80 flex-shrink-0 bg-neutral-300"
          />
        ))}
      </section>

      <section className="half-container ml-auto flex gap-4 overflow-hidden">
        {amountSkeleton.map((skeleton) => (
          <Skeleton
            key={skeleton}
            className="h-56 w-80 flex-shrink-0 bg-neutral-300"
          />
        ))}
      </section>
    </>
  )
}
