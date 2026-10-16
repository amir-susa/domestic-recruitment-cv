import React from 'react';
import { FileText, ShieldCheck, CheckCircle, User, Image as ImageIcon } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";
import logoImg from "../assets/andelus_logo.png";

interface Props {
  formData: CVFormData;
}

const OFFICE_TITLES: Record<string, { en: string; ar: string }> = {
  al_andalus: { en: "AL-ANDALUS FOR RECRUITMENT", ar: "الأندلس للإستقدام" },
  darein: { en: "DAREIN EST FOR RECRUITMENT", ar: "مكتب دارين للإستقدام" },
  general_purpose: { en: "GENERAL RECRUITMENT AGENCY", ar: "مكتب الاستقدام العام" },
};

export function AlAndalusHtmlTemplate({ formData }: Props) {
  const officeInfo = OFFICE_TITLES[formData.selectedPartner] || OFFICE_TITLES.al_andalus;

  return (
    <div className="flex flex-col items-center text-slate-900 bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800;900&family=Reem+Kufi:wght@500;600;700;800&display=swap');

        body, .font-sans {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        .cv-font-arabic {
          font-family: 'Arial', Tahoma, Geneva, sans-serif !important;
          direction: rtl !important;
          unicode-bidi: embed !important;
          line-height: 1.35 !important;
        }

        .font-reem-kufi {
          font-family: 'Reem Kufi', sans-serif !important;
          direction: rtl !important;
          unicode-bidi: embed !important;
          line-height: 1.2 !important;
        }

        .cv-page-container {
          width: 210mm !important;
          height: 296mm !important;
          max-height: 296mm !important;
          box-sizing: border-box !important;
          position: relative !important;
          background: #ffffff !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .page-break-after-always {
          page-break-after: always !important;
          break-after: page !important;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .cv-page-container {
            box-shadow: none !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 296mm !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
        }
      `}</style>

      <CVPage1 formData={formData} officeInfo={officeInfo} />
      <CVPage2 formData={formData} officeInfo={officeInfo} />
    </div>
  );
}

function AgencyHeader({ officeInfo }: { officeInfo: { en: string; ar: string } }) {
  return (
    <div 
      style={{ background: '#08265F', color: '#FFFFFF', padding: '0 26px', height: '126px' }} 
      className="grid grid-cols-12 items-center border-b-4 border-[#0BBF93] box-border w-full shadow-md"
    >
      <div className="col-span-5 text-left flex items-center h-full">
        <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-white uppercase leading-snug">
          {officeInfo.en}
        </h1>
      </div>

      <div className="col-span-2 flex justify-center items-center h-full">
        <img 
          src={logoImg} 
          alt="Recruitment Office Logo" 
          style={{ maxHeight: '94px', maxWidth: '190px', objectFit: 'contain' }} 
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      <div className="col-span-5 text-right flex items-center justify-end h-full">
        <h1 className="font-reem-kufi text-4xl sm:text-5xl font-extrabold text-[#0BBF93] leading-snug">
          {officeInfo.ar}
        </h1>
      </div>
    </div>
  );
}

function ReferenceSubBar({ refNo, date }: { refNo?: string; date?: string }) {
  return (
    <div style={{ background: '#0A192F', color: '#e2e8f0', padding: '0 26px', height: '38px' }} className="flex items-center justify-between font-semibold border-b border-slate-700 box-border w-full">
      <div className="flex items-center gap-2.5 h-full">
        <span className="text-[#0BBF93] font-bold flex items-center text-sm sm:text-base">Ref. No / <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic ml-1.5 font-bold">رقم المرجع</span>:</span>
        <span className="bg-slate-800 px-3 py-1 rounded border border-slate-600 text-white font-mono text-sm sm:text-base font-semibold flex items-center shadow-2xs">{refNo || 'ANDALUS-2026-0892'}</span>
      </div>
      <div className="flex items-center gap-2.5 h-full">
        <span className="text-[#0BBF93] font-bold flex items-center text-sm sm:text-base">Date / <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic ml-1.5 font-bold">التاريخ</span>:</span>
        <span className="bg-slate-800 px-3 py-1 rounded border border-slate-600 text-white font-mono text-sm sm:text-base font-semibold flex items-center shadow-2xs">{date || new Date().toISOString().split('T')[0]}</span>
      </div>
    </div>
  );
}

function AgencyFooter() {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '88px',
        background: '#08265F', 
        color: '#FFFFFF', 
        padding: '0 26px',
        fontSize: '14px'
      }} 
      className="border-t-4 border-[#0BBF93] flex flex-col items-center justify-center gap-1.5 text-center box-border z-20 shadow-inner"
    >
      <div className="font-bold tracking-wider text-[#0BBF93] uppercase text-base sm:text-lg flex items-center justify-center gap-3.5">
        <span className="flex items-center font-bold text-white">Tesnim Foreign Employment Agency</span>
        <span>•</span>
        <span dir="rtl" style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic font-bold flex items-center">وكالة تسنيم للاستقدام الخارجي</span>
      </div>
      <div className="flex items-center justify-center gap-x-6 text-slate-100 text-sm sm:text-base font-medium">
        <span>Tel: +251 908 282828 / +251 111 280000</span>
        <span>│</span>
        <span>Email: tesnimagency2828@gmail.com</span>
      </div>
    </div>
  );
}

function CVPage1({ formData, officeInfo }: { formData: any; officeInfo: any }) {
  const experiences = formData.previousExperiences || [];
  const languages = formData.languages || { arabic: "Basic", english: "Basic" };
  const skills = formData.skills || { babySitting: true, washing: true, cleaning: true, cooking: true };

  const formatPeriod = (exp: any) => {
    if (exp.period) return exp.period;
    const y = parseInt(exp.years || "0", 10);
    const m = parseInt(exp.months || "0", 10);
    const parts = [];
    if (y > 0) parts.push(`${y} ${y === 1 ? 'Year' : 'Years'}`);
    if (m > 0) parts.push(`${m} ${m === 1 ? 'Month' : 'Months'}`);
    return parts.length > 0 ? parts.join(', ') : 'None';
  };

  return (
    <div id="cv-page-1" className="cv-page-container page-break-after-always shadow-2xl">
      <AgencyHeader officeInfo={officeInfo} />
      <ReferenceSubBar refNo={formData.refNo} date={formData.date} />

      <div style={{ padding: '6px 20px 94px 20px' }} className="space-y-2.5 box-border">
        {/* Candidate Name & Larger Headshot Panel */}
        <div 
          style={{ background: '#F5F8FC', borderColor: '#08265F', padding: '6px 14px', height: '46mm', marginBottom: '8px' }} 
          className="border-2 rounded-lg flex items-center justify-between shadow-sm box-border"
        >
          <div className="flex-1 flex flex-col justify-center pr-4">
            <div className="text-center mb-1 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
              <span className="uppercase tracking-wider">Candidate Name</span>
              <span className="text-slate-400 font-normal">/</span>
              <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic">اسم المرشح</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#08265F] uppercase tracking-wide text-center leading-snug">
              {formData.fullName || 'FULL CANDIDATE NAME'}
            </h2>
          </div>

          <div 
            style={{ width: '40mm', height: '43mm', borderColor: '#08265F' }} 
            className="border-2 rounded-md bg-white flex flex-col items-center justify-center overflow-hidden relative shadow-sm shrink-0"
          >
            {formData.headshotPhoto ? (
              <img src={formData.headshotPhoto} alt="Headshot" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-1 text-slate-400 flex flex-col items-center justify-center">
                <User className="w-5 h-5 text-slate-400 mb-0.5" />
                <span className="text-[9.5px] font-semibold uppercase text-slate-600">Headshot</span>
                <span style={{ fontFamily: 'Arial, sans-serif' }} className="text-[9.5px] cv-font-arabic text-slate-500">الصورة الشخصية</span>
              </div>
            )}
          </div>
        </div>

        {/* Refined 2-Column Balanced Grid */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 space-y-2">
            <div>
              <SectionTitle titleEn="Details of Application" titleAr="بيانات الطلب" />
              <div className="border border-slate-300 rounded-b-lg overflow-hidden text-[13px] shadow-sm bg-white">
                <TableRows data={[
                  { en: 'Nationality', ar: 'الجنسية', val: formData.nationality },
                  { en: 'Religion', ar: 'الديانة', val: formData.religion },
                  { en: 'Place of Birth', ar: 'مكان الميلاد', val: formData.placeOfBirth },
                  { en: 'Date of Birth / Age', ar: 'تاريخ الميلاد / العمر', val: `${formData.dateOfBirth || ''} (${formData.age || ''} Yrs)` },
                  { en: 'Height / Weight', ar: 'الطول / الوزن', val: `${formData.height || '155'} cm / ${formData.weight || '50'} kg` },
                  { en: 'Marital Status', ar: 'الحالة الاجتماعية', val: formData.maritalStatus },
                  { en: 'No. of Children', ar: 'عدد الأطفال', val: formData.numberOfChildren },
                  { en: 'Phone Number', ar: 'رقم الهاتف', val: formData.phoneNo },
                  { en: 'Education Level', ar: 'المستوى التعليمي', val: formData.educationalQualification },
                ]} />
              </div>
            </div>

            <div>
              <SectionTitle titleEn="Language Proficiency" titleAr="إتقان اللغات" />
              <table className="w-full text-[13px] border border-slate-300 rounded-b-lg overflow-hidden text-center shadow-sm bg-white">
                <thead>
                  <tr style={{ background: '#08265F' }} className="text-white">
                    <th className="py-1.5 px-3 text-center font-semibold text-[12px] uppercase">Language</th>
                    <th className="py-1.5 px-3 font-semibold text-[12px] uppercase text-center">Arabic</th>
                    <th className="py-1.5 px-3 font-semibold text-[12px] uppercase text-center">English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-[#F5F8FC]/50 font-medium text-slate-900">
                    <td className="py-1.5 px-3 text-center font-semibold text-slate-900 text-[13px]">Level</td>
                    <td className="py-1.5 px-3 text-[13px] font-bold text-center">{languages.arabic || 'Basic'}</td>
                    <td className="py-1.5 px-3 text-[13px] font-bold text-center">{languages.english || 'Basic'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <SectionTitle titleEn="Skills & Capabilities" titleAr="المهارات والقدرات" />
              <div className="border border-slate-300 rounded-b-lg p-2 bg-[#F5F8FC]/50 text-[13px] grid grid-cols-2 gap-2 shadow-sm">
                <SkillBadge nameEn="Baby Sitting" nameAr="رعاية الأطفال" active={skills.babySitting} />
                <SkillBadge nameEn="Washing" nameAr="الغسيل" active={skills.washing} />
                <SkillBadge nameEn="Cleaning" nameAr="التنظيف" active={skills.cleaning} />
                <SkillBadge nameEn="Cooking" nameAr="الطبخ" active={skills.cooking} />
              </div>
            </div>

            <div>
              <SectionTitle titleEn="Previous Work Experience" titleAr="الخبرات السابقة" />
              <table className="w-full text-[13px] border border-slate-300 rounded-b-lg overflow-hidden shadow-sm bg-white">
                <thead>
                  <tr style={{ background: '#08265F' }} className="text-white">
                    <th className="py-1.5 px-3 text-center font-semibold text-[12px] uppercase">Country / <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic">الدولة</span></th>
                    <th className="py-1.5 px-3 text-center font-semibold text-[12px] uppercase">Period / <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic">المدة</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {experiences && experiences.length > 0 ? (
                    experiences.map((exp: any, idx: number) => (
                      <tr key={idx} className="bg-white hover:bg-slate-50">
                        <td className="py-1.5 px-3 text-center font-semibold text-slate-900 text-[13px]">{exp.country}</td>
                        <td className="py-1.5 px-3 text-center text-slate-800 font-semibold text-[13px]">{formatPeriod(exp)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-2 text-center text-slate-400 italic text-[13px]">No previous experience registered</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-5 space-y-2.5 flex flex-col">
            <div>
              <SectionTitle titleEn="Passport Details" titleAr="بيانات جواز السفر" />
              <div className="border border-slate-300 rounded-b-lg overflow-hidden text-[13px] shadow-sm bg-white">
                <TableRows data={[
                  { en: 'Number', ar: 'رقم الجواز', val: formData.passportNumber },
                  { en: 'Date of Issue', ar: 'تاريخ الإصدار', val: formData.passportDateOfIssue },
                  { en: 'Place of Issue', ar: 'مكان الإصدار', val: formData.passportPlaceOfIssue },
                  { en: 'Date of Expiry', ar: 'تاريخ الانتهاء', val: formData.passportDateOfExpiry },
                ]} />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-start">
              <SectionTitle titleEn="Full Photo" titleAr="الصورة الكاملة" />
              <div 
                style={{ 
                  width: '100%',
                  height: '116mm',
                  borderColor: '#08265F' 
                }} 
                className="border-2 rounded-b-lg bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative shadow-sm p-1.5"
              >
                {formData.fullBodyPhoto ? (
                  <img src={formData.fullBodyPhoto} alt="Full Photo" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-center p-3 text-slate-400 flex flex-col items-center justify-center my-auto">
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                    <span className="text-xs font-semibold text-slate-600 uppercase">Full Body Photo</span>
                    <span style={{ fontFamily: 'Arial, sans-serif' }} className="text-xs cv-font-arabic text-slate-500 mt-0.5">الصورة الكاملة للمرشح</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AgencyFooter />
    </div>
  );
}

function CVPage2({ formData, officeInfo }: { formData: any; officeInfo: any }) {
  const hasMedical = Boolean(formData.medicalScan);

  return (
    <div id="cv-page-2" className="cv-page-container shadow-2xl">
      <AgencyHeader officeInfo={officeInfo} />
      <ReferenceSubBar refNo={formData.refNo} date={formData.date} />

      <div style={{ padding: '24px 20px 94px 20px' }} className="space-y-6 box-border">
        <div className="flex flex-col">
          <SectionTitle titleEn="Passport Copy Attachment" titleAr="صورة جواز السفر" />
          <div 
            style={{ height: hasMedical ? '72mm' : '156mm' }} 
            className="w-full border-2 border-[#08265F] rounded-b-lg bg-slate-50 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-sm transition-all"
          >
            {formData.passportScan ? (
              <img src={formData.passportScan} alt="Passport Copy Scan" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-6 text-slate-400 flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-slate-300 mb-2" />
                <span className="text-xs font-semibold text-slate-700 uppercase">Passport Copy Attachment Frame</span>
                <span style={{ fontFamily: 'Arial, sans-serif' }} className="text-xs cv-font-arabic text-slate-500 mt-0.5">مكان إرفاق صورة جواز السفر</span>
              </div>
            )}
          </div>
        </div>

        {hasMedical && (
          <div className="flex flex-col">
            <SectionTitle titleEn="Medical Fitness Report Attachment" titleAr="تقرير الفحص الطبي" />
            <div 
              style={{ height: '72mm' }} 
              className="w-full border-2 border-[#08265F] rounded-b-lg bg-slate-50 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-sm"
            >
              <img src={formData.medicalScan} alt="Medical Report Scan" className="w-full h-full object-contain" />
            </div>
          </div>
        )}
      </div>

      <AgencyFooter />
    </div>
  );
}

function SectionTitle({ titleEn, titleAr }: { titleEn: string; titleAr: string }) {
  return (
    <div 
      style={{ background: '#08265F', height: '28px' }} 
      className="text-white rounded-t-lg flex items-center justify-between font-bold px-3.5 box-border shadow-sm"
    >
      <span className="uppercase tracking-wider text-[12px] font-semibold flex items-center h-full">{titleEn}</span>
      <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic text-[#0BBF93] text-[12px] font-bold flex items-center h-full">{titleAr}</span>
    </div>
  );
}

function TableRows({ data }: { data: Array<{ en: string; ar: string; val?: string }> }) {
  return (
    <div className="divide-y divide-slate-200">
      {data.map((row, idx) => (
        <div key={idx} style={{ minHeight: '26px' }} className="grid grid-cols-12 items-center px-3.5 bg-white hover:bg-slate-50">
          <span className="font-medium text-slate-700 text-[13px] col-span-4 text-left flex items-center py-0.5">{row.en}</span>
          <span className="font-bold text-[#08265F] text-[13px] col-span-4 text-center flex items-center justify-center py-0.5">{row.val || '-'}</span>
          <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic font-semibold text-slate-600 text-[13px] col-span-4 text-left flex items-center justify-start py-0.5">{row.ar}</span>
        </div>
      ))}
    </div>
  );
}

function SkillBadge({ nameEn, nameAr, active }: { nameEn: string; nameAr: string; active?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-2 p-1.5 rounded-md border text-[13px] text-center shadow-2xs ${active ? 'bg-emerald-50/75 border-[#0BBF93] text-slate-900 font-semibold' : 'bg-white border-slate-200 text-slate-400'}`}>
      <CheckCircle className={`w-4 h-4 shrink-0 ${active ? 'text-[#0BBF93]' : 'text-slate-300'}`} />
      <div className="flex flex-col items-center justify-center">
        <span className="leading-tight font-semibold text-[13px] text-center">{nameEn}</span>
        <span style={{ fontFamily: 'Arial, sans-serif' }} className="cv-font-arabic text-[11.5px] text-slate-600 leading-tight text-center">{nameAr}</span>
      </div>
    </div>
  );
}