import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, expiresOn } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse("You are not allowed to perform this action!", {
        status: 403,
      });
    }

    if (!title) {
      return new NextResponse("Title is missing", { status: 404 });
    }

    const notice = await db.notice.create({
      data: {
        title: title,
        description: description,
        expiresOn: expiresOn,

        user: {
          connect: { id: currentlyLoggedInUserData?.id },
        },
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    console.log("ADD-NOTICE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
