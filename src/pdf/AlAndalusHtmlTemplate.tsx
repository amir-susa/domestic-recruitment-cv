import React from 'react';
import { FileText, ShieldCheck, Phone, Mail, CheckCircle, User, Image as ImageIcon } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";
import logoImg from "../assets/andelus_logo.png";

interface Props {
  formData: CVFormData;
}

export function AlAndalusHtmlTemplate({ formData }: Props) {
  return (
    <div className="flex flex-col items-center text-slate-900 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Reem+Kufi:wght@500;600;700&display=swap');

        .cv-font-arabic {
          font-family: 'Cairo', Tahoma, Geneva, Verdana, sans-serif;
        }

        .font-reem-kufi {
          font-family: 'Reem Kufi', sans-serif;
        }

        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .cv-page {
            box-shadow: none !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: always !important;
            overflow: hidden !important;
          }
          #cv-page-2 {
            page-break-after: avoid !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>

      <CVPage1 formData={formData} />
      <CVPage2 formData={formData} />
    </div>
  );
}

function AgencyHeader({ formData }: { formData: any }) {
  return (
    <div 
      style={{ background: '#002060', color: '#ffffff', padding: '10px 20px', height: '65px' }} 
      className="grid grid-cols-3 items-center border-b-2 border-emerald-500 box-border"
    >
      <div className="text-left">
        <h1 className="text-xs sm:text-sm font-black tracking-wider text-white uppercase leading-snug">
          AL-ANDALUS FOR RECRUITMENT
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <img 
          src={logoImg} 
          alt="Al-Andalus Logo" 
          style={{ maxHeight: '48px', maxWidth: '130px', objectFit: 'contain' }} 
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      <div className="text-right">
        <h1 className="font-reem-kufi text-base sm:text-lg font-bold text-emerald-300 leading-tight">
          الأندلس للإستقدام
        </h1>
      </div>
    </div>
  );
}

function ReferenceSubBar({ refNo, date }: { refNo?: string; date?: string }) {
  return (
    <div style={{ background: '#0A192F', color: '#e2e8f0', padding: '4px 20px', height: '28px' }} className="flex items-center justify-between text-xs font-semibold border-b border-slate-700 box-border">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">Ref. No / <span className="cv-font-arabic">رقم المرجع</span>:</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-600 text-white font-mono text-xs">{refNo || 'ANDALUS-2026-0892'}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">Date / <span className="cv-font-arabic">التاريخ</span>:</span>
        <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-600 text-white font-mono text-xs">{date || new Date().toISOString().split('T')[0]}</span>
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
        padding: '6px 20px',
        fontSize: '10px'
      }} 
      className="border-t-2 border-emerald-500 flex flex-col items-center justify-center gap-0.5 text-center box-border"
    >
      <div className="font-bold tracking-wider text-emerald-400 uppercase text-xs flex items-center gap-2">
        <span>Tesnim Foreign Employment Agency</span>
        <span>•</span>
        <span className="cv-font-arabic font-normal">وكالة تسنيم للاستقدام الخارجي</span>
      </div>
      <div className="flex items-center justify-center gap-x-4 text-slate-200 text-[10px]">
        <span>Tel: +251 908 282828 / +251 111 280000</span>
        <span>│</span>
        <span>Email: tesnimagency2828@gmail.com</span>
      </div>
    </div>
  );
}

function CVPage1({ formData }: { formData: any }) {
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
    <div
      id="cv-page-1"
      className="cv-page shadow-2xl rounded-sm overflow-hidden text-slate-900"
      style={{
        width: '210mm',
        height: '297mm',
        boxSizing: 'border-box',
        pageBreakAfter: 'always',
        position: 'relative',
        background: '#ffffff',
        fontFamily: 'sans-serif'
      }}
    >
      <AgencyHeader formData={formData} />
      <ReferenceSubBar refNo={formData.refNo} date={formData.date} />

      <div style={{ padding: '10px 18px', paddingBottom: '50px' }} className="space-y-2.5">
        <div className="flex gap-2.5 items-stretch justify-between">
          <div 
            style={{ background: '#f8fafc', borderColor: '#002060', padding: '4px 10px' }} 
            className="flex-1 border-l-4 border-y border-r rounded flex flex-col justify-center shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Candidate Name</span>
              <span className="text-[9px] font-bold text-slate-500 cv-font-arabic">اسم المرشح</span>
            </div>
            <h2 className="text-base font-black text-blue-950 uppercase tracking-wide leading-tight mt-0.5">
              {formData.fullName || 'FULL CANDIDATE NAME'}
            </h2>
          </div>

          <div 
            style={{ width: '38mm', height: '38mm', borderColor: '#002060' }} 
            className="border-2 rounded bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative shadow-sm shrink-0"
          >
            {formData.headshotPhoto ? (
              <img src={formData.headshotPhoto} alt="Headshot" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-1 text-slate-400 flex flex-col items-center">
                <User className="w-5 h-5 text-slate-400 mb-0.5" />
                <span className="text-[9px] font-bold uppercase text-slate-600">Headshot</span>
                <span className="text-[9px] cv-font-arabic text-slate-500">الصورة الشخصية</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2.5">
          <div className="col-span-7 space-y-2">
            <div>
              <SectionTitle titleEn="Details of Application" titleAr="بيانات الطلب" />
              <div className="border border-slate-300 rounded overflow-hidden text-[11px]">
                <TableRows data={[
                  { en: 'Nationality', ar: 'الجنسية', val: formData.nationality },
                  { en: 'Religion', ar: 'الديانة', val: formData.religion },
                  { en: 'Place of Birth', ar: 'مكان الميلاد', val: formData.placeOfBirth },
                  { en: 'Date of Birth / Age', ar: 'تاريخ الميلاد / العمر', val: `${formData.dateOfBirth || ''} (${formData.age || ''} Yrs)` },
                  { en: 'Height / Weight', ar: 'الطول / الوزن', val: `${formData.height || '155'} cm / ${formData.weight || '50'} kg` },
                  { en: 'Marital Status', ar: 'الحالة الاجتماعية', val: formData.maritalStatus },
                  { en: 'No. of Children', ar: 'عدد الأطفال', val: formData.numberOfChildren },
                  { en: 'Phone Number', ar: 'رقم الهاتف', val: formData.phoneNo },
                  { en: 'Education', ar: 'المستوى التعليمي', val: formData.educationalQualification },
                ]} />
              </div>
            </div>

            <div>
              <SectionTitle titleEn="Language Proficiency" titleAr="إتقان اللغات" />
              <table className="w-full text-[11px] border border-slate-300 rounded overflow-hidden text-center">
                <thead>
                  <tr style={{ background: '#002060' }} className="text-white">
                    <th className="py-1 px-2 text-left font-bold text-[10px] uppercase">Language</th>
                    <th className="py-1 px-2 font-bold text-[10px] uppercase">Arabic</th>
                    <th className="py-1 px-2 font-bold text-[10px] uppercase">English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-slate-50 font-medium text-slate-800">
                    <td className="py-1 px-2 text-left font-bold text-slate-800 text-[11px]">Level</td>
                    <td className="py-1 px-2 text-[11px] font-semibold">{languages.arabic || 'Basic'}</td>
                    <td className="py-1 px-2 text-[11px] font-semibold">{languages.english || 'Basic'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <SectionTitle titleEn="Skills" titleAr="المهارات" />
              <div className="border border-slate-300 rounded p-1.5 bg-slate-50 text-[11px] grid grid-cols-2 gap-1.5">
                <SkillBadge nameEn="Baby Sitting" nameAr="رعاية الأطفال" active={skills.babySitting} />
                <SkillBadge nameEn="Washing" nameAr="الغسيل" active={skills.washing} />
                <SkillBadge nameEn="Cleaning" nameAr="التنظيف" active={skills.cleaning} />
                <SkillBadge nameEn="Cooking" nameAr="الطبخ" active={skills.cooking} />
              </div>
            </div>

            <div>
              <SectionTitle titleEn="Previous Work Experience" titleAr="الخبرات السابقة" />
              <table className="w-full text-[11px] border border-slate-300 rounded overflow-hidden">
                <thead>
                  <tr style={{ background: '#002060' }} className="text-white">
                    <th className="py-1 px-2.5 text-left font-bold text-[10px] uppercase">Country / <span className="cv-font-arabic">الدولة</span></th>
                    <th className="py-1 px-2.5 text-right font-bold text-[10px] uppercase">Period / <span className="cv-font-arabic">المدة</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {experiences && experiences.length > 0 ? (
                    experiences.map((exp: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-1 px-2.5 font-bold text-slate-800 text-[11px]">{exp.country}</td>
                        <td className="py-1 px-2.5 text-right text-slate-700 font-semibold text-[11px]">{formatPeriod(exp)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-1.5 text-center text-slate-400 italic text-[11px]">No previous experience registered</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-5 space-y-2 flex flex-col">
            <div>
              <SectionTitle titleEn="Passport Details" titleAr="بيانات جواز السفر" />
              <div className="border border-slate-300 rounded overflow-hidden text-[11px]">
                <TableRows data={[
                  { en: 'Number', ar: 'رقم الجواز', val: formData.passportNumber },
                  { en: 'Date of Issue', ar: 'تاريخ الإصدار', val: formData.passportDateOfIssue },
                  { en: 'Place of Issue', ar: 'مكان الإصدار', val: formData.passportPlaceOfIssue },
                  { en: 'Date of Expiry', ar: 'تاريخ الانتهاء', val: formData.passportDateOfExpiry },
                ]} />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <SectionTitle titleEn="Full Photo" titleAr="الصورة الكاملة" />
              <div 
                style={{ 
                  width: '85mm',
                  height: '110mm',
                  borderColor: '#002060' 
                }} 
                className="border-2 rounded bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative shadow-inner p-0.5 mx-auto"
              >
                {formData.fullBodyPhoto ? (
                  <img src={formData.fullBodyPhoto} alt="Full Photo" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-center p-2 text-slate-400 flex flex-col items-center my-auto">
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Full Photo</span>
                    <span className="text-[10px] cv-font-arabic text-slate-500 mt-0.5">الصورة الكاملة للمرشح</span>
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

function CVPage2({ formData }: { formData: any }) {
  return (
    <div
      id="cv-page-2"
      className="cv-page shadow-2xl rounded-sm overflow-hidden text-slate-900"
      style={{
        width: '210mm',
        height: '297mm',
        boxSizing: 'border-box',
        position: 'relative',
        background: '#ffffff',
        fontFamily: 'sans-serif'
      }}
    >
      <AgencyHeader formData={formData} />
      <ReferenceSubBar refNo={formData.refNo} date={formData.date} />

      <div style={{ padding: '14px 20px', paddingBottom: '55px' }} className="space-y-4">
        <div className="flex flex-col">
          <SectionTitle titleEn="Passport Copy Attachment" titleAr="صورة جواز السفر" />
          <div 
            style={{ height: '340px', borderColor: '#002060' }} 
            className="w-full border-2 border-dashed rounded-lg bg-slate-50/70 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner"
          >
            {formData.passportScan ? (
              <img src={formData.passportScan} alt="Passport Copy Scan" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-4 text-slate-400 flex flex-col items-center">
                <FileText className="w-12 h-12 text-slate-300 mb-1" />
                <span className="text-xs font-bold text-slate-700 uppercase">Passport Copy Attachment Frame</span>
                <span className="text-[10px] cv-font-arabic text-slate-500 mt-0.5">مكان إرفاق صورة جواز السفر</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <SectionTitle titleEn="Medical Fitness Report Attachment" titleAr="تقرير الفحص الطبي" />
          <div 
            style={{ height: '340px', borderColor: '#002060' }} 
            className="w-full border-2 border-dashed rounded-lg bg-slate-50/70 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner"
          >
            {formData.medicalScan ? (
              <img src={formData.medicalScan} alt="Medical Report Scan" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-4 text-slate-400 flex flex-col items-center">
                <ShieldCheck className="w-12 h-12 text-slate-300 mb-1" />
                <span className="text-xs font-bold text-slate-700 uppercase">Medical Certificate Attachment Frame</span>
                <span className="text-[10px] cv-font-arabic text-slate-500 mt-0.5">مكان إرفاق تقرير الفحص الطبي</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AgencyFooter />
    </div>
  );
}

function SectionTitle({ titleEn, titleAr }: { titleEn: string; titleAr: string }) {
  return (
    <div style={{ background: '#002060' }} className="text-white px-2.5 py-0.5 rounded-t flex items-center justify-between font-bold mb-0.5">
      <span className="uppercase tracking-wider text-[10px]">{titleEn}</span>
      <span className="cv-font-arabic text-emerald-300 text-[10px] font-semibold">{titleAr}</span>
    </div>
  );
}

function TableRows({ data }: { data: Array<{ en: string; ar: string; val?: string }> }) {
  return (
    <div className="divide-y divide-slate-200">
      {data.map((row, idx) => (
        <div key={idx} className="flex items-center justify-between py-1 px-2 bg-white hover:bg-slate-50">
          <span className="font-bold text-slate-700 text-[10px]">{row.en}</span>
          <span className="font-bold text-blue-950 text-[10px]">{row.val || '-'}</span>
          <span className="cv-font-arabic font-semibold text-slate-600 text-[10px]">{row.ar}</span>
        </div>
      ))}
    </div>
  );
}

function SkillBadge({ nameEn, nameAr, active }: { nameEn: string; nameAr: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 p-1 rounded border text-[10px] ${active ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-white border-slate-200 text-slate-400'}`}>
      <CheckCircle className={`w-3 h-3 shrink-0 ${active ? 'text-emerald-600' : 'text-slate-300'}`} />
      <div>
        <div className="leading-tight font-bold text-[10px]">{nameEn}</div>
        <div className="cv-font-arabic text-[9px] text-slate-600">{nameAr}</div>
      </div>
    </div>
  );
}