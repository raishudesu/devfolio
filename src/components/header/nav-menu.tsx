"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const navLinks: { title: string; href: string }[] = [
  {
    title: "Projects 📝",
    href: "/projects",
  },
  {
    title: "Top Developers 👨‍💻",
    href: "/top-developers",
  },
  {
    title: "Generate Ideas ✨",
    href: "/generate/new",
  },
];

const NavMenu = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu>
      <ul className={className}>
        {navLinks.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <Link href={href} legacyBehavior passHref>
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
