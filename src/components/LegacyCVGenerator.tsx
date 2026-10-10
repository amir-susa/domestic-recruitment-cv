
// CV_v3/src/App.tsx
import { useState } from "react";
import { Download, Eye, FilePlus2, Pencil, Printer, Trash2 } from "lucide-react";
import { FormPageOne } from "./components/FormPageOne";
import { FormPageTwo } from "./components/FormPageTwo";
import { CVFormProvider, useCVForm } from "./context/CVFormContext";
import { TesnimPdfRenderer } from "./pdf/tesnim-form-renderer";
import { createImageService, type EmbeddedImage } from "./pdf/tesnim-image-service";
import { buildCVFormView } from "./pdf/tesnim-form-factory";
import { generatePdf } from "./pdf/tesnim-pdf-generator";
import { toResumeData } from "./pdf/tesnim-form-view";

const ASSET_DIR = "/src/assets";
const IMAGE_SERVICE = createImageService(ASSET_DIR);

function buildExportFileName(fullName: string) {
  const cleanedName = fullName.replace(/[<>:"/\\|?*]/g, " ").replace(/\s+/g, " ").trim();
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

