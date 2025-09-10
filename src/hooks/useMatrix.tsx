import { createContext, useContext } from "react";
import type { Matrix } from "../types";

type MatrixContextType = {
  matrix: Matrix;
  rows: number;
  cols: number;
  x: number;
  setParams: (rows: number, cols: number, x: number) => void;
  incrementCell: (id: number) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
  regenerate: () => void;
  rowSums: number[];
  colPercentiles60: number[];
  hoveredNearest: number[];
  startHoverNearest: (cellId: number) => void;
  stopHoverNearest: () => void;
};

export const useMatrix = () => {
  const ctx = useContext(MatrixContext);
  if (!ctx) throw new Error("useMatrix must be used inside MatrixProvider");
  return ctx;
};

export const MatrixContext = createContext<MatrixContextType | undefined>(undefined);