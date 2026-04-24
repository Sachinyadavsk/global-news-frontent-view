import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../shared/api/axios";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    color: "#000000",
    category_order: "",
    show_at_homepage: false,
    show_on_menu: false,
  });

  const [loading, setLoading] = useState(true);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await API.get(`/categories/${id}`);
        setForm(res.data.data);
        console.log("Fetched category:", res.data.data);
      } catch (err) {
        console.error("Error fetching category", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/categories/${id}`, form);
      alert("Category updated successfully");

      navigate("/admin/category/list");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
   <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* Name */}
          <label className="block text-md mb-2 font-bold">Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Slug */}
          <label className="block text-md mb-2 font-bold">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Color */}
          <label className="block text-md mb-2 font-bold">Color</label>
          <input
            type="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/* Order */}
          <label className="block text-md mb-2 font-bold">Order</label>
          <input
            type="number"
            name="category_order"
            placeholder="Order"
            value={form.category_order}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Checkboxes */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="show_at_homepage"
              checked={form.show_at_homepage}
              onChange={handleChange}
            />
            <label>Show at Homepage</label>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              name="show_on_menu"
              checked={form.show_on_menu}
              onChange={handleChange}
            />
            <label>Show on Menu</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;