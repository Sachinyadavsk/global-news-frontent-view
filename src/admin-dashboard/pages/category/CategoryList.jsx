import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get("/categoriesmenu");
                setData(res.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            await API.delete(`/categories/${id}`);
            // Remove from UI instantly
            setData(data.filter((item) => item._id !== id));
            alert("Category deleted successfully");
        } catch (err) {
            console.error("Delete error", err);
            alert("Delete failed");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Category List</h2>

            <div className="table table-responsive">
                <table className="w-full border">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Slug</th>
                            <th className="p-2 text-left">Color</th>
                            <th className="p-2 text-left">Order</th>
                            <th className="p-2 text-left">Menu</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.slug}</td>
                                <td className="p-2">
                                    <span
                                        className="px-2 py-1 text-white rounded"
                                        style={{ background: item.color }}
                                    >
                                        {item.color}
                                    </span>
                                </td>
                                <td className="p-2">{item.category_order}</td>

                                <td className="p-2">
                                    {item.show_on_menu ? "Yes" : "No"}
                                </td>
                                <td className="p-2 space-x-2">
                                    <Link
                                        to={`/admin/category/edit/${item._id}`}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
