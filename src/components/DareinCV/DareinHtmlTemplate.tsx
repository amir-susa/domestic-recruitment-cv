import type { CVFormData } from '../../context/CVFormContext';

interface Props {
  formData: CVFormData;
}

export default function DareinHtmlTemplate({ formData }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="darein-root">
      {/* On-screen Print Action Bar */}
      <div className="print-action-bar">
        <button type="button" onClick={handlePrint} className="print-btn">
          Print / Save as PDF
        </button>
      </div>

      {/* ================= PAGE 1 ================= */}
      <section className="page">
        <div className="outer-frame">
          <div className="inner-frame">
            
            {/* HEADER */}
            <header className="cv-header">
              <div className="header-top">
                <div className="brand-left">
                  <div className="logo-circle">D</div>
                  <div className="brand-text">
                    <h1>DAREIN EST</h1>
                    <p>FOR RECRUITMENT OF DOMESTIC MANPOWER</p>
                  </div>
                </div>
                <div className="brand-right ar">
                  <h2>دارين التأسيس</h2>
                  <p>لتوظيف القوى العاملة المحلية</p>
                </div>
              </div>

              <div className="address-bar">
                <p className="ar">الفروانية بلوك ٤ حبيب ميناور شارع - عربيد معرض مكتب الميزانين رقم 1 - الكويت</p>
                <p>Farwaniya Block 4, Habib Menawer Steet, Arbeed gallery, Mezanin office No. 1, Kuwait</p>
              </div>

              <div className="contact-bar">
                <span>Afnan 69984733</span>
                <span className="ar">أفنان ٦٩٩٨٤٧٣٣</span>
              </div>
            </header>

            {/* PAGE 1 BODY */}
            <div className="page-body">
              <div className="meta-row">
                <div className="meta-field">
                  <span className="meta-label">Date / التاريخ:</span>
                  <span className="meta-val">{formData.date || ''}</span>
                </div>
                <div className="meta-field">
                  <span className="meta-label">Ref. No / رقم مرجعي:</span>
                  <span className="meta-val">{formData.refNo || ''}</span>
                </div>
              </div>

              <h2 className="main-title">Application for Employment</h2>

              <div className="top-section-grid">
                <div className="fullname-box-wrapper">
                  <div className="row-item">
                    <span className="cell-label">FULL NAME</span>
                    <span className="cell-val uppercase font-bold">{formData.fullName}</span>
                    <span className="cell-label ar">الاسم الكامل</span>
                  </div>
                </div>
                <div className="applicant-photo-box">
                  {formData.headshotPhoto ? (
                    <img src={formData.headshotPhoto} alt="Applicant" />
                  ) : (
                    <div className="photo-placeholder">
                      <span>Applicant photo</span>
                      <small>2.14" x 2.03"</small>
                    </div>
                  )}
                </div>
              </div>

              <div className="content-grid">
                {/* Left Column: Details, Language, Experience, Skills */}
                <div className="left-col">
                  {/* DETAILS OF APPLICATION */}
                  <div className="table-block">
                    <div className="table-header">
                      <span>DETAILS OF APPLICATION</span>
                      <span className="ar">تفاصيل التطبيق</span>
                    </div>
                    <table className="cv-table">
                      <tbody>
                        {[
                          ["Nationality", formData.nationality || "Ethiopian", "جنسية"],
                          ["Religion", formData.religion || "Christian", "دين"],
                          ["Date of Birth", formData.dateOfBirth || "", "تاريخ الميلاد"],
                          ["Age", formData.age || "", "عمر"],
                          ["Place of Birth", formData.placeOfBirth || "", "مكان الميلاد"],
                          ["Marital Status", formData.maritalStatus || "Single", "الحالة الاجتماعية"],
                          ["No. of Children", formData.numberOfChildren || "0", "عدد الأطفال"],
                          ["Weight(KG)", formData.weight || "52.0", "وزن"],
                          ["Height(cm)", formData.height || "160.0", "ارتفاع"],
                          ["Educational Qualification", formData.educationalQualification || "Primary", "المؤهل التعليمي"],
                        ].map(([en, val, ar], i) => (
                          <tr key={i}>
                            <td className="cell-label">{en}</td>
                            <td className="cell-val center">{val}</td>
                            <td className="cell-label ar">{ar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* LANGUAGE SKILLS */}
                  <div className="table-block">
                    <div className="table-header">
                      <span>LANGUAGE SKILLS</span>
                      <span className="ar">المهارات اللغوية</span>
                    </div>
                    <table className="cv-table lang-table">
                      <thead>
                        <tr>
                          <th className="cell-label">ENGLISH</th>
                          <th className="cell-label ar">إنجليزي</th>
                          <th className="cell-label">ARABIC</th>
                          <th className="cell-label ar">عربي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["POOR", "poor", "فقير"],
                          ["FAIR", "fair", "عدل"],
                          ["FLUENT", "fluent", "طلق"],
                        ].map(([en, lvl, ar], i) => (
                          <tr key={i}>
                            <td className="cell-label">{en}</td>
                            <td className="center">
                              <input type="checkbox" checked={formData.languages?.english?.toLowerCase() === lvl} readOnly />
                            </td>
                            <td className="center">
                              <input type="checkbox" checked={formData.languages?.arabic?.toLowerCase() === lvl} readOnly />
                            </td>
                            <td className="cell-label ar">{ar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PREVIOUS EXPERIENCE */}
                  <div className="table-block">
                    <div className="table-header">
                      <span>PREVIOUS EXPERIENCE</span>
                      <span className="ar">الخبرة السابقة</span>
                    </div>
                    <table className="cv-table">
                      <tbody>
                        <tr>
                          <td className="cell-label">COUNTRY</td>
                          <td className="cell-val center">{formData.previousExperiences?.[0]?.country || ""}</td>
                          <td className="cell-label ar">دولة</td>
                        </tr>
                        <tr>
                          <td className="cell-label">PERIOD</td>
                          <td className="cell-val center">{formData.previousExperiences?.[0]?.period || ""}</td>
                          <td className="cell-label ar">المدة</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* SKILLS */}
                  <div className="table-block">
                    <div className="table-header">
                      <span>SKILLS</span>
                      <span className="ar">المهارات</span>
                    </div>
                    <div className="skills-grid-3x2">
                      {[
                        ["babySitting", "Baby Sitting", "جلوس الطفل"],
                        ["washing", "Washing", "غسل"],
                        ["cleaning", "Cleaning", "تنظيف"],
                        ["cooking", "Cooking", "طبخ"],
                        ["sewing", "Sewing", "خياطة"],
                        ["driving", "Driving", "القيادة"],
                      ].map(([key, en, ar]) => {
                        const checked = Boolean(formData.skills?.[key as keyof typeof formData.skills]);
                        return (
                          <div key={key} className="skill-cell">
                            <div className="skill-txt">
                              <span className="ar">{ar}</span>
                              <span className="en">{en}</span>
                            </div>
                            <input type="checkbox" checked={checked} readOnly />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Passport Details & Full Photo */}
                <div className="right-col">
                  {/* PASSPORT DETAILS */}
                  <div className="table-block">
                    <div className="table-header">
                      <span>PASSPORT DETAILS</span>
                      <span className="ar">تفاصيل جواز السفر</span>
                    </div>
                    <table className="cv-table">
                      <tbody>
                        {[
                          ["NUMBER", formData.passportNumber || "EQ", "رقم"],
                          ["DATE OF ISSUE", formData.passportDateOfIssue || "", "تاريخ الإصدار"],
                          ["PLACE OF ISSUE", formData.passportPlaceOfIssue || "ADDIS ABABA", "مكان الإصدار"],
                          ["DATE OF EXP", formData.passportDateOfExpiry || "", "تاريخ انتهاء"],
                        ].map(([en, val, ar], i) => (
                          <tr key={i}>
                            <td className="cell-label">{en}</td>
                            <td className="cell-val center">{val}</td>
                            <td className="cell-label ar">{ar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* FULL PHOTO BOX */}
                  <div className="full-photo-box">
                    {formData.fullBodyPhoto ? (
                      <img src={formData.fullBodyPhoto} alt="Full Body" />
                    ) : (
                      <div className="photo-placeholder">
                        <span>Full photo</span>
                        <small>5.35" x 3.54"</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="cv-footer">
              <span>DAREIN EST – Application for Employment</span>
              <span>Ref. No: {formData.refNo || ''}</span>
            </footer>

          </div>
        </div>
      </section>

      {/* ================= PAGE 2 ================= */}
      <section className="page">
        <div className="outer-frame">
          <div className="inner-frame">
            
            {/* HEADER */}
            <header className="cv-header">
              <div className="header-top">
                <div className="brand-left">
                  <div className="logo-circle">D</div>
                  <div className="brand-text">
                    <h1>DAREIN EST</h1>
                    <p>FOR RECRUITMENT OF DOMESTIC MANPOWER</p>
                  </div>
                </div>
                <div className="brand-right ar">
                  <h2>دارين التأسيس</h2>
                  <p>لتوظيف القوى العاملة المحلية</p>
                </div>
              </div>

              <div className="address-bar">
                <p className="ar">الفروانية بلوك ٤ حبيب ميناور شارع - عربيد معرض مكتب الميزانين رقم 1 - الكويت</p>
                <p>Farwaniya Block 4, Habib Menawer Steet, Arbeed gallery, Mezanin office No. 1, Kuwait</p>
              </div>

              <div className="contact-bar">
                <span>Afnan 69984733</span>
                <span className="ar">أفنان ٦٩٩٨٤٧٣٣</span>
              </div>
            </header>

            {/* PAGE 2 BODY */}
            <div className="page-body page-2-body">
              <div className="meta-row">
                <div className="meta-field">
                  <span className="meta-label">Date / التاريخ:</span>
                  <span className="meta-val">{formData.date || ''}</span>
                </div>
                <div className="meta-field">
                  <span className="meta-label">Ref. No / رقم مرجعي:</span>
                  <span className="meta-val">{formData.refNo || ''}</span>
                </div>
              </div>

              <div className="passport-banner">
                <span>PASSPORT COPY ATTACHMENT</span>
                <span className="ar">إرفاق نسخة من جواز السفر</span>
              </div>

              <div className="passport-box">
                {formData.passportScan ? (
                  <img src={formData.passportScan} alt="Passport Scan" />
                ) : (
                  <div className="photo-placeholder">
                    <span>Passport</span>
                    <small>3.54" x 5.18"</small>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <footer className="cv-footer">
              <span>DAREIN EST – Application for Employment</span>
              <span>Ref. No: {formData.refNo || ''}</span>
            </footer>

          </div>
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        :root {
          --navy: #000080;
          --light-blue: #8DB3E2;
        }
        .darein-root {
          background: #475569;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Garamond, "EB Garamond", serif;
          color: var(--navy);
        }
        .print-action-bar {
          margin-bottom: 20px;
        }
        .print-btn {
          background: var(--navy);
          color: white;
          padding: 10px 20px;
          border: none;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
        }
        .page {
          width: 210mm;
          height: 297mm;
          background: white;
          margin-bottom: 20px;
          box-sizing: border-box;
          padding: 8mm;
        }
        .outer-frame {
          border: 4px solid var(--navy);
          height: 100%;
          padding: 3px;
          box-sizing: border-box;
        }
        .inner-frame {
          border: 1px solid var(--navy);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          box-sizing: border-box;
        }
        .ar {
          font-family: Arial, sans-serif;
          direction: rtl;
          text-align: right;
        }
        .cv-header {
          border-bottom: 2px solid var(--navy);
          padding-bottom: 6px;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .logo-circle {
          width: 36px;
          height: 36px;
          border: 2px solid var(--navy);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-style: italic;
          font-size: 20px;
        }
        .brand-text h1 {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
          letter-spacing: 0.5px;
        }
        .brand-text p, .brand-right p {
          font-size: 7.5px;
          font-weight: 700;
          margin: 0;
          color: var(--navy);
        }
        .brand-right h2 {
          font-size: 16px;
          font-weight: 800;
          margin: 0;
        }
        .address-bar {
          background: var(--navy);
          color: white;
          text-align: center;
          padding: 3px;
          margin-top: 6px;
          font-size: 8px;
          font-weight: 600;
        }
        .contact-bar {
          display: flex;
          justify-content: space-between;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: bold;
        }
        .page-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 4px 0;
        }
        .meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          font-weight: bold;
          border: 1px solid var(--navy);
          padding: 3px 6px;
        }
        .main-title {
          text-align: center;
          font-size: 15px;
          font-weight: 800;
          margin: 2px 0;
        }
        .top-section-grid {
          display: flex;
          gap: 8px;
        }
        .fullname-box-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .row-item {
          display: flex;
          border: 1px solid var(--navy);
          height: 24px;
          align-items: center;
        }
        .applicant-photo-box {
          width: 130px;
          height: 110px;
          border: 2px solid var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
        }
        .content-grid {
          display: flex;
          gap: 8px;
          flex: 1;
        }
        .left-col {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .right-col {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .table-block {
          border: 1px solid var(--navy);
        }
        .table-header {
          background: var(--light-blue);
          color: var(--navy);
          font-size: 8.5px;
          font-weight: 800;
          padding: 2px 5px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--navy);
        }
        .cv-table {
          width: 100%;
          border-collapse: collapse;
        }
        .cv-table td, .cv-table th {
          border: 1px solid var(--navy);
          padding: 1px 4px;
          font-size: 8px;
          height: 15px;
        }
        .cell-label {
          background: var(--light-blue);
          color: var(--navy);
          font-weight: 700;
          white-space: nowrap;
        }
        .cell-val {
          font-weight: bold;
          color: var(--navy);
        }
        .center {
          text-align: center;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .skills-grid-3x2 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .skill-cell {
          border: 1px solid var(--navy);
          padding: 3px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 7.5px;
          font-weight: bold;
        }
        .skill-txt {
          display: flex;
          flex-direction: column;
        }
        .full-photo-box {
          flex: 1;
          border: 2px solid var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          background: #f9f9f9;
        }
        .photo-placeholder {
          text-align: center;
          font-weight: bold;
          font-size: 9px;
          color: var(--navy);
        }
        .photo-placeholder small {
          display: block;
          font-size: 7px;
        }
        .passport-banner {
          background: var(--navy);
          color: white;
          text-align: center;
          font-size: 11px;
          font-weight: bold;
          padding: 5px;
          display: flex;
          justify-content: space-between;
        }
        .passport-box {
          flex: 1;
          border: 2px solid var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
        }
        .cv-footer {
          background: var(--navy);
          color: white;
          display: flex;
          justify-content: space-between;
          padding: 4px 8px;
          font-size: 8px;
          font-weight: bold;
        }
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        @media print {
          @page { size: A4 portrait; margin: 0; }
          .print-action-bar { display: none; }
          .darein-root { background: none; padding: 0; }
          .page { box-shadow: none; margin: 0; page-break-after: always; }
        }
      `}</style>
    </div>
  );
}