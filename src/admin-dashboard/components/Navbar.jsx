import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, User, ChevronDown, Search } from "lucide-react";

const Navbar = ({ toggle }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="text-xl md:hidden">
            <Menu />
          </button>

          <Link to="/admin" className="font-bold text-lg text-blue-600">
            Admin
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center border rounded px-2 py-1 w-1/3">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2 w-full"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell />
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 rounded">
              2
            </span>
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User />
              <ChevronDown size={16} />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded w-40">
                <Link
                  to="/admin/profile"
                  className="block px-3 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;