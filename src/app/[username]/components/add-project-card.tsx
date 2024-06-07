import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddProjectCard = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg text-center">
            Add your first project
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link
            href={"/uploads/new"}
            type="button"
            className="p-3 rounded-full bg-primary color"
          >
            <Plus />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProjectCard;
