import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContext } from "./context/userContext";

const App = () => {
  const { isAuthenticated, logout } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {/* If logged in, show the Dashboard; otherwise redirect to login */}
        <Route path="/" element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
