import { useEffect, useRef } from "react";

interface PDFViewerProps {
  dataUrl: string;
  pages: number;
  width: number;
  height: number;
}

export function PDFViewer({ dataUrl, pages, width, height }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onResize = () => {
      const { clientWidth } = container;
      if (clientWidth > 0) {
        const scale = clientWidth / width;
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = "top center";
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, [width, height]);

  return (
    <div ref={containerRef} style={{ width, height, position: "relative", overflow: "hidden", margin: "0 auto" }}>
      <embed
        src={dataUrl}
        type="application/pdf"
        width={width}
        height={height}
        style={{ display: "block", border: "none" }}
      />
    </div>
  );
}
