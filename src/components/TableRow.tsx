import { useMatrix } from "../hooks/useMatrix";
import { type Cell } from "../types";
import CellComp from "./Cell";

type Props = {
  row: Cell[];
  rowIndex: number;
  sum: number;
  showPercent: boolean;
  onHoverSum: (hover: boolean) => void;
};

export default function TableRow({
  row,
  rowIndex,
  sum,
  showPercent,
  onHoverSum,
}: Props) {
  const { removeRow } = useMatrix();

  return (
    <tr>
      <td className="row-index">{rowIndex + 1}</td>
      {row.map((cell) => (
        <CellComp
          key={cell.id}
          cell={cell}
          row={row}
          showPercent={showPercent}
        />
      ))}
      <td
        className="sum-cell"
        onMouseEnter={() => onHoverSum(true)}
        onMouseLeave={() => onHoverSum(false)}
      >
        {sum}
      </td>
      <td>
        <button onClick={() => removeRow(rowIndex)}>Remove</button>
      </td>
    </tr>
  );
}
