"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignInButtons = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Button
        className="p-4 rounded-full"
        onClick={() => router.push("/sign-in")}
      >
        Sign in
      </Button>
      <Button
        className="p-4 rounded-full"
        onClick={() => router.push("/register")}
      >
        Register
      </Button>
    </div>
  );
};

export default SignInButtons;
