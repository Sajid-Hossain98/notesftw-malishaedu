import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen">
      {children}
      <Link href="/">
        <Button
          variant="link"
          className="text-[#edf2f4] rounded-full bg-red-900"
        >
          Return home
        </Button>
      </Link>
    </div>
  );
};

export default AuthLayout;
