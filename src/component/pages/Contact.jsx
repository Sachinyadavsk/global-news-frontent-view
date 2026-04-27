import React from 'react';
import aboutimg from '../../assets/about-img.jpg'

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-800 p-6">Contact Us</h2>
        <div className="flex flex-cols-1 md:flex-cols-2 gap-2 mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">Whether you have questions, feedback, business inquiries</h3>
                    <p className="text-gray-600">
                      We value your connection with us and are always here to listen, assist, and respond to your queries. Whether you have questions, feedback, business inquiries, or news tips, our team is ready to support you with prompt and professional communication. Building trust with our audience is important to us, and open communication plays a key role in that commitment.
                      You can reach out to us through multiple channels, including email, contact forms, and social media platforms. Our support team works diligently to ensure that every message is addressed as quickly as possible. If you have a news story to share or would like to collaborate, we welcome your ideas and insights.
                      For general inquiries, please use our official contact form, where you can provide your details and message directly. For urgent matters, we recommend reaching out via email for faster assistance. We also encourage feedback about our content, as it helps us improve and serve you better.
                      Our goal is to create a responsive and user-friendly experience for everyone who interacts with us. No matter the reason for contacting us, we are committed to providing helpful, clear, and timely responses.
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
                    <img src={aboutimg || "https://via.placeholder.com/300"} className='w-full h-full' alt="Featured Video 1" />
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

export default Contact
