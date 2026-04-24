import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const GalleryAdd = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const [form, setForm] = useState({
    uid: "1",
    post_id: "",
    image_path: [], //  array for multiple images
    caption: "image section",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm({
        ...form,
        [name]: Array.from(files), //  store all files
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.post_id || form.image_path.length === 0) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("uid", form.uid);
      formData.append("post_id", form.post_id);
      formData.append("caption", form.caption);

      //  MULTIPLE FILES
      form.image_path.forEach((file) => {
        formData.append("image_path", file);
      });

      const res = await API.post("/gallery", formData);

      if (res.data.success) {
        setSuccess(" Gallery uploaded successfully!");
        setTimeout(() => navigate("/admin/gallery"), 1500);
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
      <h2 className="text-xl font-semibold mb-4">Add Gallery</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded shadow-lg">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* Post Dropdown */}
          <label className="block text-md mb-2 font-bold">Posts name</label>
          {posts.length > 0 ? (
            <select
              name="post_id"
              value={form.post_id}
              onChange={handleChange}
              className="border p-2 mb-3 rounded w-full"
            >
              <option value="">Select Post</option>
              {posts.map((post) => (
                <option key={post._id} value={post._id}>
                  {post.title}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading posts...</p>
          )}

          {/*  MULTIPLE IMAGE INPUT */}
          <input
            type="file"
            name="image_path"   //  FIXED NAME
            onChange={handleChange}
            className="p-2 mb-3 border rounded w-full"
            multiple
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GalleryAdd;