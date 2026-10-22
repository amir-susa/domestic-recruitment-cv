import type { CSSProperties } from "react";
import { useCVForm } from "../context/CVFormContext";
import type { CVFormData } from "../context/CVFormContext";

/* -------------------------------------------------------------------------- */
/*  DAREIN EST — "Application for Employment" · two-page A4 HTML template      */
/*  Page 1: application form · Page 2: passport copy attachment               */
/*  Header and footer are shared components, so both pages are identical there.*/
/* -------------------------------------------------------------------------- */

type Level = "poor" | "fair" | "good" | "fluent" | null;

export interface DareinCvData {
  fullName: string;
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
  passport: {
    number: string;
    issueDate: string;
    issuePlace: string;
    expiryDate: string;
  };
  languages: { english: Level; arabic: Level };
  experience: { country: string; period: string };
  skills: {
    babySitting: boolean;
    washing: boolean;
    cleaning: boolean;
    cooking: boolean;
    sewing: boolean;
    driving: boolean;
  };
  contactName: string;
  contactNameAr: string;
  contactPhone: string;
  date: string;
  refNo: string;
  applicantPhotoUrl?: string;
  fullPhotoUrl?: string;
  passportCopyUrl?: string;
}

export interface DareinHtmlTemplateProps {
  formData?: CVFormData;
  data?: Partial<Omit<DareinCvData, "passport" | "languages" | "experience" | "skills">> & {
    passport?: Partial<DareinCvData["passport"]>;
    languages?: Partial<DareinCvData["languages"]>;
    experience?: Partial<DareinCvData["experience"]>;
    skills?: Partial<DareinCvData["skills"]>;
  };
  className?: string;
  logoSrc?: string;
  phoneIconSrc?: string;
}

export const DEFAULT_LOGO_SRC = "/assets/logo.png";
export const DEFAULT_PHONE_ICON_SRC = "/assets/mobile-icon.png";

export const defaultDareinData: DareinCvData = {
  fullName: "",
  nationality: "Ethiopian",
  religion: "Christian",
  dateOfBirth: "",
  age: "",
  placeOfBirth: "",
  maritalStatus: "Single",
  children: "0",
  weight: "52.0",
  height: "160.0",
  education: "Primary",
  passport: { number: "EQ", issueDate: "", issuePlace: "ADDIS ABABA", expiryDate: "" },
  languages: { english: null, arabic: "fluent" },
  experience: { country: "", period: "" },
  skills: {
    babySitting: true,
    washing: true,
    cleaning: true,
    cooking: true,
    sewing: true,
    driving: false,
  },
  contactName: "Afnan",
  contactNameAr: "أفنان",
  contactPhone: "69984733",
  date: "",
  refNo: "",
};

const toArabicDigits = (s: string) => s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

const DETAIL_ROWS: Array<{
  key: keyof Pick<
    DareinCvData,
    | "nationality"
    | "religion"
    | "dateOfBirth"
    | "age"
    | "placeOfBirth"
    | "maritalStatus"
    | "children"
    | "weight"
    | "height"
    | "education"
  >;
  en: string;
  ar: string;
  h: number;
}> = [
  { key: "nationality", en: "NATIONALITY", ar: "جنسية", h: 8 },
  { key: "religion", en: "RELIGION", ar: "دين", h: 8 },
  { key: "dateOfBirth", en: "DATE OF BIRTH", ar: "تاريخ الميلاد", h: 8 },
  { key: "age", en: "AGE", ar: "عمر", h: 8 },
  { key: "placeOfBirth", en: "PLACE OF BIRTH", ar: "مكان الميلاد", h: 8 },
  { key: "maritalStatus", en: "MARITAL STATUS", ar: "الحالة الاجتماعية", h: 9 },
  { key: "children", en: "NO. OF CHILDREN", ar: "عدد الأطفال", h: 11 },
  { key: "weight", en: "WEIGHT (KG)", ar: "وزن", h: 8.5 },
  { key: "height", en: "HEIGHT (CM)", ar: "ارتفاع", h: 8.5 },
  { key: "education", en: "EDUCATIONAL QUALIFICATION", ar: "المؤهل التعليمي", h: 11 },
];

const PASSPORT_ROWS: Array<{
  key: keyof DareinCvData["passport"];
  en: string;
  ar: string;
  h: number;
}> = [
  { key: "number", en: "NUMBER", ar: "رقم", h: 7 },
  { key: "issueDate", en: "DATE OF ISSUE", ar: "تاريخ الإصدار", h: 7 },
  { key: "issuePlace", en: "PLACE OF ISSUE", ar: "مكان الإصدار", h: 10 },
  { key: "expiryDate", en: "DATE OF EXP", ar: "تاريخ انتهاء", h: 7 },
];

const LEVELS: Array<{ id: Exclude<Level, null>; en: string; ar: string }> = [
  { id: "poor", en: "POOR", ar: "فقير" },
  { id: "fair", en: "FAIR", ar: "عدل" },
  { id: "good", en: "GOOD", ar: "جيد" },
  { id: "fluent", en: "FLUENT", ar: "طلق" },
];

const SKILLS: Array<{ key: keyof DareinCvData["skills"]; en: string; ar: string }> = [
  { key: "babySitting", en: "BABY SITTING", ar: "جلوس الطفل" },
  { key: "washing", en: "WASHING", ar: "غسل" },
  { key: "cleaning", en: "CLEANING", ar: "تنظيف" },
  { key: "cooking", en: "COOKING", ar: "طبخ" },
  { key: "sewing", en: "SEWING", ar: "خياطة" },
  { key: "driving", en: "DRIVING", ar: "القيادة" },
];

const CSS = `
@page { size: A4; margin: 0; }

@font-face {
  font-family: "DareinArabic";
  src: local("Arial"), local("ArialMT"), local("Arimo"), local("Liberation Sans"), local("Helvetica");
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}

.drn-root {
  --navy: rgb(0, 0, 128);
  --label: #9db7e0;
  --line: #4a5788;
  --logo: #1c4b8c;
  --strip: var(--label);
  --attr: 9pt;
  --attr-ar: 9pt;
  --value: 12pt;
  font-family: "DareinArabic", Garamond, "EB Garamond", "Cormorant Garamond", "Times New Roman", serif;
  mso-bidi-font-family: Arial;
  color: var(--navy);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  box-sizing: border-box;
}
.drn-root *, .drn-root *::before, .drn-root *::after { box-sizing: border-box; }

.drn-ar {
  font-family: Arial, "Arial Unicode MS", "DareinArabic", Arimo, "Liberation Sans", sans-serif;
  mso-bidi-font-family: Arial;
  mso-ascii-font-family: Arial;
  mso-hansi-font-family: Arial;
  direction: rtl;
  font-weight: 700;
}

.drn-page {
  position: relative;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border: 1.8mm solid var(--navy);
  box-shadow: inset 0 0 0 0.6mm #fff, inset 0 0 0 1.1mm var(--navy);
  break-after: page;
  page-break-after: always;
}
.drn-page:last-child { break-after: auto; page-break-after: auto; }
@media screen { .drn-page + .drn-page { margin-top: 6mm; } }
@media print { .drn-page { margin: 0; } }

.drn-header {
  flex: none;
  height: 31mm;
  display: grid;
  grid-template-columns: 1fr 28mm 1fr;
  align-items: center;
  padding: 0 3mm;
  border-bottom: 0.5mm solid var(--navy);
  background: #fff;
}
.drn-brand { display: flex; flex-direction: column; gap: 2.2mm; }
.drn-brand-ar { align-items: flex-end; }
.drn-title { margin: 0 0 0 2mm; font-size: 24pt; font-weight: 700; letter-spacing: 0.02em; line-height: 1; }
.drn-title-ar { margin: 0 2mm 0 0; font-size: 22pt; line-height: 1.1; }
.drn-pill {
  display: flex; align-items: center; justify-content: center;
  height: 9mm; border-radius: 2.2mm;
  background: var(--navy); color: #fff; font-weight: 700;
}
.drn-pill-en { width: 88mm; justify-content: flex-start; padding: 0 4mm; font-size: 8.4pt; font-weight: 700; letter-spacing: 0.02em; }
.drn-pill-ar { width: 70mm; justify-content: flex-start; padding: 0 4mm; font-size: 12pt; font-weight: 700; }
.drn-logo { justify-self: center; display: block; width: 25mm; height: 25mm; object-fit: contain; }

.drn-footer {
  flex: none;
  height: 13mm;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 14mm 0 8mm;
  background: var(--navy); color: #fff;
  font-size: 10pt; font-weight: 700;
}
.drn-footer-item { display: flex; align-items: baseline; gap: 1.5mm; white-space: nowrap; }
.drn-footer .drn-ar { font-size: 9pt; direction: rtl; unicode-bidi: isolate; }
.drn-footer-colon { margin-left: -1mm; }
.drn-footer-value { font-weight: 400; }

.drn-body { flex: 1; min-height: 0; display: flex; flex-direction: column; }

.drn-top { flex: none; display: grid; grid-template-columns: 1fr 51.6mm; height: 54.4mm; }
.drn-top-left { display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
.drn-address {
  height: 18.5mm; padding: 1.2mm 1mm;
  display: flex; flex-direction: column; justify-content: center; gap: 1.2mm;
  background: var(--navy); color: #fff; text-align: center;
}
.drn-address-ar { font-size: 12.5pt; font-weight: 900; -webkit-text-stroke: 0.25pt currentColor; white-space: nowrap; }
.drn-address-en { font-size: 11pt; font-weight: 700; -webkit-text-stroke: 0.15pt currentColor; letter-spacing: 0; white-space: nowrap; }
.drn-contact { display: flex; align-items: center; justify-content: center; gap: 2.4mm; font-size: 14pt; font-weight: 700; }
.drn-contact .drn-ar { font-size: 13.5pt; font-weight: 700; }
.drn-contact .drn-phone { width: 6mm; height: 6mm; display: block; object-fit: contain; }
.drn-apptitle { margin: 0; text-align: center; font-size: 16pt; font-weight: 700; letter-spacing: 0.02em; line-height: 1; }
.drn-name-box { margin: 0 3mm; height: 15mm; display: flex; flex-direction: column; border: 0.35mm solid var(--navy); background: #fff; }
.drn-name-head {
  flex: none; height: 5.2mm; padding: 0 2mm; display: flex; align-items: center; justify-content: space-between;
  background: var(--strip); color: var(--navy);
  font-size: var(--attr); font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase;
}
.drn-name-head .drn-ar { font-size: var(--attr-ar); letter-spacing: 0; text-transform: none; }
.drn-name-value {
  flex: 1; min-height: 0; padding: 0 2mm; display: flex; align-items: center; justify-content: center; text-align: center;
  font-size: var(--value); font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; color: var(--navy);
}

.drn-photo {
  display: flex; align-items: center; justify-content: center;
  border: 0.6mm solid var(--navy); background: #fff; overflow: hidden;
}
.drn-photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.drn-photo-label {
  padding: 1.6mm 6mm; border: 0.25mm solid #777; background: #fff;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 700; font-size: 10pt; line-height: 1.55; color: #000; text-align: center;
}
.drn-photo-label span { display: block; }

.drn-main {
  flex: 1; min-height: 0; display: grid;
  grid-template-columns: 106mm 1fr; column-gap: 3.5mm;
  padding: 2mm 0 3mm 3mm;
}
.drn-col-left { display: flex; flex-direction: column; justify-content: space-between; min-height: 0; }
.drn-col-right { display: flex; flex-direction: column; min-height: 0; }
.drn-col-right .drn-photo { flex: 1; margin-top: 2.5mm; }

.drn-sec { display: flex; justify-content: space-between; align-items: flex-end; height: 7.5mm; padding: 0 1.5mm 0.8mm 1mm; }
.drn-sec-en { font-size: 10.5pt; font-weight: 700; letter-spacing: 0.04em; }
.drn-sec-ar { font-size: 10pt; }

.drn-table { border-top: 0.25mm solid var(--line); border-left: 0.25mm solid var(--line); }
.drn-row { display: grid; }
.drn-cell {
  min-width: 0; display: flex; align-items: center; padding: 0 1.5mm;
  border-right: 0.25mm solid var(--line); border-bottom: 0.25mm solid var(--line);
  background: #fff;
}
.drn-label { background: var(--label); font-size: var(--attr); font-weight: 700; letter-spacing: 0.02em; line-height: 1.1; text-transform: uppercase; }
.drn-label.drn-ar { font-size: var(--attr-ar); letter-spacing: 0; text-transform: none; justify-content: flex-start; }
.drn-value { justify-content: center; text-align: center; font-size: var(--value); font-weight: 500; line-height: 1.05; text-transform: uppercase; }
.drn-value-left { justify-content: flex-start; text-align: left; padding-left: 3mm; }

.drn-lang-head { grid-column: span 2; justify-content: space-between; background: var(--label); font-weight: 700; font-size: var(--attr); letter-spacing: 0.02em; text-transform: uppercase; }
.drn-lang-head .drn-ar { font-size: var(--attr-ar); letter-spacing: 0; text-transform: none; }
.drn-lang-ar { justify-content: flex-start; }

.drn-skills {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border-top: 0.25mm solid #8a93b5; border-left: 0.25mm solid #8a93b5;
}
.drn-skill {
  height: 12.5mm; padding: 0 1.2mm; display: grid; grid-template-columns: 1fr 7mm; align-items: center; column-gap: 0.6mm;
  border-right: 0.25mm solid #8a93b5; border-bottom: 0.25mm solid #8a93b5; background: #fff;
}
.drn-skill-text { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }
.drn-skill-text .drn-ar { font-size: var(--attr-ar); }
.drn-skill-text .drn-en { font-size: var(--attr); font-weight: 700; letter-spacing: 0; text-transform: uppercase; white-space: nowrap; }
.drn-box { width: 7mm; height: 7mm; display: grid; place-items: center; border: 0.35mm solid var(--navy); background: #fff; }
.drn-box svg { width: 4.8mm; height: 4.8mm; }
.drn-tick { width: 4.2mm; height: 4.2mm; }

.drn-attach { padding: 5.5mm 15mm 0; }
.drn-attach-bar {
  height: 8mm; padding: 0 3mm; display: flex; align-items: center; justify-content: space-between;
  background: var(--navy); color: #fff; font-size: 8.5pt; letter-spacing: 0.02em;
}
.drn-attach-bar .drn-ar { font-size: 8pt; font-weight: 400; }
.drn-passport-box { width: 131.6mm; height: 90mm; margin: 0 auto; }
';

const Tick = ({ className = "drn-tick" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

const Header = ({ logoSrc }: { logoSrc: string }) => (
  <header className="drn-header">
    <div className="drn-brand">
      <h1 className="drn-title">DAREIN EST</h1>
      <div className="drn-pill drn-pill-en">FOR RECRUITMENT OF DOMESTIC MANPOWER</div>
    </div>
    <img className="drn-logo" src={logoSrc} alt="Darein logo" />
    <div className="drn-brand drn-brand-ar">
      <div className="drn-ar drn-title-ar" lang="ar">دارين التأسيس</div>
      <div className="drn-ar drn-pill drn-pill-ar" lang="ar">لتوظيف القوى العاملة المحلية</div>
    </div>
  </header>
);

const Footer = ({ date, refNo }: { date: string; refNo: string }) => (
  <footer className="drn-footer">
    <div className="drn-footer-item">
      <span>Date /</span>
      <span className="drn-ar" lang="ar">تاريخ</span>
      <span className="drn-footer-colon">:</span>
      {date && <span className="drn-footer-value">{date}</span>}
    </div>
    <div className="drn-footer-item">
      <span>Ref. No /</span>
      <span className="drn-ar" lang="ar">رقم المرجع</span>
      <span className="drn-footer-colon">:</span>
      {refNo && <span className="drn-footer-value">{refNo}</span>}
    </div>
  </footer>
);

const PhotoBox = ({
  label, src, style,
}: { label: string; src?: string; style?: CSSProperties }) => (
  <div className="drn-photo" style={style}>
    {src ? (
      <img className="drn-photo-img" src={src} alt={label} />
    ) : (
      <div className="drn-photo-label">
        <span>{label}</span>
      </div>
    )}
  </div>
);

const SectionHead = ({ en, ar }: { en: string; ar: string }) => (
  <div className="drn-sec">
    <span className="drn-sec-en">{en}</span>
    <span className="drn-ar drn-sec-ar" lang="ar">{ar}</span>
  </div>
);

export function DareinHtmlTemplate(props: DareinHtmlTemplateProps) {
  const context = useCVForm();
  const formData = props.formData || context?.formData || ({} as CVFormData);

  const formatPeriod = (exp: any) => {
    if (!exp) return "";
    if (exp.period) return exp.period;
    const y = parseInt(exp.years || "0", 10);
    const m = parseInt(exp.months || "0", 10);
    const parts = [];
    if (y > 0) parts.push(`${y} ${y === 1 ? 'Yr' : 'Yrs'}`);
    if (m > 0) parts.push(`${m} ${m === 1 ? 'Mo' : 'Mos'}`);
    return parts.length > 0 ? parts.join(', ') : (exp.country ? "1 Yr" : "");
  };

  const expEntry = formData.previousExperiences && formData.previousExperiences.length > 0 
    ? formData.previousExperiences[0] 
    : null;

  const mappedData: DareinCvData = {
    fullName: formData.fullName || "",
    nationality: formData.nationality || "Ethiopian",
    religion: formData.religion || "Christian",
    dateOfBirth: formData.dateOfBirth || "",
    age: formData.age ? `${formData.age}` : "",
    placeOfBirth: formData.placeOfBirth || "",
    maritalStatus: formData.maritalStatus || "Single",
    children: formData.numberOfChildren || "0",
    weight: formData.weight ? `${formData.weight}` : "",
    height: formData.height ? `${formData.height}` : "",
    education: formData.educationalQualification || "",
    passport: {
      number: formData.passportNumber || "",
      issueDate: formData.passportDateOfIssue || "",
      issuePlace: formData.passportPlaceOfIssue || "ADDIS ABABA",
      expiryDate: formData.passportDateOfExpiry || "",
    },
    languages: {
      english: formData.englishSkill ? (formData.englishSkill.toLowerCase() as Level) : null,
      arabic: formData.arabicSkill ? (formData.arabicSkill.toLowerCase() as Level) : null,
    },
    experience: {
      country: expEntry?.country || "",
      period: formatPeriod(expEntry),
    },
    skills: {
      babySitting: !!formData.skills?.babySitting,
      washing: !!formData.skills?.washing,
      cleaning: !!formData.skills?.cleaning,
      cooking: !!formData.skills?.cooking,
      sewing: !!formData.skills?.sewing,
      driving: !!formData.skills?.driving,
    },
    contactName: "Afnan",
    contactNameAr: "أفنان",
    contactPhone: formData.phoneNo || "69984733",
    date: formData.date || new Date().toISOString().split("T")[0],
    refNo: formData.refNo || (formData.passportNumber ? `DAR-${formData.passportNumber}` : ""),
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

  const d = data;
  const logoSrc = props.logoSrc || DEFAULT_LOGO_SRC;
  const phoneIconSrc = props.phoneIconSrc || DEFAULT_PHONE_ICON_SRC;

  const detailCols = "34fr 38fr 34fr";
  const passportCols = "33fr 25fr 26fr";

  return (
    <div className={`drn-root${props.className ? ` ${props.className}` : ""}`}>
      <style>{CSS}</style>

      {/* ============================== PAGE 1 ============================== */}
      <section className="drn-page" aria-label="Application for Employment — page 1">
        <Header logoSrc={logoSrc} />

        <div className="drn-body">
          <div className="drn-top">
            <div className="drn-top-left">
              <div className="drn-address">
                <div className="drn-ar drn-address-ar" lang="ar">
                  الفروانية بلوك ٤ حبيب ميناور شارع - عربيد معرض- مكتب الميزانين رقم ١- الكويت
                </div>
                <div className="drn-address-en">
                  Farwaniya Block 4, Habib Menawer Street, Arbeed gallery, Mezanin office No. 1, Kuwait
                </div>
              </div>

              <div className="drn-contact">
                <span>{d.contactName} {d.contactPhone}</span>
                <img className="drn-phone" src={phoneIconSrc} alt="" aria-hidden="true" />
                <span className="drn-ar" lang="ar">{d.contactNameAr} {toArabicDigits(d.contactPhone)}</span>
              </div>

              <h2 className="drn-apptitle">Application for Employment</h2>

              <div className="drn-name-box">
                <div className="drn-name-head">
                  <span>FULL NAME</span>
                  <span className="drn-ar" lang="ar">الاسم بالكامل</span>
                </div>
                <div className="drn-name-value">{d.fullName}</div>
              </div>
            </div>

            <PhotoBox label="Applicant photo" src={d.applicantPhotoUrl} style={{ height: "100%" }} />
          </div>

          <div className="drn-main">
            {/* ---------- left column ---------- */}
            <div className="drn-col-left">
              <div>
                <SectionHead en="DETAILS OF APPLICATION" ar="تفاصيل التطبيق" />
                <div className="drn-table">
                  {DETAIL_ROWS.map((r) => (
                    <div key={r.key} className="drn-row" style={{ gridTemplateColumns: detailCols, minHeight: `${r.h}mm` }}>
                      <div className="drn-cell drn-label">{r.en}</div>
                      <div className="drn-cell drn-value">
                        {r.key === "dateOfBirth" && d.age ? `${d[r.key]} (${d.age} Yrs)` : d[r.key]}
                      </div>
                      <div className="drn-cell drn-label drn-ar" lang="ar">{r.ar}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHead en="LANGUAGE SKILLS" ar="المهارات اللغوية" />
                <div className="drn-table">
                  <div className="drn-row" style={{ gridTemplateColumns: "repeat(4, 1fr)", height: "6mm" }}>
                    <div className="drn-cell drn-lang-head">
                      <span>ENGLISH</span>
                      <span className="drn-ar" lang="ar">إنجليزي</span>
                    </div>
                    <div className="drn-cell drn-lang-head">
                      <span>ARABIC</span>
                      <span className="drn-ar" lang="ar">عربي</span>
                    </div>
                  </div>
                  {LEVELS.map((lv) => (
                    <div key={lv.id} className="drn-row" style={{ gridTemplateColumns: "repeat(4, 1fr)", height: "6.3mm" }}>
                      <div className="drn-cell drn-label">{lv.en}</div>
                      <div className="drn-cell" style={{ justifyContent: "center" }}>
                        {d.languages.english === lv.id && <Tick />}
                      </div>
                      <div className="drn-cell" style={{ justifyContent: "center" }}>
                        {d.languages.arabic === lv.id && <Tick />}
                      </div>
                      <div className="drn-cell drn-label drn-ar drn-lang-ar" lang="ar">{lv.ar}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHead en="SKILLS" ar="المهارات" />
                <div className="drn-skills">
                  {SKILLS.map((s) => (
                    <div key={s.key} className="drn-skill">
                      <div className="drn-skill-text">
                        <span className="drn-ar" lang="ar" style={{ textAlign: "left", direction: "rtl" }}>{s.ar}</span>
                        <span className="drn-en">{s.en}</span>
                      </div>
                      <div className="drn-box">{d.skills[s.key] && <Tick className="drn-tick" />}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHead en="PREVIOUS EXPERIENCE" ar="الخبرة السابقة" />
                <div className="drn-table">
                  <div className="drn-row" style={{ gridTemplateColumns: "26fr 66fr 14fr", height: "7mm" }}>
                    <div className="drn-cell drn-label">COUNTRY</div>
                    <div className="drn-cell drn-value-left drn-value">{d.experience.country}</div>
                    <div className="drn-cell drn-label drn-ar" lang="ar">دولة</div>
                  </div>
                  <div className="drn-row" style={{ gridTemplateColumns: "26fr 66fr 14fr", height: "7mm" }}>
                    <div className="drn-cell drn-label">PERIOD</div>
                    <div className="drn-cell drn-value-left drn-value">{d.experience.period}</div>
                    <div className="drn-cell drn-label drn-ar" lang="ar">المدة</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- right column ---------- */}
            <div className="drn-col-right">
              <div style={{ width: "84mm" }}>
                <div className="drn-sec">
                  <span className="drn-sec-en">PASSPORT DETAILS</span>
                  <span className="drn-ar drn-sec-ar" lang="ar">تفاصيل جواز السفر</span>
                </div>
                <div className="drn-table drn-passport">
                  {PASSPORT_ROWS.map((r) => (
                    <div key={r.key} className="drn-row" style={{ gridTemplateColumns: passportCols, minHeight: `${r.h}mm` }}>
                      <div className="drn-cell drn-label">{r.en}</div>
                      <div className="drn-cell drn-value">{d.passport[r.key]}</div>
                      <div className="drn-cell drn-label drn-ar" lang="ar">{r.ar}</div>
                    </div>
                  ))}
                </div>
              </div>

              <PhotoBox label="Full photo" src={d.fullPhotoUrl} />
            </div>
          </div>
        </div>

        <Footer date={d.date} refNo={d.refNo} />
      </section>

      {/* ============================== PAGE 2 ============================== */}
      <section className="drn-page" aria-label="Passport copy attachment — page 2">
        <Header logoSrc={logoSrc} />

        <div className="drn-body drn-attach">
          <div className="drn-attach-bar">
            <span>PASSPORT COPY ATTACHMENT</span>
            <span className="drn-ar" lang="ar">إرفاق نسخة من جواز السفر</span>
          </div>
          <PhotoBox label="Passport" src={d.passportCopyUrl} style={{ width: "131.6mm", height: "90mm", margin: "0 auto" }} />
        </div>

        <Footer date={d.date} refNo={d.refNo} />
      </section>
    </div>
  );
}

export default DareinHtmlTemplate;