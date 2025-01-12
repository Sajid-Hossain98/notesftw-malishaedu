import axios from "axios";

export const fetchPaginatedNotes = async (
  page: number,
  limit: number,
  search: string
) => {
  try {
    const { data } = await axios.get(`/api/admin/notes`, {
      params: { page, limit, search },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw {
          status: error.response.status,
          message: error.response.data?.message || "Failed to fetch notes",
        };
      } else {
        throw new Error("Network error. Could not reach the server.");
      }
    }

    throw new Error("An unexpected error occurred");
  }
};
