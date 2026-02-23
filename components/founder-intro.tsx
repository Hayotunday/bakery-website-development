import Image from "next/image";
import Link from "next/link";

export function FounderIntro() {
  return (
    <section className="bg-stone-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-accent">
                A Passion for Baking & Business
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Meet Our Founder
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Hi, I am Mojisola Olawale. I am a passionate certified baker and
                business coach dedicated to helping people create success in
                baking and in business.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                As a baker, I craft delicious, beautifully designed cakes that
                make every celebration special. As a business coach, I help
                individuals turn their skills and gifts into profitable ventures
                with clarity, strategy, and confidence.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                I don’t just bake and build businesses — I help others do the
                same.
              </p>
              <div className="mt-10">
                <Link
                  href="/about"
                  className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Learn more about us
                </Link>
              </div>
            </div>
          </div>
          <Image
            src="/imgs/founder-2.jpeg"
            alt="Mojisola Olawale, founder and certified baker."
            className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={1974}
            height={1316}
            priority
          />
        </div>
      </div>
    </section>
  );
}
