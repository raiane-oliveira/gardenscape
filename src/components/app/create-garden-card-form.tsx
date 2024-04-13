"use client"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Switch } from "../ui/switch"
import { toast } from "../ui/use-toast"
import { AxiosError } from "axios"
import { axios } from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getToken } from "@/utils/get-token"

const createGardenFormSchema = z.object({
  name: z.string(),
  private: z.boolean().default(false),
})

type CreateGardenFormData = z.infer<typeof createGardenFormSchema>

interface CreateGardenCardContentProps {
  actionAfterSubmitted?: () => void
}

export function CreateGardenCardForm(props: CreateGardenCardContentProps) {
  const form = useForm<CreateGardenFormData>({
    resolver: zodResolver(createGardenFormSchema),
  })

  const queryClient = useQueryClient()

  const { decodedToken: user, token } = getToken()

  const { mutateAsync: createGardenFn } = useMutation({
    mutationKey: ["gardens", user?.sub],
    mutationFn: async (data: CreateGardenFormData) => {
      const { data: body } = await axios.post(
        "/gardens",
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

      return body
    },
    onSuccess(data) {
      queryClient.setQueryData(["gardens", user?.sub], (cached: any) => {
        cached.gardens.unshift(data.garden)

        return {
          gardens: cached.gardens,
        }
      })
    },
  })

  async function onSubmit(data: CreateGardenFormData) {
    try {
      await createGardenFn({
        name: data.name,
        private: data.private,
      })

      form.reset()

      toast({
        title: `Uhul 🎉 You create the garden "${data.name}" with success!`,
        description:
          "Explore other gardens in the community page to see tips and become a better gardener.",
      })

      if (props.actionAfterSubmitted) {
        props.actionAfterSubmitted()
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof AxiosError ? err.response?.data.message : err.message

      toast({
        title: "Oops! Something bad happens",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid gap-4">
      <DialogHeader>
        <DialogTitle className="text-xl">Create new garden</DialogTitle>
        <DialogDescription>
          Give a name to your new garden and start planting today!
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          id="create-garden-form"
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
          form="create-garden-form"
          className="ml-auto w-max"
        >
          Create garden
        </Button>
      </DialogFooter>
    </div>
  )
}
