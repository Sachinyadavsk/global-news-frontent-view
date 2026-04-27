import React from 'react';
import aboutimg from '../../assets/about-img.jpg'

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-800 p-6">About Us</h2>
        <div className="flex flex-cols-1 md:flex-cols-2 gap-2 mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">Who We Are</h3>
                    <p className="text-gray-600">
                      We are a global news platform committed to delivering accurate, timely, and unbiased information to readers around the world. Our mission is to keep people informed about the events that shape our societies, economies, and future. With a dedicated team of journalists, editors, and analysts, we cover a wide range of topics including politics, business, technology, health, entertainment, and international affairs.
                      Our approach combines in-depth reporting with real-time updates, ensuring that our audience stays ahead in a fast-changing world. We believe in the power of truth and transparency, and we strive to present news with clarity, context, and integrity. Every story we publish is guided by strong editorial standards and a commitment to factual accuracy.
                      We also embrace digital innovation, using modern tools and platforms to make news more accessible and engaging for our readers across different regions and devices. Our goal is not just to inform, but to empower individuals with knowledge so they can make informed decisions.
                      At our core, we are driven by curiosity, responsibility, and a passion for storytelling that connects people globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
              <div className="max-w-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden gap-2">
                  <div className="">
                    <img src={aboutimg || "https://via.placeholder.com/300"} className='w-full h-full' alt="Featured Video 1"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
