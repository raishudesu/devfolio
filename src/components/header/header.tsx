import React from "react";
import ModeToggle from "./mode-toggle";
import MobileSheet from "./mobile-sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInButtons from "./sign-in-buttons";
import NavMenu from "./nav-menu";
import UserMenu from "./user-menu";
import Link from "next/link";
import { Input } from "../ui/input";
import { textAnimation } from "@/components/landing-page/hero";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-center h-20 shadow-md">
      <div className="px-2 w-full max-w-screen-xl flex items-center justify-between">
        <div className="flex gap-4 md:gap-12 items-center">
          <div className="md:hidden">
            <MobileSheet />
          </div>
          <div className="flex gap-1 items-center">
            <Link
              href={"/"}
              className={`text-lg leading-none font-bold ${textAnimation}`}
            >
              ✨devfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <NavMenu className="flex gap-2" />
          </div>
        </div>

        <div className=" flex gap-2 items-center">
          <div className="hidden md:flex">
            <Input className="p-6 rounded-full" placeholder="🔎 Search..." />
          </div>
          {session ? null : <SignInButtons />}
          <UserMenu />
          <div className="hidden md:flex">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
