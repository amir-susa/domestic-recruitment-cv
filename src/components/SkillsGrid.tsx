import React, { useState } from "react";
import { skills } from "../data/applicationForm";

export function SkillsGrid() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(skills.map((s) => [s.id, s.checked]))
  );

  return (
    <div className="grid grid-cols-3 border border-black">
      {skills.map((skill, i) =>
      <div
        key={skill.id}
        className={`flex h-[50px] items-center justify-between px-2 ${i % 3 !== 2 ? "border-r border-black" : ""} ${
        i < 3 ? "border-b border-black" : ""}`
        }>
        
          <div className="leading-[1.1]">
            <div dir="rtl" className="text-left font-arabic text-[13px] font-bold text-navy">{skill.ar}</div>
            <div className="font-serif text-[16px] font-bold text-navy">{skill.en}</div>
          </div>
          <button
          type="button"
          role="checkbox"
          aria-checked={checked[skill.id]}
          aria-label={skill.en}
          onClick={() => setChecked((p) => ({ ...p, [skill.id]: !p[skill.id] }))}
          className="flex h-[40px] w-[44px] items-center justify-center border border-black text-[20px] text-black hover:bg-label/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy">
          
            {checked[skill.id] ? "✓" : ""}
          </button>
        </div>
      )}
    </div>);

}