import React, { useState } from "react";
import {
  X,
  Award,
  BookOpen,
  Heart,
  Sparkles,
  Camera,
  Check,
  Edit2,
  GraduationCap,
  LogOut
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProfileModal() {
  const {
    currentUser,
    updateProfile,
    isProfileModalOpen,
    setIsProfileModalOpen,
    logoutUser,
    setIsLoginModalOpen
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    major: currentUser.major,
    year: currentUser.year,
    bio: currentUser.bio,
    status: currentUser.status,
    avatar: currentUser.avatar,
    banner: currentUser.banner,
    courses: currentUser.courses.join(", "),
    interests: currentUser.interests.join(", ")
  });

  if (!isProfileModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      major: formData.major,
      year: formData.year,
      bio: formData.bio,
      status: formData.status,
      avatar: formData.avatar,
      banner: formData.banner,
      courses: formData.courses.split(",").map((c) => c.trim()).filter(Boolean),
      interests: formData.interests.split(",").map((i) => i.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const badges = [
    { name: "Top Study Pod Leader", icon: "🥇", desc: "Hosted 5+ collaborative pods" },
    { name: "Verified Student", icon: "🎓", desc: "Authenticated Northwood email" },
    { name: "Algorithm Solver", icon: "⚡", desc: "Helped 40+ peers in CS 310" },
    { name: "Night Owl", icon: "🦉", desc: "Active in library after 1 AM" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Banner */}
        <div className="relative h-32 w-full bg-gradient-to-r from-indigo-600 to-purple-600">
          <img
            src={formData.banner}
            alt="Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 pt-0 relative flex-1 overflow-y-auto space-y-5">
          {/* Avatar & Header */}
          <div className="flex items-end justify-between -mt-12 mb-2">
            <div className="relative">
              <img
                src={formData.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                title="Switch Account"
              >
                <span>Switch</span>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </h2>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                    {currentUser.handle}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentUser.major} • {currentUser.year}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  <span>Status: {currentUser.status}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {currentUser.bio}
              </p>

              {/* Enrolled Courses */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Enrolled Courses
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.courses.map((course, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Campus Interests
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      #{interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Campus Badges */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Student Badges & Achievements
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {badges.map((b, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5"
                    >
                      <span className="text-xl">{b.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                          {b.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Editing Form */
            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Major / Department
                  </label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Year / Standing
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Campus Status
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bio
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Courses (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.courses}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                  placeholder="CS 310, MATH 240, PHIL 105"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Interests (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  placeholder="Hackathons, Badminton, Photography"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
