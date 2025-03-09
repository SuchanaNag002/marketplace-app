import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { UserContext } from "../../context/userContext";
import AlertComponent from "../../components/ui/Alert";

const Login = () => {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(formData);
      setAlert({
        severity: "success",
        message: "You have successfully logged in",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl mt-4 font-extrabold bg-gradient-to-r from-orange-700 to-yellow-500 bg-clip-text text-transparent mb-8 text-center">
        E-MarketPlace App
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {alert && (
          <AlertComponent
            severity={alert.severity}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 items-center"
        >
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text={isLoggingIn ? "Logging in..." : "Login"}
            className="flex justify-center mt-2"
            disabled={isLoggingIn}
            sx={{
              backgroundColor: isLoggingIn ? "#B0B0B0" : "#FF8C00",
              "&:hover": {
                backgroundColor: isLoggingIn ? "#B0B0B0" : "#CC5500",
              },
              "&.Mui-disabled": { backgroundColor: "#B0B0B0" },
            }}
          />
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <span
            className="text-orange-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
