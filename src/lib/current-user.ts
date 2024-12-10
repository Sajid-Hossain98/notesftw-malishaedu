import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const currentUser = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return currentUser;
};
