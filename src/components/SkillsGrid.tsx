import { skills } from "../data/applicationForm";
import { useCVForm } from "../context/CVFormContext";

export function SkillsGrid() {
  const { formData, toggleSkill } = useCVForm();

  return (
    <div className="grid grid-cols-3 border border-black">
      {skills.map((skill, i) =>
      <div
        key={skill.id}
        className={`flex h-[50px] items-center justify-between px-2 ${i % 3 !== 2 ? "border-r border-black" : ""} ${
        i < 3 ? "border-b border-black" : ""}`
        }>
        
          <div className="leading-[1.1]">
            <div dir="rtl" className="text-right font-arabic text-[14px] font-bold text-navy">{skill.ar}</div>
            <div className="font-serif text-[16px] font-bold text-navy">{skill.en}</div>
          </div>
          <button
          type="button"
          role="checkbox"
          aria-checked={formData.skills[skill.id] ?? skill.checked}
          aria-label={skill.en}
          onClick={() => toggleSkill(skill.id)}
          className="flex h-[40px] w-[44px] items-center justify-center border border-black text-[20px] text-black hover:bg-label/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy">
          
            {formData.skills[skill.id] ?? skill.checked ? "✓" : ""}
          </button>
        </div>
      )}
    </div>);

}