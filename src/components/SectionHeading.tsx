import React from "react";

type SectionHeadingProps = {en: string;ar: string;className?: string;};

export function SectionHeading({ en, ar, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex items-end justify-between px-2 pb-1.5 ${className}`}>
      <h2 className="font-serif text-[16px] font-bold text-navy">{en}</h2>
      <span dir="rtl" className="font-arabic text-[15px] font-bold text-navy">
        {ar}
      </span>
    </div>);

}