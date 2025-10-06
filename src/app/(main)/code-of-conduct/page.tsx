import { Spinner } from "@/components/spinner";

export function generateMetadata() {
  return {
    title: "Add note",
  };
}

const AddNotePage = async () => {
  return (
    <div className="grid py-2 text-5xl mt-52 place-items-center">
      Soon to be loaded 🤗
      <Spinner size={"icon"} />
    </div>
  );
};

export default AddNotePage;
