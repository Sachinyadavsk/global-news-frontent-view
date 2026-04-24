import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const AdsAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    add_placement: "",
    addSize: "size_234",
    click: "0",
    banner_image: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "name") {
      setForm({
        ...form,
        name: value,
      });
    } else if (type === "file") {
      setForm({
        ...form,
        [name]: files[0], //  store file object
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.add_placement || !form.banner_image) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("add_placement", form.add_placement);
      formData.append("addSize", form.addSize);
      formData.append("click", form.click);
      formData.append("status", form.status);

      //  FILES
      if (form.banner_image) formData.append("banner_image", form.banner_image);
      const res = await API.post("/ads", formData); // ❗ no headers
      if (res.data.success) {
        setSuccess(" ads added successfully!");
        setTimeout(() => navigate("/admin/ads"), 1500);
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
      <h2 className="text-xl font-semibold mb-4">Add Ads</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* Image Upload */}
          <label className="block text-md mb-2 font-bold">Banner Image</label>
          <input
            type="file"
            name="banner_image"
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/* Placement Type */}
          <label className="block text-md mb-2 font-bold">Placement Type</label>
          <select
            name="add_placement"
            value={form.add_placement}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          >
            <option value="">Select Placement Type</option>
            <option value="header">Header</option>
            <option value="footer">Footer</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Ads"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdsAdd;