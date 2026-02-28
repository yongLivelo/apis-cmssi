import api from "./api";

export const getApplicants = async () => {
  const response = await api.get("/getAllApplicants");
  return response.data;
};

export const addApplicant = async (transactionData: object) => {
  const response = await api.post("/addApplicant", transactionData);
  return response.data;
};

export const deleteApplicant = async (id: number) => {
  const response = await api.delete(`/deleteApplicant/${id}`);
  return response.data;
};
