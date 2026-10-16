import React from 'react';
import type { CVFormData } from "../context/CVFormContext";
import { AlAndalusHtmlTemplate } from "../pdf/AlAndalusHtmlTemplate";
import { DareinHtmlTemplate } from "../pdf/DareinHtmlTemplate";
import { GeneralHtmlTemplate } from "../pdf/GeneralHtmlTemplate";

interface Props {
  formData: CVFormData;
}

export function CVPreview({ formData }: Props) {
  // Render the appropriate template based on the selected partner / agency
  switch (formData.selectedPartner) {
    case 'darein':
      return <DareinHtmlTemplate formData={formData} />;
    case 'general_purpose':
      return <GeneralHtmlTemplate formData={formData} />;
    case 'al_andalus':
    default:
      return <AlAndalusHtmlTemplate formData={formData} />;
  }
}