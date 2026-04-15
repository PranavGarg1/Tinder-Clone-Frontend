import React, { useState } from "react";
import { Search, User, LogOut, UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      dispatch(clearFeed());
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200">
      <div className="flex-shrink-0 flex items-center space-x-4">
        <Link
          to={"/"}
          onClick={() => setIsMenuOpen(false)}
          className="text-2xl font-bold tracking-tighter cursor-pointer"
        >
          TinderClone ❤️
        </Link>
        {user && (
          <span className="text-sm text-gray-600">
            Welcome back {userData.firstName} {userData.lastName}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-1.5 bg-gray-100 border border-transparent rounded-l-md focus:outline-none focus:bg-white focus:border-gray-300 transition-all"
            />
            <button className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          {userData && (
            <div
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={
                  userData.photoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy-nMokF0yazcxuSpThQVg2UYckMjNNFaOw&s"
                }
                alt="User"
              />
            </div>
          )}

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
              <Link
                to={"/profile"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserCircle size={18} className="mr-2" />
                View Profile
              </Link>
              <hr className="my-1 border-gray-100" />
              <Link
                to={"/profile/edit"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserCircle size={18} className="mr-2" />
                Edit Profile
              </Link>
              <Link
                to={"/requests"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserCircle size={18} className="mr-2" />
                Requests
              </Link>
              <Link
                to={"/connections"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserCircle size={18} className="mr-2" />
                Connections
              </Link>
              <hr className="my-1 border-gray-100" />
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                onClick={() => handleLogout()}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
