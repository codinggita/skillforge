import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar         from "./components/Navbar";
import { useAuth }   from "./context/AuthContext";
import { Toaster }   from "react-hot-toast";

import Landing       from "./pages/Landing";
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import Dashboard     from "./pages/Dashboard";
import Projects      from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import SkillReport   from "./pages/SkillReport";
import ReviewResult  from "./pages/ReviewResult";
import Leaderboard   from "./pages/Leaderboard";
import Features      from "./pages/Features";
import Pricing       from "./pages/Pricing";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound      from "./pages/NotFound";

// Redirect already-logged-in users away from auth pages
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// Animated page wrapper — every route transition fades + slides up
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Inner app needs access to location for AnimatePresence key
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
        <Route path="/login"    element={<GuestRoute><PageWrapper><Login /></PageWrapper></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><PageWrapper><Register /></PageWrapper></GuestRoute>} />

        {/* Protected */}
        <Route path="/dashboard"   element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/projects"    element={<ProtectedRoute><PageWrapper><Projects /></PageWrapper></ProtectedRoute>} />
        <Route path="/project/:id" element={<ProtectedRoute><PageWrapper><ProjectDetail /></PageWrapper></ProtectedRoute>} />
        <Route path="/report"        element={<ProtectedRoute><PageWrapper><SkillReport /></PageWrapper></ProtectedRoute>} />
        <Route path="/submission/:id" element={<ProtectedRoute><PageWrapper><ReviewResult /></PageWrapper></ProtectedRoute>} />
        <Route path="/leaderboard"    element={<ProtectedRoute><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin"          element={<ProtectedRoute><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0f0f0f",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: "500",
              backdropFilter: "blur(24px)",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

