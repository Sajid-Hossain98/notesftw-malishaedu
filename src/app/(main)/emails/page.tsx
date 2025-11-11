import { db } from "@/lib/db";
import { AddEmailButton } from "./_components/add-email-button";

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
      <div className="py-2 text-center">
        <AddEmailButton universityShortNames={universityShortNames} />
      </div>
      {/* <Button
        title="Add a new email"
        variant={"myButtons"}
        asChild
        onClick={() => onOpen("addRule")}
      >
        <Link href="/emails/add-email">Add email</Link>
      </Button> */}

      <span>Check emails</span>
    </div>
  );
};

export default Emails;
