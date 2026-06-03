import { Item, ItemTitle } from "@/components/ui/item";
type Props = {
  children?: React.ReactNode;
};
const ProjectsHeader = ({ children }: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <Item>
          <ItemTitle className="text-2xl font-bold justify-between flex w-full py-1">
            <h1>Projects</h1>
            {children}
          </ItemTitle>
        </Item>
      </div>
    </section>
  );
};

export default ProjectsHeader;
