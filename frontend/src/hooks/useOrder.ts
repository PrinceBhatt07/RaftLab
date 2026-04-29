import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getOrder } from "../services/order.service";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
    refetchInterval: 15000, // Poll every 15 seconds for real-time updates
    staleTime: 5000,
  });
};