import Image from "next/image";
import { CodeOfConductList } from "./_components/code-of-conduct-list";
import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { Rock_Salt } from "next/font/google";
import { cn } from "@/lib/utils";

export function generateMetadata() {
  return {
    title: "Code of conduct",
  };
}

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400", // this font only has one weight
  variable: "--font-rock-salt", // optional CSS variable
  display: "swap",
});

const AddNotePage = async () => {
  const userData = await currentUserData();

  const canSeeProtected = !!(
    userData &&
    (userData.role === "ADMIN" ||
      userData.role === "MODERATOR" ||
      userData.canViewProtected)
  );

  const codeOfConduct = await db.codeOfConduct.findMany({
    where: canSeeProtected ? {} : { isProtected: false },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="h-full">
      <div className="flex flex-col items-center gap-1 pb-1 text-center">
        <h1
          className={cn(
            "flex items-center gap-1.5 text-lg font-semibold md:text-3xl",
            rockSalt.className
          )}
        >
          <Image
            priority
            src="/static/rocket-icon.png"
            alt="Logo"
            width={100}
            height={100}
            loading="eager"
            className="w-7 h-7"
          />
          Learn to Take Responsibilities
          <Image
            priority
            src="/static/rocket-icon.png"
            alt="Logo"
            width={100}
            height={100}
            loading="eager"
            className="w-7 h-7 transform -scale-x-100"
          />
        </h1>
        <span className="text-xs font-semibold">
          Here at MalishaEdu, we roll by these rules — trust us, it’s for the
          greater good (and fewer headaches)!
        </span>
        <Image
          src="/static/responsibility-icon.png"
          height={150}
          width={150}
          alt="take responsiblities"
          className="w-12 h-12"
        />
      </div>

      <CodeOfConductList userData={userData} codeOfConduct={codeOfConduct} />
    </div>
  );
};

export default AddNotePage;
