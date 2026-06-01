import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  when: boolean | (() => boolean);
  reason: string;
  children: React.ReactElement<React.HtmlHTMLAttributes<HTMLElement>>;
  toolTipSide?: React.ComponentProps<typeof TooltipContent>["side"];
};

const Guard = ({ reason, when, toolTipSide = "top", children }: Props) => {
  if (!when) return children;
  const Element = React.cloneElement(children, {
    "aria-disabled": true,
    className: cn(children?.props?.className, "opacity-50 cursor-not-allowed"),
    onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
  });
  return (
    <Tooltip>
      <TooltipContent side={toolTipSide}>{reason}</TooltipContent>
      <TooltipTrigger asChild>
        <span>{Element}</span>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default Guard;
