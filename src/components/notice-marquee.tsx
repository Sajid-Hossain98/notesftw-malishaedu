import { Notices } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface NoticeMarqueeProps {
  notices: Notices[];
}

export const NoticeMarquee = ({ notices }: NoticeMarqueeProps) => {
  return (
    <Marquee
      pauseOnHover
      speed={100}
      gradient
      gradientWidth={95}
      gradientColor="#000"
      className="font-sans font-medium tracking-wide pb-0.5"
    >
      {notices.map((notice) => {
        return (
          <div key={notice.id} className="flex items-center">
            <h5>{notice.title}</h5>

            {notice.description && (
              <Link
                href={`/notices/${notice.id}`}
                className="pl-2 dark:text-rose-300 text-rose-500 underline cursor-pointer underline-offset-2"
              >
                see more
              </Link>
            )}

            {notices.length > 1 && (
              <Separator
                orientation="vertical"
                className="w-[1px] mx-2 h-5 bg-zinc-300"
              />
            )}
          </div>
        );
      })}
    </Marquee>
  );
};
