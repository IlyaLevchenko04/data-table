import React from "react";
import { type Cell } from "../types";
import { useMatrix } from "../hooks/useMatrix";

type Props = {
  cell: Cell;
  row: Cell[];
  showPercent: boolean;
};

export default function CellComp({ cell, row, showPercent }: Props) {
  const {
    incrementCell,
    hoveredNearest,
    startHoverNearest,
    stopHoverNearest,
  } = useMatrix();

  const isNearest = hoveredNearest.includes(cell.id);

  const total = row.reduce((s, c) => s + c.amount, 0);
  const pct = total === 0 ? 0 : Math.round((cell.amount / total) * 100);
  const display = showPercent ? `${pct}%` : String(cell.amount);

  const maxInRow = Math.max(...row.map((c) => c.amount));
  const widthPct =
    maxInRow === 0 ? 0 : Math.round((cell.amount / maxInRow) * 100);

  return (
    <td
      className={`cell ${isNearest ? "nearest" : ""}`}
      onClick={() => incrementCell(cell.id)}
      onMouseEnter={() => startHoverNearest(cell.id)}
      onMouseLeave={stopHoverNearest}
    >
      <div
        className="cell-amount"
        style={showPercent ? { position: "relative" } : {}}
      >
        {display}
        {showPercent && (
          <div className="heat-bar" style={{ width: `${widthPct}%` }} />
        )}
      </div>
    </td>
  );
}
