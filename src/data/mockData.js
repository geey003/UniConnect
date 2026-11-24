export const DEFAULT_USER = {
  id: "usr_guest",
  name: "New Student",
  handle: "@student",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
  major: "Undergraduate",
  year: "Class of 2027",
  university: "Campus Community",
  campusReputation: 100,
  bio: "Just joined UniConnect! Excited to connect with classmates, collaborate in study pods, and share campus life.",
  courses: ["General Studies"],
  interests: ["Student Life", "Campus Events"],
  status: "Active on campus ✨",
  isOnline: true
};

export const INITIAL_USER = DEFAULT_USER;

export const INITIAL_STORIES = [];

export const INITIAL_POSTS = [];

export const INITIAL_STUDY_BUDDIES = [];

export const INITIAL_CLUBS = [];

export const INITIAL_EVENTS = [];

export const INITIAL_CONFESSIONS = [];

export const INITIAL_CHANNELS = [
  { id: "ch_general", name: "general-campus", desc: "Open lounge for all student discussions", icon: "💬", unread: 0 },
  { id: "ch_study", name: "study-grind", desc: "Find study groups, share notes and tips", icon: "📚", unread: 0 },
  { id: "ch_events", name: "campus-events", desc: "Upcoming club meetings, parties & workshops", icon: "🎉", unread: 0 },
  { id: "ch_lost", name: "lost-and-found", desc: "Found keys, IDs, backpacks and laptops", icon: "🔍", unread: 0 },
  { id: "ch_market", name: "student-market", desc: "Buy/sell textbooks, dorm essentials & gear", icon: "🏷️", unread: 0 }
];

export const INITIAL_CHANNEL_MESSAGES = {
  ch_general: [],
  ch_study: [],
  ch_events: [],
  ch_lost: [],
  ch_market: []
};

export const INITIAL_NOTIFICATIONS = [];
