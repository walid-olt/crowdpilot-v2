import ProjectsHeader from "../components/ProjectsHeader.tsx";
import ProjectsTableContent from "../components/ProjectsTableContent.tsx";
import ProjectDeleteDialogue from "../components/ProjectDeleteDialogue.tsx";
import ProjectUpdateDialogue from "../components/ProjectUpdateDialogue.tsx";
import QueryContainer from "@/components/QueryContainer.tsx";
import Error from "@/components/Error.tsx";
const ProjectsPage = () => {
  return (
    <main className="px-4 py-10">
      <ProjectsHeader />
      <QueryContainer
        loadingMessage="Loading projects"
        errorFallback={(props) => <Error {...props} />}
      >
        <ProjectsTableContent />

        <ProjectDeleteDialogue />
        <ProjectUpdateDialogue />
      </QueryContainer>
    </main>
  );
};

export default ProjectsPage;
