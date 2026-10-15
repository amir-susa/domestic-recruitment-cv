import React, { createContext, useContext, useState } from "react";

export interface ExperienceItem {
  country: string;
  years: string;
  months: string;
  period?: string;
}

export interface CVFormData {
  refNo: string;
  date: string;
  fullName: string;
  nationality: string;
  religion: string;
  placeOfBirth: string;
  dateOfBirth: string;
  age: string;
  livingTown: string;
  maritalStatus: string;
  numberOfChildren: string;
  phoneNo: string;
  height: string;
  weight: string;
  educationalQualification: string;
  passportNumber: string;
  passportDateOfIssue: string;
  passportPlaceOfIssue: string;
  passportDateOfExpiry: string;
  languages: {
    arabic: string;
    english: string;
  };
  skills: {
    babySitting: boolean;
    washing: boolean;
    cleaning: boolean;
    cooking: boolean;
  };
  previousExperiences: ExperienceItem[];
  headshotPhoto: string | null;
  fullBodyPhoto: string | null;
  passportScan: string | null;
  medicalScan: string | null;
  selectedPartner: string;
}

interface CVFormContextType {
  formData: CVFormData;
  setFormData: React.Dispatch<React.SetStateAction<CVFormData>>;
  updateFormField: (field: keyof CVFormData, value: any) => void;
  resetForm: () => void;
}

const initialFormData: CVFormData = {
  refNo: "ANDALUS-2026-0892",
  date: new Date().toISOString().split("T")[0],
  fullName: "",
  nationality: "Ethiopian",
  religion: "Muslim",
  placeOfBirth: "Addis Ababa",
  dateOfBirth: "",
  age: "",
  livingTown: "Addis Ababa",
  maritalStatus: "Single",
  numberOfChildren: "0",
  phoneNo: "",
  height: "155",
  weight: "50",
  educationalQualification: "Primary Education",
  passportNumber: "",
  passportDateOfIssue: "",
  passportPlaceOfIssue: "Addis Ababa",
  passportDateOfExpiry: "",
  languages: {
    arabic: "Basic",
    english: "Basic",
  },
  skills: {
    babySitting: true,
    washing: true,
    cleaning: true,
    cooking: true,
  },
  previousExperiences: [{ country: "Saudi Arabia", years: "2", months: "0" }],
  headshotPhoto: null,
  fullBodyPhoto: null,
  passportScan: null,
  medicalScan: null,
  selectedPartner: "al_andalus",
};

const CVFormContext = createContext<CVFormContextType | undefined>(undefined);

export const CVFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CVFormData>(initialFormData);

  const updateFormField = (field: keyof CVFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "dateOfBirth" && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        updated.age = age > 0 ? age.toString() : "";
      }

      if (field === "passportDateOfIssue" && value) {
        const issueDate = new Date(value);
        if (!isNaN(issueDate.getTime())) {
          const expiryDate = new Date(issueDate);
          expiryDate.setFullYear(expiryDate.getFullYear() + 5);
          expiryDate.setDate(expiryDate.getDate() - 1);
          updated.passportDateOfExpiry = expiryDate.toISOString().split("T")[0];
        }
      }

      return updated;
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <CVFormContext.Provider value={{ formData, setFormData, updateFormField, resetForm }}>
      {children}
    </CVFormContext.Provider>
  );
};

export const useCVForm = () => {
  const context = useContext(CVFormContext);
  if (!context) {
    throw new Error("useCVForm must be used within a CVFormProvider");
  }
  return context;
};