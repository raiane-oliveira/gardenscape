import "@/shared/config/dayjs"
import "./styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/shared/lib"
import { Toaster } from "@/shared/ui"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    template: "%s | Gardenscape",
    default: "Gardenscape | The place to organize your gardens",
  },
  description: "Organize your plants. Try Gardenscape!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={cn("min-h-screen font-sans antialiased", inter.variable)}
      >
        {children}

        <Toaster />
      </body>
    </html>
  )
}
