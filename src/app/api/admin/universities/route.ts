import { currentUserData } from "@/lib/current-user-data";
import { db } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const currentlyLoggedInUser = await currentUser();
  const currentlyLoggedInUserData = await currentUserData();

  if (!currentlyLoggedInUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (
    currentlyLoggedInUserData?.role !== UserRole.ADMIN &&
    currentlyLoggedInUserData?.role !== UserRole.MODERATOR
  ) {
    return new NextResponse("You are not allowed to view these items!", {
      status: 403,
    });
  }

  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("searched_university") || "";

    const whereClause = search
      ? {
          OR: [
            {
              universityFullName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              universityShortName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const universities = await db.university.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(universities, { status: 200 });
  } catch (error) {
    console.error("Error searching university:", error);
    return NextResponse.json(
      { error: "SEARCHING_ADMIN_UNIVERSITY" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, universityShortName, universityFullName } = await req.json();

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      currentlyLoggedInUserData?.role !== UserRole.ADMIN &&
      currentlyLoggedInUserData?.role !== UserRole.MODERATOR
    ) {
      return new NextResponse("You are not allowed to perform this action.", {
        status: 403,
      });
    }

    const updatedUniversity = await db.university.update({
      where: {
        id: id,
      },
      data: {
        universityShortName: universityShortName,
        universityFullName: universityFullName,
      },
    });

    return NextResponse.json(updatedUniversity, {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating university:", error);
    return NextResponse.json(
      { error: "UPDATING_ADMIN_UNIVERSITY" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { universityId, logoImage } = await req.json();

    if (!universityId) {
      return new NextResponse("University ID missing", {
        status: 400,
      });
    }

    const currentlyLoggedInUser = await currentUser();
    const currentlyLoggedInUserData = await currentUserData();

    if (!currentlyLoggedInUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (currentlyLoggedInUserData?.role !== UserRole.ADMIN) {
      return new NextResponse("You are not allowed to perform this action.", {
        status: 403,
      });
    }

    if (logoImage) {
      const supabaseClient = createSupabaseServerClient();

      const { error: storageError } = await supabaseClient.storage
        .from("uni_logo_images")
        .remove([logoImage]);

      if (storageError) {
        console.error("Supabase file deletion error:", storageError);

        return new NextResponse("Failed to delete logo image from storage!", {
          status: 500,
        });
      }
    }

    await db.university.delete({
      where: {
        id: universityId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "University deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting university:", error);
    return NextResponse.json(
      { error: "DELETING_ADMIN_UNIVERSITY" },
      { status: 500 }
    );
  }
}
