import React, { useState } from "react";
import { Plus, Camera, Image as ImageIcon } from "lucide-react";
import { useApp } from "../context/AppContext";
import StoryViewerModal from "./StoryViewerModal";

export default function StoriesBar() {
  const { stories, addStory, currentUser } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const samplePhotos = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80"
  ];

  const handleCreateStory = (e) => {
    e.preventDefault();
    const finalImg = imageUrl.trim() || samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    addStory(caption || "Campus vibes! 🎓✨", finalImg);
    setCaption("");
    setImageUrl("");
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          {/* Add Story Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-indigo-500/60 p-0.5 group-hover:border-indigo-600 transition flex items-center justify-center">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover brightness-90 group-hover:brightness-100 transition"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Your Story</span>
          </button>

          {/* Student Stories */}
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] transition group-hover:scale-105 ${
                  story.viewed
                    ? "bg-slate-300 dark:bg-slate-700"
                    : "bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600"
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden p-0.5 bg-white dark:bg-slate-900">
                  <img
                    src={story.authorAvatar}
                    alt={story.authorName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate max-w-[64px]">
                {story.authorName.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <StoryViewerModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}

      {/* Add Story Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Share a Campus Story (24h)</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Caption / Moment
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Sunset study session on the quad 📚🌅"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Image URL (or pick a campus preset below)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white mb-2"
                />
                <div className="flex gap-2">
                  {samplePhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset"
                      onClick={() => setImageUrl(url)}
                      className={`w-12 h-12 rounded-lg object-cover cursor-pointer border-2 transition ${
                        imageUrl === url ? "border-indigo-600 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20"
                >
                  Share Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
