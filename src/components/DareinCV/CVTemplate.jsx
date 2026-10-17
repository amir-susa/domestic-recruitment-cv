"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PhotoUploader } from "./PhotoUploader";
import "./CVTemplate.css";

export default function CVTemplate(props) {
  const [formData, setFormData] = useState({
    fullName: props.fullName || "LULA MESFEN GOSHU",
    nationality: props.nationality || "Ethiopian",
    religion: props.religion || "Christian",
    dateOfBirth: props.dateOfBirth || "",
    age: props.age || "",
    placeOfBirth: props.placeOfBirth || "",
    maritalStatus: props.maritalStatus || "Single",
    numberOfChildren: props.numberOfChildren || "0",
    weight: props.weight || "52.0",
    height: props.height || "160.0",
    educationalQualification: props.educationalQualification || "Primary",
    passportNumber: props.passportNumber || "EQ",
    passportIssueDate: props.passportIssueDate || "",
    passportPlaceOfIssue: props.passportPlaceOfIssue || "ADDIS ABABA",
    passportExpiryDate: props.passportExpiryDate || "",
    expCountry: props.expCountry || "",
    expPeriod: props.expPeriod || "",
    dateVal: props.dateVal || "2026-10-17",
    refVal: props.refVal || "DAREIN-2026-0892",
  });

  const [languages, setLanguages] = useState({
    english: props.englishLevel || "poor",
    arabic: props.arabicLevel || "fluent",
  });

  const [skills, setSkills] = useState({
    babySitting: props.skills?.babySitting ?? true,
    washing: props.skills?.washing ?? true,
    cleaning: props.skills?.cleaning ?? true,
    cooking: props.skills?.cooking ?? true,
    sewing: props.skills?.sewing ?? true,
    driving: props.skills?.driving ?? false,
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-template-root">
      <div className="print-action-bar">
        <button type="button" className="print-btn" onClick={handlePrint}>
          Print / Save as PDF
        </button>
      </div>

      {/* PAGE 1 */}
      <section className="page">
        <div className="page-border-outer">
          <div className="page-border-inner">
            <Header />

            <main className="page-content">
              <div className="top-title-section">
                <div className="title-left-col">
                  <h1 className="page-main-title">
                    Application for Employment
                  </h1>

                  <div className="full-name-row">
                    <div className="cell-label-blue">FULL NAME</div>
                    <div className="cell-input-container">
                      <input
                        type="text"
                        className="cv-table-input name-input"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                      />
                    </div>
                    <div className="cell-label-blue ar">الاسم الكامل</div>
                  </div>
                </div>

                <div className="title-right-col">
                  <PhotoUploader
                    labelText={'Applicant photo\n2.14" x 2.03"'}
                    width="2.14in"
                    height="2.03in"
                    className="applicant-photo-box"
                  />
                </div>
              </div>

              <div className="body-grid">
                {/* Left Column: Details, Language Skills, Previous Experience, Skills */}
                <div className="grid-left-col">
                  <div className="cv-table-block">
                    <div className="table-header-blue">
                      <span>DETAILS OF APPLICATION</span>
                      <span className="ar">تفاصيل التطبيق</span>
                    </div>
                    <table className="cv-data-table">
                      <tbody>
                        {[
                          ["Nationality", "nationality", "جنسية"],
                          ["Religion", "religion", "دين"],
                          ["Date of Birth", "dateOfBirth", "تاريخ الميلاد"],
                          ["Age", "age", "عمر"],
                          ["Place of Birth", "placeOfBirth", "مكان الميلاد"],
                          ["Marital Status", "maritalStatus", "الحالة الاجتماعية"],
                          ["No. of Children", "numberOfChildren", "عدد الأطفال"],
                          ["Weight(KG)", "weight", "وزن"],
                          ["Height(cm)", "height", "ارتفاع"],
                          ["Educational Qualification", "educationalQualification", "المؤهل التعليمي"],
                        ].map(([enLabel, key, arLabel]) => (
                          <tr key={key}>
                            <td className="cell-label-blue">{enLabel}</td>
                            <td className="cell-value">
                              <input
                                type="text"
                                className="cv-table-input center"
                                value={formData[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                              />
                            </td>
                            <td className="cell-label-blue ar">{arLabel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cv-table-block">
                    <div className="table-header-blue">
                      <span>LANGUAGE SKILLS</span>
                      <span className="ar">المهارات اللغوية</span>
                    </div>
                    <table className="cv-data-table lang-table">
                      <thead>
                        <tr>
                          <th className="cell-label-blue">ENGLISH</th>
                          <th className="cell-label-blue ar">إنجليزي</th>
                          <th className="cell-label-blue">ARABIC</th>
                          <th className="cell-label-blue ar">عربي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["POOR", "poor", "ضعيف"],
                          ["FAIR", "fair", "عدل"],
                          ["FLUENT", "fluent", "طلق"],
                        ].map(([enLabel, level, arLabel]) => (
                          <tr key={level}>
                            <td className="cell-label-blue">{enLabel}</td>
                            <td className="cell-check center">
                              <input
                                type="checkbox"
                                checked={languages.english === level}
                                onChange={() =>
                                  setLanguages((p) => ({ ...p, english: level }))
                                }
                              />
                            </td>
                            <td className="cell-check center">
                              <input
                                type="checkbox"
                                checked={languages.arabic === level}
                                onChange={() =>
                                  setLanguages((p) => ({ ...p, arabic: level }))
                                }
                              />
                            </td>
                            <td className="cell-label-blue ar">{arLabel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cv-table-block">
                    <div className="table-header-blue">
                      <span>PREVIOUS EXPERIENCE</span>
                      <span className="ar">الخبرة السابقة</span>
                    </div>
                    <table className="cv-data-table">
                      <tbody>
                        <tr>
                          <td className="cell-label-blue">COUNTRY</td>
                          <td className="cell-value">
                            <input
                              type="text"
                              className="cv-table-input center"
                              value={formData.expCountry}
                              onChange={(e) => handleChange("expCountry", e.target.value)}
                            />
                          </td>
                          <td className="cell-label-blue ar">دولة</td>
                        </tr>
                        <tr>
                          <td className="cell-label-blue">PERIOD</td>
                          <td className="cell-value">
                            <input
                              type="text"
                              className="cv-table-input center"
                              value={formData.expPeriod}
                              onChange={(e) => handleChange("expPeriod", e.target.value)}
                            />
                          </td>
                          <td className="cell-label-blue ar">المدة</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="cv-table-block">
                    <div className="table-header-blue">
                      <span>SKILLS</span>
                      <span className="ar">المهارات</span>
                    </div>
                    <div className="skills-grid">
                      {[
                        ["babySitting", "Baby Sitting", "جليس الطفل"],
                        ["washing", "Washing", "غسل"],
                        ["cleaning", "Cleaning", "تنظيف"],
                        ["cooking", "Cooking", "طبخ"],
                        ["sewing", "Sewing", "خياطة"],
                        ["driving", "Driving", "القيادة"],
                      ].map(([key, enLabel, arLabel]) => (
                        <label key={key} className="skill-tile">
                          <div className="skill-labels">
                            <span className="ar">{arLabel}</span>
                            <span className="en">{enLabel}</span>
                          </div>
                          <input
                            type="checkbox"
                            className="skill-checkbox"
                            checked={skills[key]}
                            onChange={(e) =>
                              setSkills((p) => ({ ...p, [key]: e.target.checked }))
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Passport Details moved above Full Photo Box */}
                <div className="grid-right-col">
                  <div className="cv-table-block passport-block-top">
                    <div className="table-header-blue">
                      <span>PASSPORT DETAILS</span>
                      <span className="ar">تفاصيل جواز السفر</span>
                    </div>
                    <table className="cv-data-table">
                      <tbody>
                        {[
                          ["NUMBER", "passportNumber", "رقم"],
                          ["DATE OF ISSUE", "passportIssueDate", "تاريخ الإصدار"],
                          ["PLACE OF ISSUE", "passportPlaceOfIssue", "مكان الإصدار"],
                          ["DATE OF EXP", "passportExpiryDate", "تاريخ انتهاء"],
                        ].map(([enLabel, key, arLabel]) => (
                          <tr key={key}>
                            <td className="cell-label-blue">{enLabel}</td>
                            <td className="cell-value">
                              <input
                                type="text"
                                className="cv-table-input center"
                                value={formData[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                              />
                            </td>
                            <td className="cell-label-blue ar">{arLabel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <PhotoUploader
                    labelText={'Full photo\n5.35" x 3.54"'}
                    width="100%"
                    height="100%"
                    className="full-photo-box"
                  />
                </div>
              </div>
            </main>

            <Footer
              dateVal={formData.dateVal}
              setDateVal={(v) => handleChange("dateVal", v)}
              refVal={formData.refVal}
              setRefVal={(v) => handleChange("refVal", v)}
            />
          </div>
        </div>
      </section>

      {/* PAGE 2 */}
      <section className="page">
        <div className="page-border-outer">
          <div className="page-border-inner">
            <Header />

            <main className="page-content page-2-content">
              <div className="navy-section-bar">PASSPORT COPY ATTACHMENT</div>

              <div className="passport-box-wrapper">
                <PhotoUploader
                  labelText={'Passport\n5.18" x 3.54"'}
                  width="5.18in"
                  height="3.54in"
                  className="passport-photo-box"
                />
              </div>
            </main>

            <Footer
              dateVal={formData.dateVal}
              setDateVal={(v) => handleChange("dateVal", v)}
              refVal={formData.refVal}
              setRefVal={(v) => handleChange("refVal", v)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}