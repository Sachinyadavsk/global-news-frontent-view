import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const AdsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setForm({
        ...form,
        [name]: files[0], // store file
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  //  Fetch Ads Data
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/ads/${id}`);
        setForm(res.data.data);
      } catch (err) {
        console.error("Error fetching ads", err);
        setError("Failed to load ads data");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [id]);

  //  Placement Type
  const handlePlacementType = (type) => {
    setForm({
      ...form,
      add_placement: type,
    });
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.add_placement) {
      return setError("Placement type is required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("add_placement", form.add_placement);
      formData.append("addSize", form.addSize);
      formData.append("click", form.click);
      formData.append("status", form.status);

      //  only send new file
      if (form.banner_image instanceof File) {
        formData.append("banner_image", form.banner_image);
      }

      const res = await API.put(`/ads/${id}`, formData);

      if (res.data.success) {
        setSuccess(" Ads updated successfully!");
        setTimeout(() => navigate("/admin/ads"), 1500);
      } else {
        setError("❌ Failed to update ads");
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
      <h2 className="text-xl font-semibold mb-4">Manage Ads</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded shadow-lg">
        <form onSubmit={handleSubmit}>

          {/*  Image Upload */}
          <label className="block text-md mb-2 font-bold">
            Banner Image
          </label>

          {/* Preview */}
          {form.banner_image && (
            <img
              src={
                form.banner_image instanceof File
                  ? URL.createObjectURL(form.banner_image)
                  : form.banner_image
              }
              alt="Preview"
              className="w-20 h-20 mb-2 rounded"
            />
          )}

          <input
            type="file"
            name="banner_image"
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/*  Placement Type */}
          <label className="block text-md mb-2 font-bold">
            Placement Type
          </label>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => handlePlacementType("header")}
              className={`px-4 py-2 rounded border ${form.add_placement === "header"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
                }`}
            >
              Header
            </button>

            <button
              type="button"
              onClick={() => handlePlacementType("footer")}
              className={`px-4 py-2 rounded border ${form.add_placement === "footer"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
                }`}
            >
              Footer
            </button>
          </div>

          {/*  Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Ads"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdsEdit;