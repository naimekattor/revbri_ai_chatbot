"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import BackButton from "@/lib/BackButton";

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState("");

  interface ForgotPasswordData {
    email: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as ForgotPasswordData;

    if (!data.email) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Sending recovery link to:", data.email);

    // Redirect to the OTP verification page, passing the email and flow context in the URL params
    router.push(
      `/auth/verifyOtp?email=${encodeURIComponent(data.email)}&from=forgot`,
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white px-4 py-8 select-none relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-wide mb-3">
            Forgot Password
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-72.5 sm:max-w-xs mx-auto leading-relaxed">
            Enter your email address below and we will send you an activation
            code to reset your password.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <Mail size={18} />
              </span>
              <input
                name="email"
                type="email"
                placeholder="user@mail.com"
                className={`w-full pl-11 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm placeholder-gray-300 transition-all
                  ${error ? "border-red-500" : "border-gray-200"}`}
                required
              />
            </div>
          </div>

          {/* Error Message Layout */}
          {error && (
            <p className="text-red-500 text-xs font-medium text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-[#FF6F6F] hover:bg-[#ff5959] text-white font-medium py-3.5 rounded-xl transition-all duration-200 shadow-sm shadow-red-100 active:scale-[0.99] text-sm tracking-wide"
          >
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
}
