import api from "./api";

export const getApplicants = async () => {
  const response = await api.get("/getApplicants");
  return response.data;
};

export const addApplicant = async (transactionData: object) => {
  const response = await api.post("/addApplicant", transactionData);
  return response.data;
};

export const deleteApplicant = async (transactionData: object) => {
  const response = await api.post("/deleteApplicant", transactionData);
  return response.data;
};
