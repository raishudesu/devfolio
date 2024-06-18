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
import { changePasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const savePasswordChanges = async (
  username: string,
  values: z.infer<typeof changePasswordSchema>
) => {
  try {
    const res = await fetch(`/api/user/${username}/profile/password`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.ok) {
      toast("Your password has been updated ✅", { position: "top-right" });
      return data;
    } else {
      toast("Something went wrong ❌", {
        description: data.error.errorMessage || "An expected error occurred.",
        style: {
          color: "red",
        },
        position: "top-right",
      });
    }
  } catch (error: any) {
    toast("Something went wrong ❌", {
      description: error.errorMessage || "An expected error occurred.",
      style: {
        color: "red",
      },
      position: "top-right",
    });
    console.error(error);
  }
};

const ChangePasswordForm = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const { formState } = form;

  const onSaveChanges = async (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    try {
      if (!values) return;

      const res = await savePasswordChanges(user?.username as string, values);

      if (res.ok) {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSaveChanges)}
        className="w-full flex flex-col"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="p-6 rounded-full self-stretch md:self-start mt-6"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Save Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
