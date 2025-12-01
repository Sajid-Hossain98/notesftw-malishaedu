"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { UserData } from "@/types";
import { UserRole } from "@prisma/client";
import axios from "axios";
import {
  ChevronRight,
  Loader2,
  LockKeyhole,
  LockKeyholeOpen,
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
    <div className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-track]:bg-zinc-200 dark:[&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-thumb]:bg-stone-500 rounded-tl-[8px] rounded-bl-[8px]">
      <Table className="w-full border-collapse">
        <TableBody className="w-full">
          {userData.map((user) => {
            return (
              <TableRow
                key={user.id}
                className="dark:bg-[#303030] dark:hover:bg-transparent bg-[#FAFAFA] transition-all ease-in-out duration-200"
              >
                <TableCell className="flex items-center gap-3 py-3">
                  <Image
                    src={user.imageUrl}
                    alt="user"
                    height={80}
                    width={80}
                    quality={100}
                    className="object-cover w-10 h-10 rounded-full select-none"
                  />
                  <span className="flex flex-col gap-1">
                    <button
                      className="flex items-center gap-1 text-base font-semibold cursor-default"
                      title={
                        user.role === "ADMIN"
                          ? "Admin"
                          : user.role === "MODERATOR"
                          ? "Moderator"
                          : "User"
                      }
                    >
                      {user.name}

                      {user.role === "ADMIN" ? (
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                      ) : user.role === "MODERATOR" ? (
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                      ) : (
                        <UserRound className="w-4 h-4" />
                      )}
                    </button>
                    <p>{user.email}</p>
                  </span>
                </TableCell>
                <TableCell className="relative pl-0 font-semibold select-none">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="absolute right-0 top-[50%] translate-y-[-50%]"
                      title="Click for options"
                    >
                      <button className="flex items-center gap-0.5 border-none outline-none h-full dark:md:hover:bg-[#303030] md:hover:bg-[#FAFAFA] px-3">
                        {loadingId === user.id ? (
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        ) : (
                          user.role
                        )}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="z-10 rounded-[3px] dark:bg-zinc-800 bg-[#FAFAFA] dark:shadow-[0_6px_15px_-3px_#d4d4d852,0_4px_6px_-4px_#d4d4d852] shadow-[2px_2px_4px_rgba(0,0,0,0.15)] border border-zinc-400"
                      align="end"
                      side="bottom"
                      sideOffset={2}
                    >
                      <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer dark:md:hover:!bg-[#303030] md:hover:bg-zinc-200/80"
                        onClick={() => handleRoleClick(user, "ADMIN")}
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer dark:md:hover:!bg-[#303030] md:hover:bg-zinc-200/80"
                        onClick={() => handleRoleClick(user, "MODERATOR")}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Moderator
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer dark:md:hover:!bg-[#303030] md:hover:bg-zinc-200/80"
                        onClick={() => handleRoleClick(user, "USER")}
                      >
                        <UserRound className="w-4 h-4" />
                        User
                      </DropdownMenuItem>
                      <Separator className="h-[0.5px] bg-zinc-600 my-1" />
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()} // prevents dropdown from closing
                        className="flex items-center justify-between gap-2 cursor-default"
                      >
                        <ActionTooltip
                          label="Do you want this user to be able to view documents and content which are protected?"
                          side="bottom"
                        >
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-shield-question-mark-icon lucide-shield-question-mark"
                            >
                              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                              <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                              <path d="M12 17h.01" />
                            </svg>
                            Can view protected
                          </span>
                        </ActionTooltip>

                        <Switch
                          className={cn(
                            "data-[state=checked]:bg-zinc-500 data-[state=unchecked]:bg-zinc-700 [&>span]:bg-white"
                          )}
                          checked={!!user.canViewProtected}
                          onCheckedChange={async (checked) => {
                            try {
                              setLoadingId(user.id);
                              await axios.patch("/api/admin/users", {
                                userId: user.id,
                                canViewProtected: checked,
                              });
                              toast.success(
                                `${user.name} ${
                                  checked ? "can now" : "can no longer"
                                } view protected notes.`,
                                {
                                  style: {
                                    background: "#ebebeb",
                                    color: "#000000",
                                  },
                                  icon: checked ? (
                                    <LockKeyholeOpen className="w-5 h-5 mr-2" />
                                  ) : (
                                    <LockKeyhole className="w-5 h-5 mr-2" />
                                  ),
                                }
                              );
                              router.refresh();
                            } catch (error) {
                              console.log(error);
                              toast.error("Something went wrong!");
                            } finally {
                              setLoadingId("");
                            }
                          }}
                        />
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
  );
};
