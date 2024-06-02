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
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

async function uploadImage(userId: string, image: string) {
  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(`${userId}/${uuidv4()}`, image);
  if (error) {
    // Handle error
    console.log(error);
  } else {
    // Handle success
    // console.log(data);
    return data;
  }
}

const postProjectData = async (
  values: z.infer<typeof uploadProjectSchema>,
  publicUrls: string[],
  user: any
) => {
  try {
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        projectName: values.projectName,
        description: values.description,
        images: publicUrls,
      }),
    });

    if (res.ok) {
      alert("Uploaded");
    } else {
      console.error("Failed to upload project data");
    }
  } catch (error) {
    console.error("Error posting project data", error);
  }
};

const uploadProjectSchema = z.object({
  projectName: z
    .string({ required_error: "Project name is required" })
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(55, "Project name must not exceed 55 characters"),
  description: z
    .string({ required_error: "Project description is required" })
    .trim()
    .min(2, "Project description must be at least 5 characters")
    .max(55, "Project description must not exceed 55 characters"),
  images:
    typeof window === "undefined"
      ? z.any({ required_error: "An image is required" })
      : z.instanceof(FileList).optional(),
  // images:
  //   typeof window === "undefined"
  //     ? z.any({ required_error: "An image is required" })
  //     : z.array(z.string()),
});

const UploadForm = () => {
  // const [files, setFiles] = useState<File[] | FileList | null>(null);

  const session = useSession();

  const user = session.data?.user;

  const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

  const form = useForm<z.infer<typeof uploadProjectSchema>>({
    resolver: zodResolver(uploadProjectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      images: [],
    },
  });

  const fileRef = form.register("images");

  const onUpload = async (values: z.infer<typeof uploadProjectSchema>) => {
    try {
      if (values.images) {
        const fileList: File[] = Array.from(values.images);

        const data = await Promise.all(
          fileList.map(
            async (file: string | File) =>
              await uploadImage(user?.id!, file as string)
          )
        );

        const publicUrls = data.map((data) => {
          return `${storageUrl}/storage/v1/object/public/project-images/${data?.path}`;
        });

        // Ensure publicUrls is not empty before posting project data
        if (publicUrls.length > 0) {
          // Move the fetch logic into a separate function to ensure the use of updated state
          await postProjectData(values, publicUrls, user);
        } else {
          console.error("No public URLs available");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpload)}>
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write something about your project"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Project images"
                    multiple
                    {...fileRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Upload</Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
