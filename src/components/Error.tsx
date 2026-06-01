import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { FallbackProps } from "react-error-boundary";
import { LucideCircleX } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
} & FallbackProps;

export default function Error({
  title = "Something went wrong!",
  description,
  icon,
  actionLabel = "Try Again",
  error,
  resetErrorBoundary,
}: Props) {
  const errorMessage =
    description || "An unexpected error occurred. Please try again.";
  console.error(error);
  return (
    <Alert
      variant="destructive"
      role="alert"
      className="my-8 mx-auto max-w-2/4"
    >
      <AlertTitle className="flex items-center gap-2">
        {icon || <LucideCircleX className="size-5" />}
        <span>{title}</span>
      </AlertTitle>

      <AlertDescription className="mt-2 text-sm opacity-90">
        {errorMessage}
      </AlertDescription>

      {resetErrorBoundary && (
        <AlertAction className="mt-4">
          <Button onClick={resetErrorBoundary} variant="outline" size="sm">
            {actionLabel}
          </Button>
        </AlertAction>
      )}
    </Alert>
  );
}
