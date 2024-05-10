"use client"

import { Button } from "@/shared/ui/button"
import { DropdownMenuContent } from "@/shared/ui/dropdown-menu"
import { toast } from "@/shared/ui/use-toast"
import { axios, getToken, Garden } from "@/shared/api"
import { AxiosError } from "axios"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@/shared/ui/dialog"
import { EditGardenDialogContent } from "./edit-garden-dialog-content"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

interface GardenSettingsDropdownContentProps {
  garden: Garden
}

export function GardenSettingsDropdownContent({
  garden,
}: GardenSettingsDropdownContentProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleDeleteGarden() {
    try {
      setIsLoading(() => true)
      const { token } = getToken()

      await axios.delete(`/gardens/${garden.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast({
        description: "Garden deleted with successful.",
      })
    } catch (err: any) {
      setIsLoading(() => false)
      const errorMessage =
        err instanceof AxiosError ? err.response?.data.message : err.message

      toast({
        title: "Oops! Something bad happens",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(() => false)
    }
  }

  return (
    <DropdownMenuContent className="grid gap-2 px-2 py-3" align="start">
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogTrigger className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
          Edit garden
        </DialogTrigger>

        <EditGardenDialogContent
          garden={garden}
          actionAfterSubmitted={() => setOpenEditDialog(false)}
        />
      </Dialog>

      <DropdownMenuItem>
        <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          className="w-full rounded"
          onClick={handleDeleteGarden}
        >
          Delete garden
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
