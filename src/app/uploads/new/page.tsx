import React from "react";
import UploadForm from "./components/upload-form";

const UploadProjectPage = () => {
  return (
    <section className="mt-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        What&lsquo;s your project all about?
      </h1>
      <div className="mt-6">
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadProjectPage;
