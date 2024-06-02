import ProjectDetails from "./components/project-details";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full flex justify-center px-2">
      <ProjectDetails projectId={params.id} />
    </div>
  );
};

export default ProjectPage;
