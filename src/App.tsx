// CV_v3/src/App.tsx 
import { useState } from "react";
import { Download, Eye, FilePlus2, Pencil, Printer, Trash2 } from "lucide-react";
import { FormPageOne } from "./components/FormPageOne";
import { FormPageTwo } from "./components/FormPageTwo";
import { CVFormProvider, useCVForm } from "./context/CVFormContext";

const PAGE_WIDTH_PX = 952;
const PAGE_HEIGHT_PX = 1233;
const PAGE_WIDTH_MM = (PAGE_WIDTH_PX / 96) * 25.4;
const PAGE_HEIGHT_MM = (PAGE_HEIGHT_PX / 96) * 25.4;

function buildExportFileName(fullName: string) {
  const cleanedName = fullName.replace(/[<>:"/\\|?*\x00-\x1F]/g, " ").replace(/\s+/g, " ").trim();
  const tokens = cleanedName.split(" ").filter(Boolean);

  if (tokens.length >= 2) {
    const firstName = tokens[0].trim();
    const middleName = tokens[1].trim();
    if (firstName && middleName) {
      return `${firstName}_${middleName}_CV.pdf`;
    }
  }

  return "Applicant_CV.pdf";
}

function CVDocument() {
  const { formData, clearForm, startNewCV } = useCVForm();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [pendingAction, setPendingAction] = useState<"clear" | "new" | null>(null);
  const [formVersion, setFormVersion] = useState(0);

  const confirmPendingAction = () => {
    if (pendingAction === "clear") clearForm();
    if (pendingAction === "new") startNewCV();
    setFormVersion((version) => version + 1);
    setPendingAction(null);
  };

  const exportPdf = async () => {
    setIsExporting(true);
    setExportError("");

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      await document.fonts.ready;

      const pages = Array.from(document.querySelectorAll<HTMLElement>("[data-cv-page]"));
      if (pages.length !== 2) throw new Error("The CV must contain both pages to export.");

      for (const page of pages) {
        page.style.width = `${PAGE_WIDTH_PX}px`;
        page.style.height = `${PAGE_HEIGHT_PX}px`;
        page.style.maxWidth = `${PAGE_WIDTH_PX}px`;
        page.style.maxHeight = `${PAGE_HEIGHT_PX}px`;
        page.style.transform = "none";
        page.style.zoom = "1";
        page.style.scale = "1";
        page.style.overflow = "hidden";
        await Promise.all(
          Array.from(page.querySelectorAll("img"), (image) => image.decode().catch(() => undefined)),
        );
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [PAGE_WIDTH_MM, PAGE_HEIGHT_MM],
        compress: true,
      });
      for (const [index, page] of pages.entries()) {
        const canvas = await html2canvas(page, {
          width: PAGE_WIDTH_PX,
          height: PAGE_HEIGHT_PX,
          scale: 2,
          onclone: (clonedDocument) => {
            const clonedPage = clonedDocument.querySelectorAll<HTMLElement>("[data-cv-page]")[index];
            if (!clonedPage) return;

            clonedPage.querySelectorAll<HTMLElement>("[data-pdf-text]").forEach((control) => {
              const computedStyle = clonedDocument.defaultView?.getComputedStyle(control);
              const bounds = control.getBoundingClientRect();
              let value = control.dataset.pdfValue ?? "";
              if (control.matches('input[type="date"]')) {
                value = value.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2/$3/$1");
              }
              const textElement = clonedDocument.createElement("div");
              textElement.className = "pdf-value";
              textElement.textContent = value;
              textElement.style.display = "flex";
              textElement.style.alignItems = "center";
              textElement.style.justifyContent = computedStyle?.textAlign === "center"
                ? "center"
                : computedStyle?.textAlign === "right" || computedStyle?.direction === "rtl"
                  ? "flex-end"
                  : "flex-start";
              textElement.style.width = `${bounds.width}px`;
              textElement.style.height = `${bounds.height}px`;
              textElement.style.boxSizing = computedStyle?.boxSizing ?? "border-box";
              textElement.style.flex = computedStyle?.flex ?? "0 1 auto";
              textElement.style.minWidth = "0";
              textElement.style.whiteSpace = "nowrap";
              if (computedStyle) {
                textElement.style.fontFamily = computedStyle.fontFamily;
                textElement.style.fontSize = computedStyle.fontSize;
                textElement.style.fontStyle = computedStyle.fontStyle;
                textElement.style.fontWeight = computedStyle.fontWeight;
                textElement.style.color = computedStyle.color;
                textElement.style.direction = computedStyle.direction;
                textElement.style.textAlign = computedStyle.textAlign;
                textElement.style.padding = computedStyle.padding;
                textElement.style.lineHeight = computedStyle.lineHeight;
              }
              control.replaceWith(textElement);
            });
          },
          useCORS: true,
          backgroundColor: "#000080",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: PAGE_WIDTH_PX,
          windowHeight: PAGE_HEIGHT_PX,
        });
        if (index > 0) pdf.addPage([PAGE_WIDTH_MM, PAGE_HEIGHT_MM], "portrait");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);
      }

      pdf.save(buildExportFileName(formData.fullName));
    } catch (error) {
      console.error("PDF export failed", error);
      setExportError("PDF export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main data-preview={isPreview} className="relative min-h-screen w-full overflow-x-auto bg-neutral-300 py-4 sm:py-6 md:py-8 lg:py-10">
      <nav aria-label="CV actions" className="pdf-toolbar sticky top-0 z-30 mx-auto mb-3 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded border border-neutral-400 bg-white/95 p-2 shadow-sm">
        <button type="button" onClick={() => setPendingAction("new")} className="toolbar-action"><FilePlus2 className="h-4 w-4" aria-hidden="true" />New CV</button>
        <button type="button" onClick={() => setIsPreview((preview) => !preview)} className="toolbar-action">
          {isPreview ? <Pencil className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {isPreview ? "Edit" : "Preview"}
        </button>
        <button type="button" onClick={() => setPendingAction("clear")} className="toolbar-action"><Trash2 className="h-4 w-4" aria-hidden="true" />Clear Form</button>
        <button type="button" onClick={() => window.print()} className="toolbar-action"><Printer className="h-4 w-4" aria-hidden="true" />Print</button>
        {exportError ? <span role="alert" className="text-sm text-red-800">{exportError}</span> : null}
        <button
          type="button"
          onClick={exportPdf}
          disabled={isExporting}
          className="toolbar-action"
          >
          <Download className="h-4 w-4" aria-hidden="true" />
          {isExporting ? "Preparing PDF" : "Export PDF"}
        </button>
      </nav>
      <div className="cv-document-shell mx-auto flex max-w-full justify-center overflow-x-auto px-2 sm:px-4">
        <div inert={isPreview} className="flex min-w-max flex-col items-center gap-10">
          <FormPageOne key={`page-one-${formVersion}`} />
          <FormPageTwo key={`page-two-${formVersion}`} />
        </div>
      </div>
      {pendingAction ? (
        <div className="app-modal fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setPendingAction(null)}>
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="cv-confirm-title"
            aria-describedby="cv-confirm-description"
            className="w-full max-w-[400px] border border-neutral-400 bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}>
            <h2 id="cv-confirm-title" className="text-lg font-bold text-navy">
              {pendingAction === "clear" ? "Clear this CV?" : "Start a new CV?"}
            </h2>
            <p id="cv-confirm-description" className="mt-2 text-sm text-neutral-700">
              {pendingAction === "clear"
                ? "All entered information will be removed."
                : "A fresh CV will be created. This CV's current information will be replaced."}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="toolbar-action" onClick={() => setPendingAction(null)}>Cancel</button>
              <button type="button" className="toolbar-action border-red-700 text-red-800" onClick={confirmPendingAction}>
                {pendingAction === "clear" ? "Clear" : "New CV"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default function App() {
  return (
    <CVFormProvider>
      <CVDocument />
    </CVFormProvider>);
}