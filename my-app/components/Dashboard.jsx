// client/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data))
      .catch(() => setData("Access denied or not logged in"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{data}</p>
    </div>
  );
};

export default Dashboard;
