import goldLogoImg from "../assets/Tesnim CV Studio Gold Logo.png";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={goldLogoImg}
        alt="Tesnim CV Studio Logo"
        className="h-11 w-auto object-contain"
      />
      <div className="flex flex-col text-left">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Tesnim CV Studio
        </h1>
        <p className="text-xs font-medium text-slate-500">
          Tesnim Foreign Employment Agency
        </p>
      </div>
    </div>
  );
}