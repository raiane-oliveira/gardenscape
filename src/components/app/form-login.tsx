"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AxiosError } from "axios"
import { toast } from "../ui/use-toast"
import { axios } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import { accessTokenCookieName } from "@/data/static-info"
import { Loader } from "../atoms/loader"

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface LoginResponse {
  access_token: string
}

export function FormLogin() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const router = useRouter()

  async function handleLogin(values: LoginFormData) {
    try {
      const { data } = await axios.post<LoginResponse>(
        "/gardeners/authenticate",
        values,
      )

      setCookie(accessTokenCookieName, data.access_token)

      router.push("/app")
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="flex w-full flex-col gap-4"
      >
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
          className="mt-2 w-full text-lg"
          size="lg"
          type="submit"
        >
          {form.formState.isLoading ? <Loader /> : "Login"}
        </Button>

        <p className="text-center font-medium text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-green-600 transition-colors hover:text-green-700"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  )
}
