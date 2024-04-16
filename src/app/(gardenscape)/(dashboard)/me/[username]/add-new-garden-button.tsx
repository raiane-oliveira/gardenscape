"use client"

import { CreateGardenCardForm } from "@/components/app/create-garden-card-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

export function AddNewGardenButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add garden</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <CreateGardenCardForm actionAfterSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
