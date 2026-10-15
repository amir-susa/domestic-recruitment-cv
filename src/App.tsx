import { useState } from "react";
import { Eye, Download, RefreshCw, Building2, CheckSquare, ShieldCheck, Phone, Mail } from "lucide-react";
import { FormPageOne } from "./components/FormPageOne";
import { FormPageTwo } from "./components/FormPageTwo";
import { CVFormProvider, useCVForm } from "./context/CVFormContext";
import { AlAndalusHtmlTemplate } from "./pdf/AlAndalusHtmlTemplate";
import { generatePdf } from "./pdf/tesnim-pdf-generator";
import tesnimLogo from "./assets/tesnim_logo.png";

const RECRUITMENT_OFFICES = [
  { id: "al_andalus", name: "AL-ANDALUS FOR RECRUITMENT", country: "Saudi Arabia" },
  { id: "darein", name: "DAREIN EST FOR RECRUITMENT", country: "Kuwait" },
  { id: "general_purpose", name: "General Purpose", country: "All countries" },
];

function AppContent() {
  const { formData, resetForm } = useCVForm();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const [previewOffice, setPreviewOffice] = useState("al_andalus");
  const [selectedExportOffices, setSelectedExportOffices] = useState<string[]>(["al_andalus"]);
  const [isExporting, setIsExporting] = useState(false);

  const toggleExportOffice = (id: string) => {
    setSelectedExportOffices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExecuteExport = async () => {
    if (selectedExportOffices.length === 0) {
      alert("Please select at least one recruitment office to export.");
      return;
    }

    try {
      setIsExporting(true);
      for (const officeId of selectedExportOffices) {
        const office = RECRUITMENT_OFFICES.find((o) => o.id === officeId);
        const pdfBlob = await generatePdf({ ...formData, selectedPartner: officeId });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.fullName || "Candidate"}_CV_${office?.id || "Export"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setIsExportModalOpen(false);
    } catch (err) {
      console.error("Export Error:", err);
      alert("Failed to export candidate CVs. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenPreviewWindow = () => {
    setIsPreviewModalOpen(false);
    const el = document.getElementById("cv-export-container");
    if (!el) return;

    const win = window.open("", "_blank", "width=900,height=1000");
    if (win) {
      win.document.open();
      win.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>${formData.fullName || "Candidate"}_CV_Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Reem+Kufi:wght@500;600;700&display=swap" rel="stylesheet">
            <style>
              body {
                background-color: #334155;
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              }
              .cv-font-arabic {
                font-family: 'Cairo', Tahoma, Geneva, Verdana, sans-serif;
              }
              .font-reem-kufi {
                font-family: 'Reem Kufi', sans-serif;
              }
              .cv-page {
                box-sizing: border-box;
                width: 210mm !important;
                height: 297mm !important;
                background: #ffffff !important;
                margin-bottom: 24px !important;
                position: relative !important;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                overflow: hidden !important;
              }
              @media print {
                body {
                  background: white !important;
                  padding: 0 !important;
                }
                .cv-page {
                  margin-bottom: 0 !important;
                  box-shadow: none !important;
                  page-break-after: always !important;
                }
              }
            </style>
          </head>
          <body>
            ${el.innerHTML}
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="relative z-10 flex-1 py-8 px-4 max-w-5xl mx-auto w-full space-y-6">
        {/* Header Bar */}
        <header className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 border-2 border-slate-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={tesnimLogo} 
              alt="Tesnim Foreign Employment Agency" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl font-black text-blue-950 uppercase tracking-tight">
                TESNIM FOREIGN EMPLOYMENT AGENCY
              </h1>
              <p className="text-xs font-black text-emerald-600 mt-0.5">
                Multi-Tenant Candidate CV Generator & Document Manager
              </p>
            </div>
          </div>
        </header>

        {/* Input Forms */}
        <main className="space-y-6">
          <FormPageOne />
          <FormPageTwo />

          {/* Action Bar */}
          <div className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 border-2 border-slate-300 flex flex-col sm:flex-row justify-end items-center gap-3">
            <button
              onClick={resetForm}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border-2 border-slate-400 rounded-xl text-slate-800 hover:bg-slate-100 transition font-black text-xs bg-white shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Form
            </button>

            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white rounded-xl transition font-black text-xs shadow-md"
            >
              <Eye className="w-4 h-4" />
              Preview CV
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition font-black text-xs shadow-md"
            >
              <Download className="w-4 h-4" />
              Generate CV
            </button>
          </div>
        </main>
      </div>

      {/* Footer Bar */}
      <footer className="relative z-10 bg-blue-950 text-white border-t-4 border-emerald-500 py-4 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Tesnim Foreign Employment Agency</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +251 908 282828</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-emerald-400" /> tesnimagency2828@gmail.com</span>
          </div>
        </div>
      </footer>

      {/* Off-screen Render Container for Clean 2-Page PDF Export */}
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "210mm",
          backgroundColor: "#ffffff",
        }}
      >
        <div id="cv-export-container">
          <AlAndalusHtmlTemplate formData={formData} />
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border-2 border-slate-300">
            <div className="flex justify-between items-center pb-3 border-b-2">
              <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" /> Select Office for Preview
              </h3>
              <button onClick={() => setIsPreviewModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <p className="text-xs font-bold text-slate-600">Select a single recruitment office to preview the layout:</p>

            <div className="space-y-2">
              {RECRUITMENT_OFFICES.map((office) => (
                <label
                  key={office.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    previewOffice === office.id ? "border-blue-950 bg-blue-50/70 font-black" : "border-slate-300"
                  }`}
                >
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{office.name} ({office.country})</div>
                  </div>
                  <input
                    type="radio"
                    name="previewOffice"
                    checked={previewOffice === office.id}
                    onChange={() => setPreviewOffice(office.id)}
                    className="text-blue-950 focus:ring-blue-950 w-4 h-4"
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsPreviewModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-700 border-2 rounded-xl">Cancel</button>
              <button
                onClick={handleOpenPreviewWindow}
                className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-black rounded-xl shadow-md"
              >
                Open Preview Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GENERATE CV MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border-2 border-slate-300">
            <div className="flex justify-between items-center pb-3 border-b-2">
              <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" /> Select Partner Offices to Export
              </h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <p className="text-xs font-bold text-slate-600">Select one or multiple offices. A PDF will be generated for each checked partner:</p>

            <div className="space-y-2">
              {RECRUITMENT_OFFICES.map((office) => {
                const isSelected = selectedExportOffices.includes(office.id);
                return (
                  <label
                    key={office.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition ${
                      isSelected ? "border-emerald-600 bg-emerald-50/70 font-black" : "border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{office.name} ({office.country})</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleExportOffice(office.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsExportModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-700 border-2 rounded-xl">Cancel</button>
              <button
                onClick={handleExecuteExport}
                disabled={isExporting}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md disabled:opacity-50"
              >
                {isExporting ? "Generating PDFs..." : `Export ${selectedExportOffices.length} Selected PDF(s)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CVFormProvider>
      <AppContent />
    </CVFormProvider>
  );
}