import { useId, useState, type ChangeEventHandler } from "react";

type CellInputProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onOptionChange?: (value: string) => void;
  label: string;
  size?: "lg" | "sm" | "xs";
  align?: "center" | "left";
  readOnly?: boolean;
  type?: "text" | "date" | "number";
  min?: number;
  max?: number;
  step?: number;
  options?: readonly string[];
  suggestions?: readonly string[];
};

export function CellInput({
  value,
  onChange,
  onOptionChange,
  label,
  size = "lg",
  align = "center",
  readOnly = false,
  type = "text",
  min,
  max,
  step,
  options,
  suggestions,
}: CellInputProps) {
  const suggestionsId = useId();
  const [localValue, setLocalValue] = useState(value ?? "");
  const isControlled = value !== undefined && (onChange !== undefined || onOptionChange !== undefined);
  const currentValue = isControlled ? value ?? "" : localValue;
  const className = `w-full h-full align-middle bg-transparent px-2 font-serif font-bold leading-[1.1] text-navy focus:outline-none focus:bg-label/20 ${
    size === "lg" ? "text-[18px]" : size === "xs" ? "text-[12px]" : "text-[15px]"} ${
    align === "center" ? "text-center" : "text-left"}`;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) setLocalValue(event.currentTarget.value);
    onChange?.(event);
  };

  if (options) {
    return (
      <select
        aria-label={label}
        data-pdf-text
        data-pdf-value={options.find((option) => option === currentValue) ?? ""}
        value={currentValue}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          if (!isControlled) setLocalValue(nextValue);
          onOptionChange?.(nextValue);
        }}
        className={className}>
        <option value="" hidden />
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>);
  }

  return (
    <>
      <input
        aria-label={label}
        data-pdf-text
        data-pdf-value={currentValue}
        value={isControlled ? value : localValue}
        onChange={handleChange}
        readOnly={readOnly}
        type={type}
        min={min}
        max={max}
        step={step}
        list={suggestions?.length ? suggestionsId : undefined}
        className={className} />
      {suggestions?.length ? (
        <datalist id={suggestionsId}>
          {suggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}
        </datalist>
      ) : null}
    </>);


}