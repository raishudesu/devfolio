import React from "react";
import ModeToggle from "./mode-toggle";
import MobileSheet from "./mobile-sheet";

const Header = () => {
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
    </header>
  );
};

export default Header;
