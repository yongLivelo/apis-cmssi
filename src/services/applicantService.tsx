import api from "./api";
const controller = "api/applicant";
const searchApplicants = async (transactionData: object) => {
  const response = await api.post(`/${controller}/search`, transactionData);
  return response.data;
};

const getApplicantById = async (id: number) => {
  const response = await api.get(`${controller}/get/${id}`);
  return response.data;
};

const getNextApplicantId = async () => {
  const response = await api.get(`${controller}/getNextId`);
  return response.data;
};

const saveApplicant = async (transactionData: object) => {
  const response = await api.post(`/${controller}/save`, transactionData);
  return response.data;
};

const deleteApplicant = async (id: number) => {
  const response = await api.delete(`${controller}/delete/${id}`);
  return response.data;
};

const updateApplicant = async (id: number, transactionData: object) => {
  const response = await api.put(`${controller}/update/${id}`, transactionData);
  return response.data;
};

const uploadApplicantImage = async (id: number, formData: FormData) => {
  const response = await api.post(`${controller}/${id}/image`, formData);
  return response.data;
};

const downloadApplicantImage = async (id: number) => {
  const response = await api.get(`${controller}/${id}/image`, {
    responseType: "blob",
  });
  return response.data;
};

const deleteApplicantImage = async (id: number) => {
  const response = await api.delete(`${controller}/${id}/image`);
  return response.data;
};

export {
  searchApplicants,
  getApplicantById,
  saveApplicant,
  deleteApplicant,
  updateApplicant,
  getNextApplicantId,
  uploadApplicantImage,
  downloadApplicantImage,
  deleteApplicantImage,
};
