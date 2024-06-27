import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { textAnimation } from "@/components/landing-page/hero";
import ProjectCard from "@/app/projects/components/project-card";
import { ProjectsResponse } from "@/types/types";
import { Fragment } from "react";

const getProjectsByTags = async (
  tags: string[]
): Promise<ProjectsResponse | undefined> => {
  try {
    const res = await fetch(`http://localhost:3000/api/project/search`, {
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
  console.log(params.tags);
  const decodedTags = decodeURIComponent(params.tags);
  const tagsArray = decodedTags.split("+");

  const data = await getProjectsByTags(tagsArray);

  return (
    <section className="w-full my-6">
      <div className="pb-6 flex items-center justify-between">
        {/* <div className="flex gap-2"> */}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Filter <ArrowDown size={15} />{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>Filter</DropdownMenuLabel> */}
            <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            // onCheckedChange={setShowStatusBar}
            >
              Latest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            // onCheckedChange={setShowStatusBar}
            >
              Oldest
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.projects?.map(({ id, user, projectName, images, tags }) => (
          <div key={id}>
            {images ? (
              <ProjectCard
                projectId={id}
                projectName={projectName}
                url={images[0].url}
                user={user}
                tags={tags}
                key={id}
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchProjects;
