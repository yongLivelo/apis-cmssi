import api from "./api";

export const searchApplicants = async (searchCriteria: object = {}) => {
  const response = await api.get("/searchApplicant", {
    params: searchCriteria, // Axios turns { name: "John", status: "Active" } into ?name=John&status=Active
  });
  return response.data;
};
export const getApplicant = async (id: number) => {
  const response = await api.get(`/getApplicant/${id}`);
  return response.data;
};

export const addApplicant = async (applicantData: object) => {
  const response = await api.post("/addApplicant", applicantData);
  return response.data;
};

export const updateApplicant = async (id: number, applicantData: object) => {
  const response = await api.patch(`/updateApplicant/${id}`, applicantData);
  return response.data;
};

export const deleteApplicant = async (id: number) => {
  const response = await api.delete(`/deleteApplicant/${id}`);
  return response.data;
};
