import Image from "next/image";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative md:h-16">
      <Image
        src="/malishaedu-logo.svg"
        height={54}
        width={54}
        alt="MalishaEdu's Logo"
        className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 left-1.5 aspect-square md:flex"
      />

      <span className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 right-1.5 aspect-square md:flex h-[54px] w-[54px]">
        <Search className="h-10 w-10 text-black m-auto stroke-2" />
      </span>

      <Input
        className="bg-[#242424] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] caret-[#edf2f4] placeholder-gray-500"
        type="text"
        placeholder="Search: e.g., #WIT, #YZU, #NTU, #NJUT"
      />
    </div>
  );
};
