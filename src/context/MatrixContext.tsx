import React, { useState, useMemo } from "react";
import { type Matrix, type Cell } from "../types";
import { buildMatrix, columnPercentiles, findNearestCells } from "../utils/math";
import { MatrixContext } from "../hooks/useMatrix";

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [x, setX] = useState(5);
  const [matrix, setMatrix] = useState<Matrix>(() => buildMatrix(3, 4));
  const [hoveredNearest, setHoveredNearest] = useState<number[]>([]);

  const setParams = (r: number, c: number, newX: number) => {
    const safeR = Math.max(0, Math.min(100, r));
    const safeC = Math.max(0, Math.min(100, c));
    setRows(safeR);
    setCols(safeC);
    setX(Math.max(0, Math.min(safeR * safeC, newX)));
    setMatrix(buildMatrix(safeR, safeC));
  };

  const incrementCell = (id: number) => {
    setMatrix((prev) =>
      prev.map((row) =>
        row.map((cell) =>
          cell.id === id ? { ...cell, amount: cell.amount + 1 } : cell
        )
      )
    );
  };

  const addRow = () => {
    setMatrix((prev) => {
      const newRow: Cell[] = [];
      let maxId = prev.flat().reduce((m, c) => Math.max(m, c.id), 0);
      for (let i = 0; i < cols; i++) {
        maxId += 1;
        newRow.push({
          id: maxId,
          amount: Math.floor(100 + Math.random() * 900),
        });
      }
      return [...prev, newRow];
    });
  };

  const removeRow = (rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, i) => i !== rowIndex));
  };

  const regenerate = () => setMatrix(buildMatrix(rows, cols));

  const rowSums = useMemo(
    () => matrix.map((row) => row.reduce((s, c) => s + c.amount, 0)),
    [matrix]
  );

  const colPercentiles60 = useMemo(
    () => columnPercentiles(matrix, 0.6),
    [matrix]
  );

  const startHoverNearest = (cellId: number) => {
    const found = matrix.flat().find((c) => c.id === cellId);
    if (!found) return;
    const nearest = findNearestCells(matrix, found.amount, x, cellId).map(
      (c) => c.id
    );
    setHoveredNearest(nearest);
  };

  const stopHoverNearest = () => setHoveredNearest([]);

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        rows,
        cols,
        x,
        setParams,
        incrementCell,
        addRow,
        removeRow,
        regenerate,
        rowSums,
        colPercentiles60,
        hoveredNearest,
        startHoverNearest,
        stopHoverNearest,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
