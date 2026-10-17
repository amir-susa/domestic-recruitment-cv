import React from "react";

export function Footer({ dateVal, setDateVal, refVal, setRefVal }) {
  return (
    <footer className="cv-footer">
      <div className="footer-left">
        DAREIN EST – Application for Employment
      </div>
      <div className="footer-right">
        <div className="footer-field">
          <span className="footer-label">
            Date / <span className="ar">التاريخ</span>
          </span>
          <input
            type="text"
            className="footer-input"
            value={dateVal}
            onChange={(e) => setDateVal && setDateVal(e.target.value)}
          />
        </div>
        <div className="footer-field">
          <span className="footer-label">
            Ref. No / <span className="ar">رقم المرجع</span>
          </span>
          <input
            type="text"
            className="footer-input"
            value={refVal}
            onChange={(e) => setRefVal && setRefVal(e.target.value)}
          />
        </div>
      </div>
    </footer>
  );
}