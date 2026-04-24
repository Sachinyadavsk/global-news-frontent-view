import { useEffect, useState } from "react";
import API from "../../../shared/api/axios";
import { useNavigate, useParams } from "react-router-dom";

const SliderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    uid: "1",
    cate_id: "",
    url_slider: "",
    slider_type: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  Fetch categories
  useEffect(() => {
    API.get("/categoriesmenu")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  //  Fetch slider data
  useEffect(() => {
    const fetchSlider = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/sliders/${id}`);
        const data = res.data.data;

        setForm({
          uid: "1",
          cate_id: data.cate_id || "",
          url_slider: data.url_slider || "",
          slider_type: data.slider_type || "",
          photo: null,
        });

        // preview old image
        if (data.photo) {
          setImagePreview(data.photo);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load slider");
      } finally {
        setLoading(false);
      }
    };

    fetchSlider();
  }, [id]);

  //  Handle change
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

  //  Slider Type Button Select
  const handleSliderType = (type) => {
    setForm({
      ...form,
      slider_type: type,
    });
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.url_slider || !form.cate_id) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("uid", form.uid);
      formData.append("cate_id", form.cate_id);
      formData.append("url_slider", form.url_slider);
      formData.append("slider_type", form.slider_type);

      //  FILES
      if (form.photo) formData.append("photo", form.photo);
      const res = await API.put(`/sliders/${id}`, formData);
      if (res.data.success) {
        setSuccess(" slider updated  successfully!");
        setTimeout(() => navigate("/admin/slider"), 1500);
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
      <h2 className="text-xl font-semibold mb-4">Edit Slider</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded shadow-lg">
        <form onSubmit={handleSubmit}>

          {/* Category */}
          <label className="block mb-2 font-bold">Category</label>
          <select
            name="cate_id"
            value={form.cate_id}
            onChange={handleChange}
            className="border p-2 mb-3 w-full"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Image */}
          <label className="block mb-2 font-bold">Image</label>
          {imagePreview && (
            <img src={imagePreview} className="w-5 mb-2 rounded" />
          )}
          <input type="file" name="photo" onChange={handleChange} />

          {/* URL */}
          <label className="block mt-3 mb-2 font-bold">URL</label>
          <input
            type="text"
            name="url_slider"
            value={form.url_slider}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          />

          {/* Slider Type Feature Buttons */}
          <label className="block mb-2 font-bold">Slider Type</label>

          <div className="flex gap-4 mb-3">
            <button
              type="button"
              onClick={() => handleSliderType("top")}
              className={`px-4 py-2 rounded border ${form.slider_type === "top"
                ? "bg-blue-600 text-white"
                : "bg-white"
                }`}
            >
              Top
            </button>

            <button
              type="button"
              onClick={() => handleSliderType("bottom")}
              className={`px-4 py-2 rounded border ${form.slider_type === "bottom"
                ? "bg-blue-600 text-white"
                : "bg-white"
                }`}
            >
              Bottom
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Slider"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SliderEdit;