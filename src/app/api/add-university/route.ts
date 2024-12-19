import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { universityFullName, universityShortForm, logoImage } =
      await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse("Your are not allowed to perform this task", {
        status: 403,
      });
    }

    const university = await db.university.create({
      data: {
        universityFullName: universityFullName,
        universityShortName: universityShortForm,
        logoImage: logoImage,
      },
    });

    return NextResponse.json(
      { message: "University added successfully!", data: university },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("[ADD-UNIVERSITY]", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      error.meta?.target
    ) {
      return NextResponse.json(
        {
          error: `The university already exists`,
          details: error.meta.target, // Optional - for more error details
        },
        { status: 400 }
      );
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
