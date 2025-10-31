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

export async function PATCH(req: Request) {
  try {
    const { id, title, description, expiresOn } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse("You are not allowed to perform this action.", {
        status: 403,
      });
    }

    if (!title) {
      return NextResponse.json(
        { error: "Title can't be empty" },
        { status: 404 }
      );
    }

    const updatedNotice = await db.notice.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        expiresOn: expiresOn,
      },
    });

    return NextResponse.json(updatedNotice, {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json(
      { error: "UPDATING_ADMIN_NOTICE" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { noticeId } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse(
        "Sir, you are not allowed to perform this action.",
        {
          status: 403,
        }
      );
    }

    if (!noticeId) {
      return NextResponse.json({ error: "Notice ID missing" }, { status: 404 });
    }

    await db.notice.delete({
      where: {
        id: noticeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.log("DELETE-NOTICE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
