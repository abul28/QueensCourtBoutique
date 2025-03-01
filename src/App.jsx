import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./body/HomePage";
import NavBar from "./Header/NavBar";
import ProductDetails from "./body/ProductDetails";
import AdminLogin from "./admin/AdminLogin";
import ManageProducts from "./admin/ManageProducts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Firebase";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(localStorage.getItem("isGuest") === "true");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsGuest(false);
        localStorage.removeItem("isGuest");
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <Router basename="/QueensCourtBoutique">
      <MainContent 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        isAuthenticated={isAuthenticated} 
        isGuest={isGuest} 
        setIsGuest={setIsGuest} 
      />
    </Router>
  );
}

const MainContent = ({ searchQuery, setSearchQuery, isAuthenticated, isGuest, setIsGuest }) => {
  const location = useLocation();

  // Hide navbar on login-related pages
  const shouldShowNavbar = !["/", "/login"].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && (
        <NavBar 
          onSearch={setSearchQuery} 
          isAuthenticated={isAuthenticated} 
          isGuest={isGuest} 
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AdminLogin setIsGuest={setIsGuest} />} />
        <Route path="/home" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route 
          path="/products" 
          element={isAuthenticated ? <ManageProducts /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
};

export default App;