
import logo from "../assets/logo.png";

type BrandLogoProps = {size?: "lg" | "sm";};

export function BrandLogo({ size = "lg" }: BrandLogoProps) {
  const isLg = size === "lg";
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border-[3px] border-navy bg-white p-1 shadow-sm ${
      isLg ? "h-[96px] w-[96px]" : "h-[66px] w-[66px]"}`
      }>
      <div className="flex h-full w-full items-center justify-center rounded-full border border-navy bg-white">
        <img src={logo} alt="" className="h-[82%] w-[82%] object-contain" />
      </div>
    </div>);

}