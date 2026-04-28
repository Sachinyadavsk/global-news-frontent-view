import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../shared/api/axios"
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { categoryslug, subcategoryslug } = useParams();
    const [posts, setPosts] = useState([]);
    const [categoriesSlug, setCategoriesSlug] = useState([]);
    const [subcategoriesSlug, setSubCategoriesSlug] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryId = categoriesSlug?._id;
    const subcategoryId = subcategoriesSlug?._id;



    // post id according get by details
    useEffect(() => {
        const fetchCategoriesSlug = async () => {
            try {
                const res = await API.get(`/categories/${categoryslug}`);
                setCategoriesSlug(res.data.data);
            } catch (err) {
                console.error("Error fetching details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesSlug();
    }, [categoryslug]);

    // set Sub Categories Slug post id according get by details
    useEffect(() => {
        const fetchSubCategoriesSlug = async () => {
            try {
                const res = await API.get(`/subcate/${subcategoryslug}`);
                setSubCategoriesSlug(res.data.data);
            } catch (err) {
                console.error("Error fetching details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubCategoriesSlug();
    }, [subcategoryslug]);

    //  Fetch Posts
    useEffect(() => {
        if (!categoryId) return;
        const fetchPosts = async () => {
            try {
                const res = await API.get(`/postcatewithsub/${categoryId}/${subcategoryId}`);
                setPosts(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId, subcategoryId]);

    return (
        <div className="bg-white min-h-screen">
            {/* News Collections */}
            <div className="max-w-7xl mx-auto mt-10">
                <h2 className="text-xl font-bold text-gray-800">
                    <ul className='flex text-center gap-1'>
                        <li><Link to="/">Home</Link></li>/
                        <li><Link to="/news">News</Link></li>/
                        <li className='text-green-800'>{categoriesSlug.name}</li>
                        <li className='text-green-800'>{subcategoriesSlug.name}</li>
                    </ul>
                </h2>
                <div className="sm:flex flex-cols-1 md:flex-cols-2 gap-2 mt-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                {posts.length === 0 ? (
                                    <p className="col-span-full text-center text-gray-500">
                                        No categories post found
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
                                        No categories posts found
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
    )
}

export default CategoryPage
