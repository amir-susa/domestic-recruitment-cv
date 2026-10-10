import type { CVFormView, PhotoField } from "./tesnim-form-factory";

export type {
  CVFormData,
  CVExperience,
  ExperienceField,
  ApplicationDetailField,
  PassportDetailField,
} from "./tesnim-form-factory";

export type { SkillOption } from "./tesnim-skill-options";

export type PhotoOption = PhotoField;

export type ResumeData = {
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  maritalStatus: string;
  noOfChildren: string;
  weight: string;
  height: string;
  education: string;
  nationality: string;
  religion: string;
  languages: { english: string; arabic: string };
  passportNumber: string;
  passportIssueDate: string;
  passportIssuePlace: string;
  passportExpiryDate: string;
  applicantPhoto: string | null;
  fullPhoto: string | null;
  passportPhoto: string | null;
  experiences: Array<{ country: string; period: string }>;
  skillsSummary: string;
  date: string;
  serialNo: string;
};

export function toResumeData(view: CVFormView): ResumeData {
  const {
    form,
    photos,
    experiences,
    skillsSummary,
    date,
    serialNo,
  } = view;

  const passport = photos.find((photo) => photo.field === "passportPhoto");
  const applicant = photos.find((photo) => photo.field === "applicantPhoto");

  return {
    fullName: form.fullName,
    dateOfBirth: form.dateOfBirth,
    placeOfBirth: form.placeOfBirth,
    maritalStatus: form.maritalStatus,
    noOfChildren: form.children,
    weight: form.weight,
    height: form.height,
    education: form.education,
    nationality: form.nationality,
    religion: form.religion,
    languages: form.languages,
    passportNumber: form.passportNumber,
    passportIssueDate: form.passportIssueDate,
    passportIssuePlace: form.passportIssuePlace,
    passportExpiryDate: form.passportExpiryDate,
    applicantPhoto: applicant?.image ?? null,
    fullPhoto: photos.find((photo) => photo.field === "fullPhoto")?.image ?? null,
    passportPhoto: passport?.image ?? null,
    experiences: experiences.map((experience) => ({
      country: experience.label,
      period: experience.value,
    })),
    skillsSummary,
    date,
    serialNo,
  };
}
