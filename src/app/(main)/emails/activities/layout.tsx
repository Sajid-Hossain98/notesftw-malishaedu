import { EmailActivitiesNavbar } from "./_components/email-activities-navbar";

const EmailActivitiesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <EmailActivitiesNavbar />
      {children}
    </div>
  );
};

export default EmailActivitiesLayout;
