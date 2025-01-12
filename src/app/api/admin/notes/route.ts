import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
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

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const offset = (page - 1) * limit;

    const notes = await db.note.findMany({
      skip: offset,
      take: limit,
      include: {
        university: true,
        type: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await db.note.count();
    const totalPages = Math.ceil(totalCount / limit);

    const response = {
      notes,
      totalPages,
      currentPage: page,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "FETCHING_ADMIN_NOTES" },
      { status: 500 }
    );
  }
}
