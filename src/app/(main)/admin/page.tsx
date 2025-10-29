import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAllNotes } from "./_components/admin-all-notes";
import { Suspense } from "react";
import { List, LoaderCircle } from "lucide-react";
import { AdminPendingNotes } from "./_components/admin-pending-notes";
import { db } from "@/lib/db";

interface GenerateMetadataParams {
  searchParams: { [key: string]: string | undefined };
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataParams) {
  const allNotesPage = searchParams.allNotesPage;
  const pendingNotes = searchParams.pendingNotes;

  return {
    title: allNotesPage
      ? `Edit notes - Page ${allNotesPage}`
      : pendingNotes
      ? `Pending notes - ${pendingNotes}`
      : "Admin",
  };
}

const AdminPage = async () => {
  const universityShortNames = await db.university.findMany({
    select: {
      universityShortName: true,
    },
  });

  const noteTypes = await db.type.findMany({
    select: {
      name: true,
    },
  });

  return (
    <Tabs
      defaultValue="all"
      className="md:flex md:justify-between md:gap-3 md:w-full md:h-full"
    >
      {/* grid md:w-[80%] w-full grid-cols-3 mx-auto */}
      <TabsList className="md:flex md:flex-col md:items-center md:justify-start md:gap-2 dark:md:bg-[#303030] bg-[#FAFAFA] md:max-h-fit md:rounded-xl md:px-2 md:py-2 grid md:max-w-[15%] w-full grid-cols-2 md:mt-2">
        <TabsTrigger
          value="all"
          className="rounded-l-xl md:w-full md:rounded-[4px] text-xs md:text-base py-1 md:py-1.5 font-medium bg-[#FAFAFA] dark:bg-[#1C1C1C] hover:bg-[#F2F2F2] dark:hover:bg-[#2A2A2A] data-[state=active]:bg-zinc-300 dark:data-[state=active]:bg-[#FAFAFA] dark:data-[state=active]:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#FAFAFA] transition-colors duration-300"
        >
          <span>
            <List className="w-3 h-3 mr-1 md:h-4 md:w-4 md:mr-2" />
          </span>
          All
        </TabsTrigger>

        <TabsTrigger
          value="pending"
          className="rounded-l-xl md:w-full md:rounded-[4px] text-xs md:text-base py-1 md:py-1.5 font-medium bg-[#FAFAFA] dark:bg-[#1C1C1C] hover:bg-[#F2F2F2] dark:hover:bg-[#2A2A2A] data-[state=active]:bg-zinc-300 dark:data-[state=active]:bg-[#FAFAFA] dark:data-[state=active]:text-[#1A1A1A] text-[#1A1A1A] dark:text-[#FAFAFA] transition-colors duration-300"
        >
          <span>
            <LoaderCircle className="w-3 h-3 mr-1 md:h-4 md:w-4 md:mr-2" />
          </span>
          Pending
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="w-full h-full mt-1">
        {/* TODO: handle loading later */}
        <Suspense fallback={<div>Loading...</div>}>
          <AdminAllNotes
            universityShortNames={universityShortNames}
            noteTypes={noteTypes}
          />
        </Suspense>
      </TabsContent>

      <TabsContent value="pending" className="w-full h-full mt-1">
        <AdminPendingNotes />
      </TabsContent>
    </Tabs>
  );
};

export default AdminPage;
