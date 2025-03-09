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
        <Route path="/store" element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/editMyProducts" element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/placedOrders" element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/requestedOrders" element={isAuthenticated ? <Dashboard onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/store" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/store" /> : <Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
