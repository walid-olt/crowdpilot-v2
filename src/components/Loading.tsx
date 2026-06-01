import { FadeLoader } from "react-spinners";
type Props = {
  message?: string;
};
const Loading = ({ message }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4  h-full">
      {message && <p className="text-accent-foreground text-lg">{message}</p>}
      <FadeLoader className="text-md" color="var(--primary)" />
    </div>
  );
};

export default Loading;
