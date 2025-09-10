import { type Cell } from "../types";

export function randomThreeDigit() {
  return Math.floor(100 + Math.random() * 900);
}

export function buildMatrix(rows: number, cols: number): Cell[][] {
  const matrix: Cell[][] = [];
  let globalId = 1;
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({ id: globalId++, amount: randomThreeDigit() });
    }
    matrix.push(row);
  }
  return matrix;
}

export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = p * (sorted.length - 1);
  const low = Math.floor(rank);
  const high = Math.ceil(rank);
  if (low === high) return sorted[low];
  const weight = rank - low;
  return sorted[low] * (1 - weight) + sorted[high] * weight;
}

export function findNearestCells(matrix: Cell[][], targetAmount: number, x: number, excludeId?: number): Cell[] {
  const flat: Cell[] = matrix.flat().filter((c) => c.id !== excludeId);
  flat.sort((a, b) => Math.abs(a.amount - targetAmount) - Math.abs(b.amount - targetAmount));
  return flat.slice(0, Math.max(0, Math.min(x, flat.length)));
}

export function rowSum(row: Cell[]): number {
  return row.reduce((s, c) => s + c.amount, 0);
}

export function columnPercentiles(matrix: Cell[][], p: number): number[] {
  if (matrix.length === 0) return [];
  const cols = matrix[0].length;
  const arr: number[] = [];
  for (let c = 0; c < cols; c++) {
    const colVals = matrix.map((r) => r[c]?.amount ?? 0);
    arr.push(percentile(colVals, p));
  }
  return arr;
}
