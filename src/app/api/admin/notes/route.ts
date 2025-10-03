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

    const search = searchParams.get("search") || "";

    const offset = (page - 1) * limit;

    const notes = await db.note.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [
          {
            university: {
              universityFullName: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            university: {
              universityShortName: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        university: true,
        type: true,
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await db.note.count({
      where: {
        OR: [
          {
            university: {
              universityFullName: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            university: {
              universityShortName: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
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

export async function PATCH(req: Request) {
  const {
    id,
    title,
    universityShortForm,
    noteType,
    noteDescription,
    approval,
  } = await req.json();

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
    const university = await db.university.findUnique({
      where: {
        universityShortName: universityShortForm.value,
      },
    });

    const type = await db.type.findUnique({
      where: {
        name: noteType.value,
      },
    });

    if (!university || !type) {
      return NextResponse.json(
        { error: "University or Type not found" },
        { status: 404 }
      );
    }

    const updatedNote = await db.note.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        universityId: university.id,
        typeId: type.id,
        description: noteDescription,
        approval: approval.value,
      },
    });

    console.log(updatedNote);

    return NextResponse.json(updatedNote, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "FETCHING_ADMIN_NOTES" },
      { status: 500 }
    );
  }
}
