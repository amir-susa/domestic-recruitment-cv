import React, { useRef } from "react";

type PhotoSlotProps = {
  title: string;
  size: string;
  value: string | null;
  onChange: (photo: string | null) => void;
  className?: string;
  fit?: "cover" | "contain";
};

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export function PhotoSlot({ title, size, value, onChange, className = "", fit = "cover" }: PhotoSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageFitClass = fit === "contain" ? "object-contain" : "object-cover";
  const sizeLabel = size ? ` (${size})` : "";
  const formalLabel =
    title === "Applicant photo"
      ? "Select Applicant Photo"
      : title === "Full photo"
        ? "Select Full Photo"
        : "Select Passport Photo";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !acceptedImageTypes.has(file.type)) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <button
      type="button"
      data-upload-control="true"
      data-photo-size={size}
      onClick={() => inputRef.current?.click()}
      aria-label={`${formalLabel}${sizeLabel}`}
      className={`group relative flex items-center justify-center overflow-hidden border-[3px] border-frame bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${className}`}>
      {value ? (
        <img src={value} alt={title} className={`absolute inset-0 h-full w-full ${imageFitClass} ${fit === "contain" ? "p-1" : ""}`} />
      ) : (
        <span className="border border-black bg-white px-5 py-2 text-center font-sans text-[19px] font-bold leading-[1.6] text-black transition-colors duration-150 group-hover:bg-label/30">
          {formalLabel}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onClick={(event) => event.stopPropagation()}
        onChange={handleFile} />
    </button>);

}