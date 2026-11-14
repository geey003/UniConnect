import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  INITIAL_USER,
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_STUDY_BUDDIES,
  INITIAL_CLUBS,
  INITIAL_EVENTS,
  INITIAL_CHANNELS,
  INITIAL_CHANNEL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONFESSIONS
} from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state (persisted)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("cp_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("cp_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("feed");

  // Global search query
  const [searchQuery, setSearchQuery] = useState("");

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "info") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  };

  // User Profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("cp_user");
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  useEffect(() => {
    localStorage.setItem("cp_user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
    showToast("Profile updated successfully! ✨", "success");
  };

  // Stories
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("cp_stories");
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  useEffect(() => {
    localStorage.setItem("cp_stories", JSON.stringify(stories));
  }, [stories]);

  const addStory = (caption, image) => {
    const newStory = {
      id: `story_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      image: image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      caption: caption || "Campus vibes! 🎓✨",
      timeAgo: "Just now",
      isUser: true,
      viewed: false
    };
    setStories([newStory, ...stories.filter((s) => !s.isUser)]);
    showToast("Story shared with your campus! 📸", "success");
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  // Posts Feed
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("cp_posts");
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  useEffect(() => {
    localStorage.setItem("cp_posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = ({ content, category, image, poll, isAnonymous }) => {
    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: isAnonymous ? "Anonymous Cougar" : currentUser.name,
        handle: isAnonymous ? "@anon_student" : currentUser.handle,
        avatar: isAnonymous
          ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
          : currentUser.avatar,
        major: isAnonymous ? "Anonymous Student" : currentUser.major,
        year: isAnonymous ? "Campus Whisperer" : currentUser.year,
        isVerified: !isAnonymous,
        isAnonymous: isAnonymous
      },
      category: category || "General",
      content,
      image: image || null,
      timestamp: "Just now",
      likes: 0,
      hasLiked: false,
      reactions: { like: 0, fire: 0, helpful: 0, laugh: 0 },
      userReaction: null,
      poll: poll || null,
      commentsCount: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    showToast("Your post is live on the campus feed! 🚀", "success");
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const toggleLikePost = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likes: hasLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
          };
        }
        return post;
      })
    );
  };

  const reactToPost = (postId, reactionKey) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const currentReactions = { ...post.reactions };
          const previousReaction = post.userReaction;

          if (previousReaction === reactionKey) {
            // Remove reaction
            currentReactions[reactionKey] = Math.max(0, (currentReactions[reactionKey] || 1) - 1);
            return {
              ...post,
              userReaction: null,
              reactions: currentReactions
            };
          } else {
            // Subtract old if any
            if (previousReaction && currentReactions[previousReaction]) {
              currentReactions[previousReaction] = Math.max(0, currentReactions[previousReaction] - 1);
            }
            // Add new
            currentReactions[reactionKey] = (currentReactions[reactionKey] || 0) + 1;
            return {
              ...post,
              userReaction: reactionKey,
              reactions: currentReactions
            };
          }
        }
        return post;
      })
    );
  };

  const votePoll = (postId, optionIndex) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.poll) {
          if (post.poll.userVotedOption !== undefined && post.poll.userVotedOption !== null) {
            // Already voted
            return post;
          }
          const updatedOptions = post.poll.options.map((opt, idx) => {
            if (idx === optionIndex) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });
          return {
            ...post,
            poll: {
              ...post.poll,
              totalVotes: post.poll.totalVotes + 1,
              userVotedOption: optionIndex,
              options: updatedOptions
            }
          };
        }
        return post;
      })
    );
    showToast("Vote recorded! 📊", "success");
  };

  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      text: commentText.trim(),
      timestamp: "Just now",
      likes: 0
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
    showToast("Comment posted! 💬", "success");
  };

  // Study Buddies Matcher
  const [studyBuddies, setStudyBuddies] = useState(() => {
    const saved = localStorage.getItem("cp_study_buddies");
    return saved ? JSON.parse(saved) : INITIAL_STUDY_BUDDIES;
  });

  useEffect(() => {
    localStorage.setItem("cp_study_buddies", JSON.stringify(studyBuddies));
  }, [studyBuddies]);

  const requestStudyBuddy = (buddyId) => {
    setStudyBuddies((prev) =>
      prev.map((b) => {
        if (b.id === buddyId) {
          const requested = !b.requested;
          return {
            ...b,
            requested,
            membersJoined: requested ? b.membersJoined + 1 : b.membersJoined - 1
          };
        }
        return b;
      })
    );
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
    showToast("Study Pod invite sent! Connect & start reviewing 📚🎉", "success");
  };

  const createStudyRequest = (newRequest) => {
    const created = {
      id: `sb_${Date.now()}`,
      name: currentUser.name,
      avatar: currentUser.avatar,
      major: currentUser.major,
      year: currentUser.year,
      course: newRequest.course,
      courseCode: newRequest.courseCode,
      topic: newRequest.topic,
      studyStyle: newRequest.studyStyle,
      preferredLocation: newRequest.preferredLocation,
      availability: newRequest.availability,
      bio: newRequest.bio || currentUser.bio,
      matched: false,
      requested: false,
      membersJoined: 1,
      maxMembers: Number(newRequest.maxMembers) || 4,
      tags: newRequest.tags || ["Exam Prep", "Study Pod"]
    };
    setStudyBuddies([created, ...studyBuddies]);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    showToast("Study Pod created! Fellow classmates can now join 🤝", "success");
  };

  // Clubs
  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem("cp_clubs");
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  useEffect(() => {
    localStorage.setItem("cp_clubs", JSON.stringify(clubs));
  }, [clubs]);

  const toggleJoinClub = (clubId) => {
    setClubs((prev) =>
      prev.map((club) => {
        if (club.id === clubId) {
          const isJoined = !club.isJoined;
          const delta = isJoined ? 1 : -1;
          if (isJoined) {
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
            showToast(`Welcome to ${club.name}! 🎉`, "success");
          } else {
            showToast(`Left ${club.name}`, "info");
          }
          return {
            ...club,
            isJoined,
            membersCount: club.membersCount + delta
          };
        }
        return club;
      })
    );
  };

  const createClub = (clubData) => {
    const newClub = {
      id: `club_${Date.now()}`,
      name: clubData.name,
      category: clubData.category || "General",
      banner: clubData.banner || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      avatar: clubData.avatar || "🌟",
      membersCount: 1,
      isJoined: true,
      president: currentUser.name,
      meetingTime: clubData.meetingTime || "TBA",
      description: clubData.description,
      tags: clubData.tags || ["Campus Club"],
      recentAnnouncement: "Welcome to our brand new campus club! First meeting coming up soon."
    };
    setClubs([newClub, ...clubs]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    showToast("Campus Club registered! Members can now discover & join 🎨", "success");
  };

  // Campus Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("cp_events");
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  useEffect(() => {
    localStorage.setItem("cp_events", JSON.stringify(events));
  }, [events]);

  const toggleRsvp = (eventId, status = "going") => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const isCurrentlyRsvp = ev.isRsvp;
          const nextRsvp = !isCurrentlyRsvp;
          if (nextRsvp) {
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            showToast(`RSVP Confirmed for ${ev.title}! Added to schedule 📅`, "success");
          } else {
            showToast("RSVP cancelled", "info");
          }
          return {
            ...ev,
            isRsvp: nextRsvp,
            rsvpStatus: nextRsvp ? status : null,
            attendeesCount: nextRsvp ? ev.attendeesCount + 1 : Math.max(0, ev.attendeesCount - 1)
          };
        }
        return ev;
      })
    );
  };

  const createEvent = (evData) => {
    const newEvent = {
      id: `ev_${Date.now()}`,
      title: evData.title,
      organizer: evData.organizer || currentUser.name,
      date: evData.date,
      time: evData.time,
      location: evData.location,
      banner: evData.banner || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      category: evData.category || "Social",
      badge: evData.badge || "Student Organized 🎉",
      attendeesCount: 1,
      isRsvp: true,
      rsvpStatus: "going",
      description: evData.description,
      tags: evData.tags || ["Campus Event"]
    };
    setEvents([newEvent, ...events]);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    showToast("Event posted to campus calendar! 🗓️", "success");
  };

  // Chat Channels & Messages
  const [channels] = useState(INITIAL_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState("ch_general");
  const [channelMessages, setChannelMessages] = useState(() => {
    const saved = localStorage.getItem("cp_channel_messages");
    return saved ? JSON.parse(saved) : INITIAL_CHANNEL_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem("cp_channel_messages", JSON.stringify(channelMessages));
  }, [channelMessages]);

  const sendChannelMessage = (channelId, text) => {
    if (!text.trim()) return;
    const msg = {
      id: `m_${Date.now()}`,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(),
      isMe: true
    };
    setChannelMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), msg]
    }));
  };

  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("cp_notifications");
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem("cp_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const markAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Anonymous Confessions Vault
  const [confessions, setConfessions] = useState(() => {
    const saved = localStorage.getItem("cp_confessions");
    return saved ? JSON.parse(saved) : INITIAL_CONFESSIONS;
  });

  useEffect(() => {
    localStorage.setItem("cp_confessions", JSON.stringify(confessions));
  }, [confessions]);

  const addConfession = ({ text, tag, mood, alias, avatarBg }) => {
    const newConfession = {
      id: `conf_${Date.now()}`,
      tag: tag || "Campus Secrets",
      alias: alias || `Anonymous Student #${Math.floor(100 + Math.random() * 900)}`,
      avatarBg: avatarBg || "from-purple-600 to-indigo-700",
      text: text.trim(),
      timestamp: "Just now",
      mood: mood || "Confidential 🤫",
      reactions: { relatable: 1, wild: 0, heart: 0, tea: 0 },
      userReaction: "relatable",
      commentsCount: 0,
      comments: []
    };
    setConfessions([newConfession, ...confessions]);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    showToast("Confession dropped into the campus vault! 🤫", "success");
  };

  const reactToConfession = (confessionId, reactionKey) => {
    setConfessions((prev) =>
      prev.map((c) => {
        if (c.id === confessionId) {
          const currentReactions = { ...c.reactions };
          const prevReaction = c.userReaction;

          if (prevReaction === reactionKey) {
            currentReactions[reactionKey] = Math.max(0, (currentReactions[reactionKey] || 1) - 1);
            return {
              ...c,
              userReaction: null,
              reactions: currentReactions
            };
          } else {
            if (prevReaction && currentReactions[prevReaction]) {
              currentReactions[prevReaction] = Math.max(0, currentReactions[prevReaction] - 1);
            }
            currentReactions[reactionKey] = (currentReactions[reactionKey] || 0) + 1;
            return {
              ...c,
              userReaction: reactionKey,
              reactions: currentReactions
            };
          }
        }
        return c;
      })
    );
  };

  const addConfessionComment = (confessionId, commentText, anonAlias) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `cc_${Date.now()}`,
      alias: anonAlias || `Anon #${Math.floor(10 + Math.random() * 90)}`,
      text: commentText.trim(),
      timestamp: "Just now"
    };

    setConfessions((prev) =>
      prev.map((c) => {
        if (c.id === confessionId) {
          return {
            ...c,
            commentsCount: (c.commentsCount || 0) + 1,
            comments: [...(c.comments || []), newComment]
          };
        }
        return c;
      })
    );
    showToast("Anonymous reply posted! 💬", "success");
  };

  // Profile modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Active Story modal
  const [activeStoryModal, setActiveStoryModal] = useState(null);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        toast,
        showToast,
        currentUser,
        updateProfile,
        stories,
        addStory,
        activeStoryModal,
        setActiveStoryModal,
        posts,
        addPost,
        toggleLikePost,
        reactToPost,
        votePoll,
        addComment,
        confessions,
        addConfession,
        reactToConfession,
        addConfessionComment,
        studyBuddies,
        requestStudyBuddy,
        createStudyRequest,
        clubs,
        toggleJoinClub,
        createClub,
        events,
        toggleRsvp,
        createEvent,
        channels,
        activeChannelId,
        setActiveChannelId,
        channelMessages,
        sendChannelMessage,
        isChatDrawerOpen,
        setIsChatDrawerOpen,
        notifications,
        markAllNotifsAsRead,
        unreadNotifsCount,
        isProfileModalOpen,
        setIsProfileModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
