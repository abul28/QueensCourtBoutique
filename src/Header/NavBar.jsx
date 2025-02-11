import React, { useState } from "react";
import { Menu, Search, ShoppingCart, X, Heart } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Queens Court Boutique</div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by title, category..."
            onChange={(e) => onSearch(e.target.value)} // Update search query
          />
          <button>
            <Search style={{ marginRight: "5px" }} />
          </button>
        </div>

        <div className="actions">
          <Heart className="icon wishlist-icon" title="Wishlist" />
          <ShoppingCart className="icon" title="Cart" />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
