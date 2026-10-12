import React from "react";
import { useCVForm, ARAB_COUNTRIES, type ExperienceEntry } from "../context/CVFormContext";
import { Upload, Image as ImageIcon, User, FileText as PassportIcon, Languages, Trash2, Layers, Plus, Briefcase } from "lucide-react";

export const UnifiedCandidateForm: React.FC = () => {
  const { formData, updateFormData } = useCVForm();

  const calculateAge = (dobString: string) => {
    if (!dobString) return "";
    const dob = new Date(dobString);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    const calculatedAge = calculateAge(dob);
    updateFormData({ dateOfBirth: dob, age: calculatedAge });
  };

  const handleLivingTownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const town = e.target.value;
    updateFormData({ livingTown: town, placeOfBirth: town });
  };

  const handleAddExperience = () => {
    const current = formData.previousExperiences || [];
    updateFormData({
      previousExperiences: [...current, { country: ARAB_COUNTRIES[0], years: "1", months: "0" }],
    });
  };

  const handleRemoveExperience = (index: number) => {
    const current = formData.previousExperiences || [];
    updateFormData({
      previousExperiences: current.filter((_, i) => i !== index),
    });
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceEntry, value: string) => {
    const current = [...(formData.previousExperiences || [])];
    current[index] = { ...current[index], [field]: value };
    updateFormData({ previousExperiences: current });
  };

  const handleSingleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "headshotPhoto" | "fullBodyPhoto" | "passportScan" | "medicalScan") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBatchFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const slots: ("headshotPhoto" | "fullBodyPhoto" | "passportScan" | "medicalScan")[] = [
      "headshotPhoto",
      "fullBodyPhoto",
      "passportScan",
      "medicalScan",
    ];
    files.forEach((file, index) => {
      const name = file.name.toLowerCase();
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (name.includes("head") || name.includes("face")) {
          updateFormData({ headshotPhoto: result });
        } else if (name.includes("body") || name.includes("full")) {
          updateFormData({ fullBodyPhoto: result });
        } else if (name.includes("pass") || name.includes("ppt")) {
          updateFormData({ passportScan: result });
        } else if (name.includes("med") || name.includes("health")) {
          updateFormData({ medicalScan: result });
        } else {
          const targetSlot = slots[index % slots.length];
          updateFormData({ [targetSlot]: result });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-8">
      {/* Details of Application */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-3 text-slate-900">
          <User className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold tracking-tight">Details of Application</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">Full Name (English)</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="e.g. LIDIYA ABEBE LETA"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Mother Name</label>
            <input
              type="text"
              value={formData.mothersName || ""}
              onChange={(e) => updateFormData({ mothersName: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="Mother Name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phoneNo || ""}
              onChange={(e) => updateFormData({ phoneNo: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="+251 ..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Living Town</label>
            <input
              type="text"
              value={formData.livingTown || ""}
              onChange={handleLivingTownChange}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="e.g. Addis Ababa"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Place of Birth (Auto from Town)</label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => updateFormData({ placeOfBirth: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="Place of Birth"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Nationality</label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => updateFormData({ nationality: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Religion</label>
            <select
              value={formData.religion}
              onChange={(e) => updateFormData({ religion: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none bg-white"
            >
              <option value="Christian">Christian</option>
              <option value="Muslim">Muslim</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={handleDobChange}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Age (Auto-Calculated)</label>
            <input
              type="text"
              readOnly
              value={formData.age}
              className="w-full p-2.5 border-2 border-slate-200 bg-slate-100 rounded-lg text-sm font-bold text-emerald-700"
              placeholder="Calculated from DOB"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Marital Status</label>
            <select
              value={formData.maritalStatus}
              onChange={(e) => updateFormData({ maritalStatus: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none bg-white"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">No. of Children</label>
            <input
              type="number"
              value={formData.numberOfChildren}
              onChange={(e) => updateFormData({ numberOfChildren: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Weight (KG)</label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => updateFormData({ weight: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="e.g. 56"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Height (CM)</label>
            <input
              type="text"
              value={formData.height}
              onChange={(e) => updateFormData({ height: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="e.g. 162"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Educational Level</label>
            <input
              type="text"
              value={formData.educationalQualification}
              onChange={(e) => updateFormData({ educationalQualification: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="Primary Education"
            />
          </div>
        </div>
      </div>

      {/* Passport Details */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-3 text-slate-900">
          <PassportIcon className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold tracking-tight">Passport Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Passport Number</label>
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => updateFormData({ passportNumber: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-bold uppercase text-slate-900 focus:border-emerald-600 focus:outline-none"
              placeholder="EP000000"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Date of Issue</label>
            <input
              type="date"
              value={formData.passportDateOfIssue}
              onChange={(e) => updateFormData({ passportDateOfIssue: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Place of Issue</label>
            <input
              type="text"
              value={formData.passportPlaceOfIssue}
              onChange={(e) => updateFormData({ passportPlaceOfIssue: e.target.value })}
              className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Date of Expiry (Auto Rule)</label>
            <input
              type="date"
              readOnly
              value={formData.passportDateOfExpiry}
              className="w-full p-2.5 border-2 border-slate-200 bg-slate-100 rounded-lg text-sm font-bold text-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Previous Experience Section (Arab Countries) */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-slate-900">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold tracking-tight">Previous Experience (Arab Countries)</h2>
          </div>
          <button
            onClick={handleAddExperience}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Country
          </button>
        </div>

        <div className="space-y-4">
          {(formData.previousExperiences || []).map((exp, idx) => (
            <div key={idx} className="flex flex-wrap items-center gap-3 p-3 border-2 border-slate-200 rounded-lg bg-slate-50">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                <select
                  value={exp.country}
                  onChange={(e) => handleExperienceChange(idx, "country", e.target.value)}
                  className="w-full p-2 border-2 border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white"
                >
                  {ARAB_COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-28">
                <label className="block text-xs font-bold text-slate-700 mb-1">Years</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(idx, "years", e.target.value)}
                  className="w-full p-2 border-2 border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white"
                  placeholder="Years"
                />
              </div>

              <div className="w-28">
                <label className="block text-xs font-bold text-slate-700 mb-1">Months</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={exp.months}
                  onChange={(e) => handleExperienceChange(idx, "months", e.target.value)}
                  className="w-full p-2 border-2 border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white"
                  placeholder="Months"
                />
              </div>

              <div className="pt-5">
                <button
                  onClick={() => handleRemoveExperience(idx)}
                  className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-all"
                  title="Remove country"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Languages */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-3 text-slate-900">
          <Languages className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold tracking-tight">Skills & Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Language Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">English Level</label>
                <select
                  value={formData.englishSkill}
                  onChange={(e) => updateFormData({ englishSkill: e.target.value as any })}
                  className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white"
                >
                  <option value="POOR">POOR</option>
                  <option value="FAIR">FAIR</option>
                  <option value="GOOD">GOOD</option>
                  <option value="FLUENT">FLUENT</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Arabic Level</label>
                <select
                  value={formData.arabicSkill}
                  onChange={(e) => updateFormData({ arabicSkill: e.target.value as any })}
                  className="w-full p-2.5 border-2 border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white"
                >
                  <option value="POOR">POOR</option>
                  <option value="FAIR">FAIR</option>
                  <option value="GOOD">GOOD</option>
                  <option value="FLUENT">FLUENT</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Job Skills</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
              {["babySitting", "washing", "cleaning", "cooking", "sewing", "driving", "houseWork"].map((skill) => (
                <label key={skill} className="flex items-center gap-2 p-2.5 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={!!formData.skills[skill as keyof typeof formData.skills]}
                    onChange={(e) =>
                      updateFormData({
                        skills: { ...formData.skills, [skill]: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="capitalize">{skill.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Attachments */}
      <div className="bg-white rounded-xl shadow-md border border-slate-300 p-6 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-slate-900">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold tracking-tight">Document Attachments & Media</h2>
          </div>
        </div>
        <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl p-4 text-center relative cursor-pointer hover:bg-emerald-100/60 transition-all">
          <input type="file" multiple accept="image/*" onChange={handleBatchFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className="flex flex-col items-center gap-1">
            <Layers className="w-8 h-8 text-emerald-600" />
            <p className="text-sm font-bold text-emerald-900">Batch Upload All Files At Once</p>
            <p className="text-xs text-emerald-700 font-medium">Select headshot, full-body photo, passport scan, and medical scan together</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Photo (Headshot)", field: "headshotPhoto" as const },
            { label: "Full-Body Photo", field: "fullBodyPhoto" as const },
            { label: "Passport Copy Scan", field: "passportScan" as const },
            { label: "Medical Examination Attachment", field: "medicalScan" as const },
          ].map(({ label, field }) => (
            <div key={field} className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">{label}</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center relative hover:bg-slate-50 transition-all min-h-[140px] flex items-center justify-center">
                {formData[field] ? (
                  <div className="relative group w-full flex flex-col items-center">
                    <img src={formData[field]} alt={label} className="max-h-32 rounded-lg object-contain border border-slate-200 shadow-sm" />
                    <button
                      onClick={() => updateFormData({ [field]: undefined })}
                      className="absolute top-1 right-1 bg-rose-600 text-white p-1.5 rounded-full shadow hover:bg-rose-700 z-20"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-1">
                    <input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, field)} className="hidden" />
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500">Click to upload {label}</span>
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};