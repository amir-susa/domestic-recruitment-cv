import { PageFrame } from "./PageFrame";
import { PhotoSlot } from "./PhotoSlot";
import { BrandLogo } from "./BrandLogo";
import { CellInput } from "./CellInput";
import { SectionHeading } from "./SectionHeading";
import { BilingualTable } from "./BilingualTable";
import { LanguageSkillsTable } from "./LanguageSkillsTable";
import { SkillsGrid } from "./SkillsGrid";
import { DateSerialRow } from "./DateSerialRow";
import { applicationDetails, experienceFields, passportDetails } from "../data/applicationForm";
import { useCVForm } from "../context/CVFormContext";
import mobileIcon from "../assets/mobile-icon.png";
import {
  arabLeagueCountries,
  countries,
  ethiopianBirthPlaces,
  ethiopianPassportIssuePlaces,
} from "../data/locations";

const applicationFieldByLabel = {
  Nationality: "nationality",
  Religion: "religion",
  "Date of Birth": "dateOfBirth",
  Age: "age",
  "Place of Birth": "placeOfBirth",
  "Marital Status": "maritalStatus",
  "No. of Children": "children",
  "Weight(KG)": "weight",
  "Height(cm)": "height",
  "Educational Qualification": "education",
} as const;

const passportFieldByLabel = {
  NUMBER: "passportNumber",
  "DATE OF  ISSUE": "passportIssueDate",
  "PLACE OF ISSUE": "passportIssuePlace",
  "DATE OF EXP": "passportExpiryDate",
} as const;

const applicationInputProps = {
  Nationality: { suggestions: countries },
  Religion: {
    suggestions: ["Muslim", "Christian", "Other", "Prefer not to specify"],
  },
  "Date of Birth": { type: "date" },
  Age: { type: "number", min: 0, max: 120, step: 1, readOnly: true },
  "No. of Children": { options: Array.from({ length: 11 }, (_, value) => String(value)) },
  "Weight(KG)": { type: "number", min: 0, max: 300, step: 0.1 },
  "Height(cm)": { type: "number", min: 0, max: 300, step: 0.1 },
  "Marital Status": {
    options: ["Single", "Married", "Divorced", "Widowed", "Separated"],
  },
  "Place of Birth": { suggestions: ethiopianBirthPlaces },
  "Educational Qualification": {
    suggestions: [
      "No Formal Education",
      "Primary Education",
      "Secondary Education",
      "Certificate",
      "Diploma",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "Vocational Training",
      "Other",
    ],
  },
} as const;

const passportInputProps = {
  "DATE OF  ISSUE": { type: "date" },
  "DATE OF EXP": { type: "date", readOnly: true },
  "PLACE OF ISSUE": { suggestions: ethiopianPassportIssuePlaces },
} as const;

const experienceYears = Array.from({ length: 31 }, (_, year) => year);
const experienceMonths = Array.from({ length: 12 }, (_, month) => month);
function parseExperiencePeriod(period: string) {
  const match = period.match(/^(\d+) Years? (\d+) Months?$/);
  return match ? { years: Number(match[1]), months: Number(match[2]) } : { years: 0, months: 0 };
}

export function FormPageOne() {
  const { formData, updateField, updateExperience, addExperience, removeExperience, setPhoto } = useCVForm();
  const applicationRows = applicationDetails.map((row) => ({
    ...row,
    value: formData[applicationFieldByLabel[row.en as keyof typeof applicationFieldByLabel]],
    ...applicationInputProps[row.en as keyof typeof applicationInputProps],
  }));
  const passportRows = passportDetails.map((row) => ({
    ...row,
    value: formData[passportFieldByLabel[row.en as keyof typeof passportFieldByLabel]],
    ...passportInputProps[row.en as keyof typeof passportInputProps],
  }));

  return (
    <PageFrame label="Application for Employment, page 1">
      {/* Header */}
      <header className="flex h-[117px] items-start justify-between px-[8px] pt-[14px]">
        <div className="w-[400px]">
          <h1 className="pl-[6px] font-serif text-[32px] font-bold leading-none tracking-wide text-navy">DAREIN EST</h1>
          <div className="mt-[12px] rounded-[5px] border border-black bg-navy px-3 py-[9px] font-serif text-[13px] font-bold text-white">
            FOR RECRUITMENT OF DOMESTIC MANPOWER
          </div>
        </div>
        <div className="flex items-center justify-center rounded-full border-[3px] border-navy bg-white p-1 shadow-sm">
          <BrandLogo />
        </div>
        <div className="w-[316px] text-right">
          <div dir="rtl" className="pr-6 font-arabic text-[29px] font-bold leading-none text-navy">دارين التأسيس</div>
          <div dir="rtl" className="mt-[14px] rounded-[5px] border border-black bg-navy px-3 py-[8px] font-arabic text-[15px] font-bold text-white">
            لتوظيف القوى العاملة المحلية
          </div>
        </div>
      </header>

      {/* Upper band */}
      <div className="flex">
        <div className="w-[650px]">
          <div className="bg-navy py-[4px] text-center text-white">
            <p dir="rtl" className="font-arabic text-[14px] font-bold">
              الفروانية بلوك ٤ حبيب مناور شارع - عربيد معرض- مكتب الميزانين رقم -١ الكويت
            </p>
            <p className="font-serif text-[15.5px] font-bold">
              Farwaniya Block 4, Habib Menawer Steet, Arbeed gallery, Mezanin office No. 1,
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 pt-[4px]">
            <span className="font-serif text-[19px] font-bold text-navy">Afnan 69984733</span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-[2px] border-navy bg-white shadow-sm">
              <img src={mobileIcon} alt="" className="h-6 w-6 object-contain" />
            </span>
            <span dir="rtl" className="font-arabic text-[18px] font-bold text-navy">أفنان ٦٩٩٨٤٧٣٣</span>
          </div>
          <h2 className="mt-[2px] text-center font-serif text-[27px] font-bold text-navy">Application for Employment</h2>
          <div className="mt-[8px] pl-[4px] pr-[4px]">
            <DateSerialRow
              columns={["58px", "252px", "88px", "238px"]}
              height="h-[28px]"
              dateValue={formData.date}
              serialNoValue={formData.serialNo}
              onDateChange={(value) => updateField("date", value)}
              onSerialNoChange={(value) => updateField("serialNo", value)} />
            <table className="mt-[10px] w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "142px" }} />
                <col />
                <col style={{ width: "132px" }} />
              </colgroup>
              <tbody>
                <tr className="h-[36px]">
                  <th scope="row" className="cell bg-label px-2 text-left align-top font-serif text-[16px] font-bold text-navy">FULL NAME</th>
                  <td className="cell p-0"><CellInput label="Full name" value={formData.fullName} onChange={(event) => updateField("fullName", event.currentTarget.value)} /></td>
                  <td dir="rtl" className="cell bg-label px-2 align-top font-arabic text-[15px] font-bold leading-[1.3] text-navy">الاسم الكامل</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PhotoSlot
          title="Applicant photo"
          size="2.14” x 2.03”"
          value={formData.applicantPhoto}
          onChange={(photo) => setPhoto("applicantPhoto", photo)}
          className="ml-auto mr-[12px] h-[241px] w-[229px]" />
      </div>

      {/* Main body */}
      <div className="mt-[4px] flex gap-[14px] px-[4px]">
        <div className="w-[478px]">
          <SectionHeading en="DETAILS OF APPLICATION" ar="تفاصيل التطبيق" className="pt-1" />
          <BilingualTable
            rows={applicationRows}
            columns={["130px", "205px", "143px"]}
            rowHeight="h-[31px]"
            onValueChange={(label, value) => updateField(applicationFieldByLabel[label as keyof typeof applicationFieldByLabel], value)} />
          

          <SectionHeading en="LANGUAGE SKILLS" ar="المهارات اللغوية" className="mt-[8px] pl-4" />
          <div className="pr-[6px]">
            <LanguageSkillsTable />
          </div>

          <div className="mt-[10px] flex items-end justify-between gap-2">
            <div className="flex-1">
              <SectionHeading en="PREVIOUS EXPERIENCE" ar="الخبرة السابقة" />
            </div>
            <button
              type="button"
              data-html2canvas-ignore="true"
              className="cv-editor-control mb-1 rounded border border-navy px-1.5 py-0.5 font-sans text-[11px] font-bold text-navy"
              onClick={addExperience}>
              + Add Experience
            </button>
          </div>
          <div className="max-h-[270px] overflow-y-auto pr-[2px]">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "121px" }} />
                <col />
                <col style={{ width: "62px" }} />
              </colgroup>
              <tbody>
                {formData.experiences.map((entry, index) => {
                  const period = parseExperiencePeriod(entry.period);
                  return (
                    <tr key={index} className="h-[31px]">
                      <th scope="row" className="cell bg-label px-2 text-left align-middle font-serif text-[15px] font-bold text-navy">
                        {`COUNTRY ${index + 1}`}
                      </th>
                      <td className="cell p-0">
                        <div className="flex h-full min-w-0 items-center gap-[2px]">
                          <div className="min-w-0 flex-1">
                            <CellInput
                              label={`Experience ${index + 1} country`}
                              value={entry.country}
                              options={arabLeagueCountries}
                              onOptionChange={(value) => updateExperience(index, "country", value)}
                              size="xs" />
                          </div>
                          <select
                            aria-label={`Experience ${index + 1} years`}
                            data-pdf-text
                            data-pdf-value={`${period.years}y`}
                            value={period.years}
                            onChange={(event) => updateExperience(index, "period", `${event.currentTarget.value} Years ${period.months} Months`)}
                            className="h-full w-[63px] shrink-0 bg-transparent px-0.5 font-serif text-[11px] font-bold text-navy focus:outline-none focus:bg-label/20">
                            {experienceYears.map((year) => <option key={year} value={year}>{year}y</option>)}
                          </select>
                          <select
                            aria-label={`Experience ${index + 1} months`}
                            data-pdf-text
                            data-pdf-value={`${period.months}m`}
                            value={period.months}
                            onChange={(event) => updateExperience(index, "period", `${period.years} Years ${event.currentTarget.value} Months`)}
                            className="h-full w-[60px] shrink-0 bg-transparent px-0.5 font-serif text-[11px] font-bold text-navy focus:outline-none focus:bg-label/20">
                            {experienceMonths.map((month) => <option key={month} value={month}>{month}m</option>)}
                          </select>
                        </div>
                      </td>
                      <td dir="rtl" className="cell bg-label px-2 align-middle font-arabic text-[14px] font-bold text-navy">
                        <span className="flex items-center justify-between gap-1">
                          <span>{experienceFields[0].ar}</span>
                          {formData.experiences.length > 1 ? (
                            <button
                              type="button"
                              data-html2canvas-ignore="true"
                              aria-label={`Remove experience ${index + 1}`}
                              className="cv-editor-control rounded px-1 text-[12px] text-navy"
                              onClick={() => removeExperience(index)}>
                              ×
                            </button>
                          ) : null}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <SectionHeading en="SKILLS" ar="المهارات" className="mt-[4px] pr-6" />
          <SkillsGrid />
        </div>

        <div className="flex flex-1 flex-col pr-[12px]">
          <div className="max-w-full pl-[10px]">
            <SectionHeading en="PASSPORT DETAILS" ar="تفاصيل جواز السفر" className="pt-2" />
            <div className="min-w-0 max-w-full overflow-hidden">
              <BilingualTable
                rows={passportRows}
                columns={["132px", "151px", "123px"]}
                rowHeight="h-[29px]"
                valueSize="sm"
                onValueChange={(label, value) => updateField(passportFieldByLabel[label as keyof typeof passportFieldByLabel], value)} />
            </div>
          </div>
          <PhotoSlot
            title="Full photo"
            size="5.35” x 3.54”"
            value={formData.fullPhoto}
            onChange={(photo) => setPhoto("fullPhoto", photo)}
            fit="contain"
            className="mt-[14px] h-[514px] w-[340px] self-center" />
        </div>
      </div>
    </PageFrame>);

}