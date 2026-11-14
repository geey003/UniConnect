import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FeedView from "./components/Feed/FeedView";
import ConfessionsView from "./components/Confessions/ConfessionsView";
import StudyBuddyView from "./components/Study/StudyBuddyView";
import ClubsView from "./components/Clubs/ClubsView";
import EventsView from "./components/Events/EventsView";
import ChatView from "./components/Chat/ChatView";
import ChatDrawer from "./components/Chat/ChatDrawer";
import ProfileModal from "./components/Profile/ProfileModal";
import CreatePostModal from "./components/CreatePostModal";
import MobileNav from "./components/MobileNav";
import Toast from "./components/Toast";

function MainContent() {
  const { activeTab } = useApp();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case "confessions":
        return <ConfessionsView />;
      case "study":
        return <StudyBuddyView />;
      case "clubs":
        return <ClubsView />;
      case "events":
        return <EventsView />;
      case "chat":
        return <ChatView />;
      case "feed":
      default:
        return <FeedView onOpenCreatePost={() => setIsCreatePostOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors pb-16 md:pb-6">
      {/* Top Navigation */}
      <Header onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Active View */}
          <div className="flex-1 min-w-0">
            {renderActiveView()}
          </div>
        </div>
      </main>

      {/* Floating Drawers & Modals */}
      <ChatDrawer />
      <ProfileModal />
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
      <Toast />

      {/* Mobile Native Navigation */}
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
