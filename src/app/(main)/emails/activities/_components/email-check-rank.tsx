"use client";

import { useEmailCheckingRank } from "@/hooks/use-email-checking-rank";

export const EmailCheckRank = () => {
  const { data, isLoading, isError } = useEmailCheckingRank();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading ranking</p>;

  return (
    <div>
      {data?.map((user, index) => (
        <div key={user.id}>
          #{index + 1} - {user.name} ({user.count})
        </div>
      ))}
    </div>
  );
};
