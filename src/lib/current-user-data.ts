import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentUserData = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const currentUserData = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return currentUserData;
};
