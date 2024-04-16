"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MagnifyingGlass, Sliders } from "@phosphor-icons/react/dist/ssr"

export function SearchPlantsForm() {
  return (
    <div className="flex justify-end gap-3">
      <form className="relative flex items-center">
        <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-green-600" />
        <Input
          placeholder="Search..."
          className="w-full rounded-lg border-0 bg-zinc-100 py-6 pl-11 text-lg"
        />
      </form>

      <Button
        className="h-12 w-12 bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
        size="icon"
      >
        <Sliders className="h-6 w-6 rotate-90" />
      </Button>
    </div>
  )
}
