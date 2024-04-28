import React from "react";
import RegisterForm from "../components/register-form";

const RegisterPage = () => {
  return (
    <div className="mt-6 w-full grid gap-2 max-w-md px-2">
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Register
      </h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
