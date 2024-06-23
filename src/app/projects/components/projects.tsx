import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectCard from "./project-card";
import { ProjectsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { textAnimation } from "@/components/landing-page/hero";

const getProjects = async (): Promise<ProjectsResponse> => {
  const data = await fetch("http://localhost:3000/api/project", {
    cache: "no-store",
  });
  return await data.json();
};

const Projects = async () => {
  const data = await getProjects();

  return (
    <section className="w-full my-6">
      <div className="pb-6 flex items-center justify-between">
        <h1
          className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${textAnimation}`}
        >
          Projects
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
              Following
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            // onCheckedChange={setShowStatusBar}
            >
              Latest
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

export default Projects;
