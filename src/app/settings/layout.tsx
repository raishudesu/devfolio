import { ReactNode } from "react";
import Links from "./components/links";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SettingsLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <section className="mt-6 w-full max-w-screen-xl flex flex-col items-center">
      <div className="w-full flex gap-2 justify-center">
        <Links />
        <div className="w-full max-w-screen-sm">{children}</div>
      </div>
    </section>
  );
};

export default SettingsLayout;
