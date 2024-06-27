"use client";

import InputTags from "@/app/uploads/new/components/input-tags";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { searchProjectSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchForm = ({ onClose }: { onClose: any }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof searchProjectSchema>>({
    resolver: zodResolver(searchProjectSchema),
    defaultValues: {
      tags: [],
    },
  });

  const onSearch = (values: z.infer<typeof searchProjectSchema>) => {
    try {
      if (!values) return;

      router.push(`/projects/search/${values.tags.join("+")}`);
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSearch)}
        className="w-full flex flex-col"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search by tags</FormLabel>
                <FormControl>
                  <InputTags {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="p-6 rounded-full self-stretch md:self-start mt-6"
          type="submit"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
