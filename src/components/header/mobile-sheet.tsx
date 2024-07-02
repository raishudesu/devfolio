import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavMenu from "./nav-menu";
import ModeToggle from "./mode-toggle";
import { Separator } from "../ui/separator";
import SignInButtons from "./sign-in-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { textAnimation } from "../landing-page/hero";

const MobileSheet = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={`pl-4 text-start ${textAnimation}`}>
            <span className={`font-bold`}>✨devfolio</span>
          </SheetTitle>
        </SheetHeader>
        <NavMenu className="mt-6 flex flex-col items-start gap-2" />
        <Separator />
        <div className="mt-6">{session ? null : <SignInButtons />}</div>
        <div className="mt-6 pl-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
