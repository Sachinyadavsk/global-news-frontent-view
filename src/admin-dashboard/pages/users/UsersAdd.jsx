import React, { useState } from 'react'
import API from '../../../shared/api/axios';
import { useNavigate } from 'react-router-dom';

const UsersAdd = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }
    try {
      setLoading(true);
      const res = await API.post("/users/register", form);
      if (res.data.user && res.data.success) {
        setSuccess(" Users added successfully!");
        // / redirect after short delay
        setTimeout(() => {
          navigate("/admin/users");
        }, 1500);
      } else {
        setError("❌ Failed to add Users");
      }

    } catch (err) {
      setError(err.message ? err.message : "Users failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <div className="max-w-2xl mx-auto py-10 px-4 border rounded hover:rounded-lg shadow-lg transition hover:bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="gap-4"
        >
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

          {/* email */}
          <label className="block text-md mb-2 font-bold">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 mb-3 rounded w-full"
          />

          {/* Password */}
          <div>
            <label className="block text-md mb-2 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="p-2 mb-3 h-10 border rounded w-full"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-[200px] bg-blue-600 text-white px-1 py-1 rounded hover:bg-blue-700 transition">
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersAdd
