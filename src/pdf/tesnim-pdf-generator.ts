import html2pdf from "html2pdf.js";
import type { CVFormData } from "../context/CVFormContext";

export async function generatePdf(formData: CVFormData): Promise<Blob> {
  // Target the complete container holding both page 1 and page 2
  const element = document.getElementById("cv-export-container");
  if (!element) {
    throw new Error("CV Export container element not found in DOM.");
  }

  const opt = {
    margin: 0,
    filename: `Candidate_CV_${formData.fullName || "AlAndalus"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  const worker = html2pdf().set(opt).from(element);
  const pdfBlob = await worker.outputPdf("blob");
  return pdfBlob;
}