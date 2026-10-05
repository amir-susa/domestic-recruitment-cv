// CV_v3/src/App.tsx 
import { useState } from "react";
import { Download, Eye, FilePlus2, Printer, Trash2, X } from "lucide-react";
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

async function capturePdfPages() {
  const { default: html2canvas } = await import("html2canvas");
  await document.fonts.ready;

  const pages = Array.from(document.querySelectorAll<HTMLElement>("[data-cv-page]"));
  if (pages.length !== 2) throw new Error("The CV must contain both pages to render.");

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

  const pageImages: string[] = [];
  for (const page of pages) {
    const canvas = await html2canvas(page, {
      width: PAGE_WIDTH_PX,
      height: PAGE_HEIGHT_PX,
      scale: 2,
      onclone: (clonedDocument, clonedPage) => {
        clonedPage.querySelectorAll<HTMLElement>("[data-pdf-text]").forEach((control) => {
          const computedStyle = clonedDocument.defaultView?.getComputedStyle(control);
          const bounds = control.getBoundingClientRect();
          const value = control.dataset.pdfValue ?? "";
          const textElement = clonedDocument.createElement("div");
          textElement.className = "pdf-value";
          textElement.textContent = value;

          if (computedStyle) {
            const canvas = clonedDocument.createElement("canvas");
            const context = canvas.getContext("2d");
            const baseFontSize = Number.parseFloat(computedStyle.fontSize);
            const availableWidth = Math.max(
              0,
              bounds.width -
                Number.parseFloat(computedStyle.paddingLeft) -
                Number.parseFloat(computedStyle.paddingRight),
            );

            if (context && baseFontSize > 0 && availableWidth > 0 && value) {
              context.font = `${computedStyle.fontStyle} ${computedStyle.fontWeight} ${baseFontSize}px ${computedStyle.fontFamily}`;
              const textWidth = context.measureText(value).width;
              if (textWidth > availableWidth) {
                const fittedFontSize = Math.max(8, baseFontSize * (availableWidth * 0.96) / textWidth);
                textElement.style.fontSize = `${fittedFontSize}px`;
              }
            }

            textElement.style.width = `${bounds.width}px`;
            textElement.style.height = `${bounds.height}px`;
            textElement.style.flex = computedStyle.flex;
            textElement.style.fontFamily = computedStyle.fontFamily;
            textElement.style.fontWeight = computedStyle.fontWeight;
            textElement.style.fontStyle = computedStyle.fontStyle;
            textElement.style.lineHeight = computedStyle.lineHeight;
            textElement.style.color = computedStyle.color;
            textElement.style.direction = computedStyle.direction;
            textElement.style.textAlign = computedStyle.textAlign;
            textElement.style.padding = computedStyle.padding;
            textElement.style.justifyContent = computedStyle.textAlign === "center"
              ? "center"
              : computedStyle.textAlign === "right" || computedStyle.direction === "rtl"
                ? "flex-end"
                : "flex-start";
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

    pageImages.push(canvas.toDataURL("image/png"));
  }

  return pageImages;
}

async function buildPdfDocument(pageImages: string[]) {
  if (pageImages.length !== 2) throw new Error("The CV export must contain exactly two pages.");

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [PAGE_WIDTH_MM, PAGE_HEIGHT_MM],
    compress: true,
  });

  pageImages.forEach((pageImage, index) => {
    if (index > 0) pdf.addPage([PAGE_WIDTH_MM, PAGE_HEIGHT_MM], "portrait");
    pdf.addImage(pageImage, "PNG", 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM);
  });

  return pdf;
}

function CVDocument() {
  const { formData, clearForm, startNewCV } = useCVForm();
  const [generationMode, setGenerationMode] = useState<"preview" | "export" | null>(null);
  const [exportError, setExportError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [pendingAction, setPendingAction] = useState<"clear" | "new" | null>(null);
  const [formVersion, setFormVersion] = useState(0);

  const confirmPendingAction = () => {
    if (pendingAction === "clear") clearForm();
    if (pendingAction === "new") startNewCV();
    setFormVersion((version) => version + 1);
    setPendingAction(null);
  };

  const openPreview = async () => {
    setGenerationMode("preview");
    setExportError("");

    try {
      setPreviewPages(await capturePdfPages());
      setIsPreview(true);
    } catch (error) {
      console.error("PDF preview failed", error);
      setExportError("PDF preview failed. Please try again.");
    } finally {
      setGenerationMode(null);
    }
  };

  const closePreview = () => {
    setIsPreview(false);
    setPreviewPages([]);
  };

  const exportPdf = async () => {
    setGenerationMode("export");
    setExportError("");

    try {
      const pageImages = await capturePdfPages();
      const pdf = await buildPdfDocument(pageImages);

      const downloadUrl = URL.createObjectURL(pdf.output("blob"));
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = buildExportFileName(formData.fullName);
      downloadLink.style.display = "none";
      document.body.append(downloadLink);
      try {
        downloadLink.click();
      } finally {
        downloadLink.remove();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }
    } catch (error) {
      console.error("PDF export failed", error);
      setExportError("PDF export failed. Please try again.");
    } finally {
      setGenerationMode(null);
    }
  };

  return (
    <main data-preview={isPreview} className="relative min-h-screen w-full overflow-x-auto bg-neutral-300 py-4 sm:py-6 md:py-8 lg:py-10">
      <nav aria-label="CV actions" className="pdf-toolbar sticky top-0 z-30 mx-auto mb-3 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded border border-neutral-400 bg-white/95 p-2 shadow-sm">
        <button type="button" onClick={() => setPendingAction("new")} className="toolbar-action"><FilePlus2 className="h-4 w-4" aria-hidden="true" />New CV</button>
        <button type="button" onClick={openPreview} disabled={generationMode !== null} className="toolbar-action">
          <Eye className="h-4 w-4" aria-hidden="true" />
          {generationMode === "preview" ? "Preparing Preview" : "Preview"}
        </button>
        <button type="button" onClick={() => setPendingAction("clear")} className="toolbar-action"><Trash2 className="h-4 w-4" aria-hidden="true" />Clear Form</button>
        <button type="button" onClick={() => window.print()} className="toolbar-action"><Printer className="h-4 w-4" aria-hidden="true" />Print</button>
        {exportError ? <span role="alert" className="text-sm text-red-800">{exportError}</span> : null}
        <button
          type="button"
          onClick={exportPdf}
          disabled={generationMode !== null}
          className="toolbar-action"
          >
          <Download className="h-4 w-4" aria-hidden="true" />
          {generationMode === "export" ? "Preparing PDF" : "Export PDF"}
        </button>
      </nav>
      <div className="cv-document-shell mx-auto flex max-w-full justify-center overflow-x-auto px-2 sm:px-4">
        <div inert={isPreview} className="flex min-w-max flex-col items-center gap-10">
          <FormPageOne key={`page-one-${formVersion}`} />
          <FormPageTwo key={`page-two-${formVersion}`} />
        </div>
      </div>
      {isPreview && previewPages.length === 2 ? (
        <div className="pdf-preview fixed inset-0 z-40 flex flex-col bg-neutral-900 p-3 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="pdf-preview-title">
          <div className="sticky top-0 z-10 mx-auto flex w-full max-w-[952px] items-center justify-between border-b border-white/30 bg-neutral-900 px-2 py-2 text-white">
            <h2 id="pdf-preview-title" className="font-serif text-cv-body font-bold">PDF Preview</h2>
            <button type="button" onClick={closePreview} className="toolbar-action" aria-label="Close PDF preview">
              <X className="h-4 w-4" aria-hidden="true" />Close Preview
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-[952px] flex-col items-center gap-6 py-5">
              {previewPages.map((pageImage, index) => (
                <img
                  key={index}
                  src={pageImage}
                  alt={`CV page ${index + 1} of 2`}
                  width={PAGE_WIDTH_PX}
                  height={PAGE_HEIGHT_PX}
                  className="block h-auto w-full max-w-[952px] shadow-xl" />
              ))}
            </div>
          </div>
        </div>
      ) : null}
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