import Link from "next/link";
import {
  PottedPlant,
  Plant,
  GlobeHemisphereWest,
  FlowerTulip,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import peoplePlantingIllustration from "@/assets/people-planting.png";
import plant from "@/assets/plant.png";

export default function home() {
  return (
    <div>
      <header className="flex relative container justify-between gap-4 py-8">
        <div
          aria-hidden
          className="blur-3xl pointer-events-none absolute -top-8 -left-8 bg-green-600/10 w-80 h-80 rounded-full -z-10"
        />

        <Link href="/" className="flex items-center gap-1">
          <PottedPlant weight="fill" className="w-12 h-12 text-green-600" />
          <span className="pt-1.5 text-3xl font-semibold">Gardenscape</span>
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
        <section className="flex pt-16 container items-center gap-8 justify-between">
          <div className="flex flex-col gap-6 max-w-xl flex-1">
            <h1 className="font-bold text-6xl/normal">
              <strong className="font-bold text-green-600">Your</strong>{" "}
              personal Garden{" "}
              <strong className="font-bold text-green-600">Organizer</strong>
            </h1>
            <p className="text-zinc-400 font-medium max-w-md">
              Gardenscape is your ultimate companion for managing and enjoying
              your vegetable gardens. Whether you&apos;re a seasoned gardener or
              just starting out, Gardenscape provides the tools you need to
              plan, track, and share your gardening journey.
            </p>

            <Button asChild size="lg" className="max-w-40 mt-2 font-bold">
              <Link href="/sign-up">Try it out!</Link>
            </Button>
          </div>

          <div className="flex-1 relative">
            <Image
              src={peoplePlantingIllustration}
              alt=""
              width={792}
              height={344}
            />
            <div
              aria-hidden
              className="blur-3xl pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-b from-green-600/15 to-yellow-300/15 -z-10 w-96 h-96 rounded-full"
            />
          </div>
        </section>

        <ul className="flex gap-5 max-w-screen-2xl px-4 mx-auto flex-1 items-baseline relative justify-between w-full rounded-lg py-8">
          <li className="flex flex-col max-w-sm relative items-center gap-2">
            <Plant className="w-12 h-12" />
            <strong className="font-semibold text-xl text-center">
              Organize your garden
            </strong>

            <p className="text-zinc-400 text-center font-medium">
              Create multiple gardens and organize them by name, plant type, or
              season. Easily add and manage plants within each garden plot.
            </p>
          </li>
          <li className="flex max-w-sm flex-col items-center gap-2">
            <GlobeHemisphereWest className="w-12 h-12" />
            <strong className="font-semibold text-xl text-center">
              Visualize Other Gardens
            </strong>
            <p className="text-zinc-400 text-center font-medium">
              Explore gardens created by fellow users for inspiration and ideas.
              Discover what&apos;s trending in the gardening community.
            </p>
          </li>
          <li className="flex flex-col max-w-sm items-center gap-2">
            <FlowerTulip className="w-12 h-12" />
            <strong className="font-semibold text-xl text-center">
              Personalized Plant Library
            </strong>
            <p className="text-zinc-400 text-center font-medium">
              Access a comprehensive database of vegetables, herbs, and fruits.
              Learn about plant care, growing seasons, and companion planting.
            </p>
          </li>
          <li className="flex flex-col items-center max-w-sm gap-2">
            <UsersThree className="w-12 h-12" />
            <strong className="font-semibold text-xl text-center">
              Community and Sharing
            </strong>
            <p className="text-zinc-400 text-center font-medium">
              Connect with other gardeners. Share your garden progress, tips,
              and successes.
            </p>
          </li>
        </ul>

        <section className="flex relative container items-center justify-between">
          <div
            aria-hidden
            className="blur-3xl pointer-events-none absolute top-4 -left-12 bg-yellow-300/15 -z-10 w-80 h-80 rounded-full"
          />

          <div className="max-w-96 max-h-96 -ml-14">
            <Image src={plant} alt="" />
          </div>

          <div className="flex flex-col max-w-sm gap-4">
            <h2 className="font-semibold text-5xl/normal">
              We Give the Best Service.
            </h2>

            <p className="text-zinc-400 font-medium">
              Join Gardenscape and embark on a journey of growing, learning, and
              connecting with fellow gardening enthusiasts. Start by creating
              your account and bringing your virtual garden to life.
            </p>
          </div>

          <div className="flex items-center justify-between flex-1 ml-10">
            <div className="relative py-4 flex flex-col gap-8 max-w-36 w-full">
              <strong className="font-bold text-green-600 text-5xl">
                100+
              </strong>

              <div
                className="rounded-full -z-10 absolute top-0 right-4 bg-green-600/30 w-20 h-20"
                aria-hidden
              />

              <span className="text-zinc-400 block ml-auto font-medium text-lg">
                Loyal customers
              </span>
            </div>
            <div className="relative py-4 flex flex-col gap-8 max-w-32 w-full">
              <strong className="font-bold text-green-600 text-5xl">50+</strong>

              <div
                className="rounded-full -z-10 absolute top-0 right-5 bg-green-600/30 w-20 h-20"
                aria-hidden
              />

              <span className="text-zinc-400 block mx-auto font-medium text-lg">
                Best Patners
              </span>
            </div>
            <div className="relative py-4 flex flex-col gap-8 max-w-40 w-full">
              <strong className="font-bold text-green-600 text-5xl">60+</strong>

              <div
                className="rounded-full -z-10 absolute top-0 right-14 bg-green-600/30 w-20 h-20"
                aria-hidden
              />

              <span className="text-zinc-400 block text-lg font-medium">
                Awesome Teams
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
