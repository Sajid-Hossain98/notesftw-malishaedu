import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { emailId } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !(
        currentlyLoggedInUserData?.canViewProtected ||
        currentlyLoggedInUserData?.role === UserRole.ADMIN ||
        currentlyLoggedInUserData?.role === UserRole.MODERATOR
      )
    ) {
      return new NextResponse(
        "Sir, you are not allowed to perform this action.",
        {
          status: 403,
        }
      );
    }

    if (!emailId) {
      return NextResponse.json({ error: "email ID missing" }, { status: 404 });
    }

    const now = new Date();

    // 1️⃣ Update Email with last checked info
    const updatedEmail = await db.email.update({
      where: { id: emailId },
      data: {
        lastCheckedById: currentlyLoggedInUserData.id,
        lastCheckedAt: now,

        history: {
          create: {
            checkedById: currentlyLoggedInUserData.id,
            checkedAt: now,
          },
        },
      },
    });

    // 2️⃣ Insert into EmailCheckHistory
    await db.emailCheckHistory.create({
      data: {
        emailId: emailId,
        checkedById: currentlyLoggedInUserData.id,
        checkedAt: now,
      },
    });

    // 3️⃣ Delete history older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await db.emailCheckHistory.deleteMany({
      where: {
        checkedAt: { lt: thirtyDaysAgo },
      },
    });

    return NextResponse.json({ success: true, email: updatedEmail });
  } catch (error) {
    console.error("CHECK EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
