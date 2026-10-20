import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, Building2, Download, X, Printer } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";
import { AlAndalusHtmlTemplate } from "../pdf/AlAndalusHtmlTemplate";
import { DareinHtmlTemplate } from "../pdf/DareinHtmlTemplate";
import { GeneralHtmlTemplate } from "../pdf/GeneralHtmlTemplate";

interface Props {
  formData: CVFormData;
  onGeneratePdf?: (partner: string) => void;
  isGenerateOnly?: boolean;
}

const PARTNERS = [
  { id: 'al_andalus', name: 'Al-Andalus Recruitment', arName: 'الأندلس للإستقدام', badge: 'KSA / GCC' },
  { id: 'darein', name: 'Darein Est Recruitment', arName: 'مكتب دارين للإستقدام', badge: 'Kuwait' },
  { id: 'general_purpose', name: 'General Agency (Tesnim)', arName: 'وكالة تسنيم - عام', badge: 'All Countries' },
];

export function PreviewModalButton({ formData, isGenerateOnly = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePartner, setActivePartner] = useState<string>(formData.selectedPartner || 'al_andalus');

  // Exact PDF Download Handler using isolated print window
  const handlePrintCV = () => {
    const printArea = document.getElementById('printable-cv-area');
    if (!printArea) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1100,height=900');
    if (!printWindow) {
      window.print();
      return;
    }

    const stylesHtml = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${formData.fullName || 'Candidate'}_CV</title>
          ${stylesHtml}
          <style>
            @page {
              size: A4 portrait;
              margin: 0mm;
            }
            body {
              background: #ffffff !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .cv-page-container {
              width: 210mm !important;
              height: 296mm !important;
              page-break-after: always !important;
              break-after: page !important;
              box-sizing: border-box !important;
              overflow: hidden !important;
              margin: 0 auto !important;
            }
          </style>
        </head>
        <body>
          <div style="width: 210mm; margin: 0 auto;">
            ${printArea.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const renderActiveTemplate = () => {
    const updatedData = { ...formData, selectedPartner: activePartner };
    switch (activePartner) {
      case 'darein':
        return <DareinHtmlTemplate formData={updatedData} />;
      case 'general_purpose':
        return <GeneralHtmlTemplate formData={updatedData} />;
      case 'al_andalus':
      default:
        return <AlAndalusHtmlTemplate formData={updatedData} />;
    }
  };

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-2 sm:p-6 overflow-hidden">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[95vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-[99999]">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0E8F86]" />
            <h3 className="text-white font-extrabold text-base hidden sm:block">Select Office Template:</h3>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {PARTNERS.map((partner) => {
              const isActive = activePartner === partner.id;
              return (
                <button
                  key={partner.id}
                  type="button"
                  onClick={() => setActivePartner(partner.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#0F2A5C] text-white shadow-md border border-[#0E8F86]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{partner.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${isActive ? 'bg-[#0E8F86] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {partner.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintCV}
              className="px-5 py-2.5 bg-[#0E8F86] hover:bg-[#0B766E] text-white font-black rounded-xl text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 flex justify-center items-start">
          <div id="printable-cv-area" className="transform scale-90 sm:scale-95 md:scale-100 origin-top">
            {renderActiveTemplate()}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {isGenerateOnly ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-6 py-3.5 bg-[#0E8F86] hover:bg-[#0B766E] text-white font-black rounded-xl text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Generate CV</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-6 py-3.5 bg-transparent hover:bg-[#0F2A5C]/5 border border-[#0F2A5C] text-[#0F2A5C] font-black rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <Eye className="w-4 h-4 text-[#0F2A5C]" />
          <span>Preview CV</span>
        </button>
      )}

      {typeof document !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
