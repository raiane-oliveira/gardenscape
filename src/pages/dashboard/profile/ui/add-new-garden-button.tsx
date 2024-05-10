"use client"

import { CreateGardenCardForm } from "@/entities/gardens"
import { Dialog, DialogContent, DialogTrigger, Button } from "@/shared/ui"
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
