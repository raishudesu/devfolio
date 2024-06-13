"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "General",
    href: "/settings",
  },
  {
    name: "Profile",
    href: "/settings/profile",
  },
  {
    name: "Password",
    href: "/settings/password",
  },
];

const Links = () => {
  const pathname = usePathname();
  return (
    <aside className="w-full max-w-60 flex flex-col gap-3">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h2>
      <div className="w-full justify-between flex md:flex-col gap-3">
        {links.map(({ name, href }) => (
          <Link
            href={href as Url}
            key={name}
            className={`text-muted-foreground hover:underline ${
              pathname === href ? "text-primary font-bold" : ""
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Links;
