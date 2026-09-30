import React from "react";

type PageFrameProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  label: string;
};

export function PageFrame({ children, footer, label }: PageFrameProps) {
  return (
    <section
      aria-label={label}
      className="relative mx-auto w-[952px] h-[1233px] shrink-0 bg-navy border-[6px] border-black shadow-xl">
      
      <div className="absolute inset-[6px] border-2 border-black pointer-events-none" />
      <div className="absolute left-[18px] right-[16px] top-[8px] bottom-[34px] flex flex-col bg-white">
        <div className="flex-1 relative">{children}</div>
        {footer}
      </div>
    </section>);

}