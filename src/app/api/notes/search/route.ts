import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Note, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentlyLoggedInUser = await currentUser();
  const currentlyLoggedInUserData = await currentUserData();

  if (!currentlyLoggedInUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (
    currentlyLoggedInUserData?.role !== UserRole.ADMIN &&
    currentlyLoggedInUserData?.role !== UserRole.MODERATOR
  ) {
    return new NextResponse("Your are not allowed to view these items!", {
      status: 403,
    });
  }

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
