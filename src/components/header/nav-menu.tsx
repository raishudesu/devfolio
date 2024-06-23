"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { navLinks } from "../landing-page/data";

const NavMenu = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu>
      <ul className={className}>
        {navLinks.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <Link
              href={href}
              legacyBehavior
              passHref
              className="bg-transparent"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </ul>
    </NavigationMenu>
  );
};

export default NavMenu;
