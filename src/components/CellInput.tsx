import React from "react";

type CellInputProps = {
  defaultValue?: string;
  label: string;
  size?: "lg" | "sm";
  align?: "center" | "left";
};

export function CellInput({ defaultValue = "", label, size = "lg", align = "center" }: CellInputProps) {
  return (
    <input
      aria-label={label}
      defaultValue={defaultValue}
      className={`w-full h-full bg-transparent px-2 font-serif font-bold text-navy focus:outline-none focus:bg-label/20 ${
      size === "lg" ? "text-[22px]" : "text-[15px]"} ${
      align === "center" ? "text-center" : "text-left"}`} />);


}