import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserData } from "@/types";
import {
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";

interface UserListProps {
  userData: UserData[];
}
export const UserList = ({ userData }: UserListProps) => {
  return (
    <>
      <div className="md:max-h-[70vh] max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-stone-600 [&::-webkit-scrollbar-thumb]:bg-stone-300 rounded-tl-[8px] rounded-bl-[8px]">
        <Table className="w-full border-collapse">
          <TableBody className="w-full">
            {userData.map((user) => {
              return (
                <TableRow key={user.id} className="bg-zinc-900">
                  <TableCell className="flex items-center gap-3 py-3">
                    <Image
                      src={user.imageUrl}
                      alt="user"
                      height={80}
                      width={80}
                      quality={100}
                      className="w-10 h-10 rounded-full object-cover"
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
                      <p className="font-semibold">{user.email}</p>
                    </span>
                  </TableCell>
                  <TableCell className="pl-0 font-semibold select-none relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="absolute right-0 top-[50%] translate-y-[-50%]"
                      >
                        <button className="flex items-center justify-end gap-0.5 border-none outline-none h-full pr-2">
                          {user.role}
                          <ChevronRight />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        className="z-10 rounded-md bg-zinc-800"
                        align="end"
                        sideOffset={6}
                      >
                        <DropdownMenuItem className="flex items-center gap-1 cursor-pointer hover:!bg-zinc-600">
                          <ShieldAlert className="w-4 h-4" />
                          Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-1 cursor-pointer hover:!bg-zinc-600">
                          <ShieldCheck className="w-4 h-4" />
                          Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-1 cursor-pointer hover:!bg-zinc-600">
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
