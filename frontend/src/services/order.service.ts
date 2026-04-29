import apiClient from "./apiClient";

export const createOrder = async (payload: any) => {
  const res = await apiClient.post("/orders", payload);
  return res.data.data;
};

export const getOrder = async (id: string) => {
  const res = await apiClient.get(`/orders/${id}`);
  return res.data.data;
};

export const getAllOrders = async () => {
  const res = await apiClient.get("/orders");
  return res.data.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await apiClient.patch(`/orders/${id}/status`, { status });
  return res.data.data;
};