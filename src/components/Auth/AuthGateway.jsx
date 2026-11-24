import React, { useState } from "react";
import {
  Sparkles,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Building,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Users,
  Ghost,
  BookOpen
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const COUNTRY_CODES = [
  { code: "+1", country: "US / Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" }
];

export default function AuthGateway() {
  const { loginUser, showToast } = useApp();

  // Mode: "signin" | "register"
  const [mode, setMode] = useState("signin");

  // Method: "email" | "phone"
  const [method, setMethod] = useState("email");

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // New Student registration fields
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

  const handleSendOtp = () => {
    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      showToast("Please enter a valid phone number", "warning");
      return;
    }
    setIsOtpSent(true);
    setVerificationCode("123456");
    setOtpTimer(60);
    showToast(`Verification code sent to ${countryCode} ${phoneNumber}! (Code: 123456)`, "success");

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "email") {
      if (!email.trim() || !email.includes("@")) {
        showToast("Please enter a valid email address", "warning");
        return;
      }
      if (!password.trim()) {
        showToast("Please enter your password", "warning");
        return;
      }

      const derivedName = fullName.trim() || email.split("@")[0];
      loginUser({
        method: "email",
        email: email.trim(),
        name: derivedName,
        university: university.trim() || "University Campus",
        major: major.trim() || "General Studies"
      });
    } else {
      // Phone method
      if (!phoneNumber.trim()) {
        showToast("Please enter your mobile phone number", "warning");
        return;
      }
      if (!verificationCode.trim()) {
        showToast("Please enter the 6-digit verification code", "warning");
        return;
      }

      const derivedName = fullName.trim() || `Student_${phoneNumber.slice(-4)}`;
      loginUser({
        method: "phone",
        phone: `${countryCode} ${phoneNumber.trim()}`,
        name: derivedName,
        university: university.trim() || "University Campus",
        major: major.trim() || "General Studies"
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
              UniConnect
            </span>
            <div className="text-[11px] text-slate-400 font-medium">Verified Student Portal</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Private Access
          </span>
        </div>
      </header>

      {/* Hero & Login Section */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Side: Pitch & Information */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Members-Only Student Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Connect With Classmates. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Study, Socialize & Share.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            UniConnect is an exclusive, student-only platform. Sign in with your student email or phone number to unlock the live campus feed, study pod matchmaker, clubs, and anonymous confessions.
          </p>

          {/* 3 Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <Users className="w-5 h-5 text-indigo-400" />
              <div className="font-bold text-xs text-white">Campus Feed</div>
              <div className="text-[11px] text-slate-400">Share updates & connect with peers.</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <div className="font-bold text-xs text-white">Study Pods</div>
              <div className="text-[11px] text-slate-400">Find classmates for exams & courses.</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <Ghost className="w-5 h-5 text-pink-400" />
              <div className="font-bold text-xs text-white">Confessions Vault</div>
              <div className="text-[11px] text-slate-400">100% anonymous & untracked whispers.</div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-indigo-950/40 space-y-5">
            {/* Mode Switcher */}
            <div className="flex bg-slate-800/80 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  mode === "signin"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  mode === "register"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Method Tabs: Email vs Phone */}
            <div className="flex border-b border-slate-800 pb-2 gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMethod("email");
                  setIsOtpSent(false);
                }}
                className={`flex items-center gap-1.5 pb-2 border-b-2 transition -mb-2 ${
                  method === "email"
                    ? "border-indigo-500 text-indigo-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Student Email</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex items-center gap-1.5 pb-2 border-b-2 transition -mb-2 ${
                  method === "phone"
                    ? "border-indigo-500 text-indigo-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Mobile Phone</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Registration Extra Fields */}
              {mode === "register" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jordan Blake"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        University / College
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="e.g. State University"
                          className="w-full pl-8 pr-2.5 py-2 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Major / Program
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          placeholder="e.g. Computer Science"
                          className="w-full pl-8 pr-2.5 py-2 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* EMAIL METHOD */}
              {method === "email" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Student or Personal Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@university.edu"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">Password</label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          onClick={() => showToast("Password reset link sent to your email!", "info")}
                          className="text-[11px] text-indigo-400 hover:underline"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-slate-400 hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* PHONE METHOD */}
              {method === "phone" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-28 px-2 py-2 text-xs bg-slate-800/80 rounded-xl border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>

                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="(555) 019-2834"
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Send OTP Trigger */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpTimer > 0}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 disabled:opacity-50 flex items-center gap-1"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>
                        {otpTimer > 0 ? `Resend SMS in ${otpTimer}s` : "Send SMS Verification Code"}
                      </span>
                    </button>

                    {isOtpSent && (
                      <span className="text-[10px] bg-emerald-950/70 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-800">
                        Code: 123456
                      </span>
                    )}
                  </div>

                  {/* 6-Digit OTP */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      6-Digit SMS Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      className="w-full px-3.5 py-2.5 text-xs text-center font-mono tracking-widest bg-slate-800/80 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white font-bold"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition flex items-center justify-center gap-2 mt-2"
              >
                <span>{mode === "signin" ? "Enter UniConnect" : "Join Your Campus"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Privacy notice */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Only authenticated students can view this platform</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500">
        UniConnect &copy; 2026 &bull; Secure Student Community
      </footer>
    </div>
  );
}
