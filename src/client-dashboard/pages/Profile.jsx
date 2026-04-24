import { useEffect, useState } from "react";
import API from "../../shared/api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../../shared/context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile"); // 🔥 your API
        setUser(res.data);
      } catch (err) {
        console.error("Profile error", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
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

              {/* Social */}
              {user.social_link && (
                <a
                  href={user.social_link}
                  target="_blank"
                  className="text-blue-500 mt-2"
                >
                  Social Profile
                </a>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="md:col-span-2 space-y-4">

              {/* Bio */}
              <div>
                <h3 className="font-semibold text-lg">Bio</h3>
                <p className="text-gray-600">
                  {user.bio || "No bio available"}
                </p>
              </div>

              {/* Details */}
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

              {/* Button */}
              <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Edit Profile
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;