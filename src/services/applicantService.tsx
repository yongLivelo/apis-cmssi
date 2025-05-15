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
  const response = await api.patch(
    `/updateApplicant/${applicationId}`,
    applicationData,
  );
  return response.data;
};

// ✅ Get upcoming applicant ID
export const getNextApplicantId = async () => {
  const response = await api.get(`/getNextApplicantId`);
  return response.data; // returns a number
};

// ✅ Get specific applicant by ID
export const getApplicantById = async (id: string) => {
  const response = await api.get(`/getApplicant/${id}`);
  return response.data; // returns an Applicant object
};
