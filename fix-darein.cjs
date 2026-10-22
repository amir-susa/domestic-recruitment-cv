const fs = require("fs");
const filePath = "src/components/DareinHtmlTemplate.tsx";
let code = fs.readFileSync(filePath, "utf8");

const target = "export function DareinHtmlTemplate({";
const replacement = `import { useCVForm } from "../context/CVFormContext";

export function DareinHtmlTemplate(props: DareinHtmlTemplateProps) {
  const { formData } = useCVForm();
  
  const mappedData: DareinCvData = {
    fullName: formData.fullName || "",
    nationality: formData.nationality || "Ethiopian",
    religion: formData.religion || "Christian",
    dateOfBirth: formData.dateOfBirth || "",
    age: formData.age || "",
    placeOfBirth: formData.placeOfBirth || "",
    maritalStatus: formData.maritalStatus || "Single",
    children: formData.numberOfChildren || "0",
    weight: formData.weight || "",
    height: formData.height || "",
    education: formData.educationalQualification || "",
    passport: {
      number: formData.passportNumber || "",
      issueDate: formData.passportDateOfIssue || "",
      issuePlace: formData.passportPlaceOfIssue || "ADDIS ABABA",
      expiryDate: formData.passportDateOfExpiry || "",
    },
    languages: {
      english: formData.englishSkill ? formData.englishSkill.toLowerCase() as any : null,
      arabic: formData.arabicSkill ? formData.arabicSkill.toLowerCase() as any : null,
    },
    experience: formData.previousExperiences && formData.previousExperiences.length > 0 ? {
      country: formData.previousExperiences[0].country,
      period: `${formData.previousExperiences[0].years \vert{}\vert{} 0} Yrs${formData.previousExperiences[0].months || 0} Mos`,
    } : { country: "", period: "" },
    skills: {
      babySitting: !!formData.skills?.babySitting,
      washing: !!formData.skills?.washing,
      cleaning: !!formData.skills?.cleaning,
      cooking: !!formData.skills?.cooking,
      sewing: !!formData.skills?.sewing,
      driving: !!formData.skills?.driving,
    },
    contactName: "Afnan",
    contactNameAr: "?????",
    contactPhone: "69984733",
    date: new Date().toISOString().split("T")[0],
    refNo: formData.passportNumber ? \`DAR-\${formData.passportNumber}\` : "",
    applicantPhotoUrl: formData.headshotPhoto,
    fullPhotoUrl: formData.fullBodyPhoto,
    passportCopyUrl: formData.passportScan,
  };

  const data = {
    ...mappedData,
    ...(props.data || {}),
    passport: { ...mappedData.passport, ...(props.data?.passport || {}) },
    languages: { ...mappedData.languages, ...(props.data?.languages || {}) },
    experience: { ...mappedData.experience, ...(props.data?.experience || {}) },
    skills: { ...mappedData.skills, ...(props.data?.skills || {}) },
  };

  const logoSrc = props.logoSrc || DEFAULT_LOGO_SRC;
  const phoneIconSrc = props.phoneIconSrc || DEFAULT_PHONE_ICON_SRC;

  return (`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  // Replace the local const d assignment with data
  code = code.replace(/  const d: DareinCvData = \{[\s\S]*?;\n\n/, "  const d = data;\n\n");
  fs.writeFileSync(filePath, code, "utf8");
  console.log("SUCCESS: DareinHtmlTemplate updated successfully!");
} else {
  console.log("ERROR: Target signature not found in DareinHtmlTemplate.tsx");
}
