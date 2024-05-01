"use client"

import {
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { UploadCloud } from "lucide-react"
import { useMemo, useState } from "react"
import { User } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { axios } from "@/lib/axios"
import { getToken } from "@/utils/get-token"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"
import { Loader } from "../atoms/loader"

const MAX_SIZE_FILE = 1024 * 1024 * 5 // 5mb
const ALLOWED_MIMETYPES = ["image/jpg", "image/png", "image/jpeg"]

interface EditAvatarImageContentProps {
  actionAfterSubmitted?: () => void
}

export function EditAvatarImageContent(props: EditAvatarImageContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState({
    message: "",
  })
  const [file, setFile] = useState<File | null | undefined>(null)

  const { decodedToken: user, token } = getToken()

  async function handleUploadAvatar() {
    if (!file) return

    if (!ALLOWED_MIMETYPES.includes(file.type)) {
      return setError({
        message: "File type not allowed.",
      })
    }

    if (file.size > MAX_SIZE_FILE) {
      return setError({
        message: "The image size is too big.",
      })
    }

    try {
      const fileForm = new FormData()
      fileForm.append("file", file)

      setIsSubmitting(() => true)

      await axios.post(`/gardeners/${user?.username}/upload-avatar`, fileForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setFile(null)
      setIsSubmitting(() => false)

      if (props.actionAfterSubmitted) {
        props.actionAfterSubmitted()
      }
    } catch (err) {
      setIsSubmitting(() => false)
      if (err instanceof AxiosError) {
        toast({
          title: "Oops, something bad happens.",
          description: err.response?.data.message,
          variant: "destructive",
        })
      }
    }
  }

  const previewURL = useMemo(() => {
    if (!file) return null

    return URL.createObjectURL(file)
  }, [file])

  return (
    <div className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Upload your avatar image</DialogTitle>
        <DialogDescription>
          This will be displayed on your profile.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2">
        <div className="flex gap-4">
          {previewURL === null ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
              <User className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
          ) : (
            <Image
              src={previewURL}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
              width={64}
              height={64}
            />
          )}

          <label
            htmlFor="avatar-input"
            className="group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-600 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-green-300"
          >
            <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 transition-colors group-hover:border-green-50 group-hover:bg-green-100 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:border-zinc-600 dark:group-hover:bg-zinc-700">
              <UploadCloud className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-green-600 dark:text-zinc-500 dark:group-hover:text-green-300" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">
                <span className="font-semibold text-green-700 dark:text-green-300">
                  Click to upload
                </span>{" "}
                or drag and drop
              </span>
              <span className="text-xs">PNG, JPG or JPEG (max. 800x400px)</span>
            </div>
          </label>

          <Input
            type="file"
            id="avatar-input"
            className="sr-only"
            accept=".png,.jpg,.jpeg"
            onChange={(e) =>
              setFile(e.target?.files ? e.target.files[0] : null)
            }
          />
        </div>

        {error.message && (
          <p className="text-sm text-red-600">{error.message}</p>
        )}
      </div>

      <DialogFooter>
        <Button
          form="edit-avatar-image-form"
          className="w-full"
          disabled={isSubmitting}
          onClick={handleUploadAvatar}
        >
          {isSubmitting ? <Loader /> : "Upload"}
        </Button>
      </DialogFooter>
    </div>
  )
}
