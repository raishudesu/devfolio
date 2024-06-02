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
import { uploadProjectSchema } from "@/lib/zod";
import { ProjectResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
): Promise<ProjectResponse | undefined> => {
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
      toast("Project uploaded ✅");
      return await res.json();
    } else {
      toast("Something went wrong ❌", {
        description: "Project upload failed.",
        style: {
          color: "red",
        },
      });
      console.error("Failed to upload project data");
    }
  } catch (error) {
    toast("Something went wrong ❌", {
      description: "Project upload failed.",
      style: {
        color: "red",
      },
    });
    console.error("Error posting project data", error);
  }
};

const UploadForm = () => {
  // const [files, setFiles] = useState<File[] | FileList | null>(null);

  const router = useRouter();
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
          const data = (await postProjectData(
            values,
            publicUrls,
            user
          )) as ProjectResponse;

          data?.ok ? router.push(`/projects/${data.project.id}`) : null;
        } else {
          console.error("No public URLs available");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { formState } = form;

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
                  <Input
                    placeholder="e.g. Devfolio"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write something about your project"
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
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-2"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <Loader size={20} className="animate-spin" />
            ) : null}
            Upload
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
