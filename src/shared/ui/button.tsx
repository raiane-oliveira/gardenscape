import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white duration-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-green-950 dark:focus-visible:ring-green-300",
  {
    variants: {
      variant: {
        default:
          "bg-green-600 text-green-50 hover:bg-green-600/90 dark:bg-green-50 dark:text-green-900 dark:hover:bg-green-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-green-100 text-green-900 hover:bg-green-100/80 dark:bg-green-800 dark:text-green-50 dark:hover:bg-green-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600 dark:hover:bg-green-800 dark:hover:text-green-50",
        link: "text-green-600 underline-offset-4 hover:underline dark:text-green-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
