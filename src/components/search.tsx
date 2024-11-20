import Image from "next/image";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative h-16">
      <Image
        src="/malishaedu-logo.svg"
        height={56}
        width={56}
        alt="MalishaEdu's Logo"
        className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 left-1 aspect-square md:flex"
      />

      <span className="absolute hidden transform -translate-y-1/2 bg-white rounded-full top-1/2 right-1 aspect-square md:flex h-14 w-14">
        <Search className="h-10 w-10 text-black m-auto stroke-2" />
      </span>

      <Input
        className="bg-[#185339] h-full px-5 text-center rounded-full border-none focus-visible:outline outline-[#edf2f4] caret-[#edf2f4]"
        type="text"
        placeholder="Search: e.g., #WIT, #YZU, #NTU, #NJUT"
      />
    </div>
  );
};
