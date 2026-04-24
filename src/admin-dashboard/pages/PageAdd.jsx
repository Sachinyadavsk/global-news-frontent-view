import { useState } from "react";
import API from "../../shared/api/axios";
import { useNavigate } from "react-router-dom";

const PageAdd = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        language_id: "en",
        uid: "1",
        title: "",
        slug: "",
        content: "",
        placement: "header",
        status: "active",
        wbsite_right_column: true,
    });

    //  Auto slug generator
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "title") {
            setForm((prev) => ({
                ...prev,
                title: value,
                slug: generateSlug(value),
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!form.title || !form.slug) {
            return setError("Title and slug are required");
        }

        try {
            setLoading(true);
            const res = await API.post("/pages", form);

            if (res.data?.data && res.data?.success) {
                setSuccess(" Page added successfully!");

                setTimeout(() => {
                    navigate("/admin/pages");
                }, 1500);
            } else {
                setError("❌ Failed to add page");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Page failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Page</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}

            <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Title */}
                    <div>
                        <label className="block text-md mb-2 font-bold">Page Name</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Page Name"
                            value={form.title}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-md mb-2 font-bold">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            placeholder="Slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-md mb-2 font-bold">Content</label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            className="border rounded w-full p-2"
                            rows="6"
                        />
                    </div>

                    {/* Placement */}
                    <div>
                        <label className="block text-md mb-2 font-bold">Placement</label>
                        <select
                            name="placement"
                            value={form.placement}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="header">Header</option>
                            <option value="footer">Footer</option>
                        </select>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="wbsite_right_column"
                            checked={form.wbsite_right_column}
                            onChange={handleChange}
                        />
                        <label>Website Right Column</label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Page"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageAdd;