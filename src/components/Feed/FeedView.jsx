import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Clock,
  MessageSquare,
  Calendar,
  Users,
  ArrowRight,
  Filter,
  Ghost
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import StoriesBar from "../StoriesBar";
import CreatePostBox from "./CreatePostBox";
import PostCard from "./PostCard";

export default function FeedView({ onOpenCreatePost }) {
  const { posts, searchQuery, setActiveTab, events, studyBuddies, confessions } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending"); // trending | latest

  const categories = ["All", "Academic", "Campus Buzz", "Poll", "Housing", "Lost & Found"];

  // Filter posts
  const filteredPosts = posts
    .filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return (b.id > a.id ? 1 : -1);
      }
      // Trending: likes + reactions + comments
      const scoreA = a.likes + (a.commentsCount || 0) * 2;
      const scoreB = b.likes + (b.commentsCount || 0) * 2;
      return scoreB - scoreA;
    });

  const nextUpcomingEvent = events[0];
  const activePods = studyBuddies.slice(0, 2);
  const latestConfession = confessions && confessions.length > 0 ? confessions[0] : null;

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Center Feed Column */}
      <div className="lg:col-span-2 space-y-5">
        {/* Stories Bar */}
        <StoriesBar />

        {/* Create Post Box */}
        <CreatePostBox />

        {/* Filter Pills & Sorting Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-end sm:self-auto shrink-0">
            <button
              onClick={() => setSortBy("trending")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                sortBy === "trending"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setSortBy("latest")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                sortBy === "latest"
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Latest</span>
            </button>
          </div>
        </div>

        {/* Posts Stream */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">No posts found</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No posts matched "${searchQuery}". Try a different keyword or clear your search.`
                : "No posts in this category yet. Be the first student to publish something!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Campus Highlights & Quick Study Pods */}
      <div className="hidden lg:block space-y-6">
        {/* Confessions Vault Spotlight */}
        {latestConfession && (
          <div className="bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/80 rounded-3xl p-5 border border-purple-800/40 shadow-sm space-y-3.5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Ghost className="w-4 h-4" />
                <span>Confessions Vault 🤫</span>
              </div>
              <button
                onClick={() => setActiveTab("confessions")}
                className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-medium"
              >
                Vault <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div
              onClick={() => setActiveTab("confessions")}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 transition border border-white/10 cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] text-purple-300">
                <span className="font-bold">{latestConfession.alias}</span>
                <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded-full text-purple-200">
                  {latestConfession.tag}
                </span>
              </div>
              <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed italic">
                "{latestConfession.text}"
              </p>
            </div>

            <button
              onClick={() => setActiveTab("confessions")}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition flex items-center justify-center gap-1.5"
            >
              <span>Whisper a Confession (100% Anon)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Next Big Event Spotlight */}
        {nextUpcomingEvent && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Calendar className="w-4 h-4" />
                <span>Next Campus Event</span>
              </div>
              <button
                onClick={() => setActiveTab("events")}
                className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden relative group">
              <img
                src={nextUpcomingEvent.banner}
                alt={nextUpcomingEvent.title}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                {nextUpcomingEvent.badge}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 mb-1">
                {nextUpcomingEvent.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {nextUpcomingEvent.date} • {nextUpcomingEvent.location}
              </p>
            </div>

            <button
              onClick={() => setActiveTab("events")}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white text-xs font-semibold transition text-center"
            >
              See Event Details & RSVP
            </button>
          </div>
        )}

        {/* Study Pods Live Teaser */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
              <span>Looking for Study Pods</span>
            </div>
            <button
              onClick={() => setActiveTab("study")}
              className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-medium"
            >
              All pods <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {activePods.map((pod) => (
              <div
                key={pod.id}
                onClick={() => setActiveTab("study")}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750 hover:border-indigo-400 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <img
                    src={pod.avatar}
                    alt={pod.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">
                      {pod.name}
                    </span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      {pod.courseCode}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">{pod.topic}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab("study")}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-1.5"
          >
            <span>Match with Study Partners</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
