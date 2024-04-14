import Profile from "./components/profile";

const UserPage = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return (
    <div className="w-full flex justify-center">
      <Profile username={username} />
    </div>
  );
};

export default UserPage;
