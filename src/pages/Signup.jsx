import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from '../lib/auth';
import { login } from '../store/authSlice'
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await authService.createAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data?.session) {
        dispatch(login(data.session.user));
        navigate("/");
      } else {
        navigate("/login", {
          state: {
            message:
              "Account created! Check your inbox to confirm your email, then log in.",
          },
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign up to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-zinc-800 text-white py-3 rounded-lg hover:bg-zinc-950 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;