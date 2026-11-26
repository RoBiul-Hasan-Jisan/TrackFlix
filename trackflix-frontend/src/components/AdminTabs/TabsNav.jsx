import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { LogOut, X } from "lucide-react";
import logo from "../../assets/trackflix-logo.png";
import { ADMIN_GROUPS } from "./sections";

/**
 * Glass sidebar for the admin dashboard.
 * Same props as before (activeTab, setActiveTab) plus optional
 * counts / open / onClose for the record counts and the mobile drawer.
 */
const TabsNav = ({ activeTab, setActiveTab, counts = {}, open = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const navRef = useRef(null);

  // keep the selected item visible when the list scrolls
  useEffect(() => {
    navRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [activeTab, open]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const pick = (key) => {
    setActiveTab(key);
    onClose();
  };

  return (
    <>
      {open && <button type="button" className="ga-scrim" aria-label="Close menu" onClick={onClose} />}

      <aside className="ga-side" data-open={open} aria-label="Admin navigation">
        <div className="ga-brand-row">
          <button type="button" className="ga-brand" onClick={() => navigate("/")} aria-label="Go to home page">
            <img src={logo} alt="TrackFlix" className="ga-logo" draggable={false} />
            <span className="ga-brand-sub">Admin dashboard</span>
          </button>
          <button type="button" className="ga-close" onClick={onClose} aria-label="Close menu">
            <X />
          </button>
        </div>

        <nav className="ga-nav" ref={navRef}>
          {ADMIN_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="ga-group-title">{group.title}</p>
              {group.items.map(({ key, label, icon: Icon, countKey }) => {
                const isActive = activeTab === key;
                const count = countKey ? counts[countKey] : undefined;
                return (
                  <button
                    key={key}
                    type="button"
                    className="ga-nav-item"
                    onClick={() => pick(key)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Switch to ${label} tab`}
                  >
                    <Icon aria-hidden="true" />
                    <span className="ga-nav-label">{label}</span>
                    {typeof count === "number" && <span className="ga-nav-count">{count}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="ga-side-foot">
          <button type="button" className="ga-nav-item" onClick={handleLogout} aria-label="Logout">
            <LogOut aria-hidden="true" />
            <span className="ga-nav-label">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default TabsNav;
