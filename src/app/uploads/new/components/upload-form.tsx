"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import supabase from "@/lib/storage";
import { uploadProjectSchema } from "@/lib/zod";
import { ProjectResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import InputTags from "./input-tags";
import { textAnimation } from "@/components/landing-page/hero";

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
        githubUrl: values.githubUrl,
        demoUrl: values.demoUrl,
        images: publicUrls,
        tags: values.tags,
      }),
    });
    if (res.ok) {
      toast("Project uploaded ✅", { position: "top-right" });
      return await res.json();
    } else {
      toast("Something went wrong ❌", {
        description: "Project upload failed.",
        style: {
          color: "red",
        },
        position: "top-right",
      });
      console.error("Failed to upload project data");
    }
  } catch (error) {
    toast("Something went wrong ❌", {
      description: "Project upload failed.",
      style: {
        color: "red",
      },
      position: "top-right",
    });
    console.error("Error posting project data", error);
  }
};

const UploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const session = useSession();

  const user = session.data?.user;

  const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

  const form = useForm<z.infer<typeof uploadProjectSchema>>({
    resolver: zodResolver(uploadProjectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      tags: [],
      githubUrl: "",
      demoUrl: "",
      images: [],
    },
  });

  const { formState } = form;

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

          console.log(data);

          data?.ok ? router.push(`/projects/${data.project.id}`) : null;
        } else {
          console.error("No public URLs available");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearImages = () => {
    setImages([]);
    form.setValue("images", []);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const imageInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const imageList: File[] = Array.from(event.target.files);
        form.setValue("images", event.target.files);
        setImages(imageList);

        const urls = imageList.map((image) => URL.createObjectURL(image));
        setImageUrls(urls);
      }
    },
    []
  );

  // to avoid the unnecessary image rendering (flickering)
  const memoizedImageUrls = useMemo(() => imageUrls, [imageUrls]);

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUpload)}
          className="flex flex-col gap-4"
        >
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
                    rows={6}
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Tags</FormLabel>
                <FormControl>
                  <InputTags {...field} />
                </FormControl>
                <FormDescription>
                  Tags can be used for your project to be easily searched.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. toYourDemoUrl.com"
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
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. github.com/johndoe/repository"
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
                    // {...fileRef}
                    accept="image/*"
                    ref={imageInputRef}
                    disabled={formState.isSubmitting}
                    onChange={imageInputChange}
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
            Upload
          </Button>
        </form>
      </Form>
      {images.length > 0 && (
        <div>
          <div className="flex justify-between items-center">
            <h3
              className={`py-4 scroll-m-20 text-2xl font-semibold tracking-tight ${textAnimation}`}
            >
              Selected Images:
            </h3>
            <Button variant={"ghost"} onClick={handleClearImages}>
              Clear all
            </Button>
          </div>
          <div className="grid gap-4">
            {memoizedImageUrls.map((url, index) => (
              <AspectRatio ratio={16 / 9} key={index}>
                <Image
                  src={url}
                  alt={`Image ${index}`}
                  fill
                  className="h-auto max-w-full rounded-lg"
                />
              </AspectRatio>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
