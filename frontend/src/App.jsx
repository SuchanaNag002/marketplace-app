import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContext } from "./context/userContext";

const App = () => {
  const { isAuthenticated, logout } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {/* Redirect to Home if logged in */}
        <Route
          path="/"
          element={isAuthenticated ? <Home onLogout={logout} /> : <Navigate to="/login" />}
        />

        {/* Redirect to Home if already logged in */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
