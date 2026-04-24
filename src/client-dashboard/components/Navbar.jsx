import React, { useEffect, useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

const API_URL = "https://enjoy-backend-api.onrender.com/api";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Fetch menu
    useEffect(() => {
        fetch(`${API_URL}/categoriesmenu`)
            .then((res) => res.json())
            .then((data) => setMenuItems(data))
            .catch((err) => console.error("Menu API Error:", err));
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        EnjoyVS
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {menuItems.slice(0, 4).map((item, index) => (
                            <Link
                                key={index}
                                to={`/category/${item.slug}`}   //  FIXED
                                className="hover:text-blue-600"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link to="/dashboard/profile">Profile</Link>
                        <Link to="/dashboard/posts">My Posts</Link>

                        {/* 👇 AUTH BASED */}
                        {!user ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <>
                                {user.role === "user" ? (
                                    <Link to="/dashboard">Dashboard</Link>
                                ) : (
                                    <Link></Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="text-red-500"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>


                    {/* Mobile Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {isOpen && (
                    <div className="md:hidden flex flex-col space-y-3 pb-4">

                        {menuItems.slice(0, 8).map((item, index) => (
                            <Link
                                key={index}
                                to={`/category/${item.slug}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link to="/notifications">Notifications</Link>
                        <Link to="/dashboard/profile">Profile</Link>
                        <Link to="/dashboard/posts">My Posts</Link>
                        {!user ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <>
                                {user.role === "user" ? (
                                    <Link to="/dashboard">Dashboard</Link>
                                ) : (
                                    <Link></Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 text-left"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;