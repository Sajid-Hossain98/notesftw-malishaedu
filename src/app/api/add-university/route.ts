import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { universityFullName, universityShortForm, logoImage } =
      await req.json();

    const currentlyLoggedInUser = await currentUser();
    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const university = await db.university.create({
      data: {
        universityFullName: universityFullName,
        universityShortName: universityShortForm,
        logoImage: logoImage,
      },
    });

    return NextResponse.json(university);
  } catch (error) {
    console.log("[ADD-UNIVERSITY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
