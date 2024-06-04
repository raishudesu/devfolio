import React from "react";
import ModeToggle from "./mode-toggle";
import MobileSheet from "./mobile-sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInButtons from "./sign-in-buttons";
import NavMenu from "./nav-menu";
import UserMenu from "./user-menu";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import { Pacifico, Rubik } from "next/font/google";
import Link from "next/link";
import { Input } from "../ui/input";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-center h-20 shadow-md">
      <div className="px-2 w-full max-w-screen-2xl flex items-center justify-between">
        <div className="flex gap-4 md:gap-12 items-center">
          <div className="md:hidden">
            <MobileSheet />
          </div>
          <div className="flex gap-1 items-center">
            <Link href={"/"} className={`text-2xl ${pacifico.className}`}>
              Devfolio
            </Link>

            <Image src={logo} alt="devfolio logo" width={30} height={30} />
          </div>
          <div className="hidden md:block">
            <NavMenu className="flex gap-2" />
          </div>
        </div>

        <div className="hidden md:flex gap-2 items-center">
          <div>
            <Input className="p-6 rounded-full" placeholder="🔎 Search..." />
          </div>
          {session ? null : <SignInButtons />}
          <UserMenu />
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
