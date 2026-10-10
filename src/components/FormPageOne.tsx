import React from "react";
import { useCVForm } from "../context/CVFormContext";

export const FormPageOne: React.FC = () => {
  const { formData, updateFormData } = useCVForm();

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      {/* Partner Switcher Dropdown */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Select Foreign Recruitment Partner
        </label>
        <select
          value={formData.selectedPartner}
          onChange={(e) => updateFormData({ selectedPartner: e.target.value as any })}
          className="w-full p-2.5 bg-white border border-slate-300 rounded-md font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
        >
          <option value="darein">DAREIN EST (Kuwait)</option>
          <option value="al_andalus">AL-ANDALUS FOR RECRUITMENT</option>
        </select>
      </div>

      <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Candidate Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Candidate Name"
          />
        </div>

        {formData.selectedPartner === "al_andalus" && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Mother's Name</label>
              <input
                type="text"
                value={formData.mothersName || ""}
                onChange={(e) => updateFormData({ mothersName: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Mother's Name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Living Town</label>
              <input
                type="text"
                value={formData.livingTown || ""}
                onChange={(e) => updateFormData({ livingTown: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Living Town / City"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Passport Number</label>
          <input
            type="text"
            value={formData.passportNumber}
            onChange={(e) => updateFormData({ passportNumber: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="E1234567"
          />
        </div>
      </div>
    </div>
  );
};
