import ApplicantType from "./Applicant.type";
export default interface SearchType extends ApplicantType {
  religion: string;
  city: string;
  province: string;
  civilStatus: string;
  height: number;
  highSchoolGraduate: boolean;
  collegeGraduate: boolean;
}
