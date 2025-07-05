import React, { useEffect, useState } from "react";
import Home from "../components/DisChart.jsx";
import History from "../components/History";
import LoginPage from "../components/LoginForm.jsx";
import Dashboard from "../components/Dashboard.jsx";
import UserUploads from "../components/UserUploads.jsx";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        {/* Add protected routes if needed */}
        {/* <Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} /> */}
        <Route path="/uploads" element={<UserUploads />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  useEffect(() => {
    const interval = setInterval(() => {
      const storedEmail = localStorage.getItem("userEmail");
      setUserEmail(storedEmail);
    }, 500); // recheck every 500ms

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api-auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUserEmail(null);
    navigate("/login");
  };

  const activeStyle = "text-white bg-blue-600 px-4 py-2 rounded-full";
  const defaultStyle = "text-blue-600 hover:text-white hover:bg-blue-500 px-4 py-2 rounded-full";

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-700 tracking-wide">
        ExcelCharts
      </div>

      <div className="space-x-4 flex items-center">
        <Link to="/" className={location.pathname === "/" ? activeStyle : defaultStyle}>
          Home
        </Link>

        {userEmail ? (
          <>
            <Link
              to="/uploads"
              className={location.pathname === "/uploads" ? activeStyle : defaultStyle}
            >
              Chart History
            </Link>
            <span className="text-sm text-gray-600">Hi, {userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}


export default App;
