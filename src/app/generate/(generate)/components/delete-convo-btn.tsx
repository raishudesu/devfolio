"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DeleteConvoDialog from "./delete-convo-dialog";

const DeleteConvoBtn = ({ conversationId }: { conversationId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2">
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <DeleteConvoDialog conversationId={conversationId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteConvoBtn;
