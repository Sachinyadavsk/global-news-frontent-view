import React, { useEffect, useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import API from "../../shared/api/axios"


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Fetch menu
    useEffect(() => {
        const fetchMenuCate = async () => {
            try {
                const res = await API.get("/categoriesmenu");
                setMenuItems(res.data);
            } catch (err) {
                console.error("Error fetching categoriesmenu:", err);
            }
        };
        fetchMenuCate();
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
                        <Link to="/all-category">All Category</Link>
                        <Link to="/notifications">Notifications</Link>
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center border rounded-lg px-2 py-1 w-1/3">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="outline-none px-2 w-full"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {/* 👇 AUTH BASED */}
                        {!user ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <>
                                {user.role === "user" ? (
                                    <Link to="/dashboard">Dashboard</Link>
                                ) : (
                                    <Link ></Link>
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
                        <Link to="/all-category">All Category</Link>
                        <Link to="/notifications">Notifications</Link>

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

                        {/* Mobile Search */}
                        <div className="flex items-center border rounded-lg px-2 py-1">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none px-2 w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;