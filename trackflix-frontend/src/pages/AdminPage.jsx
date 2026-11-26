import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Film, Tv, Star, Users, Menu, House, ChartColumn } from "lucide-react";

import { auth } from "../firebase/firebase-config";
import TabsNav from "../components/AdminTabs/TabsNav";
import { ADMIN_ITEMS, SECTION_HINTS } from "../components/AdminTabs/sections";
import "../styles/admin-glass.css";
import {
  CelebritiesTab,
  FanFavouritesTab,
  FullMovieDetailsTab,
  FullMoviesTab,
  LiveTVShowsTab,
  LiveTVDetailsTab,
  FeaturedItemsTab,
  FTRecommendationsTab,
  TopTenMoviesTab,
  MoreCelebrityTab,
  InterestsTab,
  UsersTab,
} from "../components/AdminTabs";

import useAdminData from "../hooks/useAdminData";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("celebrities");
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    celebrities,
    fanFavourites,
    fullMovieDetails,
    fullMovies,
    liveTVShows,
    liveTVDetails,
    featuredItems,
    ftRecommendations,
    topTenMovies,
    moreCelebrities,
    interests,
    users,
    loadCelebrities,
    loadFanFavourites,
    loadFullMovieDetails,
    loadFullMovies,
    loadLiveTVShows,
    loadLiveTVDetails,
    loadFeaturedItems,
    loadFTRecommendations,
    loadTopTenMovies,
    loadMoreCelebrities,
    loadInterests,
    loadUsers,
  } = useAdminData();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  const counts = {
    celebrities,
    fanFavourites,
    fullMovieDetails,
    fullMovies,
    liveTVShows,
    liveTVDetails,
    featuredItems,
    ftRecommendations,
    topTenMovies,
    moreCelebrities,
    interests,
    users,
  };
  const countOf = (k) => (Array.isArray(counts[k]) ? counts[k].length : 0);
  const navCounts = Object.fromEntries(Object.keys(counts).map((k) => [k, countOf(k)]));

  const current = ADMIN_ITEMS.find((i) => i.key === activeTab);
  const currentCount = current?.countKey ? countOf(current.countKey) : null;

  const stats = [
    { key: "fullmovies", label: "Movies", value: countOf("fullMovies"), icon: Film, chip: "rgba(255,255,255,.08)", ink: "#fde68a" },
    { key: "livetvshows", label: "TV shows", value: countOf("liveTVShows"), icon: Tv, chip: "rgba(255,255,255,.08)", ink: "#fde68a" },
    { key: "celebrities", label: "Celebrities", value: countOf("celebrities"), icon: Star, chip: "rgba(255,255,255,.08)", ink: "#fde68a" },
    { key: "users", label: "Users", value: countOf("users"), icon: Users, chip: "rgba(255,255,255,.08)", ink: "#fde68a" },
  ];

  return (
    <div className="glass-admin">
      <TabsNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={navCounts}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="ga-main">
        <header className="ga-top">
          <button
            type="button"
            className="ga-btn ga-btn-icon"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          <div className="ga-top-text">
            <h1 className="ga-top-title">{current?.label || "Dashboard"}</h1>
            <p className="ga-top-sub">
              {SECTION_HINTS[activeTab]}
              {currentCount !== null && ` ${currentCount} ${currentCount === 1 ? "record" : "records"}.`}
            </p>
          </div>
          <div className="ga-top-actions">
            <button type="button" className="ga-btn" onClick={() => navigate("/")} aria-label="Go to home page">
              <House aria-hidden="true" />
              <span className="ga-btn-label">View site</span>
            </button>
          </div>
        </header>

        <section className="ga-stats" aria-label="Overview">
          {stats.map(({ key, label, value, icon: Icon, chip, ink }) => (
            <button
              key={key}
              type="button"
              className="ga-stat"
              onClick={() => setActiveTab(key)}
              style={{ "--chip": chip, "--chip-ink": ink }}
              aria-label={`${label}: ${value}. Open ${label}`}
            >
              <span className="ga-stat-icon">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <span className="ga-stat-value">{value}</span>
                <span className="ga-stat-label">{label}</span>
              </span>
            </button>
          ))}
        </section>

        <div className="ga-content">
          {activeTab === "celebrities" && (
            <CelebritiesTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              celebrities={celebrities}
              loadCelebrities={loadCelebrities}
            />
          )}

          {activeTab === "fanfavourites" && (
            <FanFavouritesTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              fanFavourites={fanFavourites}
              loadFanFavourites={loadFanFavourites}
            />
          )}

          {activeTab === "fullmoviedetails" && (
            <FullMovieDetailsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              fullMovieDetails={fullMovieDetails}
              loadFullMovieDetails={loadFullMovieDetails}
            />
          )}

          {activeTab === "fullmovies" && (
            <FullMoviesTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              fullMovies={fullMovies}
              loadFullMovies={loadFullMovies}
            />
          )}

          {activeTab === "livetvshows" && (
            <LiveTVShowsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              liveTVShows={liveTVShows}
              loadLiveTVShows={loadLiveTVShows}
            />
          )}

          {activeTab === "livetvdetails" && (
            <LiveTVDetailsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              liveTVDetails={liveTVDetails}
              loadLiveTVDetails={loadLiveTVDetails}
            />
          )}

          {activeTab === "featureditems" && (
            <FeaturedItemsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              featuredItems={featuredItems}
              loadFeaturedItems={loadFeaturedItems}
            />
          )}

          {activeTab === "ftrecommendations" && (
            <FTRecommendationsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              ftRecommendations={ftRecommendations}
              loadFTRecommendations={loadFTRecommendations}
            />
          )}

          {activeTab === "toptenmovies" && (
            <TopTenMoviesTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              topTenMovies={topTenMovies}
              loadTopTenMovies={loadTopTenMovies}
            />
          )}

          {activeTab === "morecelebrity" && (
            <MoreCelebrityTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              moreCelebrities={moreCelebrities}
              loadMoreCelebrities={loadMoreCelebrities}
            />
          )}

          {activeTab === "interests" && (
            <InterestsTab
              form={form}
              setForm={setForm}
              editingId={editingId}
              setEditingId={setEditingId}
              submitting={submitting}
              setSubmitting={setSubmitting}
              interests={interests}
              loadInterests={loadInterests}
            />
          )}

          {activeTab === "users" && <UsersTab users={users} />}

          {activeTab === "loginstats" && (
            <div className="ga-empty">
              <ChartColumn size={28} aria-hidden="true" style={{ margin: "0 auto 10px" }} />
              <p>Login stats aren’t available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
