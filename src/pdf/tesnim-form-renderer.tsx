import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { PAGE_SIZE_MM } from "./tesnim-pdf-constants";
import { PDFViewer } from "./pdf-viewer";
import { buildCVFormView } from "./tesnim-form-factory";
import { createImageService, type EmbeddedImage } from "./tesnim-image-service";

const ASSET_DIR = "/src/assets";
const IMAGE_SERVICE = createImageService(ASSET_DIR);

enum Stage {
  LOADING = "loading",
  READY = "ready",
  ERROR = "error",
}

interface PdfStage {
  status: Stage;
  message?: string;
  error?: Error;
}

interface RenderedPdf {
  dataUrl: string;
  pages: number;
}

interface PdfImage {
  data: string;
  mime: "image/png";
  width: number;
  height: number;
}

interface Context {
  formData: {
    fullName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    maritalStatus: string;
    children: string;
    weight: string;
    height: string;
    education: string;
    nationality: string;
    religion: string;
    languages: { english: string; arabic: string };
    passportNumber: string;
    passportIssueDate: string;
    passportIssuePlace: string;
    passportExpiryDate: string;
    applicantPhoto: string | null;
    fullPhoto: string | null;
    passportPhoto: string | null;
  };
  experiences: Array<{ country: string; period: string }>;
  skills: Record<string, boolean>;
  date: string;
  serialNo: string;
}

function useFormContext(): Context {
  // The real app exposes a provider; this helper provides a type-safe
  // stand-in so the PDF renderer can be developed/tested independently.
  const [formData] = useState({
    fullName: "Amir Sami Al-Mudhaf",
    dateOfBirth: "1985-03-12",
    placeOfBirth: "Jeddah",
    maritalStatus: "Married",
    children: "2",
    weight: "72",
    height: "175",
    education: "Bachelor's Degree",
    nationality: "Kuwait",
    religion: "Muslim",
    languages: { english: "Fluent", arabic: "Fluent" },
    passportNumber: "K0012345",
    passportIssueDate: "2010-01-15",
    passportIssuePlace: "Kuwait",
    passportExpiryDate: "2025-01-15",
    applicantPhoto: null,
    fullPhoto: null,
    passportPhoto: null,
  });

  const [experiences] = useState([
    { country: "Saudi Arabia", period: "3 Years 6 Months" },
    { country: "United Arab Emirates", period: "2 Years 3 Months" },
  ]);

  const [skills] = useState({
    babysitting: true,
    washing: true,
    cleaning: true,
    cooking: true,
    sewing: true,
    driving: false,
  });

  const [date] = useState("2025-01-01");
  const [serialNo] = useState("CV-2025-0001");

  return { formData, experiences, skills, date, serialNo };
}

export function TesnimPdfRenderer() {
  const context = useFormContext();
  const view = buildCVFormView(context.formData);
  const [stage, setStage] = useState<PdfStage>({ status: Stage.LOADING });
  const [pdf, setPdf] = useState<RenderedPdf | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      setStage({ status: Stage.LOADING });
      setError(null);

      try {
        const logo = await IMAGE_SERVICE.ensureEmbedded("tesnim_logo.png");
        if (!logo) {
          throw new Error("Could not load tesnim_logo.png");
        }

        const applicant = await IMAGE_SERVICE.ensureEmbedded("Applicant_Photo.jpeg");
        const full = await IMAGE_SERVICE.ensureEmbedded("Full_Photo.jpeg");
        const passport = await IMAGE_SERVICE.ensureEmbedded("Passport.jpeg");

        const images = {
          logo,
          applicantPhoto: applicant,
          fullPhoto: full,
          passportPhoto: passport,
        };

        const mounted = !cancelled;
        if (!mounted) return;

        const pdf = await renderPdf(view, images);
        const pages = countPdfPages(pdf.dataUrl);

        setPdf({
          dataUrl: pdf.dataUrl,
          pages,
        });

        setStage({ status: Stage.READY });
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setStage({ status: Stage.ERROR, error });
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      {stage.status === Stage.LOADING ? (
        <div style={{ padding: "16px", textAlign: "center" }}>Loading PDF preview...</div>
      ) : stage.status === Stage.ERROR ? (
        <div style={{ padding: "16px", textAlign: "center", color: "red" }}>
          Failed to render PDF: {stage.error?.message}
        </div>
      ) : (
        <PDFViewer
          dataUrl={pdf!.dataUrl}
          pages={pdf!.pages}
          width={PAGE_SIZE_MM.width}
          height={PAGE_SIZE_MM.height * 2}
        />
      )}
    </div>
  );
}

async function renderPdf(
  view: ReturnType<typeof buildCVFormView>,
  images: {
    logo: EmbeddedImage | null;
    applicantPhoto: EmbeddedImage | null;
    fullPhoto: EmbeddedImage | null;
    passportPhoto: EmbeddedImage | null;
  },
): Promise<{ dataUrl: string; pages: number }> {
  const canvas = await html2canvas(document.body, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
    width: PAGE_SIZE_MM.width,
    height: PAGE_SIZE_MM.height,
  });

  const dataUrl = canvas.toDataURL("image/png");

  return { dataUrl, pages: 2 };
}

function countPdfPages(dataUrl: string): number {
  // HTML2Canvas is not a PDF library; this is a placeholder for the
  // production renderer, which will return the actual page count.
  return 2;
}
