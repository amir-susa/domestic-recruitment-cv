
import logo from "../assets/logo.png";

type BrandLogoProps = {size?: "lg" | "sm";};

export function BrandLogo({ size = "lg" }: BrandLogoProps) {
  const isLg = size === "lg";
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${
      isLg ? "h-[96px] w-[96px]" : "h-[66px] w-[66px]"}`
      }>
      <img src={logo} alt="" className="h-[85%] w-[85%] object-contain" />
    </div>);

}