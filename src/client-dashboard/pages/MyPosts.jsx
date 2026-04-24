import { useEffect, useState } from "react";
import API from "../../shared/api/axios";
import Navbar from "../components/Navbar";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/my-posts"); // 🔥 change API if needed
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await API.delete(`/posts/delete/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-4 rounded-xl shadow-md max-w-7xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">My Posts</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No posts found
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post._id} className="border-t">
                      <td className="p-2">{post.title}</td>

                      <td className="p-2">
                        {post.category?.name || "N/A"}
                      </td>

                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-white text-sm ${post.status === "published"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                            }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td className="p-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-2 space-x-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;