import React, { useRef } from "react";
import { useCVForm } from "../context/CVFormContext";
import { UploadCloud, Image as ImageIcon, FileText, ShieldCheck, User, Trash2 } from "lucide-react";

export function FormPageTwo() {
  const { formData, updateFormField } = useCVForm();
  const batchInputRef = useRef<HTMLInputElement>(null);

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleBatchUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);

    const pendingHeadshot = !formData.headshotPhoto;
    const pendingFullBody = !formData.fullBodyPhoto;
    const pendingPassport = !formData.passportScan;
    const pendingMedical = !formData.medicalScan;

    let headshotVal = formData.headshotPhoto;
    let fullBodyVal = formData.fullBodyPhoto;
    let passportVal = formData.passportScan;
    let medicalVal = formData.medicalScan;

    for (const file of fileArray) {
      const name = file.name.toLowerCase();
      const dataUrl = await readFileAsDataUrl(file);

      if ((name.includes("headshot") || name.includes("passport_photo") || name.includes("face")) && !headshotVal) {
        headshotVal = dataUrl;
      } else if ((name.includes("full") || name.includes("body") || name.includes("standing")) && !fullBodyVal) {
        fullBodyVal = dataUrl;
      } else if ((name.includes("passport") || name.includes("pass")) && !passportVal) {
        passportVal = dataUrl;
      } else if ((name.includes("medical") || name.includes("health") || name.includes("report")) && !medicalVal) {
        medicalVal = dataUrl;
      } else {
        if (!headshotVal) headshotVal = dataUrl;
        else if (!fullBodyVal) fullBodyVal = dataUrl;
        else if (!passportVal) passportVal = dataUrl;
        else if (!medicalVal) medicalVal = dataUrl;
      }
    }

    updateFormField("headshotPhoto", headshotVal);
    updateFormField("fullBodyPhoto", fullBodyVal);
    updateFormField("passportScan", passportVal);
    updateFormField("medicalScan", medicalVal);
  };

  const handleSingleUpload = async (field: keyof typeof formData, file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    updateFormField(field, dataUrl);
  };

  return (
    <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 border-2 border-slate-300 space-y-6 text-slate-900">
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-blue-950 font-black" />
          <h2 className="text-xl font-black text-blue-950 tracking-tight">5. Document Attachments & Media</h2>
        </div>

        <button
          type="button"
          onClick={() => batchInputRef.current?.click()}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-extrabold text-xs shadow-md transition"
        >
          <UploadCloud className="w-4 h-4" /> Batch Upload Files
        </button>
        <input
          ref={batchInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleBatchUpload(e.target.files)}
        />
      </div>

      <div
        onClick={() => batchInputRef.current?.click()}
        className="border-2 border-dashed border-slate-400 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 p-5 rounded-2xl text-center cursor-pointer transition flex flex-col items-center justify-center"
      >
        <UploadCloud className="w-8 h-8 text-slate-400 mb-1" />
        <span className="text-xs font-black text-slate-800 uppercase">Click or Drag Multiple Images Here to Auto-Assign</span>
        <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Auto-assigns Headshot, Full Body Photo, Passport Copy, & Medical Report</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ImageSlot
          title="Candidate Passport Photo (Headshot)"
          icon={<User className="w-5 h-5 text-blue-900" />}
          value={formData.headshotPhoto}
          onUpload={(file) => handleSingleUpload("headshotPhoto", file)}
          onClear={() => updateFormField("headshotPhoto", null)}
        />

        <ImageSlot
          title="Candidate Full-Body Photo"
          icon={<ImageIcon className="w-5 h-5 text-blue-900" />}
          value={formData.fullBodyPhoto}
          onUpload={(file) => handleSingleUpload("fullBodyPhoto", file)}
          onClear={() => updateFormField("fullBodyPhoto", null)}
        />

        <ImageSlot
          title="Passport Copy Scan"
          icon={<FileText className="w-5 h-5 text-blue-900" />}
          value={formData.passportScan}
          onUpload={(file) => handleSingleUpload("passportScan", file)}
          onClear={() => updateFormField("passportScan", null)}
        />

        <ImageSlot
          title="Medical Examination Attachment"
          icon={<ShieldCheck className="w-5 h-5 text-blue-900" />}
          value={formData.medicalScan}
          onUpload={(file) => handleSingleUpload("medicalScan", file)}
          onClear={() => updateFormField("medicalScan", null)}
        />
      </div>
    </div>
  );
}

function ImageSlot({
  title,
  icon,
  value,
  onUpload,
  onClear,
}: {
  title: string;
  icon: React.ReactNode;
  value: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-2 border-slate-300 rounded-xl p-3 bg-slate-50 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">{icon} {title}</span>
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="text-rose-600 hover:text-rose-800 text-[10px] font-black flex items-center gap-0.5"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-40 border-2 border-dashed border-slate-300 hover:border-blue-900 rounded-lg bg-white flex items-center justify-center overflow-hidden cursor-pointer relative group transition"
      >
        {value ? (
          <img src={value} alt={title} className="w-full h-full object-contain p-1" />
        ) : (
          <div className="text-center p-3 text-slate-400 flex flex-col items-center">
            <UploadCloud className="w-6 h-6 text-slate-400 mb-1 group-hover:scale-110 transition" />
            <span className="text-[10px] font-bold text-slate-600 uppercase">Click to Upload Document</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
        />
      </div>
    </div>
  );
}