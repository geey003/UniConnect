import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Tag,
  Share2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function EventsView() {
  const { events, toggleRsvp, createEvent, searchQuery, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showRsvpOnly, setShowRsvpOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    date: "Friday, Nov 8",
    time: "6:00 PM - 9:00 PM",
    location: "",
    category: "Social",
    badge: "Free Food & Drinks 🍕",
    description: "",
    tags: ""
  });

  const categories = ["All", "Hackathon", "Social", "Study", "Sports", "Career"];

  const filteredEvents = events.filter((ev) => {
    const matchesCategory = selectedCategory === "All" || ev.category === selectedCategory;
    const matchesRsvp = !showRsvpOnly || ev.isRsvp;
    const matchesSearch =
      !searchQuery.trim() ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRsvp && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    createEvent({
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
    });

    setIsModalOpen(false);
    setFormData({
      title: "",
      organizer: "",
      date: "Friday, Nov 8",
      time: "6:00 PM - 9:00 PM",
      location: "",
      category: "Social",
      badge: "Free Food & Drinks 🍕",
      description: "",
      tags: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-rose-950/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Campus Calendar & Social Gatherings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Don't Miss What's Happening on Campus
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Hackathons, acoustic quad jams, free pizza study sessions, and intramural sports. RSVP to save a spot.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-rose-800 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 shadow-md shrink-0 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Host a Campus Event</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & RSVP Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
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

        <button
          onClick={() => setShowRsvpOnly(!showRsvpOnly)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 self-end sm:self-auto flex items-center gap-1.5 ${
            showRsvpOnly
              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 ring-1 ring-indigo-500"
              : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>My Going Events</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Event Banner */}
              <div className="relative h-44 w-full">
                <img
                  src={ev.banner}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-md">
                  {ev.category}
                </span>
                {ev.badge && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {ev.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-white font-extrabold text-lg block leading-snug drop-shadow-md">
                    {ev.title}
                  </span>
                  <span className="text-white/80 text-xs">By {ev.organizer}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {ev.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ev.tags.map((tag, i) => (
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

            {/* Event Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Users className="w-4 h-4 text-indigo-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {ev.attendeesCount}
                </span>{" "}
                students going
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      showToast("Event link copied to clipboard! 📋", "info");
                    }
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Share Event"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleRsvp(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    ev.isRsvp
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 active:scale-95"
                  }`}
                >
                  {ev.isRsvp ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RSVP'd ✓</span>
                    </>
                  ) : (
                    <span>RSVP Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Host Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Host a Campus Event
                </h3>
                <p className="text-xs text-slate-400">
                  Publish a workshop, party, tournament, or casual hangout to campus
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
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Smash Bros Tournament & Pizza Night"
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
                    <option>Social</option>
                    <option>Hackathon</option>
                    <option>Study</option>
                    <option>Sports</option>
                    <option>Career</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Highlight / Perk
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Free Pizza 🍕 or Swag"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Friday, Nov 14"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 6:30 PM - 9:30 PM"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location on Campus
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Student Center Room 302 & Patio"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description & What to Bring
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell students what this event is about..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white resize-none"
                  required
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
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
