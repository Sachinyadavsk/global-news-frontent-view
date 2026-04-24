import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='bg-white min-h-screen'>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to your dashboard!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p>You have no recent activity.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">Quick Stats</h2>
              <p>Your stats will appear here.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <p>No upcoming events.</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard
