"use client"

import { Logo } from "@/shared/ui"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Avatar,
  Button,
} from "@/shared/ui"
import Link from "next/link"
import { User } from "@phosphor-icons/react/dist/ssr"
import { SignOut } from "@phosphor-icons/react"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { redirect } from "next/navigation"
import { getToken } from "@/shared/api"
import { logout } from "@/features/auth"

export function Header() {
  const { decodedToken } = getToken()

  function handleLogout() {
    logout()
    redirect("/")
  }

  return (
    <header className="container flex items-center justify-between py-8">
      <Link href="/app">
        <Logo />
      </Link>

      {!decodedToken ? (
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="lg" asChild className="text-lg">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild size="lg" className="text-lg">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900 p-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="flex flex-1 items-center justify-center self-center">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={8} className="w-56 p-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/me/${decodedToken.username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Button
              onClick={handleLogout}
              size="sm"
              className="mt-2 w-full gap-2"
              variant="destructive"
            >
              Logout <SignOut className="h-4 w-4" />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
