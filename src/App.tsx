import Controls from "./components/Controls";
import Table from "./components/Table";

export default function App() {
  return (
    <div className="app">
      <h1>Matrix Table</h1>
      <Controls />
      <Table />
    </div>
  );
}