"use client";

import { CodeOfConduct, UserData } from "@/types";
import { AddRule } from "./add-rule";
import { Preview } from "@/components/preview";

interface CodeOfConductListProps {
  userData: UserData | null;
  codeOfConduct: CodeOfConduct[];
}

export const CodeOfConductList = ({
  userData,
  codeOfConduct,
}: CodeOfConductListProps) => {
  const admin = userData?.role === "ADMIN";

  return (
    <div className="overflow-y-auto max-h-[65%] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 pt-2">
      {codeOfConduct.map((rule, index) => {
        return (
          <div
            key={rule.id}
            className="flex items-start gap-2 font-mono text-2xl"
          >
            <span className="my-2 md:my-4">{index + 1}.</span>
            <Preview value={rule.rule} className="my-2 md:my-4" />
          </div>
        );
      })}

      {admin && (
        <div className="py-2 text-center">
          <AddRule />
        </div>
      )}
    </div>
  );
};
