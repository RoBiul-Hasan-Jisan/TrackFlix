import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Activity, Database, Film, Users } from "lucide-react";

import { auth } from "../firebase/firebase-config";
import TabsNav from "../components/AdminTabs/TabsNav";
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
  } = useAdminData();

  const collectionCount = [
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
  ].reduce((total, collection) => total + (Array.isArray(collection) ? collection.length : 0), 0);
  const sectionNames = {
    celebrities: "Celebrities",
    fanfavourites: "Fan favourites",
    fullmoviedetails: "Movie details",
    fullmovies: "Full movies",
    livetvdetails: "TV show details",
    livetvshows: "TV shows",
    featureditems: "Featured items",
    ftrecommendations: "Featured today",
    interests: "Interests",
    toptenmovies: "Top ten movies",
    morecelebrity: "Recommended talent",
    users: "Users",
    loginstats: "Login stats",
  };

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

  return (
    <main className="admin-dashboard">
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="admin-main">
        <header className="admin-page-heading">
          <div>
            <div className="admin-eyebrow"><span /> CONTENT MANAGEMENT</div>
            <h1>{sectionNames[activeTab] || "Admin overview"}</h1>
            <p>Manage your streaming catalogue and audience from one place.</p>
          </div>
          <div className="admin-live-chip"><Activity size={15} /> Live workspace</div>
        </header>

        <section className="admin-metrics" aria-label="Dashboard overview">
          <article className="admin-metric-card">
            <span className="admin-metric-icon violet"><Database size={18} /></span>
            <div><span className="admin-metric-label">Catalogue entries</span><strong>{collectionCount.toLocaleString()}</strong></div>
            <span className="admin-metric-note">Across all sections</span>
          </article>
          <article className="admin-metric-card">
            <span className="admin-metric-icon blue"><Film size={18} /></span>
            <div><span className="admin-metric-label">Content sections</span><strong>11</strong></div>
            <span className="admin-metric-note">Ready to manage</span>
          </article>
          <article className="admin-metric-card">
            <span className="admin-metric-icon mint"><Users size={18} /></span>
            <div><span className="admin-metric-label">Registered users</span><strong>{users.length.toLocaleString()}</strong></div>
            <span className="admin-metric-note">Audience accounts</span>
          </article>
        </section>

        <section className="admin-content-panel" aria-label={`${sectionNames[activeTab] || "Admin"} management`}>
          <div className="admin-panel-heading">
            <div><span className="admin-panel-kicker">WORKSPACE / CATALOGUE</span><h2>{sectionNames[activeTab] || "Management"}</h2></div>
            <span className="admin-panel-live"><span /> Synced data</span>
          </div>

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
        </section>
      </div>
    </main>
  );
};

export default AdminPage;
