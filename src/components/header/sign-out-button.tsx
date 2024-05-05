"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { forwardRef } from "react";

const SignOutButton = forwardRef<HTMLAnchorElement>((props, forwardedRef) => {
  return (
    <Link href="" ref={forwardedRef} {...props} onClick={() => signOut()}>
      Sign out
    </Link>
  );
});

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;
