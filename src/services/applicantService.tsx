import api from "./api";

export const getApplicants = async () => {
  const response = await api.get(`/getApplicants`);
  return response.data;
};

export const addApplicant = async (applicationData: object) => {
  const response = await api.post(`/addApplicant`, applicationData);
  return response.data;
};

export const deleteApplicant = async (applicationId: string) => {
  const response = await api.delete(`/deleteApplicant/${applicationId}`);
  return response.data;
};

export const updateApplicant = async (
  applicationId: string,
  applicationData: object,
) => {
  const response = await api.put(
    `/updateApplicant/${applicationId}`,
    applicationData,
  );
  return response.data;
};
