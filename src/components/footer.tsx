import { SignedIn, UserButton } from "@clerk/nextjs";

export const Footer = () => {
  return (
    <div className="fixed left-0 bottom-0 font-semibold w-full h-10 bg-[#185339]">
      <div className="w-full h-full flex justify-center items-center gap-3">
        <div>DON&apos;T FORGET LAAAH!</div>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
