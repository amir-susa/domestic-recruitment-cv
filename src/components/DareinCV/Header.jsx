import React from "react";

export function Header() {
  return (
    <header className="cv-header">
      <div className="header-top-row">
        <div className="header-brand-left">
          <div className="logo-circle">
            <span className="logo-letter">D</span>
          </div>
          <span className="brand-title-en">DAREIN EST</span>
        </div>

        <div className="header-brand-right">
          <span className="brand-title-ar ar">دارين التأسيس</span>
        </div>
      </div>

      <div className="header-pills-row">
        <div className="navy-pill pill-left">
          FOR RECRUITMENT OF DOMESTIC MANPOER
        </div>
        <div className="navy-pill pill-right ar">
          لتوظيف القوى العاملة المحلية
        </div>
      </div>

      <div className="header-address-bar">
        <div className="address-ar ar">
          الفروانية بلوك ٤ حبيب منور شارع - عريد معرض - مكتب الميزانين رقم ١ - الكويت
        </div>
        <div className="address-en">
          Farwaniya Block 4, Habib Menawer Steet, Arbeed gallery, Mezanin office No. 1,
        </div>
      </div>

      <div className="header-contact-line">
        <span className="contact-name-en">Afnan 69984733</span>
        <svg
          className="phone-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="contact-name-ar ar">أفنان ٦٩٩٨٤٧٣٣</span>
      </div>
    </header>
  );
}