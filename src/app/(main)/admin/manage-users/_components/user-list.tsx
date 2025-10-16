"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserData } from "@/types";
import { UserRole } from "@prisma/client";
import axios from "axios";
import {
  ChevronRight,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserListProps {
  userData: UserData[];
}

export const UserList = ({ userData }: UserListProps) => {
  const [loadingId, setLoadingId] = useState("");

  const router = useRouter();
  const onRoleChange = async (
    userId: string,
    userName: string,
    newRole: UserRole
  ) => {
    try {
      setLoadingId(userId);

      await axios.patch("/api/admin/users", {
        userId: userId,
        newRole: newRole,
      });

      toast.success(
        `${userName} is ${newRole === "ADMIN" ? "an" : "a"} ${newRole} now!`
      );
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            <span>Something went wrong!</span>
          </div>
        );
      }
    } finally {
      setLoadingId("");
    }
  };

  const handleRoleClick = (user: UserData, selectedRole: UserRole) => {
    if (user.role === selectedRole) {
      toast.warning(
        `${user.name} is already ${
          user.role === "ADMIN" ? "an" : "a"
        } ${selectedRole}.`
      );
    } else {
      onRoleChange(user.id, user.name, selectedRole);
    }
  };

  return (
    <>
      <div className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 rounded-tl-[8px] rounded-bl-[8px]">
        <Table className="w-full border-collapse">
          <TableBody className="w-full">
            {userData.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  className="bg-[#303030] transition-all ease-in-out duration-200"
                >
                  <TableCell className="flex items-center gap-3 py-3">
                    <Image
                      src={user.imageUrl}
                      alt="user"
                      height={80}
                      width={80}
                      quality={100}
                      className="w-10 h-10 rounded-full object-cover select-none"
                    />
                    <span className="flex flex-col gap-1">
                      <p className="flex items-center gap-1 text-base font-semibold">
                        {user.name}

                        {user.role === "ADMIN" ? (
                          <ShieldAlert className="w-4 h-4 text-rose-500" />
                        ) : user.role === "MODERATOR" ? (
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                        ) : (
                          <UserRound className="w-4 h-4" />
                        )}
                      </p>
                      <p>{user.email}</p>
                    </span>
                  </TableCell>
                  <TableCell className="pl-0 font-semibold select-none relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="absolute right-0 top-[50%] translate-y-[-50%]"
                      >
                        <button className="flex items-center gap-0.5 border-none outline-none h-full hover:bg-[#303030] px-3">
                          {loadingId === user.id ? (
                            <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
                          ) : (
                            user.role
                          )}
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        className="z-10 rounded-[3px] bg-zinc-800 shadow-[0_6px_15px_-3px_#d4d4d852,0_4px_6px_-4px_#d4d4d852]"
                        align="start"
                        side="left"
                        sideOffset={2}
                      >
                        <DropdownMenuItem
                          className="flex items-center gap-1 cursor-pointer hover:!bg-[#303030]"
                          onClick={() => handleRoleClick(user, "ADMIN")}
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-1 cursor-pointer hover:!bg-[#303030]"
                          onClick={() => handleRoleClick(user, "MODERATOR")}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-1 cursor-pointer hover:!bg-[#303030]"
                          onClick={() => handleRoleClick(user, "USER")}
                        >
                          <UserRound className="w-4 h-4" />
                          User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
