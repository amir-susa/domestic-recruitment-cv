import React from "react";
import { CellInput } from "./CellInput";

type Row = {en: string;ar: string;value?: string;};

type BilingualTableProps = {
  rows: Row[];
  columns: [string, string, string];
  rowHeight: string;
  valueSize?: "lg" | "sm";
};

export function BilingualTable({ rows, columns, rowHeight, valueSize = "lg" }: BilingualTableProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <colgroup>
        {columns.map((w, i) =>
        <col key={i} style={{ width: w }} />
        )}
      </colgroup>
      <tbody>
        {rows.map((row) =>
        <tr key={row.en} className={rowHeight}>
            <th scope="row" className="cell bg-label align-top px-2 py-0.5 text-left font-serif text-[15px] font-bold leading-[1.15] text-navy">
              {row.en}
            </th>
            <td className="cell p-0">
              <CellInput label={row.en} defaultValue={row.value} size={valueSize} />
            </td>
            <td dir="rtl" className="cell bg-label align-top px-2 py-0.5 font-arabic text-[14px] font-bold text-navy">
              {row.ar}
            </td>
          </tr>
        )}
      </tbody>
    </table>);

}