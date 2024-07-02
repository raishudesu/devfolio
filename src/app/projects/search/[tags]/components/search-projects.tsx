import { textAnimation } from "@/components/landing-page/hero";
import ProjectCard from "@/app/projects/components/project-card";
import { ProjectsResponse } from "@/types/types";
import { Fragment } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getProjectsByTags = async (
  tags: string[]
): Promise<ProjectsResponse | undefined> => {
  try {
    const res = await fetch(`${apiUrl}/api/project/search`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tags }),
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const SearchProjects = async ({ params }: { params: { tags: string } }) => {
  const session = await getServerSession(authOptions);

  const currentUser = session?.user;

  const decodedTags = decodeURIComponent(params.tags);
  const tagsArray = decodedTags.split("+");

  const data = await getProjectsByTags(tagsArray);

  return (
    <section className="w-full my-6">
      <div className="pb-6 flex items-center justify-between">
        <h1
          className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          Search results of{" "}
          {tagsArray.map((tag: string, index) => (
            <Fragment key={index}>
              {tag}
              {index < tagsArray.length - 1 && <>&nbsp;</>}
            </Fragment>
          ))}
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.projects?.map(
          ({ id, user, projectName, images, tags, likes }) => (
            <div key={id}>
              {images ? (
                <ProjectCard
                  projectId={id}
                  projectName={projectName}
                  url={images[0].url}
                  user={user}
                  tags={tags}
                  key={id}
                  initialLikes={likes.length}
                  isLiked={likes.some(
                    (like) => like.userId === currentUser?.id
                  )}
                />
              ) : null}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default SearchProjects;
