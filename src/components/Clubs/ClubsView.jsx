import React, { useState } from "react";
import {
  Compass,
  Users,
  Calendar,
  Sparkles,
  Plus,
  CheckCircle2,
  Check,
  Search,
  Bell
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ClubsView() {
  const { clubs, toggleJoinClub, createClub, searchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Coding & Startups",
    description: "",
    meetingTime: "",
    avatar: "🚀",
    banner: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    tags: ""
  });

  const categories = [
    "All",
    "Tech & Engineering",
    "Coding & Startups",
    "Arts & Media",
    "Sports & Outdoors",
    "Gaming & Esports",
    "Diversity & Leadership"
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createClub({
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
    });

    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "Coding & Startups",
      description: "",
      meetingTime: "",
      avatar: "🚀",
      banner: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      tags: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-purple-950/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
              <Compass className="w-3.5 h-3.5" />
              <span>Campus Student Organizations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Find Your Crew, Passions & Projects
            </h2>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Join active campus clubs, attend weekly hack nights, weekend photo walks, and esports tournaments.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-purple-800 hover:bg-purple-50 text-xs font-bold flex items-center gap-2 shadow-md shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Register a New Club</span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Club Banner & Emoji Badge */}
            <div>
              <div className="relative h-32 w-full">
                <img
                  src={club.banner}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-2xl p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md ring-2 ring-white/20">
                  {club.avatar}
                </span>
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white">
                  {club.membersCount} members
                </span>
              </div>

              {/* Club Info */}
              <div className="p-5 pt-3 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {club.name}
                  </h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {club.category}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {club.description}
                </p>

                {/* Meeting time */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{club.meetingTime}</span>
                </div>

                {/* Announcement ticker */}
                {club.recentAnnouncement && (
                  <div className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
                    <Bell className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{club.recentAnnouncement}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {club.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => toggleJoinClub(club.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  club.isJoined
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 active:scale-95"
                }`}
              >
                {club.isJoined ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Member of Club ✓</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Join Club</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Register Club Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Register a Campus Organization
                </h3>
                <p className="text-xs text-slate-400">
                  Launch a new student club, project collective, or interest guild
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Club Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cougar Game Development Studio"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option>Tech & Engineering</option>
                    <option>Coding & Startups</option>
                    <option>Arts & Media</option>
                    <option>Sports & Outdoors</option>
                    <option>Gaming & Esports</option>
                    <option>Diversity & Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Icon / Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="e.g. 🎮"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description & Mission
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What will members do? Who should join?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Frequency & Location
                </label>
                <input
                  type="text"
                  value={formData.meetingTime}
                  onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                  placeholder="e.g. Every Wednesday @ 7 PM in Student Union Room 204"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Unity, Unreal, C#, Indie Game, Game Jam"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Register Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
