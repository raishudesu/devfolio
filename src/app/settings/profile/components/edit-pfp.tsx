"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (userId: string, image: File | string) => {
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .upload(`${userId}/${uuidv4()}`, image);
  if (error) {
    // Handle error
    console.log(error);
  } else {
    // Handle success
    // console.log(data);
    return data;
  }
};

const updateUserProfileImage = async (username: string, imageLink: string) => {
  try {
    const res = await fetch(`/api/user/${username}/profile`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        imageLink,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const EditPfp = () => {
  const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const session = useSession();

  const [image, setImage] = useState<string | undefined | null | File>("");
  const [submitting, setSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const onUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await uploadImage(
        session.data?.user.id as string,
        image as string
      );

      const publicUrl = `${storageUrl}/storage/v1/object/public/profile-pictures/${res?.path}`;

      if (res) {
        const data = await updateUserProfileImage(
          session.data?.user.username as string,
          publicUrl
        );

        if (data.ok) {
          await session.update({
            ...session,
            user: {
              imageLink: publicUrl,
            },
          });
          toast("Profile picture updated successfully 🎉", {
            position: "top-right",
          });
          router.refresh();
        }
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (imageInputRef.current) imageInputRef.current.value = "";
      setImage("");
      setSubmitting(false);
    }
  };
  return (
    <>
      <Avatar className="w-full max-w-32 md:max-w-64 h-full max-h-32 md:max-h-64">
        <AvatarImage
          src={session.data?.user.imageLink as string}
          alt={`${session.data?.user.username}-profile-image`}
        />
        <AvatarFallback className="min-h-32 md:min-64">CN</AvatarFallback>
      </Avatar>

      <form onSubmit={onUpload} className="w-full flex flex-col gap-3">
        <Input
          type="file"
          accept="image/*"
          multiple
          ref={imageInputRef}
          onChange={() => {
            if (imageInputRef.current?.files) {
              setImage(imageInputRef.current.files[0]);
              return;
            }
            setImage("");
          }}
        />
        <Button
          className="p-6 rounded-full md:self-start"
          type="submit"
          disabled={image === "" || submitting}
        >
          Upload
        </Button>
      </form>
    </>
  );
};

export default EditPfp;
