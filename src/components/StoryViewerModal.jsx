import React, { useEffect, useState } from "react";
import { X, Heart, MessageCircle, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function StoryViewerModal({ story, onClose }) {
  const { showToast } = useApp();
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [story, onClose]);

  if (!story) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Replied to ${story.authorName}'s story! 💌`, "success");
    setReplyText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl flex flex-col justify-between">
        {/* Progress Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
          <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Top Author Details */}
        <div className="relative z-20 pt-7 px-4 pb-2 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2.5">
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500"
            />
            <div>
              <span className="text-white font-bold text-sm block leading-none">{story.authorName}</span>
              <span className="text-white/70 text-xs">{story.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <img
          src={story.image}
          alt={story.caption}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Bottom Caption & Reply Bar */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-3">
          <p className="text-white text-sm font-medium drop-shadow-md">{story.caption}</p>

          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Send a reply to ${story.authorName}...`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs placeholder:text-white/60 border border-white/20 focus:outline-none focus:border-white"
            />
            <button
              type="button"
              onClick={() => showToast("Liked story! ❤️", "success")}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </button>
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
