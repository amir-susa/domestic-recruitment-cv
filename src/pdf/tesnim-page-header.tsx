import { PHOTO_SLOT_WIDTH, PHOTO_SLOT_HEIGHT, PAGE_WIDTH } from "./tesnim-pdf-constants";

interface HeaderProps {
  pageNumber: number;
  totalPages: number;
  logoDataUrl: string;
}

export function PageHeader({ pageNumber, totalPages, logoDataUrl }: HeaderProps) {
  const total = totalPages ?? 2;
  const current = pageNumber ?? 1;

  return (
    <div
      style={{
        width: `${PAGE_WIDTH}mm`,
        height: `${PHOTO_SLOT_HEIGHT}mm`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2mm",
        borderBottom: `1px solid #111111`,
        background: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4mm" }}>
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            alt="Tesnim company logo"
            style={{
              width: "28mm",
              height: "14mm",
              objectFit: "contain",
            }}
          />
        ) : null}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: '"Garamond", serif', fontWeight: "bold", fontSize: "9pt", color: "#000080", textTransform: "uppercase", lineHeight: 1 }}>
            TESNIM RECRUITMENT
          </div>
          <div style={{ fontFamily: '"Garamond", serif', fontWeight: "bold", fontSize: "7pt", color: "#333333", lineHeight: 1 }}>
            DOMESTIC MANPOWER
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right", fontSize: "6.5pt", color: "#555555", lineHeight: 1.2 }}>
        <div>Page {current} of {total}</div>
        <div style={{ marginTop: "0.5mm", color: "#777777" }}>Document No. {current} / {total}</div>
      </div>
    </div>
  );
}
