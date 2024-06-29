import Link from "next/link"
import {
  Plant,
  GlobeHemisphereWest,
  FlowerTulip,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/shared/ui/button"
import Image from "next/image"

import peoplePlantingIllustration from "@/assets/people-planting.png"
import plant from "@/assets/plant.png"
import { Logo } from "@/shared/ui"

export function HomePage() {
  return (
    <div>
      <header className="container relative flex justify-between gap-4 py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 -z-10 h-80 w-80 rounded-full bg-green-600/10 blur-3xl"
        />

        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="lg" asChild className="text-lg">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild size="lg" className="text-lg">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex flex-col gap-16">
        <section className="container flex items-center justify-between gap-8 pt-16">
          <div className="flex max-w-xl flex-1 flex-col gap-6">
            <h1 className="text-6xl/normal font-bold">
              <strong className="font-bold text-green-600">Your</strong>{" "}
              personal Garden{" "}
              <strong className="font-bold text-green-600">Organizer</strong>
            </h1>
            <p className="max-w-md font-medium text-zinc-400">
              Gardenscape is your ultimate companion for managing and enjoying
              your vegetable gardens. Whether you&apos;re a seasoned gardener or
              just starting out, Gardenscape provides the tools you need to
              plan, track, and share your gardening journey.
            </p>

            <Button asChild size="lg" className="mt-2 max-w-40 font-bold">
              <Link href="/sign-up">Try it out!</Link>
            </Button>
          </div>

          <div className="relative flex-1">
            <Image
              src={peoplePlantingIllustration}
              alt=""
              width={792}
              height={344}
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-b from-green-600/15 to-yellow-300/15 blur-3xl"
            />
          </div>
        </section>

        <ul className="relative mx-auto flex w-full max-w-screen-2xl flex-1 items-baseline justify-between gap-5 rounded-lg px-4 py-8">
          <li className="relative flex max-w-sm flex-col items-center gap-2">
            <Plant className="h-12 w-12" />
            <strong className="text-center text-xl font-semibold">
              Organize your garden
            </strong>

            <p className="text-center font-medium text-zinc-400">
              Create multiple gardens and organize them by name, plant type, or
              season. Easily add and manage plants within each garden plot.
            </p>
          </li>
          <li className="flex max-w-sm flex-col items-center gap-2">
            <GlobeHemisphereWest className="h-12 w-12" />
            <strong className="text-center text-xl font-semibold">
              Visualize Other Gardens
            </strong>
            <p className="text-center font-medium text-zinc-400">
              Explore gardens created by fellow users for inspiration and ideas.
              Discover what&apos;s trending in the gardening community.
            </p>
          </li>
          <li className="flex max-w-sm flex-col items-center gap-2">
            <FlowerTulip className="h-12 w-12" />
            <strong className="text-center text-xl font-semibold">
              Personalized Plant Library
            </strong>
            <p className="text-center font-medium text-zinc-400">
              Access a comprehensive database of vegetables, herbs, and fruits.
              Learn about plant care, growing seasons, and companion planting.
            </p>
          </li>
          <li className="flex max-w-sm flex-col items-center gap-2">
            <UsersThree className="h-12 w-12" />
            <strong className="text-center text-xl font-semibold">
              Community and Sharing
            </strong>
            <p className="text-center font-medium text-zinc-400">
              Connect with other gardeners. Share your garden progress, tips,
              and successes.
            </p>
          </li>
        </ul>

        <section className="container relative flex items-center justify-between">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 top-4 -z-10 h-80 w-80 rounded-full bg-yellow-300/15 blur-3xl"
          />

          <div className="-ml-14 max-h-96 max-w-96">
            <Image src={plant} alt="" />
          </div>

          <div className="flex max-w-sm flex-col gap-4">
            <h2 className="text-5xl/normal font-semibold">
              We Give the Best Service.
            </h2>

            <p className="font-medium text-zinc-400">
              Join Gardenscape and embark on a journey of growing, learning, and
              connecting with fellow gardening enthusiasts. Start by creating
              your account and bringing your virtual garden to life.
            </p>
          </div>

          <div className="ml-10 flex flex-1 items-center justify-between">
            <div className="relative flex w-full max-w-36 flex-col gap-8 py-4">
              <strong className="text-5xl font-bold text-green-600">
                100+
              </strong>

              <div
                className="absolute right-4 top-0 -z-10 h-20 w-20 rounded-full bg-green-600/30"
                aria-hidden
              />

              <span className="ml-auto block text-lg font-medium text-zinc-400">
                Loyal customers
              </span>
            </div>
            <div className="relative flex w-full max-w-32 flex-col gap-8 py-4">
              <strong className="text-5xl font-bold text-green-600">50+</strong>

              <div
                className="absolute right-5 top-0 -z-10 h-20 w-20 rounded-full bg-green-600/30"
                aria-hidden
              />

              <span className="mx-auto block text-lg font-medium text-zinc-400">
                Best Patners
              </span>
            </div>
            <div className="relative flex w-full max-w-40 flex-col gap-8 py-4">
              <strong className="text-5xl font-bold text-green-600">60+</strong>

              <div
                className="absolute right-14 top-0 -z-10 h-20 w-20 rounded-full bg-green-600/30"
                aria-hidden
              />

              <span className="block text-lg font-medium text-zinc-400">
                Awesome Teams
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
