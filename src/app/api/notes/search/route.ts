import { db } from "@/lib/db";
import { Note, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  // Getting the search query parameter
  const url = new URL(request.url);
  const searchedUniversity = url.searchParams.get("search") || "";

  if (!searchedUniversity) {
    return NextResponse.json([], { status: 400 });
  }

  let canViewProtected: boolean = false;

  const currentlyLoggedInUser = await currentUser();

  try {
    if (currentlyLoggedInUser) {
      const currentUser = await db.user.findUnique({
        where: {
          clerkUserId: currentlyLoggedInUser?.id,
        },
        select: {
          role: true,
          canViewProtected: true,
        },
      });

      canViewProtected =
        currentUser?.role === "ADMIN" ||
        currentUser?.role === "MODERATOR" ||
        currentUser?.canViewProtected === true;
    }

    const baseWhere: Prisma.NoteWhereInput = {
      OR: [
        {
          university: {
            is: {
              universityFullName: {
                contains: searchedUniversity,
                mode: "insensitive",
              },
            },
          },
        },
        {
          university: {
            is: {
              universityShortName: {
                contains: searchedUniversity,
                mode: "insensitive",
              },
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
                is: {
                  name: "Offer",
                },
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
      ...(canViewProtected ? {} : { isProtected: false }),
    };

    const notes = await db.note.findMany({
      where: baseWhere,
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
