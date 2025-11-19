import { currentUserData } from "@/lib/current-user-data";
import { EmailCheckRank } from "./_components/email-check-rank";

const ActivityPage = async () => {
  const userData = await currentUserData();

  return (
    <div>
      <EmailCheckRank userData={userData} />
    </div>
  );
};

export default ActivityPage;
