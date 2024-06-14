import EditPfp from "./edit-pfp";

const ProfileSettings = () => {
  return (
    <div className="p-2 h-full w-full flex">
      <div className="flex flex-col items-center md:items-start gap-6 w-full">
        <EditPfp />
      </div>
    </div>
  );
};

export default ProfileSettings;
