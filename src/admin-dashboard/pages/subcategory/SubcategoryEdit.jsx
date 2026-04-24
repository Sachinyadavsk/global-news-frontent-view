import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const SubcategoryEdit = () => {
  const { id } = useParams();
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

  // Fetch category data
  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const res = await API.get(`/subcategories/${id}`);
        setForm(res.data.data);
        console.log("Fetched subcategory:", res.data.data);
      } catch (err) {
        console.error("Error fetching subcategory", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategory();
  }, [id]);



  const [form, setForm] = useState({
    uid: "1",
    category_id: "",
    name: "",
    slug: "",
    photo: "",
    banner: "",
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
    const { name, value, type, checked, files } = e.target;

    if (name === "name") {
      setForm({
        ...form,
        name: value,
        slug: generateSlug(value),
      });
    } else if (type === "file") {
      setForm({
        ...form,
        [name]: files[0], //  store file object
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

    const formData = new FormData();

    formData.append("uid", form.uid);
    formData.append("category_id", form.category_id);
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("show_on_menu", form.show_on_menu);

    if (form.photo instanceof File) {
      formData.append("photo", form.photo);
    }

    if (form.banner instanceof File) {
      formData.append("banner", form.banner);
    }

    try {
      await API.put(`/subcategories/${id}`, formData);
      alert("Subcategory updated successfully");

      navigate("/admin/subcategory/list");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Subcategory</h2>

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

          {/* CURRENT PHOTO */}
          {form.photo && typeof form.photo === "string" && (
            <img src={form.photo} className="w-10 h-10 mb-2 rounded" />
          )}

          <input type="file" name="photo" onChange={handleChange} />

          {/* CURRENT BANNER */}
          {form.banner && typeof form.banner === "string" && (
            <img src={form.banner} className="w-10 h-10 mb-2 rounded" />
          )}

          <input type="file" name="banner" onChange={handleChange} />
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

export default SubcategoryEdit;