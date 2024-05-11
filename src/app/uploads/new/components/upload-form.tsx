"use client";

import supabase from "@/lib/storage";
import { useSession } from "next-auth/react";
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

const UploadForm = () => {
  const [files, setFiles] = useState<File[] | FileList | null>(null);
  const [publicUrls, setPublicUrls] = useState<
    string[] | ({ path: string } | undefined)[] | null
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const session = useSession();

  const user = session.data?.user;

  const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

  const onUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files) {
      const fileList: File[] = Array.from(files);

      const data = await Promise.all(
        fileList.map(
          async (file: string | File) =>
            await uploadImage(user?.id!, file as string)
        )
      );

      setPublicUrls(
        data.map((data) => {
          return `${storageUrl}/storage/v1/object/public/project-images/${data?.path}`;
        })
      );

      if (publicUrls) console.log(publicUrls);
    }
  };

  return (
    <div>
      <form onSubmit={onUpload}>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={() => {
            if (inputRef.current?.files) {
              setFiles(inputRef.current.files);
              return;
            }
            setFiles(null);
          }}
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
