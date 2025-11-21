import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-10 w-full rounded-md border border-input bg-background md:px-3 px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-2xl focus-visible:outline dark:outline-[#edf2f4] outline-[#1A1A1A] focus-visible:outline-1",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
