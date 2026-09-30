import React from "react";
import { CellInput } from "./CellInput";

type DateSerialRowProps = {columns: [string, string, string, string];height: string;};

export function DateSerialRow({ columns, height }: DateSerialRowProps) {
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
          <td className="cell p-0"><CellInput label="Date" size="sm" align="left" /></td>
          <th scope="row" className={label}>Serial No:</th>
          <td className="cell p-0"><CellInput label="Serial number" size="sm" align="left" /></td>
        </tr>
      </tbody>
    </table>);

}