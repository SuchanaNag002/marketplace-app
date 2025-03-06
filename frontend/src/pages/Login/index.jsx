import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
    onLogin();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header with gradient text */}
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8">
        E-MarketPlace App
      </h1>

      {/* Form container with shadow on all sides */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-8">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button immediately follows (no spacing) */}
          <Button type="submit" className="w-full sm:w-auto mt-0">
            Login
          </Button>
        </form>

        {/* Spacing only between the button and the next text */}
        <p className="mt-6 text-center text-black">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
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
