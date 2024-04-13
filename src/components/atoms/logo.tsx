import { PottedPlant } from "@phosphor-icons/react/dist/ssr"

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <PottedPlant weight="fill" className="h-12 w-12 text-green-600" />
      <span className="pt-1.5 text-3xl font-semibold">Gardenscape</span>
    </div>
  )
}
