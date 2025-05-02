export interface ApplicantType {
  applicantId: string;
  age: number;
  birthDate: string;
  sex: string;
  desiredPosition: string;
  lastName: string;
  firstName: string;
  middleName: string;
  applicationDate: string;
  applicationStatus: string;
  trainingStatus: string;
}

export interface SearchType extends ApplicantType {
  religion: string;
  city: string;
  province: string;
  civilStatus: string;
  height: number;
  highSchoolGraduate: boolean;
  collegeGraduate: boolean;
}
