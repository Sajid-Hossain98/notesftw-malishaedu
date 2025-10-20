import Image from "next/image";
import { CodeOfConductList } from "./_components/code-of-conduct-list";
import { currentUserData } from "@/lib/current-user-data";

export function generateMetadata() {
  return {
    title: "Code of conduct",
  };
}

const AddNotePage = async () => {
  const userData = await currentUserData();

  return (
    <div className="h-full">
      <div className="flex flex-col items-center gap-1 pb-1 text-center">
        <h1 className="md:text-3xl text-lg font-semibold font-mono flex items-center gap-1">
          <span className="text-base">⚡</span>
          Learn to Take Responsibilities
          <span className="text-base">⚡</span>
        </h1>
        <span className="text-xs font-semibold font-mono">
          Here at MalishaEdu, we roll by these rules — trust us, it’s for the
          greater good (and fewer headaches)!
        </span>
        <Image
          src="/static/responsibility-icon.png"
          height={150}
          width={150}
          alt="take responsiblities"
          className="h-12 w-12"
        />
      </div>

      <CodeOfConductList userData={userData} />
    </div>
  );
};

export default AddNotePage;
