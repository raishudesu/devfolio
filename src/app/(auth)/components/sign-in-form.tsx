"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { signInFormSchema } from "@/lib/zod";

const SignInForm = () => {
  const router = useRouter();
  const query = useSearchParams();
  const searchParams = query.get("callbackUrl");

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (searchParams && !toastShownRef.current) {
      toast("You must sign in to continue.", {
        position: "top-right",
      });
      toastShownRef.current = true; // Mark the toast as shown
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        toast("Something went wrong ❌", {
          description: res?.error,
          style: {
            color: "red",
          },
          position: "top-right",
        });
        return;
      }

      searchParams ? router.push(searchParams) : router.push("/projects");

      toast("Sign in success ✅", {
        position: "top-right",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    {...field}
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    disabled={formState.isSubmitting}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="self-stretch mt-6 p-6 rounded-full"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm mt-2">
        Doesn&lsquo;t have an account? {""}
        <Link className="text-blue-500 hover:underline" href="/register">
          Register
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
