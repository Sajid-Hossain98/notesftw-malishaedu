import { fetchEmailCheckRanking } from "@/lib/fetch-email-checking-rank";
import { useQuery } from "@tanstack/react-query";

interface CheckingRank {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
}

export const useEmailCheckingRank = () => {
  return useQuery<CheckingRank[]>({
    queryKey: ["email-checking-rank"],
    queryFn: fetchEmailCheckRanking,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    retry: false,
  });
};
