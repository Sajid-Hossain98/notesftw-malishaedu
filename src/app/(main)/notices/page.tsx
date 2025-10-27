import { db } from "@/lib/db";
import { NoticeList } from "./_components/notice-list";
import { ListTree } from "lucide-react";

export function generateMetadata() {
  return {
    title: "Notices",
  };
}

const Notices = async () => {
  const notices = await db.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-3 md:space-y-8">
      <h2 className="flex items-center gap-2 text-3xl md:gap-4 md:text-5xl">
        <ListTree />
        List of notice
      </h2>
      <NoticeList notices={notices} />
    </div>
  );
};

export default Notices;
