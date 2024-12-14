// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.type.createMany({
      data: [{ name: "General", color: "#ffffff", bgColor: "bg-green-400" }],
    });

    console.log("SUCCESSFULLY GENERATED TYPES");
  } catch (error) {
    console.log("Error generating the note types", error);
  } finally {
    await database.$disconnect();
  }
}

main();
