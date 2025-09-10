import React, { useState } from "react";
import { useMatrix } from "../hooks/useMatrix";

export default function Controls() {
  const { rows, cols, x, setParams, regenerate, addRow } = useMatrix();
  const [inputs, setInputs] = useState({ m: rows, n: cols, x });

  const handleApply = () => {
    setParams(inputs.m, inputs.n, inputs.x);
  };

  return (
    <div className="controls">
      <label>
        M (rows)
        <input
          type="number"
          value={inputs.m}
          min={0}
          max={100}
          onChange={(e) =>
            setInputs((s) => ({ ...s, m: Number(e.target.value) }))
          }
        />
      </label>
      <label>
        N (cols)
        <input
          type="number"
          value={inputs.n}
          min={0}
          max={100}
          onChange={(e) =>
            setInputs((s) => ({ ...s, n: Number(e.target.value) }))
          }
        />
      </label>
      <label>
        X (nearest cells)
        <input
          type="number"
          value={inputs.x}
          min={0}
          onChange={(e) =>
            setInputs((s) => ({ ...s, x: Number(e.target.value) }))
          }
        />
      </label>
      <button onClick={handleApply}>Generate</button>
      <button onClick={regenerate}>Regenerate</button>
      <button onClick={addRow}>Add row</button>
    </div>
  );
}
