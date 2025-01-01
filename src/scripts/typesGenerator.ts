// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.type.createMany({
      data: [
        { name: "General", color: "#000", bgColor: "bg-rose-300" },
        { name: "Apply", color: "#000000", bgColor: "bg-slate-200" },
        { name: "Submit", color: "#F7F7F7", bgColor: "bg-green-400" },
        { name: "Assessment", color: "#ebf4fa", bgColor: "bg-blue-400" },
        { name: "Offer", color: "#F7F7F7", bgColor: "bg-pink-400" },
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
