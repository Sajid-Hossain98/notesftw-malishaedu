import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();
    if (!currentlyLoggedInUser)
      return new NextResponse("Unauthorized", { status: 401 });
    if (
      !(
        currentlyLoggedInUserData?.canViewProtected ||
        currentlyLoggedInUserData?.role === UserRole.ADMIN ||
        currentlyLoggedInUserData?.role === UserRole.MODERATOR
      )
    ) {
      return new NextResponse(
        "Sir, you are not allowed to perform this action.",
        { status: 403 }
      );
    }

    const activitiesRank = await db.user.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        _count: {
          select: {
            emailCheckedBy: true,
          },
        },
      },
      orderBy: {
        emailCheckedBy: {
          _count: "desc",
        },
      },
    });

    return NextResponse.json(activitiesRank, { status: 201 });
  } catch (error) {
    console.error("GET /api/emails error:", error);
    return NextResponse.json(
      { error: "Error fetching emails" },
      { status: 500 }
    );
  }
}
