import React from "react";
import { useCVForm } from "../context/CVFormContext";
import { User, FileText, CheckSquare, Briefcase, Plus, Trash2 } from "lucide-react";

const ARAB_COUNTRIES = [
  "Saudi Arabia",
  "Kuwait",
  "United Arab Emirates (UAE)",
  "Qatar",
  "Oman",
  "Bahrain",
  "Lebanon",
  "Jordan",
  "Iraq"
];

const EDUCATION_LEVELS = [
  "Primary Education",
  "Junior High School",
  "High School Diploma",
  "Technical / Vocational",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree"
];

export function FormPageOne() {
  const { formData, updateFormField } = useCVForm();

  const handleSkillChange = (skillKey: keyof typeof formData.skills) => {
    updateFormField("skills", {
      ...formData.skills,
      [skillKey]: !formData.skills[skillKey],
    });
  };

  const handleLanguageChange = (langKey: "arabic" | "english", level: string) => {
    updateFormField("languages", {
      ...formData.languages,
      [langKey]: level,
    });
  };

  const addExperience = () => {
    updateFormField("previousExperiences", [
      ...formData.previousExperiences,
      { country: "Saudi Arabia", years: "1", months: "0" },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = [...formData.previousExperiences];
    updated.splice(index, 1);
    updateFormField("previousExperiences", updated);
  };

  const updateExperience = (index: number, field: "country" | "years" | "months", value: string) => {
    const updated = [...formData.previousExperiences];
    updated[index] = { ...updated[index], [field]: value };
    updateFormField("previousExperiences", updated);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* 1. Candidate Personal Details */}
      <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 border-2 border-slate-300">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-slate-200">
          <User className="w-6 h-6 text-blue-950 font-black" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">1. Candidate Personal Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Full Name (English) *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormField("fullName", e.target.value)}
              placeholder="Candidate Full Name"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Phone Number *</label>
            <input
              type="text"
              value={formData.phoneNo}
              onChange={(e) => updateFormField("phoneNo", e.target.value)}
              placeholder="+251 911 234567"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Nationality</label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => updateFormField("nationality", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Religion</label>
            <select
              value={formData.religion}
              onChange={(e) => updateFormField("religion", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            >
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Place of Birth</label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => updateFormField("placeOfBirth", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormField("dateOfBirth", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Age (Auto Calculated)</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => updateFormField("age", e.target.value)}
              placeholder="e.g. 28"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-black text-blue-950 bg-blue-50/50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => updateFormField("height", e.target.value)}
              placeholder="e.g. 155"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => updateFormField("weight", e.target.value)}
              placeholder="e.g. 50"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Marital Status</label>
            <select
              value={formData.maritalStatus}
              onChange={(e) => updateFormField("maritalStatus", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">No. of Children</label>
            <input
              type="number"
              value={formData.numberOfChildren}
              onChange={(e) => updateFormField("numberOfChildren", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Education Level *</label>
            <select
              value={formData.educationalQualification}
              onChange={(e) => updateFormField("educationalQualification", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            >
              {EDUCATION_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Passport Information */}
      <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 border-2 border-slate-300">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-slate-200">
          <FileText className="w-6 h-6 text-blue-950 font-black" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">2. Passport Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Passport Number *</label>
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => updateFormField("passportNumber", e.target.value)}
              placeholder="EP1234567"
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-black text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Date of Issue</label>
            <input
              type="date"
              value={formData.passportDateOfIssue}
              onChange={(e) => updateFormField("passportDateOfIssue", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Place of Issue</label>
            <input
              type="text"
              value={formData.passportPlaceOfIssue}
              onChange={(e) => updateFormField("passportPlaceOfIssue", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-2 focus:ring-blue-900/20 focus:outline-none transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">Date of Expiry (Auto Rule)</label>
            <input
              type="date"
              value={formData.passportDateOfExpiry}
              onChange={(e) => updateFormField("passportDateOfExpiry", e.target.value)}
              className="w-full px-3.5 py-2.5 border-2 border-emerald-500 rounded-xl text-sm font-black text-emerald-950 bg-emerald-50/50 focus:bg-white focus:border-emerald-700 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Language Proficiency & Skills */}
      <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 border-2 border-slate-300">
        <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-slate-200">
          <CheckSquare className="w-6 h-6 text-blue-950 font-black" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">3. Language Proficiency & Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Languages (Default: Basic)</h3>
            <div className="flex items-center justify-between border-2 border-slate-300 p-3 rounded-xl bg-slate-50">
              <span className="text-sm font-extrabold text-slate-900">Arabic / العربية</span>
              <select
                value={formData.languages.arabic}
                onChange={(e) => handleLanguageChange("arabic", e.target.value)}
                className="px-3 py-1.5 border-2 border-slate-400 rounded-lg text-xs font-black bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Fair">Fair</option>
                <option value="Fluent">Fluent</option>
              </select>
            </div>
            <div className="flex items-center justify-between border-2 border-slate-300 p-3 rounded-xl bg-slate-50">
              <span className="text-sm font-extrabold text-slate-900">English / الإنجليزية</span>
              <select
                value={formData.languages.english}
                onChange={(e) => handleLanguageChange("english", e.target.value)}
                className="px-3 py-1.5 border-2 border-slate-400 rounded-lg text-xs font-black bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Fair">Fair</option>
                <option value="Fluent">Fluent</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Skills & Abilities</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: "babySitting", label: "Baby Sitting" },
                { key: "washing", label: "Washing" },
                { key: "cleaning", label: "Cleaning" },
                { key: "cooking", label: "Cooking" },
              ].map((skill) => (
                <label
                  key={skill.key}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer text-xs font-black transition ${
                    formData.skills[skill.key as keyof typeof formData.skills]
                      ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm"
                      : "bg-slate-50 border-slate-300 text-slate-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.skills[skill.key as keyof typeof formData.skills]}
                    onChange={() => handleSkillChange(skill.key as keyof typeof formData.skills)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  {skill.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Previous Work Experience (Arab Countries) */}
      <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 border-2 border-slate-300">
        <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-950 font-black" />
            <h2 className="text-xl font-black text-blue-950 tracking-tight">4. Previous Work Experience (Arab Countries)</h2>
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-extrabold text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Add Country
          </button>
        </div>

        {formData.previousExperiences.length === 0 ? (
          <p className="text-xs text-slate-500 italic text-center py-4">No previous Arab country experience added.</p>
        ) : (
          <div className="space-y-3">
            {formData.previousExperiences.map((exp, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-end gap-3 p-3 bg-slate-50 rounded-xl border-2 border-slate-300">
                <div className="flex-1 w-full">
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">Arab Country</label>
                  <select
                    value={exp.country}
                    onChange={(e) => updateExperience(idx, "country", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-400 rounded-lg text-xs font-bold text-slate-900 bg-white"
                  >
                    {ARAB_COUNTRIES.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-32">
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">Years</label>
                  <select
                    value={exp.years || "0"}
                    onChange={(e) => updateExperience(idx, "years", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-400 rounded-lg text-xs font-bold text-slate-900 bg-white"
                  >
                    {Array.from({ length: 11 }, (_, i) => (
                      <option key={i} value={i.toString()}>{i} Years</option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-32">
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">Months</label>
                  <select
                    value={exp.months || "0"}
                    onChange={(e) => updateExperience(idx, "months", e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-400 rounded-lg text-xs font-bold text-slate-900 bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i.toString()}>{i} Months</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}