import React from 'react';
import Home from '../components/DisChart.jsx';
import History from '../components/History';
import LoginPage from '../components/LoginForm.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();
  const activeStyle = "text-white bg-blue-600 px-4 py-2 rounded-full";
  const defaultStyle = "text-blue-600 hover:text-white hover:bg-blue-500 px-4 py-2 rounded-full";

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-700 tracking-wide">
        ExcelCharts
      </div>

      <div className="space-x-4">
        <Link
          to="/"
          className={location.pathname === "/" ? activeStyle : defaultStyle}
        >
          Home
        </Link>
        <Link
          to="/login"
          className={location.pathname === "/login" ? activeStyle : defaultStyle}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? activeStyle : defaultStyle}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default App;
