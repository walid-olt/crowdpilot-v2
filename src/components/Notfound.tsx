import { useNavigate } from "react-router-dom";
import EmptyResult from "./EmptyResult";
import { SearchAlertIcon as Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <EmptyResult
        title="Page not found"
        description="Couldn't find the page you are looking for"
        icon={<Icon size={32} stroke="var(--destructive)"></Icon>}
      >
        <Button variant={"outline"} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </EmptyResult>
    </div>
  );
}
