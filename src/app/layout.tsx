import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

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
