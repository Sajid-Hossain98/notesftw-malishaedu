"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () => new QueryClient()
    //   {
    //   defaultOptions: {
    //     queries: {
    //       staleTime: 30 * 24 * 60 * 60 * 1000,
    //       gcTime: 60 * 24 * 60 * 60 * 1000,
    //     },
    //   },
    // }
  );

  // useEffect(() => {
  //   const localStoragePersister = createSyncStoragePersister({
  //     storage: window.localStorage,
  //     key: "REACT_QUERY_CACHE",
  //   });

  //   persistQueryClient({
  //     queryClient,
  //     persister: localStoragePersister,
  //     maxAge: 30 * 24 * 60 * 60 * 1000, // Persist for 30 days
  //   });
  // }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
