import React from 'react';
import type { CVFormData } from '../context/CVFormContext';
import logoImg from '../assets/logo.png';
import mobileIconImg from '../assets/mobile-icon.png';

interface Props {
  formData: CVFormData;
}

export function DareinHtmlTemplate({ formData }: Props) {
  const checkMark = "✓";

  const getLanguageCheck = (lang: string | undefined, level: string) => {
    if (!lang) return false;
    return lang.toLowerCase() === level.toLowerCase();
  };

  return (
    <div className="darein-template-wrapper text-slate-900 font-serif bg-white">
      <style>{`
        @media print {
          .darein-page {
            width: 210mm !important;
            height: 296mm !important;
            max-height: 296mm !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            position: relative !important;
            margin: 0 !important;
            padding: 8mm !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      {/* PAGE 1: CANDIDATE PROFILE */}
      <div className="darein-page cv-page-container w-[210mm] min-h-[296mm] max-h-[296mm] p-5 bg-white border-4 border-[#000080] shadow-md mb-8 print:mb-0 print:shadow-none flex flex-col justify-between box-sizing-border overflow-hidden">
        <div>
          {/* Header Block with Logo */}
          <div className="border-b-2 border-[#000080] pb-2 mb-2">
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <h1 className="text-xl font-black text-[#000080] tracking-wider uppercase font-serif">DAREIN EST</h1>
                <div className="bg-[#000080] text-white text-[9px] font-bold px-1.5 py-0.5 inline-block uppercase">
                  FOR RECRUITMENT OF DOMESTIC MANPOER
                </div>
              </div>

              {/* Logo from src/assets/logo.png */}
              <div className="w-1/3 flex justify-center">
                <img src={logoImg} alt="Darein Logo" className="h-14 object-contain" />
              </div>

              <div className="w-1/3 text-right">
                <h2 className="text-xl font-black text-[#000080] font-sans dir-rtl">دارين التأسيس</h2>
                <div className="bg-[#000080] text-white text-[9px] font-bold px-1.5 py-0.5 inline-block dir-rtl">
                  لتوظيف القوى العاملة المنزلية
                </div>
              </div>
            </div>

            {/* Address Banner */}
            <div className="mt-2 bg-[#000080] text-white text-[10px] py-1 px-2 text-center font-bold font-sans space-y-0.5">
              <div dir="rtl">الفروانية بلوك ٤ - حبيب مناور شارع - عربيد معرض - مكاتب الميزانين رقم - ١ الكويت</div>
              <div>Farwaniya Block 4, Habib Menawer Steet, Arbeed gallery, Mezanin office No. 1,</div>
            </div>
          </div>

          {/* Top Section with Headshot Aligned Right */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            {/* Left 3 Columns: Phone, Title, Date/Serial, Full Name */}
            <div className="col-span-3 space-y-1.5">
              {/* Phone Line with Mobile Icon */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#000080] py-0.5">
                <span>Afnan 69984733</span>
                <img src={mobileIconImg} alt="Mobile" className="w-4 h-4 object-contain" />
                <span dir="rtl">أفنان ٦٩٩٨٤٧٣٣</span>
              </div>

              <h3 className="text-center font-black text-base text-[#000080] font-serif tracking-tight">
                Application for Employment
              </h3>

              {/* Date & Serial No Bar */}
              <div className="grid grid-cols-2 border border-[#000080] text-[11px] font-bold bg-slate-50">
                <div className="p-1 border-r border-[#000080] flex gap-2">
                  <span className="bg-[#8BAAD0] text-[#000080] px-1.5 py-0.5 font-black">Date:</span>
                  <span className="font-extrabold text-slate-900">{formData.date || '2026-10-16'}</span>
                </div>
                <div className="p-1 flex gap-2 justify-end">
                  <span className="bg-[#8BAAD0] text-[#000080] px-1.5 py-0.5 font-black">Serial No:</span>
                  <span className="font-extrabold text-slate-900">{formData.refNo || 'DAREIN-2026-0892'}</span>
                </div>
              </div>

              {/* Full Name Bar */}
              <div className="grid grid-cols-4 border border-[#000080] text-xs font-bold bg-white">
                <div className="bg-[#8BAAD0] text-[#000080] p-1 font-black flex items-center">
                  FULL NAME
                </div>
                <div className="col-span-2 p-1 font-black text-slate-900 uppercase flex items-center text-sm">
                  {formData.fullName || 'LULA MESFEN GOSHU'}
                </div>
                <div className="bg-[#8BAAD0] text-[#000080] p-1 font-bold text-right flex items-center justify-end dir-rtl">
                  الاسم الكامل
                </div>
              </div>
            </div>

            {/* Right 1 Column: Applicant Photo (2.14" x 2.03") */}
            <div className="col-span-1 border-2 border-[#000080] h-[150px] flex flex-col items-center justify-center p-1 bg-white">
              {formData.headshotPhoto ? (
                <img src={formData.headshotPhoto} alt="Headshot" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-center text-slate-500 text-[10px] font-bold font-sans">
                  Applicant photo<br />2.14" x 2.03"
                </div>
              )}
            </div>
          </div>

          {/* Main Grid: Info/Skills Left Column vs Full Photo Right Column */}
          <div className="grid grid-cols-3 gap-2">
            {/* Left 2 Columns: Application Details, Passport, Language, Experience, Skills */}
            <div className="col-span-2 space-y-2">
              {/* DETAILS OF APPLICATION Table */}
              <table className="w-full text-[10px] border-collapse border border-[#000080] font-sans">
                <thead>
                  <tr className="bg-[#8BAAD0] text-[#000080] font-black">
                    <th colSpan={3} className="p-1 text-left border-b border-[#000080] flex justify-between">
                      <span>DETAILS OF APPLICATION</span>
                      <span dir="rtl">تفاصيل التطبيق</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000080]">
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30 w-1/3">Nationality</td><td className="p-0.5 font-black text-sm text-center">{formData.nationality || 'Ethiopian'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30 w-1/4">جنسية</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Religion</td><td className="p-0.5 font-black text-sm text-center">{formData.religion || 'Christian'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">دين</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Date of Birth</td><td className="p-0.5 font-black text-center">{formData.dateOfBirth || '1998-02-15'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">تاريخ الميلاد</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Age</td><td className="p-0.5 font-black text-center">{formData.age ? `${formData.age}` : '28'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">عمر</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Place of Birth</td><td className="p-0.5 font-black text-center">{formData.placeOfBirth || 'Addis Ababa'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">مكان الميلاد</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Marital Status</td><td className="p-0.5 font-black text-center">{formData.maritalStatus || 'Single'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">الحالة الاجتماعية</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">No. of Children</td><td className="p-0.5 font-black text-center">{formData.numberOfChildren || '0'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">عدد الأطفال</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Weight(KG)</td><td className="p-0.5 font-black text-center">{formData.weight || '52.0'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">وزن</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Height(cm)</td><td className="p-0.5 font-black text-center">{formData.height || '160.0'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">إرتفاع</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">Educational Qualification</td><td className="p-0.5 font-black text-center">{formData.educationalQualification || 'Primary'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">المؤهل التعليمي</td></tr>
                </tbody>
              </table>

              {/* PASSPORT DETAILS Table */}
              <table className="w-full text-[10px] border-collapse border border-[#000080] font-sans">
                <thead>
                  <tr className="bg-[#8BAAD0] text-[#000080] font-black">
                    <th colSpan={3} className="p-1 text-left border-b border-[#000080] flex justify-between">
                      <span>PASSPORT DETAILS</span>
                      <span dir="rtl">تفاصيل جواز السفر</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000080]">
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30 w-1/3">NUMBER</td><td className="p-0.5 font-black text-center">{formData.passportNumber || 'EQ'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30 w-1/4">رقم</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">DATE OF ISSUE</td><td className="p-0.5 font-black text-center">{formData.passportDateOfIssue || ''}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">تاريخ الإصدار</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">PLACE OF ISSUE</td><td className="p-0.5 font-black text-center uppercase">{formData.passportPlaceOfIssue || 'ADDIS ABABA'}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">مكان الإصدار</td></tr>
                  <tr><td className="p-0.5 font-bold bg-[#8BAAD0]/30">DATE OF EXP</td><td className="p-0.5 font-black text-center">{formData.passportDateOfExpiry || ''}</td><td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">تاريخ الانتهاء</td></tr>
                </tbody>
              </table>

              {/* LANGUAGE SKILLS Table */}
              <table className="w-full text-[10px] border-collapse border border-[#000080] font-sans text-center">
                <thead>
                  <tr className="bg-[#8BAAD0] text-[#000080] font-black">
                    <th colSpan={4} className="p-0.5 text-left flex justify-between">
                      <span>LANGUAGE SKILLS</span>
                      <span dir="rtl">المهارات اللغوية</span>
                    </th>
                  </tr>
                  <tr className="bg-[#8BAAD0]/40 text-[#000080] font-bold">
                    <th className="p-0.5 border border-[#000080] text-left">ENGLISH</th>
                    <th className="p-0.5 border border-[#000080] dir-rtl">إنجليزي</th>
                    <th className="p-0.5 border border-[#000080]">ARABIC</th>
                    <th className="p-0.5 border border-[#000080] dir-rtl">عربي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000080]">
                  <tr>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-left">POOR</td>
                    <td className="p-0.5 border-r border-[#000080]">{getLanguageCheck(formData.languages?.english, 'poor') ? checkMark : ''}</td>
                    <td className="p-0.5">{getLanguageCheck(formData.languages?.arabic, 'poor') ? checkMark : ''}</td>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-right dir-rtl">فقير</td>
                  </tr>
                  <tr>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-left">FAIR</td>
                    <td className="p-0.5 border-r border-[#000080]">{getLanguageCheck(formData.languages?.english, 'fair') ? checkMark : ''}</td>
                    <td className="p-0.5">{getLanguageCheck(formData.languages?.arabic, 'fair') ? checkMark : ''}</td>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-right dir-rtl">عدل</td>
                  </tr>
                  <tr>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-left">FLUENT</td>
                    <td className="p-0.5 border-r border-[#000080]">{getLanguageCheck(formData.languages?.english, 'fluent') ? checkMark : ''}</td>
                    <td className="p-0.5">{getLanguageCheck(formData.languages?.arabic, 'fluent') ? checkMark : checkMark}</td>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 text-right dir-rtl">طليق</td>
                  </tr>
                </tbody>
              </table>

              {/* PREVIOUS EXPERIENCE Table */}
              <table className="w-full text-[10px] border-collapse border border-[#000080] font-sans">
                <thead>
                  <tr className="bg-[#8BAAD0] text-[#000080] font-black">
                    <th colSpan={3} className="p-0.5 text-left flex justify-between">
                      <span>PREVIOUS EXPERIENCE</span>
                      <span dir="rtl">الخبرة السابقة</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000080]">
                  <tr>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30 w-1/3">COUNTRY</td>
                    <td className="p-0.5 font-black text-center">{formData.previousExperiences?.[0]?.country || ''}</td>
                    <td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30 w-1/4">دولة</td>
                  </tr>
                  <tr>
                    <td className="p-0.5 font-bold bg-[#8BAAD0]/30">PERIOD</td>
                    <td className="p-0.5 font-black text-center">{formData.previousExperiences?.[0]?.period || ''}</td>
                    <td className="p-0.5 text-right font-bold dir-rtl bg-[#8BAAD0]/30">المدة</td>
                  </tr>
                </tbody>
              </table>

              {/* SKILLS Table Grid */}
              <div className="border border-[#000080] font-sans text-[10px]">
                <div className="bg-[#8BAAD0] text-[#000080] font-black p-0.5 flex justify-between border-b border-[#000080]">
                  <span>SKILLS</span>
                  <span dir="rtl">المهارات</span>
                </div>

                <div className="grid grid-cols-3 divide-x divide-y divide-[#000080]">
                  {[
                    { key: 'babySitting', en: 'Baby Sitting', ar: 'جلوس الطفل' },
                    { key: 'washing', en: 'Washing', ar: 'غسل' },
                    { key: 'cleaning', en: 'Cleaning', ar: 'تنظيف' },
                    { key: 'cooking', en: 'Cooking', ar: 'طبخ' },
                    { key: 'sewing', en: 'Sewing', ar: 'خياطة' },
                    { key: 'driving', en: 'Driving', ar: 'القيادة' },
                  ].map((s) => {
                    const isChecked = Boolean(formData.skills?.[s.key as keyof typeof formData.skills]);
                    return (
                      <div key={s.key} className="p-1 flex items-center justify-between bg-white">
                        <div className="flex flex-col">
                          <span dir="rtl" className="text-[9px] font-bold text-[#000080]">{s.ar}</span>
                          <span className="font-bold">{s.en}</span>
                        </div>
                        <div className="w-4 h-4 border border-[#000080] flex items-center justify-center font-bold text-[#000080]">
                          {isChecked ? checkMark : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Full Photo (5.35" x 3.54") */}
            <div className="col-span-1 border-2 border-[#000080] h-[480px] flex flex-col items-center justify-center p-1 bg-white">
              {formData.fullBodyPhoto ? (
                <img src={formData.fullBodyPhoto} alt="Full Body" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-center text-slate-500 text-[10px] font-bold font-sans">
                  Full photo<br />5.35" x 3.54"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar with Date & Serial No */}
        <div className="border-t-2 border-[#000080] pt-1 mt-2 flex items-center justify-between text-[10px] font-bold text-[#000080] font-sans">
          <span>DAREIN EST FOR RECRUITMENT</span>
          <span>DATE: {formData.date || '2026-10-16'} │ SERIAL NO: {formData.refNo || 'DAREIN-2026-0892'}</span>
          <span>PAGE 1 OF 2</span>
        </div>
      </div>

      {/* PAGE 2: PASSPORT COPY & MEDICAL REPORT ATTACHMENTS */}
      <div className="darein-page cv-page-container w-[210mm] min-h-[296mm] max-h-[296mm] p-5 bg-white border-4 border-[#000080] shadow-md print:shadow-none flex flex-col justify-between box-sizing-border overflow-hidden font-sans">
        <div>
          {/* Header Page 2 */}
          <div className="border-b-2 border-[#000080] pb-2 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Darein Logo" className="h-10 object-contain" />
              <div>
                <h2 className="text-base font-black text-[#000080] font-serif">DAREIN EST FOR RECRUITMENT</h2>
                <p className="text-[10px] font-bold text-slate-600">CANDIDATE DOCUMENT ATTACHMENTS</p>
              </div>
            </div>
            <div className="text-right text-xs font-bold text-[#000080]">
              <div>NAME: {formData.fullName || 'LULA MESFEN GOSHU'}</div>
              <div>PASSPORT NO: {formData.passportNumber || 'EQ454545'}</div>
            </div>
          </div>

          {/* Passport Scan */}
          <div className="border-2 border-dashed border-[#000080] rounded-lg p-2 flex flex-col items-center justify-center bg-slate-50 mb-3 h-[120mm] overflow-hidden">
            <h4 className="text-xs font-black text-[#000080] uppercase mb-2">PASSPORT COPY ATTACHMENT / مرفق صورة جواز السفر</h4>
            {formData.passportScan ? (
              <img src={formData.passportScan} alt="Passport Scan" className="max-h-[90%] max-w-full object-contain rounded border border-slate-300 shadow-xs" />
            ) : (
              <div className="text-slate-400 text-xs font-bold">NO PASSPORT SCAN ATTACHED</div>
            )}
          </div>

          {/* Medical Fitness Scan */}
          <div className="border-2 border-dashed border-[#000080] rounded-lg p-2 flex flex-col items-center justify-center bg-slate-50 h-[120mm] overflow-hidden">
            <h4 className="text-xs font-black text-[#000080] uppercase mb-2">MEDICAL FITNESS REPORT / تقرير اللياقة الطبية</h4>
            {formData.medicalScan ? (
              <img src={formData.medicalScan} alt="Medical Scan" className="max-h-[90%] max-w-full object-contain rounded border border-slate-300 shadow-xs" />
            ) : (
              <div className="text-slate-400 text-xs font-bold">NO MEDICAL REPORT ATTACHED</div>
            )}
          </div>
        </div>

        {/* Footer Page 2 */}
        <div className="border-t-2 border-[#000080] pt-1 mt-2 flex items-center justify-between text-[10px] font-bold text-[#000080]">
          <span>DAREIN EST FOR RECRUITMENT</span>
          <span>DATE: {formData.date || '2026-10-16'} │ SERIAL NO: {formData.refNo || 'DAREIN-2026-0892'}</span>
          <span>PAGE 2 OF 2</span>
        </div>
      </div>
    </div>
  );
}