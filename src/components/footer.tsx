import Link from "next/link";
import { textAnimation } from "./landing-page/hero";
import { navLinks } from "./landing-page/data";

const Footer = () => {
  return (
    <footer className="border-t h-48 w-full flex justify-center p-4">
      <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-between max-w-screen-lg">
        <Link
          href={"/"}
          className={`text-2xl leading-none font-bold ${textAnimation}`}
        >
          ✨devfolio
        </Link>
        <ul className="flex flex-col items-center md:flex-row gap-6">
          {navLinks.map(({ title, href }, index) => (
            <Link href={href} key={index} className="text-sm">
              {title}
            </Link>
          ))}
        </ul>
        <small>© 2024 Devfolio</small>
      </div>
    </footer>
  );
};

export default Footer;
