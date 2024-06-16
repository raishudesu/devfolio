import { Separator } from "@/components/ui/separator";
import EditDetails from "./components/edit-details";
import EditPfp from "./components/edit-pfp";

const ProfileSettings = () => {
  return (
    <div className="p-2 h-full w-full flex">
      <div className="flex flex-col items-center md:items-start gap-6 w-full">
        <EditPfp />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Profile Details
        </h3>
        <Separator />
        <EditDetails />
      </div>
    </div>
  );
};

export default ProfileSettings;
