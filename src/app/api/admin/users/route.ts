import { NextResponse } from "next/server";
import { currentUserData } from "@/lib/current-user-data";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { userId, newRole } = await req.json();

    if (!userId && !newRole) {
      return NextResponse.json(
        { error: "User ID/Role is missing" },
        { status: 404 }
      );
    }

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse("Your are not allowed to perform this action!", {
        status: 403,
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    return NextResponse.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    console.error("Error changing role:", error);
    return NextResponse.json(
      { error: "CHANGING_ROLES_USERS_ADMIN" },
      { status: 500 }
    );
  }
}
