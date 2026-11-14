import React, { useState } from "react";
import {
  Image as ImageIcon,
  BarChart2,
  Smile,
  Shield,
  Send,
  X,
  Plus,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CreatePostBox() {
  const { currentUser, addPost } = useApp();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Academic");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPollInput, setShowPollInput] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const categories = [
    { name: "Academic", icon: "📚" },
    { name: "Campus Buzz", icon: "🔥" },
    { name: "Poll", icon: "📊" },
    { name: "Housing", icon: "🏠" },
    { name: "Lost & Found", icon: "🔍" },
    { name: "Marketplace", icon: "🏷️" }
  ];

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !pollQuestion.trim()) return;

    let poll = null;
    if (showPollInput && pollQuestion.trim()) {
      const validOptions = pollOptions.filter((o) => o.trim() !== "");
      if (validOptions.length >= 2) {
        poll = {
          question: pollQuestion.trim(),
          totalVotes: 0,
          userVotedOption: null,
          options: validOptions.map((opt, i) => ({
            id: `opt_${Date.now()}_${i}`,
            text: opt.trim(),
            votes: 0
          }))
        };
      }
    }

    addPost({
      content: content.trim() || pollQuestion.trim(),
      category: showPollInput ? "Poll" : category,
      image: imageUrl.trim() || null,
      poll,
      isAnonymous
    });

    // Reset
    setContent("");
    setImageUrl("");
    setShowImageInput(false);
    setShowPollInput(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setIsAnonymous(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      {/* Top Author Preview & Anonymous Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              isAnonymous
                ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
                : currentUser.avatar
            }
            alt="Author"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isAnonymous ? "Posting Anonymously 🎭" : currentUser.name}
            </div>
            <div className="text-[11px] text-slate-400">
              {isAnonymous ? "Campus Whisperer" : currentUser.major}
            </div>
          </div>
        </div>

        {/* Anonymous Toggle Pill */}
        <button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            isAnonymous
              ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 ring-1 ring-purple-400"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>{isAnonymous ? "Anonymous Mode" : "Public Mode"}</span>
        </button>
      </div>

      {/* Main Text Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder={
          isAnonymous
            ? "Share a campus confession, honest course advice, or dining hall thoughts..."
            : "What's happening on campus? Ask for study notes, share an event, or ask a question..."
        }
        className="w-full bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-750 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none text-sm transition placeholder:text-slate-400 resize-none"
      />

      {/* Image Input Drawer */}
      {showImageInput && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Attach Image URL</span>
            <button
              onClick={() => {
                setShowImageInput(false);
                setImageUrl("");
              }}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL (e.g. Unsplash or campus photo)..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
          />
        </div>
      )}

      {/* Poll Creator Drawer */}
      {showPollInput && (
        <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl space-y-2.5 border border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              Create Campus Poll
            </span>
            <button
              onClick={() => setShowPollInput(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Poll question (e.g. Best study floor in the library?)"
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-medium"
          />
          <div className="space-y-1.5">
            {pollOptions.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                value={opt}
                onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
              />
            ))}
          </div>
          {pollOptions.length < 4 && (
            <button
              type="button"
              onClick={handleAddPollOption}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Option
            </button>
          )}
        </div>
      )}

      {/* Category Pills Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1">Tag:</span>
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => {
              setCategory(cat.name);
              if (cat.name === "Poll") setShowPollInput(true);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1 ${
              category === cat.name
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Bottom Bar: Action Icons + Submit */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              showImageInput
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Photo</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPollInput(!showPollInput)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              showPollInput
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Poll</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() && !pollQuestion.trim()}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95 transition"
        >
          <span>Post to Campus</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
