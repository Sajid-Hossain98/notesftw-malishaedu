import { db } from "@/lib/db";
import { Note } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Getting the search query parameter
  const url = new URL(request.url);
  const searchedUniversity = url.searchParams.get("university") || "";

  if (!searchedUniversity) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const notes = await db.note.findMany({
      where: {
        OR: [
          {
            university: {
              universityFullName: {
                contains: searchedUniversity,
                mode: "insensitive",
              },
            },
          },
          {
            university: {
              universityShortName: {
                contains: searchedUniversity,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: searchedUniversity,
              mode: "insensitive",
            },
          },
          {
            AND: [
              {
                type: {
                  name: "Offer",
                },
              },
              {
                description: {
                  contains: searchedUniversity,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      include: {
        university: true,
        type: true,
      },
    });

    const groupedNotes = notes.reduce((acc: Record<string, Note[]>, note) => {
      const typeName = note.type.name;

      if (!acc[typeName]) {
        acc[typeName] = [];
      }

      acc[typeName].push(note);

      return acc;
    }, {});

    return NextResponse.json(groupedNotes);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error fetching searched notes" },
      { status: 500 }
    );
  }
}
