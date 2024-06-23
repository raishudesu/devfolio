import React from "react";
import UploadForm from "./components/upload-form";
import { textAnimation } from "@/components/landing-page/hero";

const UploadProjectPage = () => {
  return (
    <section className="mt-6 w-full max-w-screen-lg p-2 pb-12">
      <h1
        className={`scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl ${textAnimation}`}
      >
        What&lsquo;s your project all about?
      </h1>
      <div className="mt-6">
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadProjectPage;
