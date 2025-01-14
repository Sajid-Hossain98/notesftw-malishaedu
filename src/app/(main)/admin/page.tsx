import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAllNotes } from "./_components/admin-all-notes";
import { Suspense } from "react";

const AdminPage = () => {
  return (
    <Tabs
      defaultValue="all"
      className="md:flex md:justify-between md:gap-3 md:w-full"
    >
      {/* grid md:w-[80%] w-full grid-cols-3 mx-auto */}
      <TabsList className="md:flex md:flex-col md:items-center md:justify-start md:gap-2 md:bg-[#242424] md:max-h-fit md:rounded-xl md:px-2 md:py-2 grid md:max-w-[15%] w-full grid-cols-3 mt-2">
        <TabsTrigger
          value="all"
          className="rounded-l-xl md:w-full md:rounded-[2px] md:text-base bg-[#242424]"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="approved"
          className="md:text-base md:w-full md:rounded-[2px] bg-[#242424]"
        >
          Approved
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className="rounded-r-xl md:text-base md:w-full md:rounded-[2px] bg-[#242424]"
        >
          Pending
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="w-full h-full">
        {/* TODO: handle loading later */}
        <Suspense fallback={<div>Loading...</div>}>
          <AdminAllNotes />
        </Suspense>
      </TabsContent>
      <TabsContent value="approved">
        Only approved notes will be rendered here!
      </TabsContent>
      <TabsContent value="pending">
        Only pending notes will be rendered here!
      </TabsContent>
    </Tabs>
  );
};

export default AdminPage;
