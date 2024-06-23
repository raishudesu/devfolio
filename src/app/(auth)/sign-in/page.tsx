import React from "react";
import SignInForm from "../components/sign-in-form";
import { textAnimation } from "@/components/landing-page/hero";

const SignInPage = () => {
  return (
    <div className="mt-6 w-full grid gap-2 max-w-md px-2">
      <h1
        className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
      >
        Sign in
      </h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
