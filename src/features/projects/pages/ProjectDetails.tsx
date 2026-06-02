import ProjectDetails from "../components/ProjectDetails";
import Error from "@/components/Error";
import QueryContainer from "@/components/QueryContainer";
import ProjectDeleteDialogue from "../components/ProjectDeleteDialogue";
import ProjectUpdateDialogue from "../components/ProjectUpdateDialogue";

export const Component = () => {
  return (
    <>
      <QueryContainer
        loadingMessage="Loading project details..."
        errorFallback={(props) => <Error {...props} />}
      >
        <ProjectDetails />
        <ProjectDeleteDialogue />
        <ProjectUpdateDialogue />
      </QueryContainer>
    </>
  );
};
