import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    uid: "1",
    post_type: "video",
    title: "",
    slug: "",
    meta_desc: "",
    description: "",
    category_id: "",
    subcategories_id: "",
    image_big: null,
    is_slider: "yes",
    is_popular: "yes",
    is_deals_under: "no",
    status: "published",
  });

  // ✅ Fetch Post Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/posts/${id}`);
        const data = res.data.data;

        setForm((prev) => ({
          ...prev,
          ...data,
          image_big: null,
        }));

        if (data.image_big) {
          setImagePreview(data.image_big);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ✅ Fetch Categories
  useEffect(() => {
    API.get("/categoriesmenu")
      .then(res => setCategories(res.data))
      .catch(console.log);
  }, []);

  // ✅ Fetch Subcategories
  useEffect(() => {
    API.get("/getallsubcategories")
      .then(res => setSubCategories(res.data.data))
      .catch(console.log);
  }, []);

  // ✅ Filter Subcategories
  useEffect(() => {
    if (form.category_id) {
      const filtered = subCategories.filter(
        (sub) => String(sub.category_id) === String(form.category_id)
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [form.category_id, subCategories]);

  // ✅ Slug Generator
  const generateSlug = (text) =>
    text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  // ✅ Handle Change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));

    } else if (type === "file") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "image_big") {
        setImagePreview(URL.createObjectURL(file));
      }

    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "category_id" && { subcategories_id: "" }) // reset
      }));
    }
  };

  // ✅ Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title || !form.category_id) {
      return setError("Title & Category required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      const res = await API.put(`/posts/${id}`, formData);

      if (res.data.success) {
        setSuccess("Post updated successfully!");
        setTimeout(() => navigate("/admin/posts"), 1500);
      } else {
        setError("Update failed");
      }

    } catch (err) {
      console.log(err.response?.data);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Posts</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-7xl mx-auto py-10 px-4 border rounded shadow-lg">

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

            {/* LEFT */}
            <div>
              <label className="font-bold">Post Name</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="border p-2 w-full mb-3" />

              <label className="font-bold">Slug</label>
              <input type="text" name="slug" value={form.slug} onChange={handleChange} className="border p-2 w-full mb-3" />

              <label className="font-bold">Meta Description</label>
              <input type="text" name="meta_desc" value={form.meta_desc} onChange={handleChange} className="border p-2 w-full mb-3" />

              <label className="font-bold">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="border p-2 w-full mb-3" />
            </div>

            {/* RIGHT */}
            <div>
              <input type="file" name="image_big" onChange={handleChange} className="mb-3" />
              {imagePreview && <img src={imagePreview} className="w-20 mb-3" />}

              {/* Category */}
              <label className="font-bold">Category</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} className="border p-2 w-full mb-3">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              {/* SubCategory */}
              <label className="font-bold">SubCategory</label>
              <select
                name="subcategories_id"
                value={form.subcategories_id}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                disabled={!form.category_id}
              >
                <option value="">Select SubCategory</option>
                {filteredSubCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>

              {/* Checkboxes */}
              <label>Slider</label>
              <div className="flex items-center gap-5 mb-3">
                <input
                  type="radio"
                  name="is_slider"
                  id=""
                  value="yes"
                  className="w-7 h-4" checked={form.is_slider === true} onChange={handleChange} />Yes
                <input
                  type="radio"
                  name="is_slider" id="" value="no"
                  className="w-7 h-4" checked={form.is_slider === false} onChange={handleChange} />No
              </div>
              <label>Popular</label>
              <div className="flex items-center gap-5 mb-3">
                <input
                  type="radio"
                  name="is_popular" id="" value="yes"
                  className="w-7 h-4" checked={form.is_popular === true} onChange={handleChange} />Yes
                <input
                  type="radio"
                  name="is_popular" id="" value="no" className="w-7 h-4"
                  checked={form.is_popular === false} onChange={handleChange} />No
              </div>
              <label>Ideals</label>
              <div className="flex items-center gap-5 mb-3">
                <input
                  type="radio"
                  name="is_deals_under" id="" value="yes" className="w-7 h-4"
                  checked={form.is_deals_under === true} onChange={handleChange} />Yes
                <input
                  type="radio"
                  name="is_deals_under" id="" value="no" className="w-7 h-4"
                  checked={form.is_deals_under === false} onChange={handleChange} />No
              </div>
            </div>
            {/* Button */}
            <button
              type="submit" disabled={loading}
              className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50" >
              {loading ? "Saving..." : "Save Posts"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default PostEdit;