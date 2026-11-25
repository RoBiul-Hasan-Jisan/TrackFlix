import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Clapperboard,
  Film,
  Heart,
  LogOut,
  Radio,
  Sparkles,
  Star,
  Tv,
  Users,
  WandSparkles,
} from "lucide-react";

const tabs = [
  { key: "celebrities", label: "Celebrities", icon: Star },
  { key: "fanfavourites", label: "Fan favourites", icon: Heart },
  { key: "fullmoviedetails", label: "Movie details", icon: Clapperboard },
  { key: "fullmovies", label: "Full movies", icon: Film },
  { key: "livetvdetails", label: "TV details", icon: Radio },
  { key: "livetvshows", label: "TV shows", icon: Tv },
  { key: "featureditems", label: "Featured items", icon: Sparkles },
  { key: "ftrecommendations", label: "Featured today", icon: WandSparkles },
  { key: "interests", label: "Interests", icon: BadgeCheck },
  { key: "toptenmovies", label: "Top ten movies", icon: Film },
  { key: "morecelebrity", label: "Recommended talent", icon: Users },
  { key: "users", label: "Users", icon: Users },
  { key: "loginstats", label: "Login stats", icon: Radio },
];

const TabsNav = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar" aria-label="Admin dashboard sidebar">
      <button className="admin-brand" onClick={() => navigate("/")} aria-label="TrackFlix home">
        <span className="admin-brand-mark"><Clapperboard size={21} strokeWidth={2.3} /></span>
        <span className="admin-brand-copy"><strong>TRACKFLIX</strong><small>STUDIO CONTROL</small></span>
      </button>

      <div className="admin-nav-heading">WORKSPACE</div>
      <nav className="admin-nav-list" aria-label="Dashboard sections">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`admin-nav-item${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <IconComponent size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{tab.label}</span>
              {isActive && <span className="admin-nav-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-status"><span /> All systems operational</div>
        <button type="button" onClick={onLogout} className="admin-logout">
          <LogOut size={17} aria-hidden="true" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default TabsNav;
