import React, { createContext } from 'react';

export interface CVFormData {
  fullName: string;
  selectedPartner: string;
  refNo?: string;
  date?: string;
  nationality?: string;
  religion?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  age?: string;
  height?: string;
  weight?: string;
  maritalStatus?: string;
  numberOfChildren?: string;
  phoneNo?: string;
  educationalQualification?: string;
  livingTown?: string;
  passportNumber?: string;
  passportDateOfIssue?: string;
  passportPlaceOfIssue?: string;
  passportDateOfExpiry?: string;
  headshotPhoto?: string;
  fullBodyPhoto?: string;
  passportScan?: string;
  medicalScan?: string;
  languages?: {
    arabic?: string;
    english?: string;
  };
  skills?: {
    babySitting?: boolean;
    washing?: boolean;
    cleaning?: boolean;
    cooking?: boolean;
    sewing?: boolean;
    driving?: boolean;
  };
  previousExperiences?: Array<{
    country: string;
    period?: string;
    years?: string;
    months?: string;
  }>;
}

export const defaultCVFormData: CVFormData = {
  fullName: 'LULA MESFEN GOSHU',
  selectedPartner: 'al_andalus',
  refNo: 'ANDALUS-2026-0892',
  date: '2026-10-16',
  nationality: 'Ethiopian',
  religion: 'Muslim',
  placeOfBirth: 'Addis Ababa',
  dateOfBirth: '1998-02-15',
  age: '28',
  height: '155',
  weight: '50',
  maritalStatus: 'Single',
  numberOfChildren: '0',
  phoneNo: '+251 911 234567',
  educationalQualification: 'Primary Education',
  passportNumber: 'EQ454545',
  passportDateOfIssue: '2026-10-15',
  passportPlaceOfIssue: 'Addis Ababa',
  passportDateOfExpiry: '2031-10-14',
  languages: {
    arabic: 'Basic',
    english: 'Basic',
  },
  skills: {
    babySitting: true,
    washing: true,
    cleaning: true,
    cooking: true,
    sewing: false,
    driving: false,
  },
  previousExperiences: [
    { country: 'Saudi Arabia', period: '2 Years, 3 Months' },
    { country: 'Oman', period: '1 Year, 6 Months' },
  ],
};

export interface CVFormContextType {
  formData: CVFormData;
  setFormData: React.Dispatch<React.SetStateAction<CVFormData>>;
}

export const CVFormContext = createContext<CVFormContextType>({
  formData: defaultCVFormData,
  setFormData: () => {},
});