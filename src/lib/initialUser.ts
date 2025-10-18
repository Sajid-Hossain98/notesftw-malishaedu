import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export const initialUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (existingUser) {
    const clerkRole = user.publicMetadata?.role;

    if (clerkRole !== existingUser.role) {
      (await clerkClient()).users.updateUserMetadata(user.id, {
        publicMetadata: {
          role: existingUser.role,
        },
      });
    }

    return existingUser;
  }

  const newUser = await db.user.create({
    data: {
      clerkUserId: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  (await clerkClient()).users.updateUserMetadata(user.id, {
    publicMetadata: {
      role: "USER",
    },
  });

  return newUser;
};
