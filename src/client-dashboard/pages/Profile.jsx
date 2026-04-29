import { useEffect, useState } from "react";
import API from "../../shared/api/axios";
import { useAuth } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Profile error", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  // Open modal
  const openModal = () => {
    setFormData({
      name: user?.name || "",
      password: "",
      confirmPassword: "",
    });
    setIsOpen(true);
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // password validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
      };

      // only send password if entered
      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await API.put(`/users/update/${user?._id}`, payload);
      setUser(res.data.user);
      if (res.data.success) {
        setSuccess(" Post created successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("Failed");
      }
    } catch (err) {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="flex flex-col items-center text-center border-r md:pr-6">
              <img
                src={
                  user.image ||
                  "https://images.placeholders.dev/?width=200&height=200"
                }
                alt="profile"
                className="w-32 h-32 rounded-full object-cover"
              />

              <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Bio</h3>
                <p className="text-gray-600">
                  {user.bio || "No bio available"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>

                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>

                <div>
                  <p className="text-gray-500">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>

                <div>
                  <p className="text-gray-500">Joined</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                onClick={openModal}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                  required
                />

                {/* Password */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full border p-2 rounded"
                />

                {/* Confirm Password */}
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full border p-2 rounded"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default Profile;