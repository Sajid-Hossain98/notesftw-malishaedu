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

export async function PATCH(req: Request) {
  try {
    const { ruleId, rule, isProtected } = await req.json();

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

    if (!ruleId && !rule && isProtected === undefined) {
      return NextResponse.json(
        { error: "Rule ID or Protection missing" },
        { status: 404 }
      );
    }

    const updatedRule = await db.codeOfConduct.update({
      where: {
        id: ruleId,
      },
      data: {
        rule: rule,
        isProtected: isProtected,
      },
    });

    return NextResponse.json(updatedRule);
  } catch (error) {
    console.log("EDIT-RULE/CODE-OF-CONDUCT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { ruleId } = await req.json();

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

    if (!ruleId) {
      return NextResponse.json({ error: "Rule ID missing" }, { status: 404 });
    }

    await db.codeOfConduct.delete({
      where: {
        id: ruleId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Rule deleted successfully.",
    });
  } catch (error) {
    console.log("DELETE-RULE/CODE-OF-CONDUCT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
