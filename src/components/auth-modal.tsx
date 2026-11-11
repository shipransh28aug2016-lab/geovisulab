"use client";

import React, { useState } from "react";
import { X, User, GraduationCap, School, Check, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onSwitchUser: (email: string) => Promise<void>;
  onRegisterUser: (data: any) => Promise<void>;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onRegisterUser,
}: AuthModalProps) {
  const [tab, setTab] = useState<"switch" | "register">("switch");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState("student");
  const [regGrade, setRegGrade] = useState("11");
  const [regSchool, setRegSchool] = useState("Delhi Public School / Kendriya Vidyalaya");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const demoAccounts = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@cbse.student.in",
      role: "student",
      classGrade: "11",
      school: "Delhi Public School, R.K. Puram",
      description: "Class 11 Student studying Physical Geography & Indian Environment",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Priya Nair",
      email: "priya.nair@cbse.student.in",
      role: "student",
      classGrade: "12",
      school: "Kendriya Vidyalaya, IIT Powai",
      description: "Class 12 Student targeting Board Exam Map items (Mines, Ports, Oil)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Dr. Sunita Rao",
      email: "sunita.rao@kv.gov.in",
      role: "teacher",
      classGrade: "11",
      school: "Kendriya Vidyalaya Sangathan",
      description: "Geography Teacher creating tests, curriculum notes, and spatial quizzes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
  ];

  const handleSelectDemo = async (email: string) => {
    setLoading(true);
    try {
      await onSwitchUser(email);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim()) return;

    setLoading(true);
    try {
      await onRegisterUser({
        name: regName.trim() || "CBSE Scholar",
        email: regEmail.trim(),
        role: regRole,
        classGrade: regGrade,
        schoolName: regSchool.trim(),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-sm text-white">Student & Teacher Accounts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs">
          <button
            onClick={() => setTab("switch")}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition ${
              tab === "switch"
                ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Switch Profile
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2.5 font-semibold text-center border-b-2 transition ${
              tab === "register"
                ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Create New Account
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto">
          {tab === "switch" ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Choose a pre-configured CBSE demo account or your saved profile:
              </p>

              <div className="space-y-2.5">
                {demoAccounts.map((account) => {
                  const isCurrent = currentUser?.email === account.email;
                  return (
                    <div
                      key={account.email}
                      onClick={() => handleSelectDemo(account.email)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                        isCurrent
                          ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{account.name}</h4>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-slate-800 text-emerald-400">
                              {account.role === "teacher" ? "Teacher" : `Class ${account.classGrade}`}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{account.school}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{account.description}</p>
                        </div>
                      </div>

                      {isCurrent ? (
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Verma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rohan@cbse.student.in"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Role</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">CBSE Class</label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  >
                    <option value="11">Class 11 (Physical)</option>
                    <option value="12">Class 12 (Human/Eco)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">School / Institution</label>
                <input
                  type="text"
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md mt-2"
              >
                {loading ? "Creating Profile..." : "Create Profile & Start Learning"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
