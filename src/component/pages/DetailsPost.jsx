import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../shared/api/axios"
import { Link, useParams } from 'react-router-dom';

const DetailsPost = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [postsDetails, setPostsDetails] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(true);


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


    // post id according get by details
    useEffect(() => {
        const fetchPostsDetails = async () => {
            try {
                const res = await API.get(`/posts/${id}`);
                setPostsDetails(res.data.data);
                console.log("Fetched details:", res.data.data);
            } catch (err) {
                console.error("Error fetching details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPostsDetails();
    }, [id]);


    return (
        <div className="bg-white min-h-screen">
            {/* News Collections */}
            <div className="max-w-7xl mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-800 p-6">News</h2>
                <div className="flex flex-cols-1 md:flex-cols-2 gap-2 mt-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                                {postsDetails.length === 0 ? (
                                    <p className="col-span-full text-center text-gray-500">
                                        No posts found
                                    </p>
                                ) : (
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img src={postsDetails.image_big || "https://via.placeholder.com/300"} alt="Featured Video 1" />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">{postsDetails.title}</h3>
                                            <p className="text-gray-600">
                                                {postsDetails.description}
                                            </p>
                                        </div>
                                    </div>
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
                                    posts.slice(0, 3).map(post => (
                                        <Link to={`/post/edit/${post._id}`}>
                                            <div className="bg-white float-none md:flex text-center justify-between rounded-lg shadow-md overflow-hidden gap-2">
                                                <div className="">
                                                    <img src={post.image_big || "https://via.placeholder.com/300"} alt="Featured Video 1" height={100} width={100} />
                                                </div>
                                                <div className="">
                                                    <h3 className="text-sm font-bold text-gray-800">{post.title}</h3>
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
                </div>
            </div>
        </div>
    )
}

export default DetailsPost
