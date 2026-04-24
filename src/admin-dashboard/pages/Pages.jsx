import { useEffect, useState } from "react";
import API from "../../shared/api/axios";
import { Link } from "react-router-dom";

const Pages = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await API.get("/pages");
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/pages/${id}`);
      // Remove from UI instantly
      setData(data.filter((item) => item._id !== id));
      alert("Pages deleted successfully");
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pages List</h2>

      <div className="table table-responsive">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Content</th>
              <th className="p-2 text-left">Placement</th>
               <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.content}</td>
                <td className="p-2">{item.placement}</td>
                <td className="p-2">{item.slug}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/pages/edit/${item._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default Pages;
