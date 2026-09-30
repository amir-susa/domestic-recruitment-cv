import React, { useState } from "react";
import { defaultLanguageLevels, languageLevels } from "../data/applicationForm";

type Language = "english" | "arabic";

export function LanguageSkillsTable() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    (["english", "arabic"] as Language[]).forEach((lang) => {
      const level = defaultLanguageLevels[lang];
      if (level) initial[`${lang}-${level}`] = true;
    });
    return initial;
  });

  const toggle = (key: string) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  const headCls = "cell bg-label px-2 font-serif text-[15px] font-bold text-navy";

  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr className="h-[25px]">
          <th className={`${headCls} text-left`}>ENGLISH</th>
          <th dir="rtl" className={`${headCls} font-arabic text-[14px]`}>إنجليزي</th>
          <th className={`${headCls} text-left`}>ARABIC</th>
          <th dir="rtl" className={`${headCls} font-arabic text-[14px]`}>عربي</th>
        </tr>
      </thead>
      <tbody>
        {languageLevels.map((level) =>
        <tr key={level.id} className="h-[28px]">
            <th scope="row" className={`${headCls} text-left`}>{level.en}</th>
            {(["english", "arabic"] as Language[]).map((lang) => {
            const key = `${lang}-${level.id}`;
            return (
              <td key={lang} className="cell p-0 text-center">
                  <button
                  type="button"
                  role="checkbox"
                  aria-checked={!!checked[key]}
                  aria-label={`${lang} ${level.en.toLowerCase()}`}
                  onClick={() => toggle(key)}
                  className="inline-flex h-[22px] w-[24px] items-center justify-center border border-black align-middle text-[15px] leading-none text-black hover:bg-label/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy">
                  
                    {checked[key] ? "✓" : ""}
                  </button>
                </td>);

          })}
            <td dir="rtl" className={`${headCls} font-arabic text-[14px]`}>{level.ar}</td>
          </tr>
        )}
      </tbody>
    </table>);

}