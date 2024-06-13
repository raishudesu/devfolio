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
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const generalFormSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
});

const saveGeneralChanges = async (
  username: string,
  values: z.infer<typeof generalFormSchema>
) => {
  try {
    const res = await fetch(`/api/user/${username}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast("Your account has been updated ✅");
      return await res.json();
    } else {
      toast("Something went wrong ❌", {
        description: "Project upload failed.",
        style: {
          color: "red",
        },
      });
    }
  } catch (error) {
    toast("Something went wrong ❌", {
      description: "Project upload failed.",
      style: {
        color: "red",
      },
    });
    console.error(error);
  }
};

const GeneralForm = () => {
  const session = useSession();
  const router = useRouter();

  const user = session.data?.user;

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email as string,
    },
  });

  const { formState } = form;

  const onSaveChanges = async (values: z.infer<typeof generalFormSchema>) => {
    try {
      if (!values) return;

      const res = await saveGeneralChanges(user?.username as string, values);
      if (res.ok) {
        //update current session for user changes
        await session.update({
          ...session,
          user: {
            username: values.username,
          },
        });
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSaveChanges)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. John"
                    {...field}
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <small className="text-sm leading-none text-muted-foreground">
              Your Devfolio URL: https://devfolio.vercel.app/
              <span className="font-bold">{form.getValues("username")}</span>
            </small>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. johndoe@example.com"
                    {...field}
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="self-stretch md:self-start flex gap-2 items-center rounded-full p-6"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <Loader size={20} className="animate-spin" />
            ) : null}
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;
