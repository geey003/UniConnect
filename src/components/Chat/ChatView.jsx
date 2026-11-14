import React, { useState, useRef, useEffect } from "react";
import {
  Hash,
  Send,
  Smile,
  Users,
  Sparkles,
  Paperclip,
  CheckCheck
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ChatView({ isDrawer = false, onCloseDrawer }) {
  const {
    channels,
    activeChannelId,
    setActiveChannelId,
    channelMessages,
    sendChannelMessage,
    currentUser
  } = useApp();

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const messages = channelMessages[activeChannelId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChannelMessage(activeChannelId, inputText.trim());
    setInputText("");
  };

  const quickPrompts = [
    "Anyone studying at the library right now? 📚",
    "Where is the best food spot on campus? 🍜",
    "Is anyone taking CS 310 or MATH 240? 💻"
  ];

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden ${
        isDrawer ? "h-full" : "h-[700px]"
      }`}
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Left Channels Sidebar */}
        <div className="w-56 sm:w-64 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Campus Lounges
            </h3>
            <span className="text-[11px] text-slate-400">Live Student Chatrooms</span>
          </div>

          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {channels.map((ch) => {
              const isActive = ch.id === activeChannelId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannelId(ch.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{ch.icon}</span>
                    <span className="truncate">#{ch.name}</span>
                  </div>
                  {ch.unread > 0 && !isActive && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                      {ch.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active online peers widget */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Online Students
            </div>
            <div className="flex -space-x-1.5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Maya"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900"
              />
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                alt="Jordan"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Liam"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900"
              />
              <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                +42
              </div>
            </div>
          </div>
        </div>

        {/* Right Active Channel Messages */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
          {/* Channel Header */}
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{activeChannel.icon}</span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  #{activeChannel.name}
                </h4>
                <p className="text-[11px] text-slate-400">{activeChannel.desc}</p>
              </div>
            </div>

            {isDrawer && (
              <button
                onClick={onCloseDrawer}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                Close
              </button>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                <Hash className="w-8 h-8 text-slate-300 dark:text-slate-700" />
                <p className="text-xs">No messages yet in #{activeChannel.name}.</p>
                <p className="text-[11px] text-slate-400">Say hello to your fellow classmates!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.isMe ? "flex-row-reverse" : ""}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div
                    className={`max-w-[78%] rounded-2xl p-3 text-xs space-y-1 ${
                      msg.isMe
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-750"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-75">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed break-words">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply starters */}
          <div className="px-4 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/80">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputText(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-950/20"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel.name}...`}
              className="flex-1 px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition shrink-0 shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
