import { pdf } from "@react-pdf/renderer";
import { buildCVFormView } from "./tesnim-form-factory";
import type { CVFormData } from "../context/CVFormContext";

export async function generatePdf(formData: CVFormData): Promise<Blob> {
  try {
    const element = buildCVFormView(formData);
    const instance = pdf(element);
    const blob = await instance.toBlob();
    return blob;
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}