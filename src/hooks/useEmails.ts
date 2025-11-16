import { User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Email {
  id: string;
  email: string;
  universities: { universityShortName: string }[];
  addedBy: User;
  lastCheckedBy: User;
  lastCheckedAt: Date | null;
  history?: {
    id: string;
    checkedAt: Date;
    checkedBy: User | null;
  }[];
}

interface FetchEmailsResponse {
  emails: Email[];
  nextCursor?: string;
}

export function useEmails({
  search,
  university,
}: {
  search?: string;
  university?: string;
}) {
  return useInfiniteQuery<FetchEmailsResponse>({
    queryKey: ["emails", search, university], // include university in queryKey
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }) => {
      const cursorParam = pageParam ? `&cursor=${pageParam}` : "";
      const universityParam = university ? `&university=${university}` : "";
      const response = await axios.get(
        `/api/emails?limit=20&search=${
          search || ""
        }${universityParam}${cursorParam}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
