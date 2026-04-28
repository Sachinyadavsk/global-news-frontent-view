import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../shared/api/axios"
import { Link } from 'react-router-dom';

const Home = () => {

  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);


  // Auto slide every 3 seconds
  useEffect(() => {
    if (posts.length === 0) return; // 👈 prevent division by 0
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posts]);


  //  Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categoriesmenu");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      }
    };

    fetchCategories();
  }, []);

  //  Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  //  Filter using category_id
  const filteredPosts =
    activeTab === "All"
      ? posts
      : posts.filter(post => post.category_id === activeTab);

  // const [activeTab, setActiveTab] = useState("All");
  // const items = category[activeTab];

  return (
    <div className="bg-white min-h-screen">
      <div className='max-w-7xl mx-auto py-10 px-4'>
        {/* slider and latest news sections */}
        <div className="sm:flex flex-1 md:flex-cols-2 gap-3 mt-6 mb-1">
          <div className="md:w-[60%] mb-5">
            <div className="w-full overflow-hidden relative">
              <div className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${current * 100}%)` }}>
                {posts.map((item, index) => (
                  <img
                    key={index}
                    src={item.image_big}
                    className="w-full flex-shrink-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
                  />
                ))}
              </div>

              {/* Manual buttons */}
              <button
                onClick={() =>
                  setCurrent((current - 1 + posts.length) % posts.length)
                }
                className="btn btn-circle absolute left-5 top-1/2">
                ❮
              </button>

              <button
                onClick={() => setCurrent((current + 1) % posts.length)}
                className="btn btn-circle absolute right-5 top-1/2">
                ❯
              </button>
            </div>
          </div>
          <div className="md:w-[40%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {posts.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  No posts found
                </p>
              ) : (
                posts.slice(0, 4).map(post => (
                  <Link to={`/news/${post.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={post.image_big || "https://via.placeholder.com/300"} className='md:w-36 h-16 sm:h-full w-full object-cover' alt="Featured Video 1" />
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-800">
                          {post.title.split(' ').length > 4
                            ? post.title.split(' ').slice(0, 4).join(' ') + '...'
                            : post.title}
                        </h3>
                        <p className="text-gray-600">
                          {post.description.split(' ').length > 8
                            ? post.description.split(' ').slice(0, 8).join(' ') + '...'
                            : post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Global News Category List */}
        <div class="max-w-6xl mx-auto py-12 px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-center mb-10">Features Service</h2>

          <div class="grid md:grid-cols-3 gap-6">
            {/* loop set category section */}
            {categories.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No posts found
              </p>
            ) : (
              categories.map(cat => (
                <Link to={`/category/${cat.slug}`}>
                  <div class="bg-white p-6 rounded-2xl shadow text-center hover:shadow-lg transition">
                    <h3 class="text-xl font-semibold mb-2"> {cat.name}</h3>
                    <p class="text-gray-600">Breaking Global News: Key Events Shaping the World Today</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 p-6 ml-5">
            Global News Category List
          </h2>
          <div className="w-full p-5">
            {/* 🔥 Tabs */}
            <div className="flex gap-3 mb-6 justify-end flex-wrap">
              {/*  ALL TAB */}
              <button
                onClick={() => setActiveTab("All")}
                className={`btn ${activeTab === "All" ? "btn-primary" : "btn-outline"
                  }`}
              >
                All
              </button>
              {/*  CATEGORY TABS (use _id) */}
              {categories.map(cat => (
                <button
                  key={cat._id}
                  onClick={() => setActiveTab(cat._id)}   // ⭐ IMPORTANT
                  className={`btn ${activeTab === cat._id ? "btn-primary" : "btn-outline"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 🔄 Loading */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading posts...
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* ❌ No Data */}
                {filteredPosts.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500">
                    No posts found
                  </p>
                ) : (
                  filteredPosts.slice(0, 12).map(post => (
                    <Link to={`/news/${post.slug}`}>
                      <div
                        key={post._id}
                        className="card bg-base-100 shadow-md hover:shadow-lg transition"
                      >
                        <img
                          src={post.image_big || "https://via.placeholder.com/300"}
                          alt={post.title}
                          className="h-32 w-full object-cover"
                        />
                        <div className="card-body p-3">
                          <h2 className="text-sm font-semibold line-clamp-2">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))
                )}

              </div>
            )}
          </div>
        </div>
        {/* News Collections */}
        <div className="max-w-7xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-gray-800 p-6">News Collections</h2>
          <div className="sm:flex flex-cols-1 md:flex-cols-2 gap-2 mt-6">
            <div className="max-w-4xl mx-auto">
              <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {posts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                      No posts found
                    </p>
                  ) : (
                    posts.map(post => (
                      <Link to={`/news/${post.slug}`}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                          <img src={post.image_big || "https://via.placeholder.com/300"} className='max-w-full max-h-full' alt="Featured Video 1" />
                          <div className="p-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {post.title.split(' ').length > 3
                                ? post.title.split(' ').slice(0, 3).join(' ') + '...'
                                : post.title}
                            </h3>
                            <p className="text-gray-600">
                              {post.description.split(' ').length > 10
                                ? post.description.split(' ').slice(0, 10).join(' ') + '...'
                                : post.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                <div className="max-w-full">
                  {posts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                      No posts found
                    </p>
                  ) : (
                    posts.map(post => (
                      <Link to={`/news/${post.slug}`}>
                        <div className="bg-white float-none md:flex text-center justify-items-start rounded-lg shadow-md overflow-hidden gap-4">
                          <div className="">
                            <img src={post.image_big || "https://via.placeholder.com/300"} className='sm:max-h-full max-w-full md:w-24 h-16' alt="Featured Video 1" />
                          </div>
                          <div className="">
                            <h3 className="text-sm font-bold text-gray-800">
                              {post.title.split(' ').length > 4
                                ? post.title.split(' ').slice(0, 4).join(' ') + '...'
                                : post.title}
                            </h3>
                            <p className="text-gray-600">
                              {post.description.split(' ').length > 5
                                ? post.description.split(' ').slice(0, 5).join(' ') + '...'
                                : post.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
