import React from "react";

type BrandLogoProps = {size?: "lg" | "sm";};

export function BrandLogo({ size = "lg" }: BrandLogoProps) {
  const isLg = size === "lg";
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border-brand bg-white ${
      isLg ? "h-[96px] w-[96px] border-[5px]" : "h-[66px] w-[66px] border-[4px]"}`
      }>
      
      <span
        className={`-ml-1 font-serif font-bold italic leading-none text-brand ${
        isLg ? "text-[78px]" : "text-[52px]"}`
        }>
        
        D
      </span>
    </div>);

}