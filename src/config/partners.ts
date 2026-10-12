export interface PartnerConfig {
  id: "al_andalus" | "darein" | "general";
  name: string;
  arabicName: string;
  primaryColor: string;
  secondaryColor: string;
  logoPath: string;
  hasMedicalAttachment: boolean;
  agencyFooterName?: string;
}

export const PARTNERS: Record<string, PartnerConfig> = {
  al_andalus: {
    id: "al_andalus",
    name: "AL-ANDALUS FOR RECRUITMENT",
    arabicName: "الأندلس للإستقدام",
    primaryColor: "#0A1931",
    secondaryColor: "#88C057",
    logoPath: "/assets/al_andalus_logo.png",
    hasMedicalAttachment: true,
    agencyFooterName: "TESNIM FOREIGN EMPLOYMENT AGENCY",
  },
  darein: {
    id: "darein",
    name: "DAREIN EST",
    arabicName: "دارين التأسيس",
    primaryColor: "#000080",
    secondaryColor: "#ffffff",
    logoPath: "/assets/tesnim_logo.png",
    hasMedicalAttachment: false,
  },
  general: {
    id: "general",
    name: "TESNIM FOREIGN EMPLOYMENT AGENCY",
    arabicName: "وكالة تسنيم للتوظيف الخارجي",
    primaryColor: "#0A1931",
    secondaryColor: "#1E3A8A",
    logoPath: "/assets/tesnim_logo.png",
    hasMedicalAttachment: true,
    agencyFooterName: "TESNIM FOREIGN EMPLOYMENT AGENCY",
  },
};