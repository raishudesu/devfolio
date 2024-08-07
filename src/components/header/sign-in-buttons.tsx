"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignInButtons = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 justify-center">
      <Button
        className="p-4 rounded-full"
        onClick={() => router.push("/sign-in")}
      >
        Sign in
      </Button>
      <Button
        variant={"secondary"}
        className="p-4 rounded-full"
        onClick={() => router.push("/register")}
      >
        Register
      </Button>
    </div>
  );
};

export default SignInButtons;
