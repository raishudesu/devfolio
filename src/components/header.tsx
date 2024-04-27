import React from "react";
import ModeToggle from "./mode-toggle";
import MobileSheet from "./mobile-sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./sign-out-button";
import SignInButtons from "./sign-in-buttons";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex justify-evenly items-center h-20 shadow-md">
      <nav className="hidden md:block">
        <ul className="flex gap-4 font-semibold text-sm">
          <li>Find developers</li>
          <li>Inspiration</li>
          <li>Jobs</li>
        </ul>
      </nav>
      <div className="md:hidden">
        <MobileSheet />
      </div>
      <div className="font-semibold text-sm">Devfolio</div>
      <div>
        <ModeToggle />
      </div>
      {session ? <SignOutButton /> : <SignInButtons />}
    </header>
  );
};

export default Header;
