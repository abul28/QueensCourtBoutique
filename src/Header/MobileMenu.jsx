import React, { useState, useEffect } from "react";
import { Menu, X, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      }
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-600">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2">
          <ul className="space-y-2">
            {isAdmin && (
              <>
                <li className="px-4 py-2 text-gray-800 flex items-center">
                  <User className="mr-2" size={18} /> Logged Admin
                </li>
                <li
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    navigate("/manage-products");
                    setMenuOpen(false);
                  }}
                >
                  <Settings className="mr-2" size={18} /> Manage Products
                </li>
                <li
                  className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" size={18} /> Logout
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
