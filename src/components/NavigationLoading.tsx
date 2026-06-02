import { useNavigation } from "react-router-dom";
import { BarLoader } from "react-spinners";

const NavigationLoading = () => {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    isLoading && (
      <div className="fixed inset-0 w-full min-h-dvh bg-muted/80 z-9999">
        <BarLoader
          color="var(--primary)"
          width={"100%"}
          className="w-full absolute "
        />
      </div>
    )
  );
};

export default NavigationLoading;
