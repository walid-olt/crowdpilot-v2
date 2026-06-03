import ProjectsHeader from "../components/ProjectsHeader.tsx";
import ProjectsTableContent from "../components/ProjectsTableContent.tsx";
import ProjectDeleteDialogue from "../components/ProjectDeleteDialogue.tsx";
import ProjectUpdateDialogue from "../components/ProjectUpdateDialogue.tsx";
import QueryContainer from "@/components/QueryContainer.tsx";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";

import { getOwnerProjects } from "../api";
import Error from "@/components/Error.tsx";
const OwnerProjects = () => {
  return (
    <main className="px-4 py-10">
      <ProjectsHeader>
        <NavLink to={"create"}>
          <Button>
            <LucidePlus /> new
          </Button>
        </NavLink>
      </ProjectsHeader>
      <QueryContainer
        loadingMessage="Loading projects"
        errorFallback={(props) => <Error {...props} />}
      >
        <ProjectsTableContent loader={getOwnerProjects} />

        <ProjectDeleteDialogue />
        <ProjectUpdateDialogue />
      </QueryContainer>
    </main>
  );
};

export default OwnerProjects;
