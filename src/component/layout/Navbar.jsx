import React, { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import API from "../../shared/api/axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Fetch categories
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

    // Fetch getallsubcategories
    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const res = await API.get("/getallsubcategories");
                setSubCategory(res.data.data);
            } catch (err) {
                console.error("Error fetching getallsubcategories:", err);
            }
        };
        fetchSubCategory();
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/login");
    };

    // 🔥 Helper: get subcategories by category id
    const getSubCategories = (catId) => {
        return subCategory.filter((sub) => sub.category_id === catId);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        Global News
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {menuItems.slice(0, 7).map((item) => {
                            const subs = getSubCategories(item._id);
                            return (
                                <div key={item._id} className="relative group">
                                    {/* Main Category */}
                                    <Link
                                        to={`/category/${item.slug}`}
                                        className="hover:text-blue-600"
                                    >
                                        {item.name}
                                    </Link>

                                    {/* 🔽 Dropdown */}
                                    {subs.length > 0 && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                                            {subs.map((sub) => (
                                                <Link
                                                    key={sub._id}
                                                    to={`/category/${item.slug}/${sub.slug}`}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}

                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center border rounded-lg px-2 py-1 w-1/5">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="outline-none px-2 w-full"
                        />
                    </div>

                    {/* Right Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>

                        {!user ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <>
                                {user.role === "user" && (
                                    <Link to="/dashboard">Dashboard</Link>
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

                        {menuItems.map((item) => {
                            const subs = getSubCategories(item._id);

                            return (
                                <div key={item._id}>
                                    <Link
                                        to={`/category/${item.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="font-semibold"
                                    >
                                        {item.name}
                                    </Link>

                                    {/* Subcategories */}
                                    {subs.length > 0 && (
                                        <div className="ml-4 flex flex-col">
                                            {subs.map((sub) => (
                                                <Link
                                                    key={sub._id}
                                                    to={`/category/${item.slug}/${sub.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-sm py-1 text-gray-600"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>

                        {!user ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <>
                                {user.role === "user" && (
                                    <Link to="/dashboard">Dashboard</Link>
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