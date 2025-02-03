import { currentUserData } from "@/lib/current-user-data";
import { AddAnUniversity } from "../_components/add-university";

export function generateMetadata() {
  return {
    title: "Add-university",
  };
}

const AddUniversity = async () => {
  const userData = await currentUserData();

  return <AddAnUniversity userData={userData} />;
};

export default AddUniversity;
