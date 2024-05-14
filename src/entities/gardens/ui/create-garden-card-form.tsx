"use client"

import { useForm } from "react-hook-form"
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Switch,
  toast,
} from "@/shared/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useCreateGarden,
  CreateGardenData,
  createGardenSchema,
} from "@/entities/gardens"

interface CreateGardenCardContentProps {
  actionAfterSubmitted?: () => void
}

export function CreateGardenCardForm(props: CreateGardenCardContentProps) {
  const form = useForm<CreateGardenData>({
    resolver: zodResolver(createGardenSchema),
  })

  const { mutateAsync: createGardenFn } = useCreateGarden()

  async function onSubmit(data: CreateGardenData) {
    const result = await createGardenFn({
      name: data.name,
      private: data.private,
    })

    if (result.isLeft()) {
      return toast({
        title: "Oops! Something bad happens",
        description: result.value.message,
        variant: "destructive",
      })
    }

    form.reset()

    toast({
      title: `Uhul 🎉 You create the garden "${data.name}" with success!`,
      description:
        "Explore other gardens in the community page to see tips and become a better gardener.",
    })

    if (props.actionAfterSubmitted) {
      props.actionAfterSubmitted()
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
