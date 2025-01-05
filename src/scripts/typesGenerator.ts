// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.type.createMany({
      data: [
        {
          name: "Apply",
          bgColor: "bg-blue-300",
          color: "#000",
        },
        {
          name: "Submit",
          bgColor: "bg-green-300",
          color: "#000",
        },
        {
          name: "Documents",
          bgColor: "bg-teal-300",
          color: "#000",
        },
        {
          name: "Content",
          bgColor: "bg-orange-300",
          color: "#000",
        },
        {
          name: "Assessment",
          bgColor: "bg-stone-300",
          color: "#000",
        },
        {
          name: "General",
          bgColor: "bg-amber-300",
          color: "#000",
        },
        {
          name: "Offer",
          bgColor: "bg-rose-400",
          color: "#ffffff",
        },
      ],
    });

    console.log("SUCCESSFULLY GENERATED TYPES");
  } catch (error) {
    console.log("Error generating the note types", error);
  } finally {
    await database.$disconnect();
  }
}

main();
