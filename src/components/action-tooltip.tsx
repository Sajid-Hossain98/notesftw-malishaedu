"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
  className,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild className="cursor-help">
          {children}
        </TooltipTrigger>

        <TooltipContent
          className={cn(
            "bg-gray-400 text-sm font-semibold text-zinc-400/95 max-w-[300px] md:max-w-[50%] z-50 border-gray-600 rounded-[4px]",
            className
          )}
          side={side}
          align={align}
        >
          <p className="text-justify text-black">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
