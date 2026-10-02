import {
  createContext,
  useEffect,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLanguageLevels,
  skills as skillOptions,
} from "../data/applicationForm";

export type CVExperience = {
  country: string;
  period: string;
};

export type CVFormData = {
  date: string;
  serialNo: string;
  fullName: string;
  applicantPhoto: string | null;
  fullPhoto: string | null;
  passportPhoto: string | null;
  nationality: string;
  religion: string;
  dateOfBirth: string;
  age: string;
  placeOfBirth: string;
  maritalStatus: string;
  children: string;
  weight: string;
  height: string;
  education: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuePlace: string;
  passportExpiryDate: string;
  languages: {
    english: string;
    arabic: string;
  };
  experiences: CVExperience[];
  skills: Record<string, boolean>;
};

type PhotoField = "applicantPhoto" | "fullPhoto" | "passportPhoto";
type TextField = Exclude<
  keyof CVFormData,
  PhotoField | "languages" | "experiences" | "skills"
>;
type Language = keyof CVFormData["languages"];
type ExperienceField = keyof CVExperience;

type CVFormContextValue = {
  formData: CVFormData;
  updateField: (field: TextField, value: string) => void;
  updateLanguage: (language: Language, value: string) => void;
  updateExperience: (
    index: number,
    field: ExperienceField,
    value: string,
  ) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  toggleSkill: (skillId: string) => void;
  setPhoto: (field: PhotoField, photo: string | null) => void;
  clearForm: () => void;
  startNewCV: () => void;
};

const CVFormContext = createContext<CVFormContextValue | undefined>(undefined);

function parseBirthDate(value: string) {
  const trimmedValue = value.trim();
  const yearFirstMatch = trimmedValue.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  const dayFirstMatch = trimmedValue.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);

  let year: number;
  let month: number;
  let day: number;

  if (yearFirstMatch) {
    year = Number(yearFirstMatch[1]);
    month = Number(yearFirstMatch[2]);
    day = Number(yearFirstMatch[3]);
  } else if (dayFirstMatch) {
    day = Number(dayFirstMatch[1]);
    month = Number(dayFirstMatch[2]);
    year = Number(dayFirstMatch[3]);
  } else {
    return null;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return null;

  return { year, month, day };
}

export function calculateAge(dateOfBirth: string, today = new Date()) {
  const birthDate = parseBirthDate(dateOfBirth);
  if (!birthDate) return "";

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  if (
    birthDate.year > currentYear ||
    (birthDate.year === currentYear && birthDate.month > currentMonth) ||
    (birthDate.year === currentYear && birthDate.month === currentMonth && birthDate.day > currentDay)
  ) {
    return "";
  }

  const birthdayHasOccurred =
    currentMonth > birthDate.month ||
    (currentMonth === birthDate.month && currentDay >= birthDate.day);
  const age = currentYear - birthDate.year - (birthdayHasOccurred ? 0 : 1);
  return String(age);
}

export function calculatePassportExpiry(
  passportNumber: string,
  dateOfBirth: string,
  issueDate: string,
) {
  const issue = parseBirthDate(issueDate);
  if (!issue) return "";

  const normalizedNumber = passportNumber.trim().toUpperCase();
  let validityYears: number;

  if (normalizedNumber.startsWith("EQ") || normalizedNumber.startsWith("EP")) {
    validityYears = 5;
  } else if (normalizedNumber.startsWith("E")) {
    const ageAtIssue = calculateAge(
      dateOfBirth,
      new Date(issue.year, issue.month - 1, issue.day),
    );
    if (!ageAtIssue) return "";
    validityYears = Number(ageAtIssue) < 25 ? 5 : 10;
  } else {
    return "";
  }

  const expiryYear = issue.year + validityYears;
  const expiryDay = Math.min(
    issue.day,
    new Date(expiryYear, issue.month, 0).getDate(),
  );
  const expiryDate = new Date(expiryYear, issue.month - 1, expiryDay);
  expiryDate.setDate(expiryDate.getDate() - 1);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${expiryDate.getFullYear()}-${pad(expiryDate.getMonth() + 1)}-${pad(expiryDate.getDate())}`;
}

const FORM_STORAGE_KEY = "darein-cv-form-v1";
const FORM_METADATA_KEY = "darein-cv-form-metadata-v1";

function formatLocalDateTime(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function createSerialNumber(date: Date) {
  const dateCode = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const counterKey = `darein-cv-serial-${dateCode}`;

  try {
    const nextSerial = Number(localStorage.getItem(counterKey) ?? "0") + 1;
    localStorage.setItem(counterKey, String(nextSerial));
    return `CV-${dateCode}-${String(nextSerial).padStart(4, "0")}`;
  } catch {
    const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : String(date.getTime()).slice(-8);
    return `CV-${dateCode}-${suffix}`;
  }
}

function createDefaultFormData(): CVFormData {
  return {
    date: "",
    serialNo: "",
    fullName: "",
    applicantPhoto: null,
    fullPhoto: null,
    passportPhoto: null,
    nationality: "Ethiopia",
    religion: "",
    dateOfBirth: "",
    age: "",
    placeOfBirth: "",
    maritalStatus: "",
    children: "",
    weight: "",
    height: "",
    education: "",
    passportNumber: "",
    passportIssueDate: "",
    passportIssuePlace: "Addis Ababa",
    passportExpiryDate: "",
    languages: { ...defaultLanguageLevels },
    experiences: [{ country: "", period: "" }],
    skills: Object.fromEntries(
      skillOptions.map(({ id, checked }) => [id, checked]),
    ),
  };
}

function createFreshFormData(now = new Date()): CVFormData {
  return {
    ...createDefaultFormData(),
    date: formatLocalDateTime(now),
    serialNo: createSerialNumber(now),
  };
}

function createInitialFormData(): CVFormData {
  const defaults = createDefaultFormData();
  const now = new Date();
  let savedForm: Partial<CVFormData> | null = null;
  let savedMetadata: Partial<Pick<CVFormData, "date" | "serialNo">> | null = null;

  try {
    const storedForm = localStorage.getItem(FORM_STORAGE_KEY);
    const storedMetadata = localStorage.getItem(FORM_METADATA_KEY);
    if (storedForm) {
      const parsed: unknown = JSON.parse(storedForm);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        savedForm = parsed as Partial<CVFormData>;
      }
    }
    if (storedMetadata) {
      const parsed: unknown = JSON.parse(storedMetadata);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        savedMetadata = parsed as Partial<Pick<CVFormData, "date" | "serialNo">>;
      }
    }
  } catch {
    savedForm = null;
    savedMetadata = null;
  }

  const date = savedForm?.date || savedMetadata?.date || formatLocalDateTime(now);
  const serialNo = savedForm?.serialNo || savedMetadata?.serialNo || createSerialNumber(now);

  return {
    ...defaults,
    ...savedForm,
    date,
    serialNo,
    passportExpiryDate: calculatePassportExpiry(
      savedForm?.passportNumber ?? defaults.passportNumber,
      savedForm?.dateOfBirth ?? defaults.dateOfBirth,
      savedForm?.passportIssueDate ?? defaults.passportIssueDate,
    ),
    languages: { ...defaults.languages, ...savedForm?.languages },
    experiences: Array.isArray(savedForm?.experiences) ? savedForm.experiences : defaults.experiences,
    skills: { ...defaults.skills, ...savedForm?.skills },
  };
}

export function CVFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState(createInitialFormData);

  useEffect(() => {
    try {
      localStorage.setItem(FORM_METADATA_KEY, JSON.stringify({ date: formData.date, serialNo: formData.serialNo }));
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Keep the form usable when browser storage is unavailable or full.
    }
  }, [formData]);

  const updateField = (field: TextField, value: string) => {
    setFormData((previous) => {
      const next = {
        ...previous,
        [field]: value,
        ...(field === "dateOfBirth" ? { age: calculateAge(value) } : {}),
      };
      if (field === "dateOfBirth" || field === "passportNumber" || field === "passportIssueDate") {
        next.passportExpiryDate = calculatePassportExpiry(
          next.passportNumber,
          next.dateOfBirth,
          next.passportIssueDate,
        );
      }
      return next;
    });
  };

  const updateLanguage = (language: Language, value: string) => {
    setFormData((previous) => ({
      ...previous,
      languages: { ...previous.languages, [language]: value },
    }));
  };

  const updateExperience = (
    index: number,
    field: ExperienceField,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      experiences: previous.experiences.map((experience, currentIndex) =>
        currentIndex === index ? { ...experience, [field]: value } : experience,
      ),
    }));
  };

  const addExperience = () => {
    setFormData((previous) => ({
      ...previous,
      experiences: [...previous.experiences, { country: "", period: "" }],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((previous) => ({
      ...previous,
      experiences: previous.experiences.length > 1
        ? previous.experiences.filter((_, currentIndex) => currentIndex !== index)
        : previous.experiences,
    }));
  };

  const toggleSkill = (skillId: string) => {
    setFormData((previous) => ({
      ...previous,
      skills: { ...previous.skills, [skillId]: !previous.skills[skillId] },
    }));
  };

  const setPhoto = (field: PhotoField, photo: string | null) => {
    setFormData((previous) => ({ ...previous, [field]: photo }));
  };

  const clearForm = () => {
    setFormData((previous) => ({
      ...createDefaultFormData(),
      date: previous.date,
      serialNo: previous.serialNo,
    }));
  };

  const startNewCV = () => {
    setFormData(createFreshFormData());
  };

  return (
    <CVFormContext.Provider
      value={{
        formData,
        updateField,
        updateLanguage,
        updateExperience,
        addExperience,
        removeExperience,
        toggleSkill,
        setPhoto,
        clearForm,
        startNewCV,
      }}
    >
      {children}
    </CVFormContext.Provider>
  );
}

export function useCVForm() {
  const context = useContext(CVFormContext);
  if (!context) {
    throw new Error("useCVForm must be used within a CVFormProvider");
  }
  return context;
}
