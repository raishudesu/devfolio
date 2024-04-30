import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavMenu from "./header/nav-menu";
import ModeToggle from "./mode-toggle";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="pl-4 text-start">Devfolio</SheetTitle>
        </SheetHeader>
        <NavMenu className="mt-6 flex flex-col items-start gap-2" />
        <div className="mt-6 pl-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
