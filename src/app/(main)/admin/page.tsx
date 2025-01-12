import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAllNotes } from "./_components/admin-all-notes";
// import { db } from "@/lib/db";

const AdminPage = () => {
  // const notes = db.note.findMany({
  //   include: {
  //     university: true,
  //     type: true,
  //   },
  // });

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid md:w-[80%] w-full grid-cols-3 mx-auto">
        <TabsTrigger value="all" className="rounded-l-xl bg-[#242424]">
          All
        </TabsTrigger>
        <TabsTrigger value="approved" className="bg-[#242424]">
          Approved
        </TabsTrigger>
        <TabsTrigger value="pending" className="rounded-r-xl bg-[#242424]">
          Pending
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="w-full h-full">
        <AdminAllNotes />
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
