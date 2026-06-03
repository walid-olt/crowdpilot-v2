import ProjectsHeader from "../components/ProjectsHeader.tsx";
import ProjectsTableContent from "../components/ProjectsTableContent.tsx";
import QueryContainer from "@/components/QueryContainer.tsx";

import Error from "@/components/Error.tsx";
import { getAllProjects } from "../api/index.ts";
const PublicProjects = () => {
  return (
    <main className="px-4 py-10">
      <ProjectsHeader />
      <QueryContainer
        loadingMessage="Loading projects"
        errorFallback={(props) => <Error {...props} />}
      >
        <ProjectsTableContent loader={getAllProjects} />
      </QueryContainer>
    </main>
  );
};

export default PublicProjects;
