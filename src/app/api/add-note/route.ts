import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, universityShortForm, noteType, noteDescription } =
      await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      currentlyLoggedInUserData?.role !== "ADMIN" &&
      currentlyLoggedInUserData?.role !== "MODERATOR"
    ) {
      return new NextResponse("Your are not allowed to perform this task", {
        status: 403,
      });
    }

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
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.log("ADD-NOTE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
