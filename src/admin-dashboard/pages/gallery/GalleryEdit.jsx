import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const GalleryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    uid: "1",
    post_id: "",
    old_images: [],
    new_images: [],
    caption: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Fetch Gallery
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get(`/gallery/post/${id}`);

        setForm({
          uid: res.data.data.uid || "1",
          post_id: res.data.data.post_id,
          old_images: res.data.data.image_path || [],
          new_images: [],
          caption: res.data.data.caption || "",
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchGallery();
  }, [id]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm({
        ...form,
        new_images: Array.from(files),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Remove Old Image
  const removeOldImage = (index) => {
    const updated = [...form.old_images];
    updated.splice(index, 1);

    setForm({
      ...form,
      old_images: updated,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.post_id) return setError("Post required");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("uid", form.uid);
      formData.append("post_id", form.post_id);
      formData.append("caption", form.caption);

      // old images
      form.old_images.forEach((img) => {
        formData.append("old_images[]", img);
      });

      // new images
      form.new_images.forEach((file) => {
        formData.append("image_path", file);
      });

      const res = await API.put(`/gallery/${id}`, formData);

      if (res.data.success) {
        setSuccess(" Updated successfully!");
        setTimeout(() => navigate("/admin/gallery"), 1500);
      } else {
        setError("Failed");
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
      <h2 className="text-xl font-semibold mb-4">Edit Gallery</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

        {/* Post */}
        <select
          name="post_id"
          value={form.post_id}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        >
          <option value="">Select Post</option>
          {posts.map((p) => (
            <option key={p._id} value={p._id}>{p.title}</option>
          ))}
        </select>

        {/* OLD IMAGES */}
        <div className="flex flex-wrap gap-2 mb-3">
          {form.old_images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="w-15 h-15 rounded" />
              <button
                type="button"
                onClick={() => removeOldImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* NEW IMAGES */}
        <div className="flex flex-wrap gap-2 mb-3">
          {form.new_images.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              className="w-5 h-5 rounded"
            />
          ))}
        </div>

        {/* Upload */}
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="mb-3"
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          {loading ? "Saving..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default GalleryEdit;