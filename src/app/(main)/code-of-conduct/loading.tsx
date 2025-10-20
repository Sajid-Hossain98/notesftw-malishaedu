import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10">
      <Spinner />
    </div>
  );
}
