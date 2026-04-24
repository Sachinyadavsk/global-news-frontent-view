import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-white min-h-screen'>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-pink-300">
            <h2 className="text-lg font-semibold">Category</h2>
            <p className='text-gray-800'>You have total no 54.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-pink-600">
            <h2 className="text-lg font-semibold">Sub-Category</h2>
            <p className='text-gray-800'>You have total no 114.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-red-400">
            <h2 className="text-lg font-semibold">Gallery</h2>
            <p className='text-gray-800'>You have total no 84.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-green-300">
            <h2 className="text-lg font-semibold">Sliders</h2>
            <p className='text-gray-800'>You have total no 6.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-green-600">
            <h2 className="text-lg font-semibold">Ads Banner</h2>
            <p className='text-gray-800'>You have total no 15.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-orange-300">
            <h2 className="text-lg font-semibold">Post List</h2>
            <p className='text-gray-800'>You have total no 15.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-blue-400">
            <h2 className="text-lg font-semibold">Post Pause</h2>
            <p className='text-gray-800'>You have total no 15.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-blue-600">
            <h2 className="text-lg font-semibold">Users List</h2>
            <p className='text-gray-800'>You have total no 75.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition hover:bg-gray-400">
            <h2 className="text-lg font-semibold">Pages List</h2>
            <p className='text-gray-800'>You have total no 10.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
