"use client"

import { EditAvatarImageContent } from "@/components/app/edit-avatar-image-content"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Camera, User } from "@phosphor-icons/react"
import Image from "next/image"
import { useState } from "react"

interface AvatarImageProps {
  url: string | null
}

export function AvatarImage({ url }: AvatarImageProps) {
  const [open, setOpen] = useState(false)

  function handleAfterFileSubmitted() {
    setOpen(false)

    toast({
      title: "Profile picture changed successfully",
      description: "To see the change, reload the page or wait a few moments.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          data-image={Boolean(url)}
          className="group relative grid h-40 w-40 place-content-center overflow-hidden rounded border border-neutral-400 bg-neutral-50 shadow-md before:pointer-events-none before:absolute before:inset-0 before:block before:bg-black/30 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 data-[image='true']:block"
        >
          {url ? (
            <Image
              src={url}
              alt=""
              className="h-full w-full object-cover"
              width={200}
              height={200}
              quality={100}
            />
          ) : (
            <User className="h-12 w-12 text-neutral-700 transition-all duration-300 group-hover:invisible group-hover:h-0 group-hover:opacity-0" />
          )}

          <Camera className="pointer-events-none invisible absolute left-1/2 top-1/2 h-0 w-12 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-all duration-300 group-hover:visible group-hover:h-12 group-hover:opacity-100" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <EditAvatarImageContent
          actionAfterSubmitted={handleAfterFileSubmitted}
        />
      </DialogContent>
    </Dialog>
  )
}
