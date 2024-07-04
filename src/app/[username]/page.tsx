import { Separator } from "@/components/ui/separator";
import Profile from "./components/profile";
import UserProjects from "./components/user-projects";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Profile username={username} />
      <Separator className="max-w-screen-xl" />
      <UserProjects username={username} />
    </div>
  );
};

export default UserPage;
