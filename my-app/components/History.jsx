import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
export default function History( ) {
  const [charts, setCharts] = useState([]);
 const userId = localStorage.getItem("userId");
  useEffect(() => {
    axios.get(`/api/user-history?userId=${userId}`).then((res) => {
      setCharts(res.data);
    });
  }, [userId]);

  return (
    <div>
      <h2>Your Charts</h2>
      <ul>
        {charts && charts.map((chart) => (
          <li key={chart._id}>
            {chart.chartType}: {chart.xKey} vs {chart.yKey} (from {chart.uploadId.fileName})
          </li>
        ))}
      </ul>
    </div>
  );
}
