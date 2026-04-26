import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const SubcategoryAdd = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // For category dropdown

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categoriesmenu");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const [form, setForm] = useState({
    uid: "1",
    category_id: "",
    name: "",
    slug: "",
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
 
       const res = await API.post("/subcategories", form);
 
       if (res.data && res.data.success) {
         setSuccess("subcategories added successfully!");
 
         // redirect after short delay
         setTimeout(() => {
           navigate("/admin/subcategory/list");
         }, 1500);
       } else {
         setError("❌ Failed to add subcategories");
       }
     } catch (err) {
       setError(err.message ? err.message : "subcategories failed. Try again.");
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Subcategory</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* category select option list */}

          <label className="block text-md mb-2 font-bold">Category</label>
          {categories.length > 0 ? (
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="border p-2 mb-3 rounded w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading categories...</p>
          )}



          {/* Name */}
          <label className="block text-md mb-2 font-bold">Subcategory Name</label>
          <input
            type="text"
            name="name"
            placeholder="Subcategory Name"
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

          {/* Checkboxes */}

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
            {loading ? "Saving..." : "Save Subcategory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubcategoryAdd;