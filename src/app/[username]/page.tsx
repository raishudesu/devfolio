import Profile from "./components/profile";
import UserProjects from "./components/user-projects";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Profile username={username} />
      <UserProjects username={username} />
    </div>
  );
};

export default UserPage;
