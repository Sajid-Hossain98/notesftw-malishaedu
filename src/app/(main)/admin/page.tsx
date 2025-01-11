import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="grid md:w-[80%] w-full grid-cols-3 mx-auto">
        <TabsTrigger value="all" className="rounded-l-xl">
          All
        </TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="pending" className="rounded-r-xl">
          Pending
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        All the notes will be rendered here!
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
