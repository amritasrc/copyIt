import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const nameError = !name.trim() ? "Name is required" : "";

  const emailError = !email.trim()
    ? "Email is required"
    : !EMAIL_REGEX.test(email)
      ? "Invalid email address"
      : "";

  const passwordError = !password
    ? "Password is required"
    : password.length < 6
      ? "Password must be at least 6 characters"
      : "";

  const confirmPasswordError = !confirmPassword
    ? "Please confirm your password"
    : confirmPassword !== password
      ? "Passwords do not match"
      : "";

  const isFormValid =
    !nameError && !emailError && !passwordError && !confirmPasswordError;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (!isFormValid) return;
    alert("Account created!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <p className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
          Create an account
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full mt-8"
          noValidate
        >
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`outline-none border px-3 py-2 rounded-lg transition-colors ${
                touched.name && nameError
                  ? "border-red-500 focus:border-red-500"
                  : "border-zinc-300 focus:border-zinc-800"
              }`}
            />
            {touched.name && nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`outline-none border px-3 py-2 rounded-lg transition-colors ${
                touched.email && emailError
                  ? "border-red-500 focus:border-red-500"
                  : "border-zinc-300 focus:border-zinc-800"
              }`}
            />
            {touched.email && emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`outline-none border px-3 py-2 rounded-lg transition-colors ${
                touched.password && passwordError
                  ? "border-red-500 focus:border-red-500"
                  : "border-zinc-300 focus:border-zinc-800"
              }`}
            />
            {touched.password && passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              className={`outline-none border px-3 py-2 rounded-lg transition-colors ${
                touched.confirmPassword && confirmPasswordError
                  ? "border-red-500 focus:border-red-500"
                  : "border-zinc-300 focus:border-zinc-800"
              }`}
            />
            {touched.confirmPassword && confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-zinc-800 text-white px-3 py-2 rounded-lg w-full hover:bg-zinc-950 transition-colors cursor-pointer"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-zinc-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        <div className="mt-4">
          <button className="bg-zinc-700 text-white flex items-center justify-center gap-2 px-3 py-3 w-full rounded-lg hover:bg-zinc-600 transition-colors cursor-pointer">
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="mt-8 text-center text-zinc-600">
          <p>
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-purple-500 font-semibold cursor-pointer"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
