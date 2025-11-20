import { AllEmailListPage } from "../_components/all-email-list-page";

export function generateMetadata() {
  return {
    title: "All Emails",
    description: "To keep track of emails which need to check regularly.",
  };
}

const AllEmails = () => {
  return (
    <div>
      <AllEmailListPage />
    </div>
  );
};

export default AllEmails;
