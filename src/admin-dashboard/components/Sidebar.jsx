import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();
    const [dropdown, setDropdown] = useState(null);

    const menu = [
        { name: "Dashboard", path: "/admin" },

        {
            name: "Category",
            children: [
                { name: "Category List", path: "/admin/category/list" },
                { name: "Add Category", path: "/admin/category/add" },
            ],
        },

        {
            name: "SubCategory",
            children: [
                { name: "SubCategory List", path: "/admin/subcategory/list" },
                { name: "Add SubCategory", path: "/admin/subcategory/add" },
            ],
        },

        {
            name: "Gallery",
            children: [
                { name: "Gallery List", path: "/admin/gallery" },
                { name: "Add Gallery", path: "/admin/gallery/add" },
            ],
        },

        {
            name: "Slider",
            children: [
                { name: "Slider List", path: "/admin/slider" },
                { name: "Add Slider", path: "/admin/slider/add" },
            ],
        },
        
        {
            name: "Ads",
            children: [
                { name: "Ads List", path: "/admin/ads" },
                { name: "Add Ad", path: "/admin/ads/add" },
            ],
        },

        {
            name: "Posts",
            children: [
                { name: "Post List", path: "/admin/posts" },
                { name: "Add Post", path: "/admin/posts/add" },
            ],
        },

        {
            name: "Users",
            children: [
                { name: "User List", path: "/admin/users" },
                { name: "Add User", path: "/admin/users/add" },
            ],
        },

        {
            name: "Pages",
            children: [
                { name: "Pages List", path: "/admin/pages" },
                { name: "Add Page", path: "/admin/pages/add" },
            ],
        }

    ];

    return (
        <>
            {/* Overlay (Mobile) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="p-4 font-bold text-xl border-b">
                    Admin Panel
                </div>

                <nav className="p-3 space-y-2">

                    {menu.map((item, i) => (
                        <div key={i}>

                            {/* Normal Link */}
                            {!item.children && (
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`block p-2 rounded ${location.pathname === item.path
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {item.children && (
                                <div>
                                    <button
                                        onClick={() =>
                                            setDropdown(dropdown === i ? null : i)
                                        }
                                        className="w-full text-left p-2 hover:bg-gray-100 rounded"
                                    >
                                        {item.name}
                                    </button>

                                    {dropdown === i && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.children.map((sub, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={sub.path}
                                                    onClick={() => setOpen(false)}
                                                    className={`block p-2 text-sm rounded ${location.pathname === sub.path
                                                        ? "bg-blue-500 text-white"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    ))}

                </nav>
            </div>
        </>
    );
};

export default Sidebar;