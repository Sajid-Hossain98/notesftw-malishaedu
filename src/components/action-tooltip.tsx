"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild className="cursor-help">
          {children}
        </TooltipTrigger>

        <TooltipContent
          className="bg-[#000000] text-slate-300 max-w-[300px] md:max-w-[50%] z-50"
          side={side}
          align={align}
        >
          <p className="font-semibold text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
