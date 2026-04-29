import apiClient from "./apiClient";

export const adminLogin = async (payload: {
  email: string;
  password?: string;
}) => {
  const res = await apiClient.post("/auth/admin", payload);
  return res.data.data;
};