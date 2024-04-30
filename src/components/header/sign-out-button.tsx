"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      variant={"link"}
      size={"sm"}
      className="p-0 hover:no-underline"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
