import React from "react";
import goldLogoImg from "../assets/Tesnim CV Studio Gold Logo.png";

export function TesnimPageHeader() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={goldLogoImg}
        alt="Tesnim CV Studio Logo"
        className="h-10 w-auto object-contain"
      />
      <div className="flex flex-col text-left">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
          Tesnim CV Studio
        </h1>
        <p className="text-xs font-medium text-slate-500">
          Tesnim Foreign Employment Agency
        </p>
      </div>
    </div>
  );
}

export default TesnimPageHeader;