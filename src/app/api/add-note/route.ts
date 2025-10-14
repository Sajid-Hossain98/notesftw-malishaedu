import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      universityShortForm,
      noteType,
      noteDescription,
      isProtected,
    } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //to check if ADMIN and MODERATOR?
    const isAdmin = currentlyLoggedInUserData?.role === UserRole.ADMIN;
    const isModerator = currentlyLoggedInUserData?.role === UserRole.MODERATOR;

    //to find the university for which the note is being added
    const university = await db.university.findFirst({
      where: {
        universityShortName: universityShortForm.value,
      },
    });

    if (!university) {
      return new NextResponse("University not found", { status: 404 });
    }

    //to find the note type
    const type = await db.type.findUnique({
      where: {
        name: noteType.value,
      },
    });

    if (!type) {
      return new NextResponse("Note type not found", { status: 404 });
    }

    const note = await db.note.create({
      data: {
        title: title,
        description: noteDescription,
        approval: isAdmin || isModerator ? "APPROVED" : "PENDING",
        user: {
          connect: { id: currentlyLoggedInUserData?.id },
        },
        university: {
          connect: { id: university?.id },
        },
        type: {
          connect: {
            id: type?.id,
          },
        },
        isProtected: isProtected,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.log("ADD-NOTE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
