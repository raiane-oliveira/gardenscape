"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateGardenCardForm } from "@/components/app/create-garden-card-form"
import { useState } from "react"
import { ChildrenProps } from "@/core/types/children-props"
import { toast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"
import { axios } from "@/lib/axios"
import { getCookie } from "cookies-next"
import { accessTokenCookieName } from "@/data/static-info"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import { Token } from "@/core/types/token"
import { jwtDecode } from "jwt-decode"
import { useQuery } from "@tanstack/react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Garden } from "@/core/types/api-interfaces"

interface CreateGardenFormProps extends ChildrenProps {
  plant: {
    id: number
    imageUrl?: string | null
  }
}

const chooseGardenToPlantSchema = z.object({
  gardens: z.array(
    z.object({
      gardenId: z.string(),
    }),
  ),
})

type ChooseGardenToPlantFormData = z.infer<typeof chooseGardenToPlantSchema>

export function ChooseGardenToPlantForm({
  children,
  plant,
}: CreateGardenFormProps) {
  const [open, setOpen] = useState(false)
  const [openCreateGarden, setOpenCreateGarden] = useState(false)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChooseGardenToPlantFormData>({
    resolver: zodResolver(chooseGardenToPlantSchema),
  })

  const { fields, append } = useFieldArray({
    control,
    name: "gardens",
  })

  const token = getCookie(accessTokenCookieName)
  const decodedToken: Token = jwtDecode(token ?? "")

  const { data, isLoading } = useQuery({
    queryKey: ["gardens", decodedToken.sub],
    queryFn: async () => {
      const { data } = await axios.get("/user/gardens", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return data
    },
  })

  const gardens: Garden[] = isLoading ? [] : data.gardens

  const toggleOpenCreateGarden = () => setOpenCreateGarden((state) => !state)

  async function handlePlantOnGarden({ gardens }: ChooseGardenToPlantFormData) {
    try {
      const accessToken = getCookie(accessTokenCookieName)

      const plantOnGardens = gardens.map((garden) => {
        return axios.post(
          `/gardens/${garden.gardenId}/plant`,
          {
            plantId: plant.id,
            plantUrl: plant.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
      })

      await Promise.all(plantOnGardens)

      setOpen(() => false)
      toast({
        title: `Uhul 🎉 You plant with success!`,
        description: "Keep adding plants to grow your garden.",
      })
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

  function toggleAddGardenToForm(checked: boolean, gardenId: string) {
    if (checked) {
      append({
        gardenId,
      })
    } else {
      const newValues = fields.filter((field) => field.gardenId !== gardenId)
      setValue("gardens", newValues)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        setOpenCreateGarden(false)
      }}
    >
      {children}

      <DialogContent className="sm:max-w-lg">
        {!openCreateGarden ? (
          <>
            <div className="w-full space-y-4">
              <DialogHeader>
                <DialogTitle className="text-left text-xl">
                  Select the garden
                </DialogTitle>
                <DialogDescription className="text-left">
                  In which garden(s) do you want to plant today?
                </DialogDescription>
              </DialogHeader>

              {gardens.length > 0 && (
                <form
                  id="plant-on-garden-form"
                  onSubmit={handleSubmit(handlePlantOnGarden)}
                  className="custom-scrollbar max-h-80 min-h-32 space-y-2 overflow-auto"
                >
                  {isLoading ? (
                    <>
                      <div className="h-14 w-full animate-pulse rounded-lg bg-zinc-200" />
                      <div className="h-14 w-full animate-pulse rounded-lg bg-zinc-200" />
                      <div className="h-14 w-full animate-pulse rounded-lg bg-zinc-200" />
                    </>
                  ) : (
                    gardens.map((garden) => {
                      return (
                        <label
                          key={garden.id}
                          className="flex flex-row items-center justify-between rounded-lg border p-4"
                        >
                          <div className="space-y-0.5">
                            <span className="text-base">{garden.name}</span>
                          </div>

                          <Checkbox
                            onCheckedChange={(checked: CheckedState) => {
                              if (typeof checked === "boolean") {
                                toggleAddGardenToForm(checked, garden.id)
                              }
                            }}
                          />
                        </label>
                      )
                    })
                  )}
                </form>
              )}

              {gardens.length === 0 ? (
                <p className="py-6 text-center text-sm text-neutral-500">
                  It seems you don&apos;t have any garden yet.
                </p>
              ) : (
                <DialogFooter>
                  <Button
                    form="plant-on-garden-form"
                    type="submit"
                    disabled={isLoading || fields.length === 0 || isSubmitting}
                    className="w-full disabled:animate-pulse"
                  >
                    Plant
                  </Button>
                </DialogFooter>
              )}
            </div>

            <Button
              variant={gardens.length > 0 ? "ghost" : "default"}
              onClick={toggleOpenCreateGarden}
            >
              Add new garden
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              onClick={toggleOpenCreateGarden}
              variant="outline"
              className="absolute bottom-6 left-6"
            >
              <ArrowLeft />
            </Button>

            <CreateGardenCardForm
              actionAfterSubmitted={toggleOpenCreateGarden}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
