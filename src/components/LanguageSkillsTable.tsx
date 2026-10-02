import { languageLevels } from "../data/applicationForm";
import { useCVForm } from "../context/CVFormContext";

type Language = "english" | "arabic";

export function LanguageSkillsTable() {
  const { formData, updateLanguage } = useCVForm();

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
              const selected = formData.languages[lang] === level.id;
              return (
                <td key={`${lang}-${level.id}`} className="cell p-0 text-center">
                  <label className="flex h-[22px] w-[24px] cursor-pointer items-center justify-center align-middle">
                    <input
                      type="radio"
                      name={lang}
                      checked={selected}
                      onChange={() => updateLanguage(lang, level.id)}
                      className="sr-only"
                      aria-label={`${lang} ${level.en.toLowerCase()}`}
                    />
                    <span className={`flex h-[18px] w-[18px] items-center justify-center border border-black text-[12px] leading-none text-black ${selected ? "bg-label" : "bg-white"}`}>
                      {selected ? "✓" : ""}
                    </span>
                  </label>
                </td>
              );
            })}
            <td dir="rtl" className={`${headCls} font-arabic text-[14px]`}>{level.ar}</td>
          </tr>
        )}
      </tbody>
    </table>);

}