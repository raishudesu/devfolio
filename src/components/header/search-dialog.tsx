"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useSession } from "next-auth/react";
import SearchForm from "./search-form";
import { Button } from "../ui/button";
import { textAnimation } from "../landing-page/hero";

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  if (status === "unauthenticated") {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full" onClick={() => setOpen(!open)}>
          <Button variant={"outline"} className={`p-3 px-6 rounded-full`}>
            <p className={`text-md font-semibold ${textAnimation}`}>
              Search...
            </p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <SearchForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
