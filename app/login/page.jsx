"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const router = useRouter();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    if (res.ok) setStep("otp");
    else alert("Failed to send OTP");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      phone,
      otp,
      redirect: false,
    });
    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/dashboard"); // หรือหน้าที่ต้องการหลังจาก login สำเร็จ
    }
  };

  // รีเทิร์น UI ตามที่ต้องการ

  return (
    <div>
      {step === "phone" ? (
        <form onSubmit={handleSendOTP}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}
