import { CircleNotch, IconProps } from "@phosphor-icons/react"
import { twMerge } from "tailwind-merge"

interface LoaderProps extends IconProps {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <CircleNotch
      {...props}
      className={twMerge("h-6 w-6 animate-spin text-white", className)}
    />
  )
}
