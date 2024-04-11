"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { axios } from "@/lib/axios"
import { AxiosError } from "axios"
import { Loader } from "../atoms/loader"

const registerFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must has at least 6 characters."),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function FormSignUp() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  async function handleRegister(values: RegisterFormData) {
    try {
      await axios.post("/gardeners/register", {
        ...values,
      })

      router.push("/login")
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          title: "Oops! Something went wrong",
          description: err.response?.data.message ?? err.response,
          variant: "destructive",
        })
      }

      const error = err as Error

      toast({
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isLoading}
          className="mt-4 w-full text-lg"
          size="lg"
          type="submit"
        >
          {form.formState.isLoading ? <Loader /> : "Submit"}
        </Button>

        <p className="text-center font-medium text-zinc-400">
          Have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 transition-colors hover:text-green-700"
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  )
}
