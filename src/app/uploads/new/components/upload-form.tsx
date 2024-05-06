"use client";

import supabase from "@/lib/storage";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
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
    console.log(data);
    return data;
  }
}

async function getPublicUrl(path: string) {
  const { data } = supabase.storage.from("project-images").getPublicUrl(path);

  console.log(data);
}

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);
  1;

  const session = useSession();

  const user = session.data?.user;

  const onUpload = async (e) => {
    e.preventDefault();
    console.log(image);
    const data = await uploadImage(user?.id!, image);
    await getPublicUrl(data?.path!);
  };
  return (
    <div>
      <form onSubmit={onUpload}>
        <input
          type="file"
          ref={inputRef}
          onChange={() => setImage(inputRef.current?.files[0])}
        />
        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
