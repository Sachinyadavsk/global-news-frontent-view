import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [posts, setPosts] = useState([]); // For category dropdown

  // posts by id name display in table
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

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get("/gallery");
        console.log("Fetched gallery items:", res.data);
        setGallery(res.data.data);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
      }
    };

    fetchGallery();
  }, []);

  const handleDeleteGallery = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/gallery/${id}`);
      // Remove from UI instantly
      setGallery(gallery.filter((item) => item._id !== id));
      alert("gallery deleted successfully");
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Gallery List</h2>

      <div className="table table-responsive">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 text-left">Post Name</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {gallery.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  {posts.find((post) => post._id === item.post_id)?.title || item.post_id}
                </td>
                  {/* // array image_path is array of string */}
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                  {item.image_path && (
                  
                   [item.image_path].flat().map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Photo ${idx}`}
                        className="flex w-5 h-5 rounded mr-1"
                      />
                    ))
                  )}
                  </div>
                </td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/gallery/edit/${item._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteGallery(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gallery;
