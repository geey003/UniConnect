import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Flame,
  Lightbulb,
  Laugh,
  Send,
  MoreHorizontal,
  Bookmark
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function PostCard({ post }) {
  const {
    currentUser,
    toggleLikePost,
    reactToPost,
    votePoll,
    addComment,
    showToast
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput.trim());
    setCommentInput("");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Post link copied to clipboard! 🔗", "info");
    } else {
      showToast("Post ready to share!", "info");
    }
  };

  const categoryColors = {
    Academic: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/50 dark:border-blue-800",
    "Campus Buzz": "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/50 dark:border-amber-800",
    Poll: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200/50 dark:border-purple-800",
    Housing: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800",
    "Lost & Found": "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/50 dark:border-rose-800",
    Marketplace: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800"
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm transition hover:shadow-md space-y-4">
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500/20" />
              )}
              <span className="text-xs text-slate-400">{post.author.handle}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {post.author.major} • {post.timestamp}
            </div>
          </div>
        </div>

        {/* Category Pill & Bookmark */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
              categoryColors[post.category] || "bg-slate-100 text-slate-700"
            }`}
          >
            {post.category}
          </span>
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? "Removed from saved posts" : "Saved to your bookmarks! 📌", "info");
            }}
            className={`p-1.5 rounded-xl transition ${
              isBookmarked ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Optional Post Image */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden max-h-96 border border-slate-100 dark:border-slate-800">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* Poll Component */}
      {post.poll && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 space-y-2.5">
          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{post.poll.question}</span>
            <span className="text-slate-400 font-medium">{post.poll.totalVotes} votes</span>
          </div>

          <div className="space-y-2 pt-1">
            {post.poll.options.map((option, idx) => {
              const hasVoted = post.poll.userVotedOption !== undefined && post.poll.userVotedOption !== null;
              const isSelected = post.poll.userVotedOption === idx;
              const percentage =
                post.poll.totalVotes > 0
                  ? Math.round((option.votes / post.poll.totalVotes) * 100)
                  : 0;

              return (
                <button
                  key={option.id}
                  onClick={() => !hasVoted && votePoll(post.id, idx)}
                  disabled={hasVoted}
                  className={`w-full relative overflow-hidden rounded-xl p-3 text-left transition border ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400"
                  }`}
                >
                  {/* Fill percentage bar */}
                  {hasVoted && (
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                        isSelected ? "bg-indigo-500/20" : "bg-slate-200/50 dark:bg-slate-800"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-2">
                      {isSelected && <span className="text-indigo-600 font-bold">✓</span>}
                      {option.text}
                    </span>
                    {hasVoted && <span className="font-bold text-slate-500">{percentage}%</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reactions & Action Bar */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Main Like / Heart */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              post.hasLiked
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Heart className={`w-4 h-4 ${post.hasLiked ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>{post.likes}</span>
          </button>

          {/* Quick reactions */}
          <button
            onClick={() => reactToPost(post.id, "fire")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
              post.userReaction === "fire"
                ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 ring-1 ring-amber-400"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{post.reactions?.fire || 0}</span>
          </button>

          <button
            onClick={() => reactToPost(post.id, "helpful")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
              post.userReaction === "helpful"
                ? "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 ring-1 ring-sky-400"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{post.reactions?.helpful || 0}</span>
          </button>

          {/* Comment Count / Drawer toggle */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <MessageCircle className="w-4 h-4 text-slate-400" />
            <span>{post.commentsCount || (post.comments ? post.comments.length : 0)}</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Comments Drawer */}
      {isCommentsOpen && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3 animate-in fade-in duration-200">
          {/* List of comments */}
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {(!post.comments || post.comments.length === 0) ? (
              <p className="text-xs text-slate-400 text-center py-2">
                No comments yet. Be the first to start the discussion!
              </p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-2.5 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-snug">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add comment input form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment or question..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
