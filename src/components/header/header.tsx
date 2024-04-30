import React from "react";
import ModeToggle from "../mode-toggle";
import MobileSheet from "../mobile-sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "../sign-out-button";
import SignInButtons from "../sign-in-buttons";
import NavMenu from "./nav-menu";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-center h-20 shadow-md">
      <div className="px-2 w-full max-w-screen-xl flex items-center justify-between">
        <div className="flex gap-4 md:gap-12 items-center">
          <div className="md:hidden">
            <MobileSheet />
          </div>
          <div className="font-semibold text-md">Devfolio</div>
          <div className="hidden md:block">
            <NavMenu />
          </div>
        </div>

        <div className="hidden md:flex gap-2 items-center">
          {session ? <SignOutButton /> : <SignInButtons />}
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
