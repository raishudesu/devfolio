import Profile from "./components/profile";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return (
    <div className="w-full">
      <Profile username={username} />
    </div>
  );
};

export default UserPage;
