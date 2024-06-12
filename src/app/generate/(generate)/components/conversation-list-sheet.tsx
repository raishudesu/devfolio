import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History } from "lucide-react";
import ConversationList from "./conversations-list";

const ConversationListSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <History />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ConversationList />
      </SheetContent>
    </Sheet>
  );
};

export default ConversationListSheet;
