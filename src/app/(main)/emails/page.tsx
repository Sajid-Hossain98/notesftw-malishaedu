import { db } from "@/lib/db";
import { AddEmailButton } from "./_components/add-email-button";
import { EmailListPage } from "./_components/email-list-page";

export function generateMetadata() {
  return {
    title: "Emails",
    description: "To keep track of emails which need to check regularly.",
  };
}

const Emails = async () => {
  const universityShortNames = await db.university.findMany({
    select: {
      universityShortName: true,
    },
  });

  return (
    <div className="space-y-3 md:space-y-8">
      <div className="py-2 w-full relative">
        <AddEmailButton universityShortNames={universityShortNames} />

        <EmailListPage />
      </div>
    </div>
  );
};

export default Emails;
