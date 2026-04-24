import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { Link } from "react-router-dom";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
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
    const fetchSliders = async () => {
      try {
        const res = await API.get("/sliders");
        setSliders(res.data.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      }
    };

    fetchSliders();
  }, []);

  const handleDeleteSliders = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      await API.delete(`/sliders/${id}`);
      // Remove from UI instantly
      setSliders(sliders.filter((item) => item._id !== id));
      alert("sliders deleted successfully");
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Slider List</h2>

      <div className="table table-responsive">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>

              <th className="p-2 text-left">Category ID</th>
              <th className="p-2 text-left">Url Slider</th>
              <th className="p-2 text-left">Slider Type</th>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">
                  {categories.find((cat) => cat._id === item.cate_id)?.name || item.cate_id}
                </td>
                <td className="p-2">{item.url_slider}</td>
                <td className="p-2">{item.slider_type}</td>
                <td className="p-2">
                  {item.photo && (
                    <img src={item.photo} alt="Photo" className="w-5 h-5 rounded" />
                  )}
                </td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/slider/edit/${item._id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteSliders(item._id)}
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

export default Slider;
