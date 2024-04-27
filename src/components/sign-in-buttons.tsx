"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignInButtons = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
      <Button onClick={() => router.push("/register")}>Register</Button>
    </div>
  );
};

export default SignInButtons;
