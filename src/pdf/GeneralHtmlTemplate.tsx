import { FileText, Image as ImageIcon } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";

interface Props {
  formData: CVFormData;
}

export function GeneralHtmlTemplate({ formData }: Props) {
  return (
    <div className="flex flex-col items-center text-slate-900 bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800;900&display=swap');

        body, .font-sans {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
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

function GeneralHeader() {
  return (
    <div className="w-full bg-[#08265F] text-white p-6 text-center shadow-md">
      <h1 className="text-4xl font-black tracking-widest uppercase">TESNIM</h1>
      <h2 className="text-2xl font-serif italic text-slate-200 mt-1 border-b-2 border-white/30 pb-2 inline-block px-8">
        Foreign Employment Agency
      </h2>
    </div>
  );
}

function GeneralFooter() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#08265F] text-white py-3 px-6 text-center text-xs font-semibold space-y-1">
      <div className="flex justify-center gap-6">
        <span>+251 11 128 0000</span>
        <span>│</span>
        <span>+251 90 828 2828</span>
      </div>
      <p>tesnimagency2828@gmail.com</p>
    </div>
  );
}

function ReferenceSubBar({ refNo, date, passportNumber }: { refNo?: string; date?: string; passportNumber?: string }) {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthStr = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const formattedDateTime = `${day} ${monthStr} ${year}, ${hours}:${minutes}`;

  const monthNum = String(now.getMonth() + 1).padStart(2, '0');
  const compactDate = `${day}${monthNum}${year}`;
  const cleanPassport = (passportNumber || 'EP000000').replace(/[^a-zA-Z0-9]/g, '');

  const resolvedRefNo = `TEM/${compactDate}/${cleanPassport}/01`;

  return (
    <div style={{ background: '#0A192F', color: '#e2e8f0', padding: '0 26px', height: '36px' }} className="flex items-center justify-between font-semibold border-b border-slate-700 box-border w-full text-xs">
      <div className="flex items-center gap-2 h-full">
        <span className="text-[#0BBF93] font-bold flex items-center">Ref. No:</span>
        <span className="bg-slate-800 px-2.5 py-0.5 rounded border border-slate-600 text-white font-mono font-semibold">{resolvedRefNo}</span>
      </div>
      <div className="flex items-center gap-2 h-full">
        <span className="text-[#0BBF93] font-bold flex items-center">Date:</span>
        <span className="bg-slate-800 px-2.5 py-0.5 rounded border border-slate-600 text-white font-mono font-semibold">{formattedDateTime}</span>
      </div>
    </div>
  );
}

function CVPage1({ formData }: { formData: any }) {
  const experiences = formData.previousExperiences || [];
  const languages = formData.languages || { arabic: "Basic", english: "Basic" };
  const skills = formData.skills || { babySitting: true, washing: true, cleaning: true, cooking: true };

  return (
    <div id="general-page-1" className="cv-page-container page-break-after-always shadow-2xl">
      <GeneralHeader />
      <ReferenceSubBar passportNumber={formData.passportNumber} />

      <div style={{ padding: '16px 24px 80px 24px' }} className="space-y-4 box-border">
        {/* Name Bar */}
        <div className="border-b-2 border-[#08265F] pb-2">
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold text-[#08265F]">Name:</span>
            <span className="text-2xl font-extrabold text-slate-900 uppercase tracking-wide border-b border-slate-400 flex-1">
              {formData.fullName || 'CANDIDATE FULL NAME'}
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 space-y-3">
            {/* Details of Application */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs shadow-sm">
              <div className="bg-[#08265F] text-white px-3 py-1.5 font-bold rounded-t-md flex justify-between">
                <span>Details of Application</span>
                <span className="cv-font-arabic">بيانات الطلب</span>
              </div>
              <div className="divide-y divide-slate-200 bg-white">
                <Row en="Nationality" ar="الجنسية" val={formData.nationality} />
                <Row en="Religion" ar="الديانة" val={formData.religion} />
                <Row en="Place of Birth" ar="مكان الميلاد" val={formData.placeOfBirth} />
                <Row en="Date of Birth" ar="تاريخ الميلاد" val={formData.dateOfBirth} />
                <Row en="Age" ar="العمر" val={formData.age ? `${formData.age} Yrs` : ''} />
                <Row en="Living Town" ar="مكان السكن" val={formData.placeOfBirth} />
                <Row en="Marital Status" ar="الحالة الاجتماعية" val={formData.maritalStatus} />
                <Row en="No. of Children" ar="عدد الاطفال" val={formData.numberOfChildren} />
                <Row en="Phone No." ar="رقم جوال" val={formData.phoneNo} />
                <Row en="Height" ar="الطول" val={formData.height ? `${formData.height} cm` : ''} />
                <Row en="Weight" ar="الوزن" val={formData.weight ? `${formData.weight} kg` : ''} />
                <Row en="Educational" ar="المستوي التعليمي" val={formData.educationalQualification} />
              </div>
            </div>

            {/* Language Skills */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs shadow-sm">
              <div className="bg-[#08265F] text-white px-3 py-1.5 font-bold rounded-t-md">
                Language Skills
              </div>
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-slate-100 font-bold border-b">
                    <th className="p-1.5">Languages</th>
                    <th className="p-1.5">Arabic</th>
                    <th className="p-1.5">English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-1.5 font-medium">Good</td>
                    <td className="p-1.5">{languages.arabic === 'Fluent' || languages.arabic === 'Good' ? '✓' : ''}</td>
                    <td className="p-1.5">{languages.english === 'Fluent' || languages.english === 'Good' ? '✓' : ''}</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-medium">Fair</td>
                    <td className="p-1.5">{languages.arabic === 'Fair' || languages.arabic === 'Basic' ? '✓' : ''}</td>
                    <td className="p-1.5">{languages.english === 'Fair' || languages.english === 'Basic' ? '✓' : ''}</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-medium">Poor</td>
                    <td className="p-1.5">{languages.arabic === 'Poor' ? '✓' : ''}</td>
                    <td className="p-1.5">{languages.english === 'Poor' ? '✓' : ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Additional Skills */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs shadow-sm">
              <div className="bg-[#08265F] text-white px-3 py-1.5 font-bold rounded-t-md">
                Additional Skills
              </div>
              <div className="divide-y divide-slate-200 bg-white">
                <Row en="House Work" ar="خادمة" val={skills.cleaning ? 'Yes' : 'No'} />
                <Row en="Baby Sitting" ar="غذابة الرضيع" val={skills.babySitting ? 'Yes' : 'No'} />
                <Row en="Cooking" ar="الطبخ" val={skills.cooking ? 'Yes' : 'No'} />
              </div>
            </div>

            {/* Previous Experience */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs shadow-sm">
              <div className="bg-[#08265F] text-white px-3 py-1.5 font-bold rounded-t-md">
                Previous Experience
              </div>
              <div className="grid grid-cols-2 bg-slate-100 font-bold p-1.5 text-center border-b">
                <span>Country</span>
                <span>Period</span>
              </div>
              <div className="bg-white p-2 text-center">
                {experiences.length > 0 ? (
                  experiences.map((exp: any, i: number) => (
                    <div key={i} className="grid grid-cols-2 py-0.5 border-b last:border-0">
                      <span>{exp.country}</span>
                      <span>{exp.period || `${exp.years || 0} Yrs`}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-400 italic">No experience recorded</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-6 space-y-3 flex flex-col">
            <div className="border-2 border-[#08265F] rounded-lg bg-slate-900 h-[120mm] overflow-hidden relative shadow-md">
              {formData.fullBodyPhoto ? (
                <img src={formData.fullBodyPhoto} alt="Full Body Photo" className="w-full h-full object-cover" />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-12 h-12 mb-2 text-slate-500" />
                  <span className="text-xs font-bold uppercase">Full Photo Container</span>
                </div>
              )}
            </div>

            {/* Passport Details */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs shadow-sm">
              <div className="bg-[#08265F] text-white px-3 py-1.5 font-bold rounded-t-md flex justify-between">
                <span>Passport Details</span>
                <span className="cv-font-arabic">بيانات جواز السفر</span>
              </div>
              <div className="divide-y divide-slate-200 bg-white">
                <Row en="Number" ar="رقم جواز السفر" val={formData.passportNumber} />
                <Row en="Date of Issue" ar="تاريخ الاصدار" val={formData.passportDateOfIssue} />
                <Row en="Place of Issue" ar="مكان الاصدار" val={formData.passportPlaceOfIssue} />
                <Row en="Date of Exp." ar="تاريخ الانتهاء" val={formData.passportDateOfExpiry} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GeneralFooter />
    </div>
  );
}

function CVPage2({ formData }: { formData: any }) {
  return (
    <div id="general-page-2" className="cv-page-container shadow-2xl relative">
      <GeneralHeader />
      <ReferenceSubBar passportNumber={formData.passportNumber} />

      <div className="p-8 space-y-4">
        <h3 className="text-xl font-bold text-[#08265F] lowercase tracking-wide">
          passport
        </h3>

        <div className="w-full border-2 border-slate-900 h-[150mm] bg-white flex items-center justify-center overflow-hidden relative p-2 shadow-sm">
          {formData.passportScan ? (
            <img src={formData.passportScan} alt="Passport Attachment" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-slate-400">
              <FileText className="w-16 h-16 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold uppercase">Passport Attachment Container</p>
            </div>
          )}
        </div>
      </div>

      <GeneralFooter />
    </div>
  );
}

function Row({ en, ar, val }: { en: string; ar: string; val?: string }) {
  return (
    <div className="grid grid-cols-12 p-1.5 items-center">
      <span className="col-span-5 font-semibold text-slate-700 text-[11px]">{en}</span>
      <span className="col-span-4 font-bold text-[#08265F] text-center text-[11.5px]">{val || '-'}</span>
      <span className="col-span-3 cv-font-arabic text-left font-medium text-slate-600 text-[11px]">{ar}</span>
    </div>
  );
}
