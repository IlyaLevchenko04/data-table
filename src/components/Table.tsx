import { useState } from "react";
import TableRow from "./TableRow";
import { useMatrix } from "../hooks/useMatrix";

export default function Table() {
  const { matrix, cols, rowSums, colPercentiles60 } = useMatrix();
  const [hoverRowPercent, setHoverRowPercent] = useState<number | null>(null);

  return (
    <div className="table-wrap">
      <table className="matrix-table">
        <thead>
          <tr>
            <th>#</th>
            {Array.from({ length: cols }).map((_, c) => (
              <th key={c}>Col {c + 1}</th>
            ))}
            <th>Sum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rIdx) => (
            <TableRow
              key={rIdx}
              row={row}
              rowIndex={rIdx}
              sum={rowSums[rIdx]}
              showPercent={hoverRowPercent === rIdx}
              onHoverSum={(hover) =>
                setHoverRowPercent(hover ? rIdx : null)
              }
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>60th pct</td>
            {colPercentiles60.map((v, i) => (
              <td key={i}>{Number(v.toFixed(1))}</td>
            ))}
            <td />
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
