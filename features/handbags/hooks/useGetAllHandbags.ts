import { useQuery } from "@tanstack/react-query";
import { getAllHandBags } from "../services/handbags.service";

export const useGetAllHandbags = () => {
  return useQuery({
    queryKey: ["handbags"],
    queryFn: async () => {
      const response = await getAllHandBags();
      return response.data;
    },
  });
};
