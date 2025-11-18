import { CheckingRank } from "@/types";
import axios from "axios";

type RawRankUser = {
  id: string;
  name: string;
  imageUrl: string;
  _count: {
    emailCheckedBy: number;
  };
};

export const fetchEmailCheckRanking = async (): Promise<CheckingRank[]> => {
  try {
    const { data } = await axios.get<RawRankUser[]>(
      "/api/emails/email-check-history/check-rank"
    );

    return data.map((user) => ({
      id: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
      count: user._count.emailCheckedBy,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw {
          status: error.response.status,
          message:
            error.response.data?.message || "Failed to fetch rank history",
        };
      } else {
        throw new Error("Network error. Could not reach the server.");
      }
    }

    throw new Error("An unexpected error occurred");
  }
};
