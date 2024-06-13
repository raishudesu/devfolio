import { ReactNode } from "react";
import Links from "./components/links";

const SettingsLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <section className="p-2 mt-6 w-full max-w-screen-xl flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
        <Links />
        <div className="w-full max-w-screen-sm">{children}</div>
      </div>
    </section>
  );
};

export default SettingsLayout;
