import { CellInput } from "./CellInput";

type DateSerialRowProps = {
  columns: [string, string, string, string];
  height: string;
  compact?: boolean;
  dateValue?: string;
  serialNoValue?: string;
  onDateChange?: (value: string) => void;
  onSerialNoChange?: (value: string) => void;
};

export function DateSerialRow({
  columns,
  height,
  compact = false,
  dateValue,
  serialNoValue,
  onDateChange,
  onSerialNoChange,
}: DateSerialRowProps) {
  const label = "cell bg-label px-2 text-left font-serif text-[16px] font-normal text-navy";
  return (
    <table className="w-full table-fixed border-collapse">
      <colgroup>
        {columns.map((w, i) =>
        <col key={i} style={{ width: w }} />
        )}
      </colgroup>
      <tbody>
        <tr className={height}>
          <th scope="row" className={label}>Date:</th>
          <td className="cell p-0"><CellInput label="Date and time created" value={dateValue} onChange={(event) => onDateChange?.(event.currentTarget.value)} type="text" size={compact ? "xs" : "sm"} align="left" readOnly /></td>
          <th scope="row" className={label}>Serial No:</th>
          <td className="cell p-0"><CellInput label="Serial number" value={serialNoValue} onChange={(event) => onSerialNoChange?.(event.currentTarget.value)} size={compact ? "xs" : "sm"} align="left" readOnly /></td>
        </tr>
      </tbody>
    </table>);

}