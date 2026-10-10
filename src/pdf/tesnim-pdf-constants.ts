/**
 * Fixed document geometry.
 *
 * The PDF is device-independent: page size, margins, typography, table
 * geometry, photo placement, and spacing never depend on the browser,
 * viewport, device pixel ratio, zoom, OS, or responsive form layout.
 */
export const PAGE_SIZE_MM = { width: 210, height: 297 };

/**
 * A4 is a fixed international paper size, independent of any device or
 * browser viewport. We intentionally do NOT use the DOM 952×1233 render
 * dimensions from the legacy work-in-progress file.
 */
export const PAGE_FORMAT = "a4";
export const PAGE_WIDTH = PAGE_SIZE_MM.width;
export const PAGE_HEIGHT = PAGE_SIZE_MM.height;

/**
 * Document margins in millimetres.
 */
export const MARGIN_SM = 14;
export const MARGIN_MD = 16;
export const MARGIN_LG = 18;
export const MARGIN_XL = 22;

export const LEFT_MARGIN = MARGIN_MD;
export const RIGHT_MARGIN = MARGIN_MD;
export const TOP_MARGIN = MARGIN_LG;
export const BOTTOM_MARGIN = MARGIN_LG;

export const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;

export const PAGE_BREAK_AFTER = "page-break-after";

/**
 * Base typographic sizes in millimetres (pt-equivalent scale).
 * One pt = 1/72 inch, which is ~0.3528 mm.
 */
const MM_TO_PT = 72 / 25.4;

export const FONT_SIZE = {
  xs: 6.5,
  sm: 7.5,
  body: 8.5,
  small: 7.5,
  label: 8.5,
  heading: 9,
  title: 10,
  display: 11,
  caption: 6.5,
  database: 6.5,
};

export const LINE_HEIGHT = {
  xs: 1.0,
  sm: 1.1,
  body: 1.25,
  small: 1.15,
  label: 1.1,
  heading: 1.1,
  title: 1.05,
  display: 1.0,
  caption: 1.05,
  database: 1.0,
};

export const FONT_FAMILY = {
  sans: '"Garamond", "Times New Roman", "Times", serif',
  arabic: '"Arial", "Arial Hebrew", "Tahoma", sans-serif',
};

export const TEXT_PRIMARY = "#111111";
export const TEXT_SECONDARY = "#333333";
export const TEXT_MUTED = "#555555";
export const NUANCE_NAVY = "#000080";
export const NUANCE_NAVY_LIGHT = "#0A1033";
export const NUANCE_NAVY_SOFT = "#E8EDF3";
export const NUANCE_LABELS = "#F2F4F7";
export const BORDER_COLOR = "#111111";
export const TABLE_BORDER_COLOR = "#111111";
export const TABLESPACE_SM = 1.2 * MM_TO_PT;
export const TABLESPACE_MD = 1.8 * MM_TO_PT;
export const TABLESPACE_LG = 2.6 * MM_TO_PT;
export const TABLESPACE_XL = 3.6 * MM_TO_PT;
export const TABLE_CELL_PADDING_SM = 1.0 * MM_TO_PT;
export const TABLE_CELL_PADDING_MD = 1.6 * MM_TO_PT;
export const TABLE_CELL_PADDING_LG = 2.4 * MM_TO_PT;
export const TABLE_CELL_PADDING_XL = 3.2 * MM_TO_PT;

export const PHOTO_PLACEMENT = {
  left: "left",
  right: "right",
};

export const DEFAULT_PHOTO_SIZE = 52;
export const PHOTO_GAP = 4;

export const ROW_HEIGHT = 7.2 * MM_TO_PT;

export const APPLICATION_DATE_WIDTH = 22 * MM_TO_PT;
export const SERIAL_NO_WIDTH = 52 * MM_TO_PT;
export const DOCUMENT_NO_WIDTH = 38 * MM_TO_PT;
export const EMP_CODE_WIDTH = 38 * MM_TO_PT;

export const APPLICATION_FOR_EMPLOYMENT_LABEL = {
  width: 32 * MM_TO_PT,
  alignment: "right",
};

export const MEDIUM_TABLE_WIDTH = 32 * MM_TO_PT;
export const MEDIUM_TABLE_GAP = 1.2 * MM_TO_PT;
export const MEDIUM_TABLE_CELL_PADDING_LG = 1.6 * MM_TO_PT;

export const DATE_SERIAL_ROW_HORIZONTAL_GAP = 2 * MM_TO_PT;
export const DATE_SERIAL_ROW_XS = 4 * MM_TO_PT;
export const DATE_SERIAL_ROW_SM = 6 * MM_TO_PT;
export const DATE_SERIAL_ROW_MD = 8 * MM_TO_PT;
export const DATE_SERIAL_ROW_LG = 12 * MM_TO_PT;

export const PAGE_FRAME_BORDER_WIDTH = 1.5 * MM_TO_PT;

export const PHOTO_FRAME_BORDER_WIDTH = 1 * MM_TO_PT;
export const PHOTO_BORDER_RADIUS = 0;

export const PHOTO_SLOT_LEFT_MARGIN = 12 * MM_TO_PT;
export const PHOTO_SLOT_RIGHT_MARGIN = 10 * MM_TO_PT;
export const PHOTO_NOTICE_MARGIN_BEFORE = 6 * MM_TO_PT;

export const BUBBLEGUM_LEFT_MARGIN = 10 * MM_TO_PT;
export const BUBBLEGUM_RIGHT_MARGIN = 12 * MM_TO_PT;

export const PASSENGER_PASS_PHOTO_MARGIN_BEFORE = 2 * MM_TO_PT;

export const PHOTO_SECTION_HEIGHT = 52 * MM_TO_PT;

export const HERO_HEADER_H = 18 * MM_TO_PT;
export const HERO_HEADER_WIDTH = 993.6 * MM_TO_PT;

export const PHOTO_SLOT_OUTER_HEIGHT = 38 * MM_TO_PT;

export const PAGE_FOOTER_LABEL_TOP = 16 * MM_TO_PT;
export const PAGE_FOOTER_LABEL_HEIGHT = 10 * MM_TO_PT;
export const PAGE_FOOTER_LABEL_LINE_HEIGHT = 0.9;
export const PAGE_FOOTER_MARGIN_TOP = 6 * MM_TO_PT;
export const PAGE_FOOTER_MARGIN_BOTTOM = 6 * MM_TO_PT;

export const PHOTO_SLOT_WIDTH = 52 * MM_TO_PT;

export const PHOTO_SLOT_HEIGHT = 37.4 * MM_TO_PT;

export const HR_COLOR = "#111111";

export const FONT_FAMILY_ARABIC = '"Arial", "Arial Hebrew", "Tahoma", sans-serif';
export const FONT_FAMILY_ENGLISH = '"Garamond", "Times New Roman", "Times", serif';
export const FONT_FAMILY_SANS = '"Garamond", "Times New Roman", "Times", serif';
