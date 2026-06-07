import QueryContainer from "@/components/QueryContainer";
import { Portfolio } from "./components/Portfolio";

export const Component = () => {
  return (
    <QueryContainer loadingMessage="Loading portfolio...">
      <Portfolio />;
    </QueryContainer>
  );
};
