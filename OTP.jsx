import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digits
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const { mobile, verifyLoginOtp, requestLoginOtp, loading, error } = useAuthStore();

  useEffect(() => {
    const expiry = localStorage.getItem("otp_expiry");
    if (expiry) {
      const remaining = Math.max(
        Math.floor((expiry - Date.now()) / 1000),
        0
      );
      setTimer(remaining);
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
       toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    const res = await verifyLoginOtp(enteredOtp);
   if (res?.verified) {
      toast.success("OTP verified successfully!");
      navigate("/home");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!mobile) {
      toast.error("No mobile number found.");
      return;
    }
    const res = await requestLoginOtp(mobile);
      if (res?.otpSent) {
      localStorage.setItem("otp_expiry", Date.now() + 120000);
      setTimer(120);
      setOtp(["", "", "", ""]);
      toast.success("OTP resent successfully!");
    } else {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full ">
            <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/login.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 bg-blue-500 opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-8 w-[90%] max-w-md"
      >
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center">
          Enter OTP
        </h2>
        <p className="text-gray-700 text-sm md:text-base text-center mt-2">
          4 digit OTP sent to {mobile ? `+91-${mobile}` : "your number"}
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-lg font-semibold rounded-lg border border-white/40 bg-white/20 backdrop-blur-sm shadow-md outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        {/* Timer + Resend OTP */}
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-gray-700 font-medium">
              Resend available in{" "}
              {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-gray-600 font-semibold hover:underline transition"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </motion.button>
      </motion.div>
    </div>
  );
}
