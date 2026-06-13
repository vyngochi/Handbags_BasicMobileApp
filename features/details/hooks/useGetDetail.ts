import { useQuery } from "@tanstack/react-query";
import { getDetailHandBag } from "../services/getDetail";

export const useGetDetailHandbag = (id: string) => {
  return useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const response = await getDetailHandBag(id);
      return response.data;
    },
  });
};
