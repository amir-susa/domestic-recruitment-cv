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
    <div className="flex flex-col items-center text-slate-900 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Reem+Kufi:wght@500;600;700;800&display=swap');

        .cv-font-arabic {
          font-family: 'Cairo', Tahoma, Geneva, sans-serif !important;
          direction: rtl !important;
          unicode-bidi: embed !important;
          line-height: 1.2 !important;
        }

        .font-reem-kufi {
          font-family: 'Reem Kufi', sans-serif !important;
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

        .align-center-exact {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .cv-page-container {
            box-shadow: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
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
      style={{ background: '#002060', color: '#ffffff', padding: '0 20px', height: '68px' }} 
      className="grid grid-cols-12 items-center border-b-4 border-emerald-500 box-border w-full"
    >
      <div className="col-span-5 text-left flex items-center h-full">
        <h1 className="text-base sm:text-lg font-black tracking-wider text-white uppercase leading-tight">
          {officeInfo.en}
        </h1>
      </div>

      <div className="col-span-2 flex justify-center items-center h-full">
        <img 
          src={logoImg} 
          alt="Recruitment Office Logo" 
          style={{ maxHeight: '50px', maxWidth: '130px', objectFit: 'contain' }} 
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      <div className="col-span-5 text-right flex items-center justify-end h-full">
        <h1 className="cv-font-arabic text-xl sm:text-2xl font-black text-emerald-300 leading-tight">
          {officeInfo.ar}
        </h1>
      </div>
    </div>
  );
}

function ReferenceSubBar({ refNo, date }: { refNo?: string; date?: string }) {
  return (
    <div style={{ background: '#0A192F', color: '#e2e8f0', padding: '0 20px', height: '28px' }} className="flex items-center justify-between text-xs font-bold border-b border-slate-700 box-border w-full">
      <div className="flex items-center gap-2 h-full">
        <span className="text-emerald-400 font-extrabold flex items-center">Ref. No / <span className="cv-font-arabic ml-1">رقم المرجع</span>:</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-600 text-white font-mono text-xs flex items-center">{refNo || 'ANDALUS-2026-0892'}</span>
      </div>
      <div className="flex items-center gap-2 h-full">
        <span className="text-emerald-400 font-extrabold flex items-center">Date / <span className="cv-font-arabic ml-1">التاريخ</span>:</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-600 text-white font-mono text-xs flex items-center">{date || new Date().toISOString().split('T')[0]}</span>
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
        height: '42px',
        background: '#002060', 
        color: '#ffffff', 
        padding: '0 20px',
        fontSize: '10.5px'
      }} 
      className="border-t-4 border-emerald-500 flex flex-col items-center justify-center gap-0.5 text-center box-border z-20"
    >
      <div className="font-black tracking-wider text-emerald-400 uppercase text-xs flex items-center justify-center gap-2">
        <span className="flex items-center">Tesnim Foreign Employment Agency</span>
        <span>•</span>
        <span dir="rtl" className="cv-font-arabic font-extrabold flex items-center">وكالة تسنيم للاستقدام الخارجي</span>
      </div>
      <div className="flex items-center justify-center gap-x-4 text-slate-200 text-[10px] font-bold">
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

      <div style={{ padding: '10px 18px 48px 18px' }} className="space-y-2.5 box-border">
        {/* Candidate Name Header */}
        <div className="flex gap-2.5 items-stretch justify-between">
          <div 
            style={{ background: '#f8fafc', borderColor: '#002060', padding: '6px 14px' }} 
            className="flex-1 border-l-4 border-y border-r rounded-lg flex flex-col justify-center shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Candidate Name</span>
              <span className="text-[10px] font-black text-slate-500 cv-font-arabic">اسم المرشح</span>
            </div>
            <h2 className="text-base font-black text-blue-950 uppercase tracking-wide leading-tight mt-0.5 text-center">
              {formData.fullName || 'FULL CANDIDATE NAME'}
            </h2>
          </div>

          <div 
            style={{ width: '38mm', height: '38mm', borderColor: '#002060' }} 
            className="border-2 rounded-lg bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative shadow-sm shrink-0"
          >
            {formData.headshotPhoto ? (
              <img src={formData.headshotPhoto} alt="Headshot" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-1 text-slate-400 flex flex-col items-center justify-center">
                <User className="w-6 h-6 text-slate-400 mb-0.5" />
                <span className="text-[9px] font-bold uppercase text-slate-600">Headshot</span>
                <span className="text-[9px] cv-font-arabic text-slate-500">الصورة الشخصية</span>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-12 gap-2.5">
          <div className="col-span-7 space-y-2.5">
            <div>
              <SectionTitle titleEn="Details of Application" titleAr="بيانات الطلب" />
              <div className="border border-slate-300 rounded overflow-hidden text-[10.5px] shadow-sm">
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
              <table className="w-full text-[10.5px] border border-slate-300 rounded overflow-hidden text-center shadow-sm">
                <thead>
                  <tr style={{ background: '#002060' }} className="text-white">
                    <th className="py-1 px-2 text-center font-black text-[10px] uppercase">Language</th>
                    <th className="py-1 px-2 font-black text-[10px] uppercase text-center">Arabic</th>
                    <th className="py-1 px-2 font-black text-[10px] uppercase text-center">English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td className="py-1 px-2 text-center font-black text-slate-900 text-[10.5px]">Level</td>
                    <td className="py-1 px-2 text-[10.5px] font-extrabold text-center">{languages.arabic || 'Basic'}</td>
                    <td className="py-1 px-2 text-[10.5px] font-extrabold text-center">{languages.english || 'Basic'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <SectionTitle titleEn="Skills & Capabilities" titleAr="المهارات والقدرات" />
              <div className="border border-slate-300 rounded-lg p-1.5 bg-slate-50 text-[10.5px] grid grid-cols-2 gap-1.5 shadow-sm">
                <SkillBadge nameEn="Baby Sitting" nameAr="رعاية الأطفال" active={skills.babySitting} />
                <SkillBadge nameEn="Washing" nameAr="الغسيل" active={skills.washing} />
                <SkillBadge nameEn="Cleaning" nameAr="التنظيف" active={skills.cleaning} />
                <SkillBadge nameEn="Cooking" nameAr="الطبخ" active={skills.cooking} />
              </div>
            </div>

            <div>
              <SectionTitle titleEn="Previous Work Experience" titleAr="الخبرات السابقة" />
              <table className="w-full text-[10.5px] border border-slate-300 rounded overflow-hidden shadow-sm">
                <thead>
                  <tr style={{ background: '#002060' }} className="text-white">
                    <th className="py-1 px-2.5 text-center font-black text-[10px] uppercase">Country / <span className="cv-font-arabic">الدولة</span></th>
                    <th className="py-1 px-2.5 text-center font-black text-[10px] uppercase">Period / <span className="cv-font-arabic">المدة</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {experiences && experiences.length > 0 ? (
                    experiences.map((exp: any, idx: number) => (
                      <tr key={idx} className="bg-white hover:bg-slate-50">
                        <td className="py-1 px-2.5 text-center font-extrabold text-slate-900 text-[10.5px]">{exp.country}</td>
                        <td className="py-1 px-2.5 text-center text-slate-800 font-extrabold text-[10.5px]">{formatPeriod(exp)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-1.5 text-center text-slate-400 italic text-[10.5px]">No previous experience registered</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-5 space-y-2.5 flex flex-col">
            <div>
              <SectionTitle titleEn="Passport Details" titleAr="بيانات جواز السفر" />
              <div className="border border-slate-300 rounded overflow-hidden text-[10.5px] shadow-sm">
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
                  height: '130mm',
                  borderColor: '#002060' 
                }} 
                className="border-2 rounded-lg bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative shadow-sm p-1"
              >
                {formData.fullBodyPhoto ? (
                  <img src={formData.fullBodyPhoto} alt="Full Photo" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-center p-2 text-slate-400 flex flex-col items-center justify-center my-auto">
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                    <span className="text-xs font-bold text-slate-600 uppercase">Full Body Photo</span>
                    <span className="text-xs cv-font-arabic text-slate-500 mt-0.5">الصورة الكاملة للمرشح</span>
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
  return (
    <div id="cv-page-2" className="cv-page-container shadow-2xl">
      <AgencyHeader officeInfo={officeInfo} />
      <ReferenceSubBar refNo={formData.refNo} date={formData.date} />

      <div style={{ padding: '12px 18px 48px 18px' }} className="space-y-3 box-border">
        <div className="flex flex-col">
          <SectionTitle titleEn="Passport Copy Attachment" titleAr="صورة جواز السفر" />
          <div 
            style={{ height: '82mm' }} 
            className="w-full border-2 border-slate-900 rounded-lg bg-slate-50 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-sm"
          >
            {formData.passportScan ? (
              <img src={formData.passportScan} alt="Passport Copy Scan" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-3 text-slate-400 flex flex-col items-center justify-center">
                <FileText className="w-10 h-10 text-slate-300 mb-1" />
                <span className="text-xs font-bold text-slate-700 uppercase">Passport Copy Attachment Frame</span>
                <span className="text-xs cv-font-arabic text-slate-500 mt-0.5">مكان إرفاق صورة جواز السفر</span>
              </div>
            )}
          </div>
        </div>

        {formData.medicalScan && (
          <div className="flex flex-col">
            <SectionTitle titleEn="Medical Fitness Report Attachment" titleAr="تقرير الفحص الطبي" />
            <div 
              style={{ height: '82mm' }} 
              className="w-full border-2 border-slate-900 rounded-lg bg-slate-50 flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-sm"
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
      style={{ background: '#002060', height: '24px' }} 
      className="text-white rounded-t-md flex items-center justify-between font-black px-2.5 box-border"
    >
      <span className="uppercase tracking-wider text-[10.5px] flex items-center h-full">{titleEn}</span>
      <span className="cv-font-arabic text-emerald-300 text-[10.5px] font-bold flex items-center h-full">{titleAr}</span>
    </div>
  );
}

function TableRows({ data }: { data: Array<{ en: string; ar: string; val?: string }> }) {
  return (
    <div className="divide-y divide-slate-200">
      {data.map((row, idx) => (
        <div key={idx} style={{ minHeight: '22px' }} className="flex items-center justify-between px-2.5 bg-white hover:bg-slate-50">
          <span className="font-bold text-slate-800 text-[10px] flex-1 text-left flex items-center">{row.en}</span>
          <span className="font-black text-blue-950 text-[10px] flex-1 text-center flex items-center justify-center">{row.val || '-'}</span>
          <span className="cv-font-arabic font-extrabold text-slate-700 text-[10px] flex-1 text-right flex items-center justify-end">{row.ar}</span>
        </div>
      ))}
    </div>
  );
}

function SkillBadge({ nameEn, nameAr, active }: { nameEn: string; nameAr: string; active?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 p-1 rounded-md border-2 text-[10px] text-center ${active ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200 text-slate-400'}`}>
      <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-emerald-600' : 'text-slate-300'}`} />
      <div className="flex flex-col items-center justify-center">
        <span className="leading-tight font-extrabold text-[10px] text-center">{nameEn}</span>
        <span className="cv-font-arabic text-[9px] text-slate-600 leading-tight text-center">{nameAr}</span>
      </div>
    </div>
  );
}