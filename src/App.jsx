import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./body/HomePage";
import NavBar from "./Header/NavBar";
import ProductDetails from "./body/ProductDetails";
import AdminLogin from "./admin/AdminLogin";
import ManageProducts from "./admin/ManageProducts";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <NavBar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/queenscourtboutique" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* <Route path="/Login" element={<AdminLogin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
