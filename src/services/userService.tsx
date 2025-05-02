import api from "./api";

export const login = async (userData: object) => {
  const response = await api.post(`/login`, userData);
  return response.data;
};

export const register = async (userData: object) => {
  const response = await api.post(`/register`, userData);
  return response.data;
};

export const deleteUser = async (applicationId: string) => {
  const response = await api.delete(`/deleteApplicant/${applicationId}`);
  return response.data;
};

export const getApplicants = async () => {
  const response = await api.get(`/getUsers`);
  return response.data;
};
