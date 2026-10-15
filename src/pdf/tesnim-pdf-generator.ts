import html2pdf from 'html2pdf.js';

export async function generatePdf(formData: any): Promise<Blob> {
  const element = document.getElementById('cv-export-container');
  if (!element) {
    throw new Error("CV export container element not found");
  }

  const opt = {
    margin: 0,
    filename: `${formData.fullName || 'Candidate'}_CV.pdf`,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: {
      scale: 3, // Higher DPI scale for ultra-crisp text rendering
      useCORS: true,
      logging: false,
      letterRendering: false, // Prevents text spacing distortion in canvas
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['css', 'legacy'] },
  };

  return html2pdf().set(opt).from(element).output('blob');
}