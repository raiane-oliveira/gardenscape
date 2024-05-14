"use client"

import { CurrentUserContext, useGetCurrentUser } from "@/entities/user"
import { ChildrenProps } from "@/shared/lib"
import { toast } from "@/shared/ui"

export function CurrentUserProvider({ children }: ChildrenProps) {
  const query = useGetCurrentUser()

  if (query.data?.isLeft()) {
    toast({
      title: "Ops, something bad happens",
      description: "We were unable to retrieve your profile data.",
      variant: "destructive",
    })
  }

  return (
    <CurrentUserContext.Provider value={{ query }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
