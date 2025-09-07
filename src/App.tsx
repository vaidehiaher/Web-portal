import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LandingAnimation } from "./components/LandingAnimation";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { SmartSearchChatbot } from "./components/SmartSearchChatbot";
import { JobSearch } from "./pages/JobSearch";
import { Placements } from "./pages/Placements";
import { About } from "./pages/About";
import { HigherStudies } from "./pages/HigherStudies";
import { HigherStudiesAdmin } from "./pages/HigherStudiesAdmin";
import { SkillMapper } from "./pages/SkillMapper";
import { MyProfile } from "./pages/MyProfile";
import { SoPAssistantPage } from "./pages/SoPAssistant";
import RegisterPage from "./pages/Register"; // ✅ registration page
import Marquee from "react-fast-marquee";
import "./globals.css";

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showLanding, setShowLanding] = React.useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ✅ Landing animation before login
  if (showLanding && !user) {
    return (
      <>
        <LandingAnimation onComplete={() => setShowLanding(false)} />
        <SmartSearchChatbot />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {!user ? (
          // ✅ Not logged in → login & register routes
          <>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // ✅ Logged in → dashboard & other routes
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/about" element={<About />} />
            <Route path="/higher-studies" element={<HigherStudies />} />
            <Route
              path="/higher-studies/admin"
              element={<HigherStudiesAdmin />}
            />
            <Route path="/skill-mapper" element={<SkillMapper />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/sop-assistant" element={<SoPAssistantPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>

      {/* ✅ Marquee only for not logged in users */}
      {!user && (
        <div className="mt-auto bg-blue-100 py-2">
          <Marquee gradient={false} speed={60}>
            <span className="text-lg font-semibold mr-6">
              Aptitude Training Workshop –
              <Link to="/register" className="text-blue-600 underline ml-2">
                Register Now
              </Link>
            </span>
            <span className="text-lg font-semibold mr-6">
              Resume Building Seminar –
              <Link to="/register" className="text-blue-600 underline ml-2">
                Register Now
              </Link>
            </span>
          </Marquee>
        </div>
      )}

      <SmartSearchChatbot />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
