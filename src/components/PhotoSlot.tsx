import React, { useRef, useState } from "react";

type PhotoSlotProps = {
  title: string;
  size: string;
  className?: string;
};

export function PhotoSlot({ title, size, className = "" }: PhotoSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSrc(URL.createObjectURL(file));
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      aria-label={`Upload ${title.toLowerCase()}`}
      className={`group relative flex items-center justify-center overflow-hidden bg-white border-[3px] border-frame focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${className}`}>
      
      {src ?
      <img src={src} alt={title} className="absolute inset-0 h-full w-full object-cover" /> :

      <span className="border border-black bg-white px-5 py-2 text-center font-sans text-[19px] font-bold leading-[1.6] text-black transition-colors duration-150 group-hover:bg-label/30">
          {title}
          <br />
          {size}
        </span>
      }
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </button>);

}