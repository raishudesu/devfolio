import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full flex justify-center pt-6 pb-24">
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center max-w-screen-sm">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
