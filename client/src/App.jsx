import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";

import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserPublicProfilePage from "./pages/UserPublicProfilePage";
import SearchPage from "./pages/SearchPage";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";


// Styling global 
import "./styles/AppGlobals.css";
import "./styles/Typography.css";
import "./styles/Utilities.css";
import "./styles/Layout.css";


// Private Route
import PrivateRoute from "./mock/PrivateRoute";

export default function App() {
  return (
      <SessionProvider>
        <Router>
          <Header />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/profile/:id" element={<UserPublicProfilePage />} />
            
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/search" element={<SearchPage />} />


            {/* Private Routes */}
            <Route
              path="/profile/me"
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SessionProvider>
  );
}
