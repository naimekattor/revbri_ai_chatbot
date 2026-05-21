"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/lib/BackButton";

function OTPForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fromFlow = searchParams.get("from") || "";

  // Auto focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pasted) return;

    const newOtp = pasted.split("");
    while (newOtp.length < 4) newOtp.push("");

    setOtp(newOtp);
    setError("");
    inputsRef.current[Math.min(pasted.length - 1, 3)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((d) => !d)) {
      setError("Please enter the complete verification code.");
      return;
    }

    const code = otp.join("");
    console.log("Submitted OTP:", code);

    if (fromFlow === "forgot") {
      router.push("/auth/changepassword");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white px-4 py-8 select-none relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="max-w-120 w-full text-center flex flex-col items-center">
        {/* Header Section */}
        <h1 className="text-3xl font-semibold text-gray-900 tracking-wide mb-5">
          Verification
        </h1>
        <div className="space-y-1 mb-10">
          <p className="text-gray-600 font-medium text-[15px]">
            We have sent you an activation code.
          </p>
          <p className="text-gray-400 text-xs max-w-[320px] mx-auto leading-relaxed">
            A mail has been sent to your email address containing a code to
            verify your email.
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <h2 className="text-gray-600 font-medium text-[15px] mb-6">
            Enter verification code
          </h2>

          {/* Circular OTP Inputs */}
          <div className="flex justify-center gap-4 mb-5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                placeholder="*"
                className={`w-14 h-14 sm:w-16 sm:h-16 text-xl font-bold text-center rounded-full
                  bg-white border shadow-[0_4px_12px_rgba(0,0,0,0.04)] outline-none transition-all
                  placeholder-gray-400 focus:ring-2 focus:ring-red-300
                  ${
                    digit
                      ? "border-red-400 text-gray-700"
                      : error
                        ? "border-red-500 text-red-500"
                        : "border-gray-100 text-gray-400"
                  }`}
              />
            ))}
          </div>

          {/* Error Message Layout */}
          {error && (
            <p className="text-red-500 text-xs font-medium mb-4">{error}</p>
          )}

          {/* Resend Action Link */}
          <p className="text-gray-400 text-xs sm:text-sm mb-12 font-medium">
            if you didn&apos;t receive a code!{" "}
            <button
              type="button"
              className="text-[#FF6F6F] hover:underline font-medium ml-0.5 hover:cursor-pointer"
            >
              Click Here..
            </button>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={otp.some((d) => !d)}
            className="w-full hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 max-w-85 bg-[#FF6F6F] hover:bg-[#ff5959] text-white font-medium py-3.5 rounded-lg transition-all duration-200 active:scale-[0.99] shadow-sm text-sm tracking-wide"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

// Wrapped in Suspense to protect Next.js build-time dynamic parameter check
export default function OTPVerification() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-gray-400 text-sm mt-10">
          Loading...
        </div>
      }
    >
      <OTPForm />
    </Suspense>
  );
}
