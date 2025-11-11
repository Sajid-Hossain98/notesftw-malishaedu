import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, universities } = await req.json();

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

    if (!email && !universities) {
      return NextResponse.json(
        { error: "email or universities missing" },
        { status: 404 }
      );
    }

    const emails = await db.email.create({
      data: {
        email: email,
        universities: {
          connect: universities.map((university: { value: string }) => ({
            universityShortName: university.value,
          })),
        },

        addedBy: {
          connect: {
            clerkUserId: currentlyLoggedInUser?.id,
          },
        },
      },
    });

    return NextResponse.json(emails, { status: 201 });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new NextResponse("Email already exists", {
          status: 409,
        });
      }
    }

    return new NextResponse("Something went wrong on the server.", {
      status: 500,
    });
  }
}
