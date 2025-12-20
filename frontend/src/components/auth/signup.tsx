import { useState } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "../hooks/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetAtom(authAtom);
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/users/register`,
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      setAuth({ token: res.data.token, username: name });
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Error signing up");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2] px-4">
      <div
        className="
      w-full max-w-sm 
      bg-[#F2EFEB] 
      border border-[#E4E1DD] 
      rounded-2xl 
      p-8 
      shadow-[0_12px_32px_rgba(34,34,34,0.06)]
      text-[#222222]
    "
      >
        {/* Title */}
        <h1 className="font-serif text-3xl mb-6 tracking-tight">
          Create Account
        </h1>

        {/* Name */}
        <div className="mb-5">
          <label className="text-sm text-[#6C6A69] block mb-2 tracking-wider uppercase">
            Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E4E1DD] text-[#222222] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D7C9B8]"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm text-[#6C6A69] block mb-2 tracking-wider uppercase">
            Email
          </label>
          <input
            className="
          w-full px-4 py-3 
          rounded-xl 
          bg-white 
          border border-[#E4E1DD] 
          text-[#222222]
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#D7C9B8]
        "
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-[#6C6A69] block mb-2 tracking-wider uppercase">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-white border border-[#E4E1DD] text-[#222222] shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#D7C9B8]
        "
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full py-3 rounded-xl bg-[#D7C9B8] text-white font-medium shadow-[0_8px_20px_rgba(34,34,34,0.06)] hover:bg-[#cdbdab] transition"
        >
          Sign Up
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[#6C6A69]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#AAB7C4] font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
