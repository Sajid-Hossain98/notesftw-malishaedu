import { SignedIn, UserButton } from "@clerk/nextjs";
import { ActionTooltip } from "./action-tooltip";
import { NoticeMarquee } from "./notice-marquee";
import { Separator } from "./ui/separator";
import { db } from "@/lib/db";
// import { ShieldQuestion } from "lucide-react";

export const Footer = async () => {
  const notices = await db.notice.findMany();

  return (
    <div className="fixed left-0 bottom-0 w-full bg-[#303030] overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <NoticeMarquee notices={notices} />
        {/* <ActionTooltip
          label="&lt;MOTIVATION&gt; So the answer to the question 'Why is this site?' would simply be a reason of struggle to find information without delay. I first wanted to build this site when I joined MalishaEdu a year ago in Feb 2024. As it is a place where information is a key component and plays a huge role. At the beginning, I used to get bombarded with information from all directions every day. Although it was easy to right notes but not so simple to find them by navigating through pages of notes / text files / word files / excel sheets. These options were also time consuming :(, so that's where I got the idea to build something like this, and here we are :) &#129309;"
          className="md:max-w-[600px] text-lg/5 font-mono font-normal border-gray-700"
          side="bottom"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
            <ShieldQuestion className="w-4 h-4 text-black md:w-5 md:h-5" />
          </span>
        </ActionTooltip> */}
        <Separator className="h-[1.5px] w-full bg-zinc-600 mb-0.5" />

        <div className="flex items-center justify-center w-full gap-3 font-semibold">
          <ActionTooltip
            label="It is a phrase that means to try to memorize the information and not rely too much on this site."
            side="top"
          >
            <div className="text-xs">DON&apos;T FORGET LAAAH!</div>
          </ActionTooltip>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
