import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
//import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  // The admin dashboard has its own sidebar layout, so the public header/footer are hidden there.
  const isAdminRoute = pathname.startsWith("/admin");

  if (loading) {
    return <div className="flex-grow flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {!isAdminRoute && <Header isLoggedIn={!!user} user={user} />}

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-32 text-gray-300">Loading...</div>
          }
        >
          <Outlet context={{ user }} />
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}

      
     
    </div>
  );
}

export default App;
