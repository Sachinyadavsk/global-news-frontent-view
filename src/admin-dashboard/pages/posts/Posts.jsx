import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [postList, setPostList] = useState([]); // For category dropdown
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]); // For category dropdown

  // categories by id name display in table
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

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await API.get("/subcategories");
        setSubCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    fetchSubcategories();
  }, []);

   useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPostList(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePosts = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/posts/${id}`);
      // Remove from UI instantly
      setPostList(postList.filter((item) => item._id !== id));
      alert("Post deleted successfully");
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post List</h2>

      <div className="table table-responsive">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Prices</th>
              <th className="p-2 text-left">Category Name</th>
              <th className="p-2 text-left">Subcategory Name</th>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {postList.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.slug}</td>
                <td className="p-2">{item.prices}</td>
                <td className="p-2">
                  {categories.find((cat) => cat._id === item.category_id)?.name || item.category_id}
                </td>
                <td className="p-2">
                  {subCategories.find((subCat) => subCat._id === item.subcategories_id)?.name || item.subcategories_id}
                </td>
                <td className="p-2">
                  {item.image_big && (
                    <img src={item.image_big} alt="Photo" className="w-5 h-5 rounded" />
                  )}
                </td>
                
                
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/posts/edit/${item._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeletePosts(item._id)}
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

export default Posts;
