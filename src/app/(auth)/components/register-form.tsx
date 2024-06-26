"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterResponse } from "@/types/types";
import { registerFormSchema } from "@/lib/zod";
import { useState } from "react";
import { motion } from "framer-motion";

type Inputs = z.infer<typeof registerFormSchema>;

type FieldName = keyof Inputs;

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();

  //form declaration
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        }),
      });

      const data = (await res.json()) as RegisterResponse;

      if (!data.ok) {
        toast("Something went wrong.", {
          description: data.errorMessage,
          style: {
            color: "red",
          },
        });

        console.error(data);
        return;
      }

      toast(`${data.message} 🚀`, {
        description: `You may now sign in.`,
      });
      router.push("/sign-in");

      form.reset();
    } catch (error) {
      toast("Something went wrong.", {
        description: "Try again later",
      });

      console.error(error);
    }
  };

  const steps = [
    {
      fields: ["username", "firstName", "lastName"],
    },
    {
      fields: ["email", "password", "confirmPassword"],
    },
  ];

  const nextStep = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[]);

    if (!output) return;
    if (currentStep < 1) {
      setCurrentStep((step) => step + 1);
      setCurrentPage((page) => page + 2);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <>
      <div className="py-4 w-full flex gap-6">
        <div className="flex items-center gap-2">
          <div className=" border-green-400 w-8 h-8 rounded-full border-2 flex justify-center items-center">
            <small>1</small>
          </div>
          <small className="text-sm font-medium leading-none">User info</small>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`${
              currentStep === 1 ? "border-green-400" : null
            } w-8 h-8 rounded-full border-2 flex justify-center items-center`}
          >
            <small>2</small>
          </div>
          <small className="text-sm font-medium leading-none">
            Account info
          </small>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col"
        >
          <div className="space-y-2">
            {currentStep === 0 && (
              <motion.div
                initial={{
                  x: currentPage === 0 ? 0 : -25,
                  opacity: currentPage === 0 ? 1 : 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="JohnDoe"
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          disabled={formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: 25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
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
                          type="password"
                          placeholder="Enter your password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          type="password"
                          {...field}
                          disabled={formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </div>

          {currentStep === 0 && (
            <motion.div
              initial={{
                x: currentPage === 0 ? 0 : -25,
                opacity: currentPage === 0 ? 1 : 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Button
                className="w-full mt-4 py-6 rounded-full"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Button
                className="mt-4 w-full py-6 rounded-full"
                type="submit"
                disabled={formState.isSubmitting}
              >
                Register
              </Button>
            </motion.div>
          )}
        </form>
        {currentStep === 1 && (
          <motion.div
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Button
              className="w-full p-6 rounded-full"
              variant={"secondary"}
              onClick={prevStep}
            >
              Back
            </Button>
          </motion.div>
        )}

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="text-center text-sm mt-2">
          Have an account? {""}
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </Form>
    </>
  );
};

export default RegisterForm;
