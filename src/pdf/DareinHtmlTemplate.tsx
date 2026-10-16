import React from 'react';
import { FileText, User, Image as ImageIcon } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";
import dareinLogoImg from "../assets/logo.png";
import mobileIconImg from "../assets/mobile-icon.png";

interface Props {
  formData: CVFormData;
}

export function DareinHtmlTemplate({ formData }: Props) {
  return (
    <div className="flex flex-col items-center text-slate-900 bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

        .font-garamond {
          font-family: 'EB Garamond', 'Garamond', 'Georgia', serif !important;
        }

        .cv-font-arabic {
          font-family: 'Arial', Tahoma, Geneva, sans-serif !important;
          direction: rtl !important;
          unicode-bidi: embed !important;
          line-height: 1.35 !important;
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
          border: 10px solid rgb(0, 0, 128) !important;
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

      <CVPage1 formData={formData} />
      <CVPage2 formData={formData} />
    </div>
  );
}

function DareinHeader() {
  return (
    <div className="w-full bg-white text-[rgb(0,0,128)] p-3 border-b-2 border-[rgb(0,0,128)]">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex-1">
          <h1 className="font-garamond text-2xl font-black uppercase tracking-wider text-[rgb(0,0,128)]">
            DAREIN EST
          </h1>
          <div className="bg-[rgb(0,0,128)] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs mt-1 inline-block font-garamond uppercase tracking-wide">
            FOR RECRUITMENT OF DOMESTIC MANPOWER
          </div>
        </div>

        <div className="w-16 h-16 flex items-center justify-center shrink-0 mx-2">
          <img 
            src={dareinLogoImg} 
            alt="Darein Est Logo" 
            className="max-h-16 max-w-16 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div className="text-right flex-1">
          <h1 className="cv-font-arabic text-2xl font-extrabold text-[rgb(0,0,128)]">
            دارين التأسيس
          </h1>
          <div className="bg-[rgb(0,0,128)] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs mt-1 inline-block cv-font-arabic">
            لتوظيف القوى العاملة المحلية
          </div>
        </div>
      </div>

      <div className="bg-[rgb(0,0,128)] text-white text-[11px] font-medium py-1 px-3 text-center rounded-sm space-y-0.5">
        <p className="cv-font-arabic">الفروانية بلوك ٤ - حبيب مناور شارع - عربيد معرض - مكتب الميزانين رقم ١ - الكويت</p>
        <p className="font-garamond">Farwaniya Block 4, Habib Menawer Street, Arbeed gallery, Mezanin office No. 1, Kuwait</p>
      </div>

      <div className="mt-1.5 text-center text-sm font-bold flex items-center justify-center gap-2">
        <span className="font-garamond text-slate-800">Afnan 69984733</span>
        <img 
          src={mobileIconImg} 
          alt="Mobile" 
          className="w-4 h-4 object-contain inline-block mx-1"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <span className="cv-font-arabic text-slate-800">أفنان ٦٩٩٨٤٧٣٣</span>
      </div>

      <h2 className="text-center text-xl font-bold font-garamond uppercase text-[rgb(0,0,128)] mt-1">
        Application for Employment
      </h2>
    </div>
  );
}

function CVPage1({ formData }: { formData: any }) {
  const experiences = formData.previousExperiences || [];
  const languages = formData.languages || { arabic: "Basic", english: "Basic" };
  const skills = formData.skills || { babySitting: true, washing: true, cleaning: true, cooking: true, sewing: false, driving: false };

  return (
    <div id="darein-page-1" className="cv-page-container page-break-after-always shadow-2xl">
      <DareinHeader />

      <div className="p-3.5 space-y-2.5 box-border">
        {/* Reference & Name Bar */}
        <div className="grid grid-cols-12 gap-2.5 items-stretch">
          <div className="col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-2 border border-[rgb(0,0,128)] bg-slate-50 p-1.5 rounded-xs text-xs font-semibold">
              <div className="flex gap-1.5 items-center">
                <span className="text-[rgb(0,0,128)] font-bold font-garamond text-sm">Date:</span>
                <span className="font-mono text-slate-900">{formData.date || new Date().toISOString().split('T')[0]}</span>
              </div>
              <div className="flex gap-1.5 items-center border-l border-slate-300 pl-2">
                <span className="text-[rgb(0,0,128)] font-bold font-garamond text-sm">Serial No:</span>
                <span className="font-mono text-slate-900">{formData.refNo || 'DAR-2026-001'}</span>
              </div>
            </div>

            <div className="border border-[rgb(0,0,128)] bg-[#8BBDFA]/40 p-2 rounded-xs flex justify-between items-center mt-2">
              <span className="text-xs font-bold font-garamond text-[rgb(0,0,128)] uppercase tracking-wider">FULL NAME</span>
              <span className="text-base font-extrabold font-garamond text-[rgb(0,0,128)] uppercase tracking-wide px-2">{formData.fullName || 'FULL CANDIDATE NAME'}</span>
              <span className="cv-font-arabic text-xs font-bold text-[rgb(0,0,128)]">الاسم الكامل</span>
            </div>
          </div>

          <div className="col-span-4 border-2 border-[rgb(0,0,128)] rounded-xs bg-white h-36 flex flex-col items-center justify-center overflow-hidden relative shadow-2xs">
            {formData.headshotPhoto ? (
              <img src={formData.headshotPhoto} alt="Applicant Photo" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-slate-400 p-1">
                <User className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                <p className="text-xs font-bold font-garamond uppercase text-slate-600">Applicant photo</p>
                <p className="text-[10px] text-slate-500">2.14" x 2.03"</p>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 space-y-2">
            {/* Details of Application */}
            <div className="border border-[rgb(0,0,128)] rounded-xs overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] px-2.5 py-1 font-bold flex justify-between items-center border-b border-[rgb(0,0,128)]">
                <span className="font-garamond text-sm uppercase tracking-wider">DETAILS OF APPLICATION</span>
                <span className="cv-font-arabic text-xs">تفاصيل التطبيق</span>
              </div>
              <div className="divide-y divide-slate-200 bg-white">
                <Row en="Nationality" ar="جنسية" val={formData.nationality} />
                <Row en="Religion" ar="دين" val={formData.religion} />
                <Row en="Date of Birth" ar="تاريخ الميلاد" val={formData.dateOfBirth} />
                <Row en="Age" ar="عمر" val={formData.age ? `${formData.age} Yrs` : ''} />
                <Row en="Place of Birth" ar="مكان الميلاد" val={formData.placeOfBirth} />
                <Row en="Marital Status" ar="الحالة الاجتماعية" val={formData.maritalStatus} />
                <Row en="No. of Children" ar="عدد الأطفال" val={formData.numberOfChildren} />
                <Row en="Weight(KG)" ar="وزن" val={formData.weight ? `${formData.weight} kg` : ''} />
                <Row en="Height(cm)" ar="ارتفاع" val={formData.height ? `${formData.height} cm` : ''} />
                <Row en="Educational Qualification" ar="المؤهل التعليمي" val={formData.educationalQualification} />
              </div>
            </div>

            {/* Language Skills */}
            <div className="border border-[rgb(0,0,128)] rounded-xs overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] px-2.5 py-1 font-bold flex justify-between items-center border-b border-[rgb(0,0,128)]">
                <span className="font-garamond text-sm uppercase tracking-wider">LANGUAGE SKILLS</span>
                <span className="cv-font-arabic text-xs">المهارات اللغوية</span>
              </div>
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-[#8BBDFA]/30 font-bold border-b border-[rgb(0,0,128)] text-[rgb(0,0,128)]">
                    <th className="p-1 border-r border-[rgb(0,0,128)] font-garamond text-xs">ENGLISH</th>
                    <th className="p-1 border-r border-[rgb(0,0,128)] cv-font-arabic text-xs">إنجليزي</th>
                    <th className="p-1 border-r border-[rgb(0,0,128)] font-garamond text-xs">ARABIC</th>
                    <th className="p-1 cv-font-arabic text-xs">عربي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">POOR</td>
                    <td className="p-1 border-r border-slate-200 font-bold text-[rgb(0,0,128)]">{languages.english === 'Poor' ? '✓' : ''}</td>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">POOR</td>
                    <td className="p-1 font-bold text-[rgb(0,0,128)]">{languages.arabic === 'Poor' ? '✓' : ''}</td>
                  </tr>
                  <tr>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">FAIR</td>
                    <td className="p-1 border-r border-slate-200 font-bold text-[rgb(0,0,128)]">{languages.english === 'Fair' ? '✓' : ''}</td>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">FAIR</td>
                    <td className="p-1 font-bold text-[rgb(0,0,128)]">{languages.arabic === 'Fair' ? '✓' : ''}</td>
                  </tr>
                  <tr>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">FLUENT</td>
                    <td className="p-1 border-r border-slate-200 font-bold text-[rgb(0,0,128)]">{languages.english === 'Fluent' || languages.english === 'Basic' ? '✓' : ''}</td>
                    <td className="p-1 border-r border-slate-200 font-garamond font-bold text-slate-700">FLUENT</td>
                    <td className="p-1 font-bold text-[rgb(0,0,128)]">{languages.arabic === 'Fluent' || languages.arabic === 'Basic' ? '✓' : ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Previous Experience */}
            <div className="border border-[rgb(0,0,128)] rounded-xs overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] px-2.5 py-1 font-bold flex justify-between items-center border-b border-[rgb(0,0,128)]">
                <span className="font-garamond text-sm uppercase tracking-wider">PREVIOUS EXPERIENCE</span>
                <span className="cv-font-arabic text-xs">الخبرة السابقة</span>
              </div>
              <div className="grid grid-cols-2 bg-[#8BBDFA]/30 font-bold border-b border-[rgb(0,0,128)] p-1 text-center text-[rgb(0,0,128)]">
                <span className="font-garamond">COUNTRY / <span className="cv-font-arabic">دولة</span></span>
                <span className="font-garamond">PERIOD / <span className="cv-font-arabic">المدة</span></span>
              </div>
              <div className="bg-white p-1.5 text-center font-semibold">
                {experiences.length > 0 ? (
                  experiences.map((exp: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 border-b last:border-b-0 border-slate-200 py-0.5">
                      <span className="font-garamond text-slate-800">{exp.country}</span>
                      <span className="font-garamond text-slate-800">{exp.period || `${exp.years || 0} Yrs`}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-400 italic font-garamond">No experience recorded</span>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="border border-[rgb(0,0,128)] rounded-xs overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] px-2.5 py-1 font-bold flex justify-between items-center border-b border-[rgb(0,0,128)]">
                <span className="font-garamond text-sm uppercase tracking-wider">SKILLS</span>
                <span className="cv-font-arabic text-xs">المهارات</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-2 bg-white text-[11px]">
                <SkillBox en="Baby Sitting" ar="جلوس الطفل" active={skills.babySitting} />
                <SkillBox en="Washing" ar="غسل" active={skills.washing} />
                <SkillBox en="Cleaning" ar="تنظيف" active={skills.cleaning} />
                <SkillBox en="Cooking" ar="طبخ" active={skills.cooking} />
                <SkillBox en="Sewing" ar="خياطة" active={skills.sewing} />
                <SkillBox en="Driving" ar="القيادة" active={skills.driving} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-5 space-y-2">
            {/* Passport Details */}
            <div className="border border-[rgb(0,0,128)] rounded-xs overflow-hidden text-xs shadow-2xs">
              <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] px-2.5 py-1 font-bold flex justify-between items-center border-b border-[rgb(0,0,128)]">
                <span className="font-garamond text-sm uppercase tracking-wider">PASSPORT DETAILS</span>
                <span className="cv-font-arabic text-xs">تفاصيل جواز السفر</span>
              </div>
              <div className="divide-y divide-slate-200 bg-white">
                <Row en="NUMBER" ar="رقم" val={formData.passportNumber} />
                <Row en="DATE OF ISSUE" ar="تاريخ الإصدار" val={formData.passportDateOfIssue} />
                <Row en="PLACE OF ISSUE" ar="مكان الإصدار" val={formData.passportPlaceOfIssue} />
                <Row en="DATE OF EXP" ar="تاريخ الانتهاء" val={formData.passportDateOfExpiry} />
              </div>
            </div>

            {/* Full Photo Frame */}
            <div className="border-2 border-[rgb(0,0,128)] rounded-xs bg-slate-50 h-[108mm] flex flex-col items-center justify-center overflow-hidden relative p-1 shadow-2xs">
              {formData.fullBodyPhoto ? (
                <img src={formData.fullBodyPhoto} alt="Full Photo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-slate-400 p-2">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                  <p className="text-xs font-bold font-garamond uppercase text-slate-600">Full photo</p>
                  <p className="text-[10px] text-slate-500">5.35" x 3.54"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CVPage2({ formData }: { formData: any }) {
  return (
    <div id="darein-page-2" className="cv-page-container flex flex-col justify-between shadow-2xl">
      <div>
        <div className="p-3.5 border-b-2 border-[rgb(0,0,128)] flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img 
                src={dareinLogoImg} 
                alt="Darein Est Logo" 
                className="max-h-10 max-w-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="text-lg font-black font-garamond text-[rgb(0,0,128)] uppercase tracking-wider">DAREIN EST</h1>
              <span className="bg-[rgb(0,0,128)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs font-garamond uppercase">
                FOR RECRUITMENT OF DOMESTIC MANPOWER
              </span>
            </div>
          </div>

          <div className="flex gap-4 text-xs font-semibold border border-[rgb(0,0,128)] p-1.5 bg-slate-50 rounded-xs">
            <div className="flex gap-1"><span className="text-[rgb(0,0,128)] font-bold font-garamond">Date:</span> <span className="font-mono">{formData.date || '---'}</span></div>
            <div className="flex gap-1 border-l border-slate-300 pl-2"><span className="text-[rgb(0,0,128)] font-bold font-garamond">Serial No:</span> <span className="font-mono">{formData.refNo || '---'}</span></div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-[#8BBDFA]/40 text-[rgb(0,0,128)] border border-[rgb(0,0,128)] text-center py-2 font-bold font-garamond text-base tracking-wider uppercase rounded-xs">
            PASSPORT COPY ATTACHMENT
          </div>

          <div className="w-full border-2 border-[rgb(0,0,128)] h-[162mm] bg-slate-50 flex items-center justify-center relative overflow-hidden p-2 rounded-xs shadow-2xs">
            {formData.passportScan ? (
              <img src={formData.passportScan} alt="Passport Attachment" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-slate-400 p-4">
                <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-bold font-garamond uppercase text-slate-600">Passport</p>
                <p className="text-xs text-slate-500">3.54" x 5.18"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[rgb(0,0,128)] text-white px-4 py-2 flex justify-between items-center text-xs font-semibold">
        <span className="font-garamond tracking-wide">DAREIN EST - Application for Employment</span>
        <span className="font-garamond">Page 2</span>
      </div>
    </div>
  );
}

function Row({ en, ar, val }: { en: string; ar: string; val?: string }) {
  return (
    <div className="grid grid-cols-12 p-1.5 items-center">
      <span className="col-span-5 font-bold font-garamond text-slate-800 text-[12px]">{en}</span>
      <span className="col-span-4 font-bold font-garamond text-[rgb(0,0,128)] text-center text-[12.5px]">{val || '-'}</span>
      <span className="col-span-3 cv-font-arabic text-left font-semibold text-slate-600 text-[11px]">{ar}</span>
    </div>
  );
}

function SkillBox({ en, ar, active }: { en: string; ar: string; active?: boolean }) {
  return (
    <div className={`border border-[rgb(0,0,128)] p-1 rounded-xs flex items-center justify-between ${active ? 'bg-[#8BBDFA]/30 font-bold' : 'bg-white'}`}>
      <div>
        <div className="cv-font-arabic text-[10px] text-slate-700">{ar}</div>
        <div className="text-[10.5px] font-garamond text-[rgb(0,0,128)] font-bold">{en}</div>
      </div>
      <div className="w-4 h-4 border border-[rgb(0,0,128)] flex items-center justify-center text-xs font-bold bg-white text-[rgb(0,0,128)]">
        {active ? '✓' : ''}
      </div>
    </div>
  );
}