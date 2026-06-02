import { useNavigate } from "react-router-dom";
import EmptyResult from "./EmptyResult";
import { LockKeyhole as Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <EmptyResult
        title="Restricted Access"
        description="It looks like your account doesn't have permissions to use this feature "
        icon={<Icon size={32} stroke="var(--destructive)"></Icon>}
      >
        <Button variant={"outline"} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </EmptyResult>
    </div>
  );
}
