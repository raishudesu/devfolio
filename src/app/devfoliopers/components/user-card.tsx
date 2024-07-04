import ProfileBtn from "@/app/projects/[id]/components/profile-btn";
import { textAnimation } from "@/components/landing-page/hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopUserCard } from "@/types/types";
import { Heart } from "lucide-react";
import Link from "next/link";

const UserCard = ({
  username,
  firstName,
  lastName,
  imageLink,
  totalLikes,
  isAvailableForWork,
}: TopUserCard) => {
  return (
    <div className=" p-4 w-full flex flex-col gap-2 border shadow rounded-md hover:shadow-primary transition ease-in-out delay-150">
      <div className="flex justify-between items-center">
        <Link
          href={`/${username}`}
          className="relative cursor-pointer h-20 w-20 rounded-full "
        >
          <Avatar className="w-full max-w-32 md:max-w-64 h-full max-h-32 md:max-h-64">
            <AvatarImage src={imageLink} alt={`${username}-profile-image`} />
            <AvatarFallback className="min-h-32 md:min-64">CN</AvatarFallback>
          </Avatar>
        </Link>
        <ProfileBtn username={username} />
      </div>
      <div className="flex flex-col">
        <h2
          className={`mt-2 scroll-m-20 text-xl font-bold tracking-tight first:mt-0 ${textAnimation}`}
        >
          {firstName} {""} {lastName}
        </h2>
        <div className="mt-2 flex gap-2 items-center">
          {isAvailableForWork ? (
            <>
              <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
              <small className="text-xs font-medium leading-none text-muted-foreground">
                Available for work 🚀{" "}
              </small>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-400 animate-pulse rounded-full"></div>
              <small className="text-xsm text-muted-foreground">
                Unavailable for work{" "}
              </small>
            </>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <small className="text-xs text-muted-foreground">
            {totalLikes} Likes
          </small>
          <Heart size={15} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
