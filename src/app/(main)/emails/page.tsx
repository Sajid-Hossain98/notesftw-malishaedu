import { db } from "@/lib/db";
import { AddEmailButton } from "./_components/add-email-button";
import { EmailListPage } from "./_components/email-list-page";
import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";

export function generateMetadata() {
  return {
    title: "Emails",
    description: "To keep track of emails which need to check regularly.",
  };
}

export const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates",
  display: "swap",
});

const Emails = async () => {
  const universityShortNames = await db.university.findMany({
    select: {
      universityShortName: true,
    },
  });

  return (
    <div
      className={cn(
        "space-y-3 md:space-y-8 relative",
        montserratAlternates.className
      )}
    >
      <div className="py-2 w-full">
        <AddEmailButton universityShortNames={universityShortNames} />

        <EmailListPage />
      </div>
    </div>
  );
};

export default Emails;
