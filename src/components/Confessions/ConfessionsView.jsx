import React, { useState } from "react";
import {
  Ghost,
  Lock,
  Sparkles,
  Send,
  Heart,
  Coffee,
  MessageCircle,
  Share2,
  Dice5,
  ShieldCheck,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Flame,
  Laugh,
  EyeOff
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const RANDOM_ALIASES = [
  "Secret Admirer #409",
  "Sleep-Deprived Engineer #88",
  "Campus Foodie Anonymous",
  "Midnight Phantom #12",
  "Silent Roommate Survivor",
  "Library 4th Floor Lurker",
  "Backrow Chem Major #77",
  "Underground Bean Barista",
  "Ghost of North Quad",
  "Caffeine Addict #214",
  "Anonymous Cougar #99",
  "Math Proof Procrastinator",
  "Boba Run Enthusiast #03"
];

const AVATAR_GRADIENTS = [
  "from-pink-500 to-rose-600",
  "from-purple-600 to-indigo-700",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-blue-600 to-cyan-600",
  "from-violet-600 to-fuchsia-600"
];

const CONFESSION_TAGS = [
  { name: "Crushes & Romance", emoji: "💕" },
  { name: "Academic Pain", emoji: "📚" },
  { name: "Dining Hall Secrets", emoji: "🍕" },
  { name: "Campus Secrets", emoji: "🤫" },
  { name: "Dorm Life Drama", emoji: "🛋️" },
  { name: "Wholesome", emoji: "🌸" }
];

const MOODS = [
  "Wholesome & Romantic 💕",
  "Deeply Relatable 💀",
  "Spicy Drama 🌶️",
  "Chaotic Good 🎶",
  "Petty Revenge 🧊",
  "Game Changer 🍦"
];

export default function ConfessionsView() {
  const {
    confessions,
    addConfession,
    reactToConfession,
    addConfessionComment,
    searchQuery,
    showToast
  } = useApp();

  // Create form state
  const [confessionText, setConfessionText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Crushes & Romance");
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [currentAlias, setCurrentAlias] = useState(() => RANDOM_ALIASES[0]);
  const [currentGradient, setCurrentGradient] = useState(() => AVATAR_GRADIENTS[0]);

  // Feed filtering & sorting
  const [tagFilter, setTagFilter] = useState("All");
  const [sortBy, setSortBy] = useState("relatable"); // relatable | latest | spiciest

  // Active comments open per confession
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const rerollIdentity = () => {
    const nextAlias = RANDOM_ALIASES[Math.floor(Math.random() * RANDOM_ALIASES.length)];
    const nextGrad = AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];
    setCurrentAlias(nextAlias);
    setCurrentGradient(nextGrad);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confessionText.trim()) return;

    addConfession({
      text: confessionText.trim(),
      tag: selectedTag,
      mood: selectedMood,
      alias: currentAlias,
      avatarBg: currentGradient
    });

    setConfessionText("");
    rerollIdentity();
  };

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = (e, confessionId) => {
    e.preventDefault();
    const text = commentInputs[confessionId] || "";
    if (!text.trim()) return;

    const anonCommenter = `Anon #${Math.floor(10 + Math.random() * 90)}`;
    addConfessionComment(confessionId, text, anonCommenter);
    setCommentInputs((prev) => ({ ...prev, [confessionId]: "" }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Confession link copied! 🔗", "info");
    }
  };

  // Filter and sort
  const filteredConfessions = confessions
    .filter((c) => {
      const matchesTag = tagFilter === "All" || c.tag === tagFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        c.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.mood.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return b.id > a.id ? 1 : -1;
      }
      if (sortBy === "spiciest") {
        const teaA = (a.reactions?.tea || 0) + (a.reactions?.wild || 0);
        const teaB = (b.reactions?.tea || 0) + (b.reactions?.wild || 0);
        return teaB - teaA;
      }
      // Most Relatable
      const scoreA =
        (a.reactions?.relatable || 0) +
        (a.reactions?.heart || 0) +
        (a.commentsCount || 0) * 2;
      const scoreB =
        (b.reactions?.relatable || 0) +
        (b.reactions?.heart || 0) +
        (b.commentsCount || 0) * 2;
      return scoreB - scoreA;
    });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white relative overflow-hidden border border-purple-800/40 shadow-xl shadow-purple-950/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-xs font-semibold text-purple-300 border border-purple-500/30">
              <Ghost className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Campus Confessions Vault</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-300 font-bold">100% Anonymous</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              Unspoken Crushes, Exam Tears & Campus Secrets.
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Drop what’s really on your mind without your name or profile attached. No IP logs, zero tracking, purely anonymous student voices.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs space-y-2 shrink-0 max-w-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Confidentiality Guarantee</span>
            </div>
            <p className="text-purple-200/70 text-[11px] leading-tight">
              Posts are stripped of your student handle, courses, and identity before being published to the vault.
            </p>
          </div>
        </div>
      </div>

      {/* Confession Submission Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${currentGradient} flex items-center justify-center text-white shadow-md text-sm font-bold`}
            >
              <Ghost className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <span>Posting as:</span>
                <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                  {currentAlias}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Randomized campus disguise</div>
            </div>
          </div>

          <button
            type="button"
            onClick={rerollIdentity}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 transition border border-purple-200/60 dark:border-purple-800/60"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span>Reroll Alias</span>
          </button>
        </div>

        {/* Text Area */}
        <textarea
          rows={3}
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          maxLength={600}
          placeholder="Confess your secret campus crush, dining hall hack, roommate story, or honest thoughts..."
          className="w-full bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-750 focus:border-purple-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none text-sm transition placeholder:text-slate-400 resize-none"
        />

        {/* Tag Selector */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Confession Category:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CONFESSION_TAGS.map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => setSelectedTag(tag.name)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1 ${
                  selectedTag === tag.name
                    ? "bg-purple-600 text-white shadow-sm shadow-purple-500/25"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>{tag.emoji}</span>
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selector & Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-400 shrink-0">Vibe:</span>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-[11px] text-slate-400">
              {600 - confessionText.length} chars left
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!confessionText.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-500/25 active:scale-95 transition"
            >
              <span>Drop Confession</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Pills */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Tag chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {["All", ...CONFESSION_TAGS.map((t) => t.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setTagFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                tagFilter === cat
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-end sm:self-auto shrink-0">
          <button
            onClick={() => setSortBy("relatable")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === "relatable"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Relatable</span>
          </button>
          <button
            onClick={() => setSortBy("spiciest")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === "spiciest"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Coffee className="w-3 h-3 text-amber-500" />
            <span>Spiciest Tea</span>
          </button>
          <button
            onClick={() => setSortBy("latest")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              sortBy === "latest"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Confessions Stream */}
      {filteredConfessions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 mx-auto flex items-center justify-center">
            <Ghost className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
            No confessions found in this category
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No confessions matched "${searchQuery}". Try a different keyword.`
              : "Be the first brave student to whisper a confession to campus!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConfessions.map((conf) => (
            <article
              key={conf.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-4 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  conf.avatarBg || "from-purple-600 to-indigo-600"
                }`}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${
                      conf.avatarBg || "from-purple-600 to-indigo-600"
                    } flex items-center justify-center text-white shadow-sm text-xs font-bold shrink-0`}
                  >
                    <Ghost className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {conf.alias}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50">
                        {conf.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {conf.timestamp} •{" "}
                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        {conf.mood}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Share Confession"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Confession Body */}
              <p className="text-slate-800 dark:text-slate-100 text-sm leading-relaxed whitespace-pre-line bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 font-normal">
                "{conf.text}"
              </p>

              {/* Reactions Bar */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  {/* Relatable */}
                  <button
                    onClick={() => reactToConfession(conf.id, "relatable")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      conf.userReaction === "relatable"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 ring-1 ring-purple-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>🫂</span>
                    <span>Relatable ({conf.reactions?.relatable || 0})</span>
                  </button>

                  {/* Wild / Shocking */}
                  <button
                    onClick={() => reactToConfession(conf.id, "wild")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      conf.userReaction === "wild"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 ring-1 ring-amber-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>💀</span>
                    <span>Wild ({conf.reactions?.wild || 0})</span>
                  </button>

                  {/* Heart / Romance */}
                  <button
                    onClick={() => reactToConfession(conf.id, "heart")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      conf.userReaction === "heart"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 ring-1 ring-rose-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>💕</span>
                    <span>Heart ({conf.reactions?.heart || 0})</span>
                  </button>

                  {/* Spilled Tea */}
                  <button
                    onClick={() => reactToConfession(conf.id, "tea")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      conf.userReaction === "tea"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 ring-1 ring-emerald-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>☕</span>
                    <span>Tea ({conf.reactions?.tea || 0})</span>
                  </button>
                </div>

                {/* Comment Counter / Toggle */}
                <button
                  onClick={() => toggleComments(conf.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-purple-500" />
                  <span>{conf.commentsCount || (conf.comments ? conf.comments.length : 0)}</span>
                </button>
              </div>

              {/* Expandable Anonymous Replies */}
              {openComments[conf.id] && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3 animate-in fade-in duration-150">
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {!conf.comments || conf.comments.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-2">
                        No anonymous replies yet. Share some thoughts or advice!
                      </p>
                    ) : (
                      conf.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl text-xs border border-slate-100 dark:border-slate-800 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" />
                              {comment.alias}
                            </span>
                            <span className="text-slate-400 text-[10px]">{comment.timestamp}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-snug">
                            {comment.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add anonymous reply input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, conf.id)}
                    className="flex items-center gap-2 pt-1"
                  >
                    <input
                      type="text"
                      value={commentInputs[conf.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [conf.id]: e.target.value })
                      }
                      placeholder="Reply anonymously to this confession..."
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500 text-slate-800 dark:text-slate-200"
                    />
                    <button
                      type="submit"
                      disabled={!(commentInputs[conf.id] || "").trim()}
                      className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white transition shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
