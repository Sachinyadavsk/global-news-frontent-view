import { useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    color: "#000000",
    category_order: "",
    uid: "1",
    show_at_homepage: false,
    show_on_menu: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔥 Auto slug generator
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // auto update slug when name changes
    if (name === "name") {
      setForm({
        ...form,
        name: value,
        slug: generateSlug(value),
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.slug) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await API.post("/categories", form);

      if (res.data && res.data.success) {
        setSuccess(" Category added successfully!");

        // redirect after short delay
        setTimeout(() => {
          navigate("/admin/category/list");
        }, 1500);
      } else {
        setError("❌ Failed to add category");
      }
    } catch (err) {
      setError(err.message ? err.message : "Category failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

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

export default Category;