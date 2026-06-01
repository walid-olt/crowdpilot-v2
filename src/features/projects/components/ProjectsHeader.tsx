import { LucidePlus } from "lucide-react";
import { Item, ItemTitle } from "@/components/ui/item";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
const ProjectsHeader = () => {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <Item>
          <ItemTitle className="text-2xl font-bold justify-between flex w-full py-1">
            <h1>Projects</h1>
            <NavLink to={"create"}>
              <Button>
                <LucidePlus /> new
              </Button>
            </NavLink>
          </ItemTitle>
        </Item>
      </div>
    </section>
  );
};

export default ProjectsHeader;
