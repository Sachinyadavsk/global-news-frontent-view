import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../shared/api/axios"

const AllCategories = () => {
    const [bannerItems, setBannerItems] = useState([]);
    const [current, setCurrent] = useState(0);
    const [allcategories, setAllCategories] = useState([]);

    // Fetch sliders using Axios

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await API.get("/sliders");
                setBannerItems(res.data.data);
            } catch (err) {
                console.error("Error fetching sliders:", err);
            }
        };

        fetchSliders();
    }, []);

    // Auto slide every 3 seconds
    useEffect(() => {
        if (bannerItems.length === 0) return; // 👈 prevent division by 0
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [bannerItems]);

    // subcategories
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const res = await API.get("/subcategories");
                setAllCategories(res.data.data);
            } catch (err) {
                console.error("Error fetching subcategories:", err);
            }
        };

        fetchAllCategories();
    }, []);

    //  Fetch Posts




    return (
        <div className="bg-white min-h-screen">
            <div className='max-w-7xl mx-auto py-10 px-4'>
                <div className="mb-6">
                    <div className="w-full overflow-hidden relative">
                        <div className="flex transition-transform duration-700"
                            style={{ transform: `translateX(-${current * 100}%)` }}>
                            {bannerItems.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.photo}
                                    className="w-full flex-shrink-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
                                />
                            ))}
                        </div>

                        {/* Manual buttons */}
                        <button
                            onClick={() =>
                                setCurrent((current - 1 + bannerItems.length) % bannerItems.length)
                            }
                            className="btn btn-circle absolute left-5 top-1/2">
                            ❮
                        </button>

                        <button
                            onClick={() => setCurrent((current + 1) % bannerItems.length)}
                            className="btn btn-circle absolute right-5 top-1/2">
                            ❯
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto ">
                    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                        <div className="flex">
                            <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                            <div>
                                <p className="font-bold">Video Hot section in display with latest</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="max-w-6xl mx-auto mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 p-6">Featured Videos</h2>
                    <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-6">
                            {allcategories.length === 0 ? (
                                <p className="col-span-full text-center text-gray-500">
                                    No Sub Category found
                                </p>
                            ) : (
                                allcategories.map(subcat => (
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img src={subcat.photo || "https://via.placeholder.com/300"} alt="Featured Video 1" className='w-full' />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">{subcat.name}</h3>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCategories
