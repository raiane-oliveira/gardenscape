"use client"

import { Button } from "@/shared/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Switch,
  toast,
} from "@/shared/ui"
import { axios, getToken, Garden } from "@/shared/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

const editGardenFormSchema = z.object({
  name: z.string(),
  private: z.boolean(),
})

type EditGardenFormData = z.infer<typeof editGardenFormSchema>

interface EditGardenDialogContentProps {
  garden: Garden
  actionAfterSubmitted?: () => void
}

export function EditGardenDialogContent({
  garden,
  actionAfterSubmitted,
}: EditGardenDialogContentProps) {
  const form = useForm({
    resolver: zodResolver(editGardenFormSchema),
    defaultValues: {
      name: garden.name ?? "",
      private: garden.visibility === "private",
    },
  })

  const { token } = getToken()

  async function onSubmit(data: EditGardenFormData) {
    try {
      await axios.put(
        `/gardens/${garden.id}`,
        {
          name: data.name,
          visibility: data.private ? "private" : "public",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      toast({
        title: "Uhul 🎉  Garden edited with successful",
        description:
          "To see the changes refresh the page or wait a few minutes.",
      })

      if (actionAfterSubmitted) {
        actionAfterSubmitted()
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof AxiosError ? err.response?.data.message : err.message

      return toast({
        title: "Oops! Something went wrong",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <DialogContent className="grid gap-4 sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit your garden</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          id="edit-garden-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Home's Garden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Private</FormLabel>
                    <FormDescription>
                      Refer to the visibility of your garden. If set to private
                      you&apos;ll be the only person able to see it.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <DialogFooter>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          form="edit-garden-form"
          className="ml-auto w-max"
        >
          Edit garden
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
