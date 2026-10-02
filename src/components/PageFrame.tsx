import React from "react";

type PageFrameProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  label: string;
};

export function PageFrame({ children, footer, label }: PageFrameProps) {
  return (
    <section
      data-cv-page
      aria-label={label}
      className="relative mx-auto h-[1233px] w-[952px] shrink-0 overflow-hidden border-[6px] border-black bg-navy shadow-xl">
      <div className="pointer-events-none absolute inset-[6px] border-2 border-black" />
      <div className="absolute inset-x-[18px] bottom-[34px] top-[8px] flex flex-col overflow-hidden bg-white">
        <div className="relative flex-1 overflow-hidden">{children}</div>
        {footer}
      </div>
    </section>);

}