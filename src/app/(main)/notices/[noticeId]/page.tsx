import { db } from "@/lib/db";
import { CloudAlert, MailCheck, ReceiptText } from "lucide-react";

const NoticeDetailsPage = async ({
  params,
}: {
  params: { noticeId: string };
}) => {
  const notice = await db.notice.findUnique({
    where: {
      id: params.noticeId,
    },
  });

  return (
    <div className="space-y-3 text-justify md:space-y-5">
      <h2 className="flex items-start gap-2 text-2xl md:gap-4 md:text-4xl">
        <MailCheck className="w-8 h-8 md:w-12 md:h-12" />
        {notice?.title}
      </h2>
      {notice?.description ? (
        <p className="flex items-start gap-2 text-base md:gap-4 md:text-2xl">
          <ReceiptText className="w-5 h-5 md:mt-1" />
          {notice.description}
        </p>
      ) : (
        <p className="flex items-center gap-2 text-xl text-rose-400/85">
          <CloudAlert />
          This notice has no further information.
        </p>
      )}
    </div>
  );
};

export default NoticeDetailsPage;
