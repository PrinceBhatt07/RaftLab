import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../services/menu.service";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: getMenu
  });
};