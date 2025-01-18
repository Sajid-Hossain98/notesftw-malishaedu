import { currentUserData } from "@/lib/current-user-data";

interface OnlyAdminProps {
  children: React.ReactNode;
}

export const OnlyAdmin = async ({ children }: OnlyAdminProps) => {
  const userData = await currentUserData();

  if (userData?.role !== "ADMIN") {
    return;
  }

  return <div>{children}</div>;
};
