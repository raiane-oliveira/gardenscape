import { Skeleton } from "@/shared/ui"

export function ProfileSkeletonPage() {
  return (
    <div className="space-y-10 pb-20">
      <Skeleton className="flex h-80 items-end gap-6 px-6 py-8">
        <Skeleton className="h-40 w-40 bg-neutral-200" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-60 bg-neutral-200" />
          <div className="flex w-80 gap-4">
            <Skeleton className="h-6 w-full bg-neutral-200" />
            <Skeleton className="h-6 w-full bg-neutral-200" />
          </div>
        </div>
      </Skeleton>

      <div className="container flex w-full justify-between gap-10">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>

      <div className="half-container ml-auto flex flex-col gap-6 pr-0 pt-6">
        <Skeleton className="h-8 w-20" />

        <div className="flex w-full gap-5 overflow-hidden">
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
          <Skeleton className="h-72 w-[19rem] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
