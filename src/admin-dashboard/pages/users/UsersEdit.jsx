import React, { useEffect, useState } from 'react';
import API from '../../../shared/api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const UsersEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/users/profile/${id}`);

        setForm({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          password: "" // always empty (never show hashed password)
        });

      } catch (err) {
        console.error("Error fetching users", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation (password optional)
    if (!form.name || !form.email) {
      return setError("Name and Email are required");
    }

    try {
      setLoading(true);

      // Prepare payload
      const payload = {
        name: form.name,
        email: form.email,
      };

      // Only send password if user entered new one
      if (form.password && form.password.trim() !== "") {
        payload.password = form.password;
      }

      const res = await API.put(`/users/update/${id}`, payload);

      if (res.data.success) {
        setSuccess(" User updated successfully!");

        setTimeout(() => {
          navigate("/admin/users");
        }, 1500);
      } else {
        setError("❌ Failed to update user");
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message || "Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage User</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form onSubmit={handleSubmit} className="gap-4">

          {/* Name */}
          <label className="block text-md mb-2 font-bold">User Name</label>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Email */}
          <label className="block text-md mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Password */}
          <label className="block text-md mb-2 font-bold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Leave blank to keep old password"
            value={form.password}
            onChange={handleChange}
            className="p-2 mb-3 h-10 border rounded w-full"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save User"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UsersEdit;