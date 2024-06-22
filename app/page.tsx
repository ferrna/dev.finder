import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="">
      <div className="relative px-6 pt-2 lg:px-8">
        <div className="mx-auto max-w-2xl py-6">
          <div className="hidden sm:mt-8 sm:flex sm:justify-center">
            <Image src="/icon.png" width={200} height={200} alt="Devfinder logo" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
              Find other awesome devs to pair with online
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              A Platform to help you find other devs to pair program with, where you can
              share your screen, meet in a call, chat and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/browse"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
