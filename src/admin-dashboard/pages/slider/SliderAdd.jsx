import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const SliderAdd = () => {
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
    cate_id: "",
    url_slider: "",
    slider_type: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "name") {
      setForm({
        ...form,
        name: value,
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
    setError("");
    setSuccess("");

    if (!form.url_slider || !form.cate_id) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("uid", form.uid);
      formData.append("cate_id", form.cate_id);
      formData.append("url_slider", form.url_slider);
      formData.append("slider_type", form.slider_type);

      //  FILES
      if (form.photo) formData.append("photo", form.photo);
      const res = await API.post("/sliders", formData); // ❗ no headers
      if (res.data.success) {
        setSuccess(" slider added successfully!");
        setTimeout(() => navigate("/admin/slider"), 1500);
      } else {
        setError("❌ Failed");
      }

    } catch (err) {
      console.log(err.response?.data);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Slider</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* category select option list */}

          <label className="block text-md mb-2 font-bold">Category</label>
          {categories.length > 0 ? (
            <select
              name="cate_id"
              value={form.cate_id}
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

          {/* Image Upload */}
          <label className="block text-md mb-2 font-bold">Image Upload</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/* Url Slider */}
          <label className="block text-md mb-2 font-bold">Url Slider</label>
          <input
            type="text"
            value={form.url_slider}
            name="url_slider"
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/* Slider Type */}
          <label className="block text-md mb-2 font-bold">Slider Type</label>
          <select
            name="slider_type"
            value={form.slider_type}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          >
            <option value="">Select Slider Type</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Slider"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SliderAdd;