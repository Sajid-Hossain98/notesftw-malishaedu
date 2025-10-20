import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rule, isProtected } = await req.json();

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

    const codeOfConduct = await db.codeOfConduct.create({
      data: {
        rule: rule,
        isProtected: isProtected,
      },
    });

    return NextResponse.json(codeOfConduct, { status: 201 });
  } catch (error) {
    console.log("ADD-RULE/CODE-OF-CONDUCT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
