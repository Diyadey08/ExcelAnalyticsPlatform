import { useState } from "react";
import Chart2D from "../components/Chart2D";
import Chart3D from "../components/Chart3D";

export default function Home() {
  const [sheets, setSheets] = useState({});
  const [selectedSheet, setSelectedSheet] = useState("");
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("excel", file);

    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    setSheets(json.sheets);
  };

  const currentData = sheets[selectedSheet] || [];
  const keys = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  return (
    <div className="p-4">
      <input type="file" onChange={handleUpload} accept=".xls,.xlsx" />
      {Object.keys(sheets).length > 0 && (
        <>
          <select onChange={(e) => setSelectedSheet(e.target.value)}>
            <option>Select Sheet</option>
            {Object.keys(sheets).map((sheet) => (
              <option key={sheet} value={sheet}>{sheet}</option>
            ))}
          </select>

          <select onChange={(e) => setXKey(e.target.value)}>
            <option>Select X</option>
            {keys.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>

          <select onChange={(e) => setYKey(e.target.value)}>
            <option>Select Y</option>
            {keys.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>

          {xKey && yKey && (
            <>
              <h2 className="mt-4">📊 2D Chart</h2>
              <Chart2D data={currentData} xKey={xKey} yKey={yKey} />

              <h2 className="mt-4">🌀 3D Chart</h2>
              <Chart3D data={currentData} xKey={xKey} yKey={yKey} />
            </>
          )}
        </>
      )}
    </div>
  );
}
