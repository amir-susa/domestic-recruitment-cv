import React from "react";
import { SmartphoneIcon } from "lucide-react";
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

export function FormPageOne() {
  return (
    <PageFrame label="Application for Employment, page 1">
      {/* Header */}
      <header className="flex h-[117px] items-start justify-between px-[8px] pt-[14px]">
        <div className="w-[400px]">
          <h1 className="pl-[6px] font-serif text-[32px] font-bold leading-none tracking-wide text-navy">DAREIN EST</h1>
          <div className="mt-[12px] rounded-[5px] border border-black bg-navy px-3 py-[9px] font-serif text-[13px] font-bold text-white">
            FOR RECRUITMENT OF DOMESTIC MANPOER
          </div>
        </div>
        <BrandLogo />
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
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-brand-light">
              <SmartphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <span dir="rtl" className="font-arabic text-[18px] font-bold text-navy">أفنان ٦٩٩٨٤٧٣٣</span>
          </div>
          <h2 className="mt-[2px] text-center font-serif text-[27px] font-bold text-navy">Application for Employment</h2>
          <div className="mt-[8px] pl-[4px] pr-[4px]">
            <DateSerialRow columns={["58px", "252px", "88px", "238px"]} height="h-[28px]" />
            <table className="mt-[10px] w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "142px" }} />
                <col />
                <col style={{ width: "132px" }} />
              </colgroup>
              <tbody>
                <tr className="h-[36px]">
                  <th scope="row" className="cell bg-label px-2 text-left align-top font-serif text-[16px] font-bold text-navy">FULL NAME</th>
                  <td className="cell p-0"><CellInput label="Full name" /></td>
                  <td dir="rtl" className="cell bg-label px-2 align-top font-arabic text-[13px] font-bold text-navy">الاسم لكامل</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PhotoSlot title="Applicant photo" size="2.14” x 2.03”" className="ml-auto mr-[12px] h-[241px] w-[229px]" />
      </div>

      {/* Main body */}
      <div className="mt-[4px] flex gap-[14px] px-[4px]">
        <div className="w-[478px]">
          <SectionHeading en="DETAILS OF APPLICATION" ar="تفاصيل التطبيق" className="pt-1" />
          <BilingualTable
            rows={applicationDetails}
            columns={["130px", "187px", "161px"]}
            rowHeight="h-[31px]" />
          

          <SectionHeading en="LANGUAGE SKILLS" ar="المهارات اللغوية" className="mt-[8px] pl-4" />
          <div className="pr-[6px]">
            <LanguageSkillsTable />
          </div>

          <SectionHeading en="PREVIOUS EXPERIENCE" ar="الخبرة السابقة" className="mt-[10px]" />
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col style={{ width: "121px" }} />
              <col />
              <col style={{ width: "62px" }} />
            </colgroup>
            <tbody>
              {experienceFields.map((f) =>
              <tr key={f.en} className="h-[31px]">
                  <th scope="row" className="cell bg-label px-2 text-left align-top font-serif text-[15px] font-bold text-navy">{f.en}</th>
                  <td className="cell p-0"><CellInput label={f.en} size="sm" /></td>
                  <td dir="rtl" className="cell bg-label px-2 align-top font-arabic text-[13px] font-bold text-navy">{f.ar}</td>
                </tr>
              )}
            </tbody>
          </table>

          <SectionHeading en="SKILLS" ar="المهارات" className="mt-[4px] pr-6" />
          <SkillsGrid />
        </div>

        <div className="flex flex-1 flex-col pr-[12px]">
          <div className="pl-[10px]">
            <SectionHeading en="PASSPORT DETAILS" ar="تفاصيل جواز السفر" className="pt-2" />
            <BilingualTable
              rows={passportDetails}
              columns={["140px", "119px", "127px"]}
              rowHeight="h-[29px]"
              valueSize="sm" />
            
          </div>
          <PhotoSlot title="Full photo" size="5.35” x 3.54”" className="mt-[14px] h-[598px] w-full" />
        </div>
      </div>
    </PageFrame>);

}