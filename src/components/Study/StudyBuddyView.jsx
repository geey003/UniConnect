import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  BookOpen,
  MapPin,
  Clock,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Check,
  CheckCircle2,
  Calendar,
  Coffee
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function StudyBuddyView() {
  const { studyBuddies, requestStudyBuddy, createStudyRequest, searchQuery, currentUser } = useApp();

  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Virtual Pomodoro Timer state
  const [timerMode, setTimerMode] = useState("focus"); // focus | break
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert(timerMode === "focus" ? "Great study session! Time for a short break ☕" : "Break finished! Ready to focus? 💡");
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, timerMode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMode === "focus" ? 25 * 60 : 5 * 60);
  };
  const switchMode = (mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Form state for creating study request
  const [formData, setFormData] = useState({
    course: "",
    courseCode: "",
    topic: "",
    studyStyle: "Collaborative Whiteboarding",
    preferredLocation: "",
    availability: "",
    maxMembers: "4",
    bio: ""
  });

  const coursesList = ["All"];
  const stylesList = [
    "All",
    "Collaborative Whiteboarding",
    "Flashcards & Active Recall",
    "Silent Focus (Pomodoro 50/10)",
    "Group Discussion & Real-World Case Studies"
  ];

  const filteredBuddies = studyBuddies.filter((buddy) => {
    const matchesCourse = selectedCourse === "All" || buddy.courseCode === selectedCourse;
    const matchesStyle = selectedStyle === "All" || buddy.studyStyle.includes(selectedStyle);
    const matchesSearch =
      !searchQuery.trim() ||
      buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.preferredLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesStyle && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createStudyRequest(formData);
    setIsModalOpen(false);
    setFormData({
      course: "",
      courseCode: "",
      topic: "",
      studyStyle: "Collaborative Whiteboarding",
      preferredLocation: "",
      availability: "",
      maxMembers: "4",
      bio: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Focus Lounge */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-950/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 backdrop-blur-md text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Campus Study Matchmaker & Focus Lounge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Never Study for Midterms Alone.
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
              Find classmates taking your exact courses, sync study schedules at library pods, or study synchronously in the live Pomodoro lounge.
            </p>
          </div>

          {/* Mini Pomodoro Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full md:w-auto shrink-0 space-y-3">
            <div className="flex items-center justify-between gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-indigo-200">
                <Clock className="w-3.5 h-3.5" />
                Live Focus Clock
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => switchMode("focus")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    timerMode === "focus" ? "bg-white text-indigo-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  Focus (25m)
                </button>
                <button
                  onClick={() => switchMode("break")}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    timerMode === "break" ? "bg-white text-indigo-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  Break (5m)
                </button>
              </div>
            </div>

            <div className="text-3xl font-black font-mono tracking-wider text-center py-1">
              {formattedTime}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={toggleTimer}
                className="px-4 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? "Pause" : "Start"}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Header & Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Course Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">Course:</span>
          {coursesList.map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCourse(code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCourse === code
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        {/* Start a Study Pod Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 transition shrink-0 self-end md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Start a Study Pod</span>
        </button>
      </div>

      {/* Grid of Study Buddies / Pods */}
      {filteredBuddies.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            No study pods match this course yet
          </h4>
          <p className="text-xs text-slate-400">
            Be the first to open a study pod for {selectedCourse} and invite classmates!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBuddies.map((buddy) => (
            <div
              key={buddy.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              {/* Card Header: Avatar & Course Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={buddy.avatar}
                      alt={buddy.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {buddy.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {buddy.major} • {buddy.year}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                    {buddy.courseCode}
                  </span>
                </div>

                {/* Course Name & Topic */}
                <div className="space-y-1.5 mb-3">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {buddy.course}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-snug">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Topic: </span>
                    {buddy.topic}
                  </p>
                </div>

                {/* Study Details */}
                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{buddy.studyStyle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{buddy.preferredLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{buddy.availability}</span>
                  </div>
                </div>

                {/* Tags */}
                {buddy.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {buddy.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Spots & Request Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {buddy.membersJoined} / {buddy.maxMembers}
                  </span>{" "}
                  spots filled
                </div>

                <button
                  onClick={() => requestStudyBuddy(buddy.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    buddy.requested
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-95"
                  }`}
                >
                  {buddy.requested ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Joined Pod</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Join Pod</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Study Pod Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Create a Campus Study Pod
                </h3>
                <p className="text-xs text-slate-400">
                  Invite classmates to study together for upcoming exams & problem sets
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    placeholder="e.g. CS 310"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="e.g. Algorithms & Data Structures"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Exam Objective
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g. Midterm 2 Prep: Dynamic Programming & Graphs"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Study Style
                  </label>
                  <select
                    value={formData.studyStyle}
                    onChange={(e) => setFormData({ ...formData, studyStyle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option>Collaborative Whiteboarding</option>
                    <option>Flashcards & Active Recall</option>
                    <option>Silent Focus (Pomodoro 50/10)</option>
                    <option>Group Discussion & Case Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Max Pod Size
                  </label>
                  <select
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option value="2">2 Students (1-on-1)</option>
                    <option value="3">3 Students</option>
                    <option value="4">4 Students (Recommended)</option>
                    <option value="6">6 Students</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Meeting Location
                  </label>
                  <input
                    type="text"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    placeholder="e.g. Library 3rd Floor Pods or Zoom"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Hours / Days
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    placeholder="e.g. Tues & Thurs 6-9 PM"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
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
                  Publish Pod
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
