import Image from "next/image"
import plantsImg from "@/assets/plants-login-page.jpg"
import { FormLogin } from "@/features/auth"

export function LoginPage() {
  return (
    <main className="flex h-screen justify-between">
      <section className="mx-auto flex h-full max-w-lg flex-1 flex-col justify-center gap-8 px-8">
        <h1 className="text-5xl font-bold">Login</h1>
        <FormLogin />
      </section>

      <div className="hidden h-full w-full max-w-[50%] md:block">
        <Image src={plantsImg} alt="" className="h-full w-full object-cover" />
      </div>
    </main>
  )
}
