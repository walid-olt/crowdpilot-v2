import { CircleOff as EmptyIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type Props = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};
export default function EmptyResult({
  icon,
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <Empty className={cn(className)}>
      <EmptyHeader>
        <EmptyMedia>
          {icon || <EmptyIcon className="size-full bg-transparent" />}
        </EmptyMedia>
        <EmptyTitle className="text-2xl">{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {children && (
        <EmptyContent className="flex-row justify-center gap-2">
          {children}
        </EmptyContent>
      )}
    </Empty>
  );
}
