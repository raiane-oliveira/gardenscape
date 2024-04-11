import Image from "next/image"
import plantsImg from "@/assets/plants-sign-up-page.jpg"
import { FormSignUp } from "@/components/app/form-sign-up"

export default function SignUpPage() {
  return (
    <main className="flex h-screen justify-between gap-8">
      <section className="mx-auto flex h-full max-w-lg flex-1 flex-col justify-center gap-8">
        <h1 className="text-5xl font-bold">Get started now</h1>
        <FormSignUp />
      </section>

      <div className="h-full w-full max-w-[50%]">
        <Image src={plantsImg} alt="" className="h-full w-full object-cover" />
      </div>
    </main>
  )
}
