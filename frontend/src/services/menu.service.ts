import apiClient from "./apiClient";

export const getMenu = async () => {
  const res = await apiClient.get("/menu");
  return res.data.data;
};