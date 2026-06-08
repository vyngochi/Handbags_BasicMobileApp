import { useQuery } from "@tanstack/react-query";
import { getAllHandBags } from "../services/handbags.service";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useGetAllHandbags = () => {
  return useQuery({
    queryKey: ["handbags"],
    queryFn: async () => {
      await delay(500);
      const response = await getAllHandBags();
      return response.data;
    },
  });
};
