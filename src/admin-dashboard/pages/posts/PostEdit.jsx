import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
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
    is_slider: "",
    is_popular: "",
    is_deals_under: "",
    status: "published",
  });

  //  Fetch Post Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/posts/${id}`);
        const data = res.data.data;

        setForm({
          ...form,
          ...data,
          image_big: null,
          video_path: null,
        });

        // previews (existing files)
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

  //  Categories
  useEffect(() => {
    API.get("/categoriesmenu")
      .then(res => setCategories(res.data))
      .catch(console.log);
  }, []);

  //  Subcategories
  useEffect(() => {
    API.get("/subcategories")
      .then(res => setSubCategories(res.data.data))
      .catch(console.log);
  }, []);

  //  Slug
  const generateSlug = (text) =>
    text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  //  Change handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
    } else if (type === "file") {
      const file = files[0];

      setForm({
        ...form,
        [name]: file,
      });

      if (name === "image_big") {
        setImagePreview(URL.createObjectURL(file));
      }

    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  //  Update Submit
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

      //  IMPORTANT: use PUT or PATCH
      const res = await API.put(`/posts/${id}`, formData);

      if (res.data.success) {
        setSuccess(" Post updated successfully!");
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

      <div className="max-w-7xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">

        <form onSubmit={handleSubmit} className="gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="">
              {/* title */}
              <label className="block text-md mb-2 font-bold">Post Name</label>
              <input
                type="text"
                name="title"
                placeholder="Post Name"
                value={form.title}
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
              {/* meta_desc */}
              <label className="block text-md mb-2 font-bold">Met Description</label>
              <input
                type="text"
                name="meta_desc"
                placeholder="meta desc"
                value={form.meta_desc}
                onChange={handleChange}
                className="border p-2 mb-3 rounded w-full"
              />
              {/* Description */}
              <label className="block text-md mb-2 font-bold">Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="description"
                value={form.description}
                onChange={handleChange}
                rows={8}
                className="border p-2 mb-3 rounded w-full"
              />
            </div>
            <div className="">
              <input
                type="file"
                name="image_big"
                onChange={handleChange}
                className="p-2 mb-3 h-10 border rounded w-full"
              />
              {imagePreview && (
                <img src={imagePreview} className="w-10 mt-2 rounded" />
              )}

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

              {/* subCategories select option list */}

              <label className="block text-md mb-2 font-bold">SubCate Name</label>
              {subCategories.length > 0 ? (
                <select
                  name="subcategories_id"
                  value={form.subcategories_id}
                  onChange={handleChange}
                  className="border p-2 mb-3 rounded w-full"
                >
                  <option value="">Select SubCategory</option>
                  {subCategories.map((subcat) => (
                    <option key={subcat._id} value={subcat._id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Loading subCategories...</p>
              )}

              {/* Checkboxes */}
              <label>Slider</label>
              <div className="flex items-center gap-5 mb-3">
                <input type="radio" name="is_slider" id="" value="yes" className="w-7 h-4" checked={form.is_slider === true} onChange={handleChange} />Yes
                <input type="radio" name="is_slider" id="" value="no" className="w-7 h-4" checked={form.is_slider === false} onChange={handleChange} />No
              </div>

              <label>Popular</label>
              <div className="flex items-center gap-5 mb-3">
                <input type="radio" name="is_popular" id="" value="yes" className="w-7 h-4" checked={form.is_popular === true} onChange={handleChange} />Yes
                <input type="radio" name="is_popular" id="" value="no" className="w-7 h-4" checked={form.is_popular === false} onChange={handleChange} />No
              </div>
              <label>Ideals</label>
              <div className="flex items-center gap-5 mb-3">
                <input type="radio" name="is_deals_under" id="" value="yes" className="w-7 h-4" checked={form.is_deals_under === true} onChange={handleChange} />Yes
                <input type="radio" name="is_deals_under" id="" value="no" className="w-7 h-4" checked={form.is_deals_under === false} onChange={handleChange} />No
              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Posts"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default PostEdit;