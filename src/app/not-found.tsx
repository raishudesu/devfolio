import Image from "next/image";
import Link from "next/link";
import notFound from "../assets/images/not-found.svg";
import { textAnimation } from "@/components/landing-page/hero";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="px-2 mt-6 flex flex-col gap-4 max-w-screen-xl">
        <h2
          className={`text-center mt-12 scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 ${textAnimation}`}
        >
          Resource not found.
        </h2>
        <p className="text-lg leading-normal dark:text-muted-foreground [&:not(:first-child)]:mt-6 text-center light:text-zinc-900">
          What you&lsquo;re looking for does not exist, yet?
        </p>
        <Image src={notFound} alt="rocket" className="w-full max-w-lg" />
        <Link href="/" className="hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
