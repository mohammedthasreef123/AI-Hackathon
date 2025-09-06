import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginSignup() {
  const navigate = useNavigate();
  const { requestLoginOtp, loading, error } = useAuthStore();
  const [mobile, setMobile] = useState("");

  const handleGetOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const res = await requestLoginOtp(mobile);
    if (res?.otpSent) {
      localStorage.setItem("otp_expiry", Date.now() + 120000);
      toast.success("OTP sent successfully!");
      navigate("/otp");
    } else {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/login.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 bg-blue-500 opacity-50" />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl px-8 py-16 w-[90%] max-w-md"
      >
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center drop-shadow-md">
          Login / Sign Up
        </h2>
        <p className="text-gray-800 text-sm md:text-base text-center mt-2">
          Enter your mobile number to receive OTP
        </p>

        <div className="mt-6 flex items-center border border-white/90 bg-white/20 rounded-lg overflow-hidden shadow-inner">
          <select className="px-3 py-2 bg-transparent text-gray-900 outline-none border-r border-white/30">
            <option value="+91">+91</option>
          </select>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Mobile Number"
            maxLength="10"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/[^0-9]/g, ""))
            }
            className="flex-1 px-3 py-2 bg-transparent text-gray-900 placeholder-gray-600 outline-none"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="text-xs text-gray-800 text-center mt-4">
          By continuing, I agree to{" "}
          <Link to={"/terms"} className="font-semibold underline">
            Terms of Use
          </Link>{" "}
          &{" "}
          <Link to={"/privacy"} className="font-semibold underline">
            Privacy Policy
          </Link>
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleGetOTP}
          disabled={loading}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Sending..." : "Get OTP"}
        </motion.button>
      </motion.div>
    </div>
  );
}
