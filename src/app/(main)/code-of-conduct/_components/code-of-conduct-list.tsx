"use client";

import { UserData } from "@/types";
import { AddRule } from "./add-rule";

interface CodeOfConductListProps {
  userData: UserData | null;
}

export const CodeOfConductList = ({ userData }: CodeOfConductListProps) => {
  const admin = userData?.role === "ADMIN";

  return (
    <div className="overflow-y-auto max-h-[65%] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300">
      {admin && <AddRule />}
    </div>
  );
};
