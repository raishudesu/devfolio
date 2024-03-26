import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <h1>Auth Layout</h1>
      <div>{children}</div>
    </section>
  );
};

export default AuthLayout;
