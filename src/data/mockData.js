export const INITIAL_USER = {
  id: "usr_current",
  name: "Alex Morgan",
  handle: "@alex_m",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
  major: "Computer Science & Design",
  year: "Junior (Year 3)",
  university: "Northwood University",
  campusReputation: 1420,
  bio: "Passionate about UI/UX, ethical AI, and late-night library coffee runs ☕. Currently building campus web apps & prepping for CS310 midterms!",
  courses: ["CS 310 - Algorithms", "DSGN 204 - UI/UX Prototyping", "MATH 240 - Linear Algebra", "PHIL 105 - Tech Ethics"],
  interests: ["Hackathons", "Photography", "Badminton", "Boba Runs", "Synthwave"],
  status: "Studying at Tech Hub 💻",
  isOnline: true
};

export const INITIAL_STORIES = [
  {
    id: "story_1",
    authorName: "Alex (You)",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
    caption: "Sunset over the engineering quad today! 🌅",
    timeAgo: "2h ago",
    isUser: true,
    viewed: false
  },
  {
    id: "story_2",
    authorName: "Maya Chen",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    caption: "Coffee + Algorithms grind in the library basement 📚",
    timeAgo: "3h ago",
    isUser: false,
    viewed: false
  },
  {
    id: "story_3",
    authorName: "Jordan Blake",
    authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80",
    caption: "Our robot finally passed the obstacle test! 🤖🎉",
    timeAgo: "5h ago",
    isUser: false,
    viewed: false
  },
  {
    id: "story_4",
    authorName: "Sofia Ramos",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80",
    caption: "Free bagels & matcha outside the Science Pavilion! 🥯🍵",
    timeAgo: "6h ago",
    isUser: false,
    viewed: false
  },
  {
    id: "story_5",
    authorName: "Liam Vance",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80",
    caption: "Weekend hiking trip with Outdoor Club 🌲🏔️",
    timeAgo: "8h ago",
    isUser: false,
    viewed: true
  }
];

export const INITIAL_POSTS = [
  {
    id: "post_1",
    author: {
      name: "Marcus Thorne",
      handle: "@marcus_t",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      major: "Mechanical Engineering",
      year: "Senior",
      isVerified: true
    },
    category: "Academic",
    content: "PSA for everyone taking CS 310 / Algorithms with Prof. Harrison: we put together a shared Google Doc with practice proofs and dynamic programming cheatsheets! Drop a comment if you want the link or want to join our study cram in Library 302 tonight.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    timestamp: "25 minutes ago",
    likes: 42,
    hasLiked: false,
    reactions: { like: 28, fire: 11, helpful: 14 },
    userReaction: null,
    poll: null,
    commentsCount: 16,
    comments: [
      {
        id: "c_1",
        author: "Maya Chen",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        text: "Please send the link! Dijkstra's algorithm and Ford-Fulkerson are kicking my butt right now 😭",
        timestamp: "18m ago",
        likes: 4
      },
      {
        id: "c_2",
        author: "Devon Reed",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        text: "I'll bring extra whiteboard markers and some cold brew. Room 302 around 7pm?",
        timestamp: "10m ago",
        likes: 6
      }
    ]
  },
  {
    id: "post_2",
    author: {
      name: "Campus Dining Watchdog",
      handle: "@foodie_cougar",
      avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80",
      major: "Hospitality & Business",
      year: "Sophomore",
      isVerified: true
    },
    category: "Poll",
    content: "Crucial student survey: Which campus coffee spot is objectively superior during finals week? Vote below and let's settle this debate once and for all ☕👇",
    image: null,
    timestamp: "1 hour ago",
    likes: 89,
    hasLiked: true,
    reactions: { like: 52, laugh: 24, fire: 13 },
    userReaction: "like",
    poll: {
      question: "Best campus coffee / study vibe spot?",
      totalVotes: 324,
      userVotedOption: 0,
      options: [
        { id: "opt_1", text: "Underground Bean (Library B1)", votes: 148 },
        { id: "opt_2", text: "Quad Brew Co. (Student Union)", votes: 98 },
        { id: "opt_3", text: "Tech Roasters (Science Hall)", votes: 54 },
        { id: "opt_4", text: "Dorm Room Keurig (Budget Mode)", votes: 24 }
      ]
    },
    commentsCount: 31,
    comments: [
      {
        id: "c_3",
        author: "Rachel Green",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        text: "Underground Bean oat milk latte with lavender syrup literally kept me alive during midterms.",
        timestamp: "45m ago",
        likes: 12
      }
    ]
  },
  {
    id: "post_3",
    author: {
      name: "Anonymous Cougar",
      handle: "@anon_student",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
      major: "Anonymous Student",
      year: "Campus Whisperer",
      isVerified: false,
      isAnonymous: true
    },
    category: "Campus Buzz",
    content: "Shoutout to whoever played Mario Kart soundtrack on full blast in the 4th floor engineering stairwell at 2 AM last night. The speed boost energy was actually unmatched. 🏎️💨",
    image: null,
    timestamp: "3 hours ago",
    likes: 178,
    hasLiked: false,
    reactions: { laugh: 112, fire: 45, like: 21 },
    userReaction: null,
    poll: null,
    commentsCount: 22,
    comments: [
      {
        id: "c_4",
        author: "Zack Miller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        text: "That was our robotics sub-team after our stepper motor finally spun without catching fire 😂",
        timestamp: "2h ago",
        likes: 38
      }
    ]
  },
  {
    id: "post_4",
    author: {
      name: "Elena Rostova",
      handle: "@elena_design",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      major: "Fine Arts & Architecture",
      year: "Junior",
      isVerified: true
    },
    category: "Lost & Found",
    content: "FOUND: Left an iPad Air with an Apple Pencil in a sage green magnetic case on the long wooden table by the 2nd-floor art terrace. Handed it over to the Campus Security front desk at 1:15 PM! Hope whoever lost it gets it back quickly 🙏",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    timestamp: "4 hours ago",
    likes: 64,
    hasLiked: false,
    reactions: { helpful: 48, like: 16 },
    userReaction: null,
    poll: null,
    commentsCount: 5,
    comments: []
  },
  {
    id: "post_5",
    author: {
      name: "Kofi Mensah",
      handle: "@kofi_m",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      major: "Economics & Data Science",
      year: "Senior",
      isVerified: false
    },
    category: "Housing",
    content: "Roommate Wanted for Spring Semester! 🏡 We have a sunny private bedroom available in a 3-bed / 2-bath townhouse just 8 minutes walking distance to North Campus. Fully furnished, in-unit laundry, ultra-fast fiber WiFi. $780/mo + utilities split. Looking for clean, friendly, chill student! DM me if interested.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    timestamp: "6 hours ago",
    likes: 35,
    hasLiked: false,
    reactions: { like: 29, helpful: 6 },
    userReaction: null,
    poll: null,
    commentsCount: 9,
    comments: []
  }
];

export const INITIAL_STUDY_BUDDIES = [
  {
    id: "sb_1",
    name: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    major: "Computer Science",
    year: "Junior",
    course: "CS 310 - Algorithms & Data Structures",
    courseCode: "CS 310",
    topic: "Dynamic Programming & Graph Algorithms",
    studyStyle: "Collaborative Whiteboarding",
    preferredLocation: "Main Library 3rd Floor Pods",
    availability: "Tues / Thurs 6:00 PM - 9:00 PM",
    bio: "Aiming for an A- in CS310! Love breaking problems down into visual diagrams and practicing LeetCode patterns.",
    matched: false,
    requested: false,
    membersJoined: 3,
    maxMembers: 4,
    tags: ["Whiteboarding", "LeetCode", "Exam Prep"]
  },
  {
    id: "sb_2",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    major: "Molecular Biology",
    year: "Sophomore",
    course: "BIO 220 - Cell Genetics & Biochemistry",
    courseCode: "BIO 220",
    topic: "DNA Replication & Enzyme Kinetics",
    studyStyle: "Flashcards & Active Recall",
    preferredLocation: "Health Sciences Atrium or Zoom",
    availability: "Mondays & Wednesdays after 4:00 PM",
    bio: "Pre-med track. I make detailed Anki decks with 3D molecular renders. Looking for someone to quiz each other before midterms!",
    matched: false,
    requested: false,
    membersJoined: 2,
    maxMembers: 3,
    tags: ["Anki Decks", "Active Recall", "Pre-Med"]
  },
  {
    id: "sb_3",
    name: "Sara Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    major: "Applied Mathematics & Statistics",
    year: "Junior",
    course: "MATH 240 - Linear Algebra",
    courseCode: "MATH 240",
    topic: "Eigenvalues, Matrix Diagonalization & Vector Spaces",
    studyStyle: "Silent Focus (Pomodoro 50/10)",
    preferredLocation: "Silent Reading Hall Room 405",
    availability: "Daily 1:00 PM - 5:00 PM",
    bio: "Strictly Pomodoro! 50 min deep work, 10 min break. Keeps procrastination at zero. Happy to share step-by-step problem sets.",
    matched: true,
    requested: true,
    membersJoined: 2,
    maxMembers: 2,
    tags: ["Pomodoro", "Deep Work", "Proof Help"]
  },
  {
    id: "sb_4",
    name: "Lucas Romero",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    major: "Economics & Finance",
    year: "Senior",
    course: "ECON 202 - Macroeconomic Theory",
    courseCode: "ECON 202",
    topic: "IS-LM Models & Monetary Policy Analysis",
    studyStyle: "Group Discussion & Real-World Case Studies",
    preferredLocation: "Student Union Lounge 2B",
    availability: "Fridays 2:00 PM - 6:00 PM & Weekends",
    bio: "Preparing for Wall Street / Consulting interviews and want to nail the macro models. Good sense of humor, plenty of snacks guaranteed.",
    matched: false,
    requested: false,
    membersJoined: 1,
    maxMembers: 4,
    tags: ["Case Studies", "Macro Models", "Group Discussion"]
  },
  {
    id: "sb_5",
    name: "Chloe Dupont",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    major: "Psychology & Cognitive Science",
    year: "Freshman",
    course: "PSYC 101 - Introduction to Cognitive Systems",
    courseCode: "PSYC 101",
    topic: "Neurotransmitters & Memory Formation",
    studyStyle: "Mind Mapping & Creative Mnemonics",
    preferredLocation: "Campus Greenhouse Terrace",
    availability: "Tuesday / Thursday mornings",
    bio: "First year getting adjusted to college-level testing. Love colorful summary notes and concept mind-maps!",
    matched: false,
    requested: false,
    membersJoined: 2,
    maxMembers: 4,
    tags: ["Mind Maps", "Freshman Welcome", "Visual Notes"]
  }
];

export const INITIAL_CLUBS = [
  {
    id: "club_1",
    name: "Robotics & AI Guild",
    category: "Tech & Engineering",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    avatar: "🤖",
    membersCount: 284,
    isJoined: true,
    president: "Jordan Blake",
    meetingTime: "Every Thursday @ 6:30 PM (Makerspace Lab 104)",
    description: "Build autonomous rovers, drones, and machine learning models. We participate in RoboCup and national robotics competitions! All skill levels welcome.",
    tags: ["Robotics", "ROS", "Machine Learning", "Hardware", "Arduino"],
    recentAnnouncement: "Competition team kickoff tonight! Free pizza provided."
  },
  {
    id: "club_2",
    name: "Campus Shutter Photography",
    category: "Arts & Media",
    banner: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    avatar: "📸",
    membersCount: 195,
    isJoined: false,
    president: "Elena Rostova",
    meetingTime: "Sundays @ 4:00 PM (Golden Hour Photo Walks)",
    description: "From 35mm film lovers to mirrorless digital pros and smartphone street photographers. Weekly photo walks, darkroom workshops, and semester gallery exhibitions.",
    tags: ["Street Photography", "Darkroom", "Portrait", "Lightroom"],
    recentAnnouncement: "Golden hour photowalk at the Botanical Gardens this Sunday!"
  },
  {
    id: "club_3",
    name: "Late Night Hackers & Builders",
    category: "Coding & Startups",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    avatar: "⚡",
    membersCount: 412,
    isJoined: true,
    president: "Alex Rivera",
    meetingTime: "Fridays @ 8:00 PM - Midnight (Tech Innovation Wing)",
    description: "Got an app idea, game, or hardware hack? Spend Friday nights shipping cool projects with free Red Bull, peer code reviews, and demo presentations.",
    tags: ["Full Stack", "Indie Hacking", "Open Source", "Hackathons"],
    recentAnnouncement: "Demo Day is in 2 weeks! Sign up your project in the guild sheet."
  },
  {
    id: "club_4",
    name: "Peak & Trail Outdoor Adventure",
    category: "Sports & Outdoors",
    banner: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    avatar: "🌲",
    membersCount: 340,
    isJoined: false,
    president: "Liam Vance",
    meetingTime: "Bi-weekly Saturdays (Weekend Expeditions)",
    description: "Weekend hikes, rock climbing, camping, and winter ski trips. Gear rentals available for members at no cost thanks to student activity funding.",
    tags: ["Hiking", "Rock Climbing", "Camping", "Bouldering", "Nature"],
    recentAnnouncement: "Mount Mitchell summit trek gear check this Wednesday."
  },
  {
    id: "club_5",
    name: "Cougar Esports & Gaming",
    category: "Gaming & Esports",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    avatar: "🎮",
    membersCount: 518,
    isJoined: false,
    president: "Tyler 'Pixel' Hayes",
    meetingTime: "Wednesdays & Saturdays @ 7:00 PM (Esports Arena)",
    description: "Competitive teams for Valorant, Smash Bros, League of Legends, and Rocket League, plus casual game nights for board games, Mario Party, and RPGs.",
    tags: ["Valorant", "Smash Bros", "League", "LAN Parties", "Casual"],
    recentAnnouncement: "Smash Ultimate tournament registration closes tomorrow at midnight."
  },
  {
    id: "club_6",
    name: "Women in STEM & Leadership",
    category: "Diversity & Leadership",
    banner: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    avatar: "🚀",
    membersCount: 290,
    isJoined: true,
    president: "Dr. Ananya Patel (Advisor) & Maya Chen",
    meetingTime: "Tuesdays @ 5:30 PM (Science Pavilion 300)",
    description: "Empowering women and non-binary students in engineering, computing, data, and natural sciences through mentorship, industry panels, and scholarship workshops.",
    tags: ["Mentorship", "Career Prep", "Networking", "STEM"],
    recentAnnouncement: "Alumni panel with Google & Genentech engineers this Tuesday."
  }
];

export const INITIAL_EVENTS = [
  {
    id: "ev_1",
    title: "Campus Hackathon 2026: Build the Future",
    organizer: "Late Night Hackers & ACM Student Chapter",
    date: "This Saturday, Nov 2",
    time: "9:00 AM - 9:00 PM",
    location: "Student Innovation Center, Grand Hall",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    category: "Hackathon",
    badge: "Free Food & Swag 🍕",
    attendeesCount: 184,
    isRsvp: true,
    rsvpStatus: "going",
    description: "12 hours of rapid prototyping, mentorship from industry tech leads, and $5,000+ in hardware prizes and sponsor swag. Hardware kit rentals available on site. All majors welcome!",
    tags: ["Free Food", "Prizes", "Coding", "Mentorship"]
  },
  {
    id: "ev_2",
    title: "Sunset Acoustic Jam & Open Mic",
    organizer: "Campus Music Collective & Student Union",
    date: "Friday, Nov 1",
    time: "5:30 PM - 8:30 PM",
    location: "Central Quad Lawn & Amphitheater",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    category: "Social",
    badge: "Free Boba & Snacks 🧋",
    attendeesCount: 142,
    isRsvp: false,
    rsvpStatus: null,
    description: "Bring your guitar, ukulele, poetry, or just a blanket to lounge on the grass. Free boba tea for the first 100 students! Come relax right before midterms kick into gear.",
    tags: ["Live Music", "Free Boba", "Acoustic", "Chill"]
  },
  {
    id: "ev_3",
    title: "Midterm Cram & Boba Night",
    organizer: "Student Wellness Association",
    date: "Tuesday, Nov 5",
    time: "7:00 PM - 11:00 PM",
    location: "Campus Library, Collaborative Wing",
    banner: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    category: "Study",
    badge: "Therapy Dogs Present 🐕",
    attendeesCount: 220,
    isRsvp: true,
    rsvpStatus: "going",
    description: "Quiet study zones, peer tutoring tables for Calc, Physics, and CS, certified therapy golden retrievers to pet, and complimentary artisan coffee & boba tea all night.",
    tags: ["Therapy Dogs", "Study Cram", "Free Coffee", "Wellness"]
  },
  {
    id: "ev_4",
    title: "Intramural Spikeball & Volleyball Tournament",
    organizer: "Recreation & Club Sports",
    date: "Sunday, Nov 3",
    time: "1:00 PM - 5:00 PM",
    location: "Recreational Sports Fields & Sand Pit",
    banner: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&auto=format&fit=crop&q=80",
    category: "Sports",
    badge: "Champion Medals 🏆",
    attendeesCount: 96,
    isRsvp: false,
    rsvpStatus: null,
    description: "Sign up in teams of 2 for Spikeball or teams of 4 for Sand Volleyball. Music, hydration stations, and champion T-shirts for the winning squads!",
    tags: ["Outdoor Sports", "Tournament", "Spikeball", "Fun"]
  },
  {
    id: "ev_5",
    title: "Tech & Startup Career Fair: Fast-Track Mixer",
    organizer: "Campus Career Center",
    date: "Thursday, Nov 7",
    time: "2:00 PM - 6:00 PM",
    location: "Alumni Memorial Ballroom",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
    category: "Career",
    badge: "Free Headshots 📸",
    attendeesCount: 310,
    isRsvp: false,
    rsvpStatus: null,
    description: "Meet recruiters and alumni founders hiring for Summer 2026 internships. Bring printed resumes. Professional LinkedIn headshot booth provided for free.",
    tags: ["Internships", "Career Fair", "Headshots", "Networking"]
  }
];

export const INITIAL_CHANNELS = [
  { id: "ch_general", name: "general-campus", desc: "Open lounge for all student discussions", icon: "💬", unread: 2 },
  { id: "ch_study", name: "study-grind", desc: "Find study groups, share notes and tips", icon: "📚", unread: 0 },
  { id: "ch_events", name: "campus-events", desc: "Upcoming club meetings, parties & workshops", icon: "🎉", unread: 1 },
  { id: "ch_lost", name: "lost-and-found", desc: "Found keys, IDs, backpacks and laptops", icon: "🔍", unread: 0 },
  { id: "ch_market", name: "student-market", desc: "Buy/sell textbooks, dorm essentials & gear", icon: "🏷️", unread: 0 }
];

export const INITIAL_CHANNEL_MESSAGES = {
  ch_general: [
    {
      id: "m_1",
      senderName: "Maya Chen",
      senderAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      time: "2:14 PM",
      text: "Has anyone tried the new artisan noodle bar in the dining hall? Is the spicy ramen legit?",
      isMe: false
    },
    {
      id: "m_2",
      senderName: "Jordan Blake",
      senderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      time: "2:16 PM",
      text: "Can confirm, the chili oil broth is actually spicy and the pork chashu is tender! 10/10 compared to standard dining food.",
      isMe: false
    },
    {
      id: "m_3",
      senderName: "Alex Morgan",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      time: "2:18 PM",
      text: "Heading there right now after my algorithms lecture! Thanks for the tip 🙌",
      isMe: true
    }
  ],
  ch_study: [
    {
      id: "ms_1",
      senderName: "Marcus Thorne",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      time: "1:40 PM",
      text: "Quiet pods on floor 3 are nearly all taken, but 4th floor has plenty of open desks with power outlets!",
      isMe: false
    }
  ],
  ch_events: [
    {
      id: "me_1",
      senderName: "Alex Rivera",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      time: "11:20 AM",
      text: "Hackathon swag bags just arrived. We got custom mechanical keyboard switches for everyone participating this weekend! 🔥",
      isMe: false
    }
  ]
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    type: "study",
    title: "New Study Buddy Match!",
    message: "Maya Chen accepted your study invitation for CS 310 Algorithms.",
    time: "10 mins ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "notif_2",
    type: "event",
    title: "Event Reminder",
    message: "Campus Hackathon 2026 starts in 2 days. Check in details are live.",
    time: "1 hour ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "notif_3",
    type: "like",
    title: "Post Upvoted",
    message: "Your post about 'Algorithms cheatsheet doc' reached 40+ upvotes!",
    time: "3 hours ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_CONFESSIONS = [
  {
    id: "conf_1",
    tag: "Crushes & Romance",
    alias: "Secret Admirer #409",
    avatarBg: "from-pink-500 to-rose-600",
    text: "To the person in the emerald green beanie who sits in row 4 of ECON 202 every Tuesday morning: your laugh during the professor's dry inflation jokes makes my entire week. I hope we bump into each other at Underground Bean one day ☕🫣",
    timestamp: "45 mins ago",
    mood: "Wholesome & Romantic 💕",
    reactions: {
      relatable: 52,
      wild: 6,
      heart: 89,
      tea: 14
    },
    userReaction: "heart",
    commentsCount: 2,
    comments: [
      {
        id: "cc_1",
        alias: "Anon Chemist",
        text: "Green beanie person is definitely Tyler from the rowing team haha! Go talk to him!",
        timestamp: "30m ago"
      },
      {
        id: "cc_2",
        alias: "Ghost of 3rd Floor",
        text: "Campus romance is so back. Rooting for you OP!! 🥹",
        timestamp: "12m ago"
      }
    ]
  },
  {
    id: "conf_2",
    tag: "Academic Pain",
    alias: "Sleep-Deprived Engineer #88",
    avatarBg: "from-amber-500 to-orange-600",
    text: "I told my parents I spent all weekend studying for the Physics midterms, but in reality I spent 14 hours redesigning my Notion workspace and building an automated color-coded meal tracker that I will probably never open again.",
    timestamp: "2 hours ago",
    mood: "Deeply Relatable 💀",
    reactions: {
      relatable: 142,
      wild: 29,
      heart: 35,
      tea: 11
    },
    userReaction: null,
    commentsCount: 1,
    comments: [
      {
        id: "cc_3",
        alias: "Procrastination Queen",
        text: "Productive procrastination is an Olympic sport and college students hold all gold medals.",
        timestamp: "1h ago"
      }
    ]
  },
  {
    id: "conf_3",
    tag: "Dining Hall Secrets",
    alias: "Campus Foodie Anonymous",
    avatarBg: "from-emerald-500 to-teal-600",
    text: "Here's an insider dining hall hack nobody talks about: if you mix the soft-serve vanilla ice cream with the hot chai concentrate from the tea station, you get an elite gourmet chai affogato. Thank me later.",
    timestamp: "4 hours ago",
    mood: "Game Changer 🍦",
    reactions: {
      relatable: 98,
      wild: 41,
      heart: 112,
      tea: 67
    },
    userReaction: "tea",
    commentsCount: 1,
    comments: [
      {
        id: "cc_4",
        alias: "Library Lurker",
        text: "Just tested this right now in South Dining. MY LIFE IS CHANGED.",
        timestamp: "2h ago"
      }
    ]
  },
  {
    id: "conf_4",
    tag: "Campus Secrets",
    alias: "Midnight Phantom #12",
    avatarBg: "from-purple-600 to-indigo-700",
    text: "The 5th-floor staircase in the humanities building has the best echo acoustics on campus. I go there at 11 PM to play the Zelda Ocarina theme on my kazoo. If you've ever heard it, no you haven't.",
    timestamp: "7 hours ago",
    mood: "Chaotic Good 🎶",
    reactions: {
      relatable: 81,
      wild: 63,
      heart: 44,
      tea: 22
    },
    userReaction: null,
    commentsCount: 1,
    comments: [
      {
        id: "cc_5",
        alias: "Resident Night Owl",
        text: "I SWEAR I HEARD THIS LAST THURSDAY AND THOUGHT I WAS HALLUCINATING 😂",
        timestamp: "5h ago"
      }
    ]
  },
  {
    id: "conf_5",
    tag: "Dorm Life Drama",
    alias: "Silent Roommate Survivor",
    avatarBg: "from-blue-600 to-cyan-600",
    text: "My roommate leaves exactly 2 sips of milk in the carton so they don't have to be the one who throws it away and takes the recycling out. I've started putting those two sips into an ice cube tray. Today I will make them iced coffee with their own milk cubes.",
    timestamp: "11 hours ago",
    mood: "Petty Revenge 🧊",
    reactions: {
      relatable: 119,
      wild: 88,
      heart: 31,
      tea: 94
    },
    userReaction: null,
    commentsCount: 0,
    comments: []
  }
];

