"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Button,
  toast,
  Loader,
} from "@/shared/ui"
import { useRouter } from "next/navigation"
import { login } from "@/features/auth"

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function FormLogin() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const router = useRouter()

  async function handleLogin(values: LoginFormData) {
    const result = await login(values)

    if (result.isLeft()) {
      return toast({
        title: "Oops! Something went wrong",
        description: result.value.message,
        variant: "destructive",
      })
    }

    router.push("/app")
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
