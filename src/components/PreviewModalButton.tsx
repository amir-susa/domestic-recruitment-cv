import React, { useState } from 'react';
import { Eye, Building2, Download, X } from 'lucide-react';
import type { CVFormData } from "../context/CVFormContext";
import { AlAndalusHtmlTemplate } from "../pdf/AlAndalusHtmlTemplate";
import { DareinHtmlTemplate } from "../pdf/DareinHtmlTemplate";
import { GeneralHtmlTemplate } from "../pdf/GeneralHtmlTemplate";

interface Props {
  formData: CVFormData;
  onGeneratePdf?: (partner: string) => void;
}

const PARTNERS = [
  { id: 'al_andalus', name: 'Al-Andalus Recruitment', arName: 'الأندلس للإستقدام', badge: 'KSA / GCC' },
  { id: 'darein', name: 'Darein Est Recruitment', arName: 'مكتب دارين للإستقدام', badge: 'Kuwait' },
  { id: 'general_purpose', name: 'General Agency (Tesnim)', arName: 'وكالة تسنيم - عام', badge: 'All Countries' },
];

export function PreviewModalButton({ formData, onGeneratePdf }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePartner, setActivePartner] = useState<string>(formData.selectedPartner || 'al_andalus');

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

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer text-sm"
      >
        <Eye className="w-4 h-4 text-[#0BBF93]" />
        <span>Preview CV</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header / Partner Selection Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0BBF93]" />
                <h3 className="text-white font-bold text-base hidden sm:block">Select Agency Template:</h3>
              </div>

              {/* Office Selector Tabs */}
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {PARTNERS.map((partner) => {
                  const isActive = activePartner === partner.id;
                  return (
                    <button
                      key={partner.id}
                      type="button"
                      onClick={() => setActivePartner(partner.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#08265F] text-white shadow-md border border-[#0BBF93]'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{partner.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-[#0BBF93] text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>
                        {partner.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                {onGeneratePdf && (
                  <button
                    type="button"
                    onClick={() => onGeneratePdf(activePartner)}
                    className="px-4 py-1.5 bg-[#0BBF93] hover:bg-[#09a882] text-slate-950 font-extrabold rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Template Render Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex justify-center items-start">
              <div className="transform scale-90 sm:scale-95 md:scale-100 transition-transform origin-top">
                {renderActiveTemplate()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}