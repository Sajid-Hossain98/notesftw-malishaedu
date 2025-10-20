import Image from "next/image";
import { CodeOfConductList } from "./_components/code-of-conduct-list";
import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";

export function generateMetadata() {
  return {
    title: "Code of conduct",
  };
}

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
        <h1 className="flex items-center gap-1 font-mono text-lg font-semibold md:text-3xl">
          <span className="text-base">⚡</span>
          Learn to Take Responsibilities
          <span className="text-base">⚡</span>
        </h1>
        <span className="font-mono text-xs font-semibold">
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
