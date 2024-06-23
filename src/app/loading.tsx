import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-6">
        <LoaderCircle className="text-purple-500 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
