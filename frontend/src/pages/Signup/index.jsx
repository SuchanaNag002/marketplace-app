import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { signup } from "../../api/AuthApi";

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      onLogin();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl mt-4 font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8 justify-center text-center">
        E-MarketPlace App
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">

          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <Input
            label="Role (Optional)"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
            <Button type="submit" text="Sign Up" className="flex justify-center mt-2" />
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
