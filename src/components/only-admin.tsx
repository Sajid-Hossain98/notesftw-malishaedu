import { initialUser } from "@/lib/initialUser";

interface OnlyAdminProps {
  children: React.ReactNode;
}

export const OnlyAdmin = async ({ children }: OnlyAdminProps) => {
  const userData = await initialUser();

  if (userData?.role !== "ADMIN") {
    return;
  }

  return <div>{children}</div>;
};
