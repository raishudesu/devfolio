"use client";

import InputTags from "@/app/uploads/new/components/input-tags";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editDetailsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const saveUserDetailsChanges = async (
  username: string,
  values: z.infer<typeof editDetailsSchema>
) => {
  try {
    const res = await fetch(`/api/user/${username}/profile/details`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.ok) {
      toast("Your account has been updated ✅", { position: "top-right" });
      return data;
    } else {
      toast("Something went wrong ❌", {
        description: data.error,
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

const EditDetails = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const form = useForm<z.infer<typeof editDetailsSchema>>({
    resolver: zodResolver(editDetailsSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      links: user?.links,
      bio: user?.bio || "",
    },
  });

  const { formState } = form;

  const onSaveChanges = async (values: z.infer<typeof editDetailsSchema>) => {
    try {
      if (!values) return;

      const res = await saveUserDetailsChanges(
        user?.username as string,
        values
      );

      if (res.ok) {
        //update current session for user changes
        await session.update({
          ...session,
          user: {
            firstName: form.getValues("firstName"),
            lastName: form.getValues("lastName"),
            links: form.getValues("links"),
            bio: form.getValues("bio"),
          },
        });
      }
      router.refresh();
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
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
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Doe"
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
            name="links"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Links</FormLabel>
                <FormControl>
                  <InputTags {...field} />
                </FormControl>
                <FormDescription>
                  Links can be used for potential employers to reach out on you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Brief description of yourself"
                    disabled={formState.isSubmitting}
                    rows={5}
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditDetails;
