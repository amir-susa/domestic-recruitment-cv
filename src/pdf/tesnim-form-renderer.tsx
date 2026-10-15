import { useState } from "react";
import { AlAndalusHtmlTemplate } from "./AlAndalusHtmlTemplate";
import { generatePdf } from "./tesnim-pdf-generator";

export function TesnimPdfRenderer() {
  const [isExporting, setIsExporting] = useState(false);

  // Sample data for testing the live preview
  const [formData] = useState({
    fullName: "Lula Mesfen",
    nationality: "Ethiopia",
    religion: "Muslim",
    placeOfBirth: "Addis Ababa",
    dateOfBirth: "1998-02-15",
    age: "28",
    livingTown: "Addis Ababa",
    maritalStatus: "Single",
    numberOfChildren: "0",
    phoneNo: "+251 91 123 4567",
    mothersName: "Almaz Tadesse",
    height: "156",
    weight: "55",
    educationalQualification: "Primary Education",
    passportNumber: "EQ213243",
    passportDateOfIssue: "2026-09-08",
    passportPlaceOfIssue: "Addis Ababa",
    passportDateOfExpiry: "2031-09-07",
    selectedPartner: "al_andalus",
    previousExperiences: [
      { country: "Saudi Arabia", years: "2", months: "0" }
    ],
    headshotPhoto: null,
    fullBodyPhoto: null,
    passportScan: null,
    medicalScan: null,
  });

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      const blob = await generatePdf(formData as any);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_${formData.fullName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", paddingBottom: "40px" }}>
      {/* Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", background: "#0A1931", padding: "12px 20px", borderRadius: "8px" }}>
        <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "14px" }}>Al-Andalus Live CV Preview</span>
        <button
          onClick={handleDownloadPdf}
          disabled={isExporting}
          style={{ backgroundColor: "#88C057", color: "#0A1931", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
        >
          {isExporting ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      {/* Render the HTML template directly in the DOM so html2pdf can capture it */}
      <AlAndalusHtmlTemplate formData={formData as any} />
    </div>
  );
}