import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex justify-center max-w-screen-sm">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
