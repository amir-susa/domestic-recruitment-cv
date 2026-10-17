import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface PreviousExperience {
  country: string;
  years?: string;
  months?: string;
  period: string;
}

export interface Languages {
  arabic?: string;
  english?: string;
}

export interface Skills {
  babySitting?: boolean;
  washing?: boolean;
  cleaning?: boolean;
  cooking?: boolean;
  sewing?: boolean;
  driving?: boolean;
}

export interface CVFormData {
  fullName: string;
  selectedPartner?: string;
  refNo?: string;
  date?: string;
  nationality?: string;
  religion?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  age?: string;
  maritalStatus?: string;
  numberOfChildren?: string;
  height?: string;
  weight?: string;
  phoneNo?: string;
  educationalQualification?: string;
  passportNumber?: string;
  passportDateOfIssue?: string;
  passportDateOfExpiry?: string;
  passportPlaceOfIssue?: string;
  languages?: Languages;
  skills?: Skills;
  previousExperiences?: PreviousExperience[];
  headshotPhoto?: string;
  fullBodyPhoto?: string;
  passportScan?: string;
  medicalScan?: string;
}

export const defaultCVFormData: CVFormData = {
  fullName: 'LULA MESFEN GOSHU',
  selectedPartner: 'darein',
  refNo: 'DAREIN-2026-0892',
  date: '2026-10-17',
  nationality: 'Ethiopian',
  religion: 'Christian',
  placeOfBirth: 'Addis Ababa',
  dateOfBirth: '1998-02-15',
  age: '28',
  maritalStatus: 'Single',
  numberOfChildren: '0',
  height: '160.0',
  weight: '52.0',
  phoneNo: '+251911223344',
  educationalQualification: 'Primary',
  passportNumber: 'EQ454545',
  passportDateOfIssue: '2021-10-15',
  passportDateOfExpiry: '2026-10-14',
  passportPlaceOfIssue: 'ADDIS ABABA',
  languages: {
    english: 'poor',
    arabic: 'fluent',
  },
  skills: {
    babySitting: true,
    washing: true,
    cleaning: true,
    cooking: true,
    sewing: true,
    driving: false,
  },
  previousExperiences: [],
};

interface CVFormContextType {
  formData: CVFormData;
  setFormData: React.Dispatch<React.SetStateAction<CVFormData>>;
  resetForm: () => void;
}

export const CVFormContext = createContext<CVFormContextType | undefined>(undefined);

export const CVFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CVFormData>(() => {
    const saved = localStorage.getItem('magic_cv_form_draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultCVFormData;
      }
    }
    return defaultCVFormData;
  });

  useEffect(() => {
    localStorage.setItem('magic_cv_form_draft', JSON.stringify(formData));
  }, [formData]);

  const resetForm = () => {
    localStorage.removeItem('magic_cv_form_draft');
    setFormData(defaultCVFormData);
  };

  return (
    <CVFormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </CVFormContext.Provider>
  );
};

export function useCVForm() {
  const context = useContext(CVFormContext);
  if (!context) {
    throw new Error('useCVForm must be used within a CVFormProvider');
  }
  return context;
}