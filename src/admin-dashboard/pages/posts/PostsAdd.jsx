import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const PostsAdd = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [form, setForm] = useState({
    uid: "1",
    post_type: "video",
    title: "",
    slug: "",
    meta_desc: "",
    description: "",
    prices: "",
    discount_price: "",
    category_id: "",
    subcategories_id: "",
    image_big: null,
    video_path: null,
    is_slider: "yes",
    is_popular: "yes",
    is_deals_under: "no",
    status:"published",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  Fetch categories
  useEffect(() => {
    API.get("/categoriesmenu")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  //  Fetch subcategories
  useEffect(() => {
    API.get("/subcategories")
      .then(res => setSubCategories(res.data.data))
      .catch(err => console.log(err));
  }, []);

  //  Slug generator
  const generateSlug = (text) =>
    text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  //  Handle Change
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

      // Preview
      if (name === "image_big") {
        setImagePreview(URL.createObjectURL(file));
      }
      if (name === "video_path") {
        setVideoPreview(URL.createObjectURL(file));
      }

    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  //  Submit
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

      const res = await API.post("/posts", formData);

      if (res.data.success) {
        setSuccess(" Post created successfully!");
        setTimeout(() => navigate("/admin/posts"), 1500);
      } else {
        setError("Failed");
      }

    } catch (err) {
      console.log(err.response?.data);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Posts</h2>

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
              <div className="flex justify-between gap-6">
                <div className="w-full">
                  <label className="block text-md mb-2 font-bold">Prices</label>
                  {/* prices */}
                  <input
                    type="number"
                    name="prices"
                    placeholder="prices"
                    value={form.prices}
                    onChange={handleChange}
                    className="border p-2 mb-3 rounded w-full"
                  />
                </div>
                <div className="w-full">
                  {/* discount_price */}
                  <label className="block text-md mb-2 font-bold">Discount Price</label>
                  <input
                    type="text"
                    name="discount_price"
                    placeholder="discount_price"
                    value={form.discount_price}
                    onChange={handleChange}
                    className="border p-2 mb-3 rounded w-full"
                  />
                </div>

              </div>


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

              {/* video_path design card */}

              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Video
                </label>

                <input
                  type="file"
                  name="video_path"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                   file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100cursor-pointer"
                />
                {videoPreview && (
                  <video src={videoPreview} controls className="w-full mt-2" />
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Supported: MP4, AVI, MOV (Max 15MB)
                </p>
              </div>

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
                <input type="radio" name="is_slider" id="" value="yes" className="w-7 h-4" onChange={handleChange} />Yes
                <input type="radio" name="is_slider" id="" value="No" className="w-7 h-4" onChange={handleChange} />No
              </div>

              <label>Popular</label>
              <div className="flex items-center gap-5 mb-3">
                <input type="radio" name="is_popular" id="" value="yes" className="w-7 h-4" onChange={handleChange} />Yes
                <input type="radio" name="is_popular" id="" value="No" className="w-7 h-4" onChange={handleChange} />No
              </div>
              <label>Ideals</label>
              <div className="flex items-center gap-5 mb-3">
                <input type="radio" name="is_deals_under" id="" value="yes" className="w-7 h-4" onChange={handleChange} />Yes
                <input type="radio" name="is_deals_under" id="" value="No" className="w-7 h-4" onChange={handleChange} />No
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

export default PostsAdd;