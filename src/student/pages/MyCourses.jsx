
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function MyCourses() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-deep">My Courses</h1>
            <p className="text-gray-500 mt-2">Courses you have enrolled in.</p>
          </div>

          <Link to="/courses" className="bg-primary text-white px-5 py-3 rounded-lg text-center h-fit">
            Browse Courses
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700" alt="Web development" className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full">In Progress</span>
              <h2 className="text-xl font-bold mt-4">Complete Web Development</h2>
              <p className="text-sm text-gray-500 mt-2">Rahul Sharma · 24 lessons</p>
              <div className="bg-gray-200 h-2 rounded-full mt-5">
                <div className="bg-primary h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">60% completed</p>
              <Link to="/lesson/1" className="block text-center bg-primary text-white p-3 rounded-lg mt-5">Resume Learning</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700" alt="UI UX design" className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full">In Progress</span>
              <h2 className="text-xl font-bold mt-4">UI/UX Design Masterclass</h2>
              <p className="text-sm text-gray-500 mt-2">Anjali Nair · 20 lessons</p>
              <div className="bg-gray-200 h-2 rounded-full mt-5">
                <div className="bg-secondary h-2 rounded-full w-2/5"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">40% completed</p>
              <Link to="/lesson/1" className="block text-center bg-primary text-white p-3 rounded-lg mt-5">Resume Learning</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700" alt="Python programming" className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Completed</span>
              <h2 className="text-xl font-bold mt-4">Python Programming Basics</h2>
              <p className="text-sm text-gray-500 mt-2">David Mathew · 20 lessons</p>
              <div className="bg-gray-200 h-2 rounded-full mt-5">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">100% completed</p>
              <Link to="/certificates" className="block text-center border border-primary text-primary p-3 rounded-lg mt-5">View Certificate</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default MyCourses
