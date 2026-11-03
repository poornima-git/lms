
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaCheckCircle, FaClock } from 'react-icons/fa'

function LearningProgress() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">
        <h1 className="text-3xl font-extrabold text-deep">My Learning Progress</h1>
        <p className="text-gray-500 mt-2">Review your learning activity and achievements.</p>

        <div className="grid sm:grid-cols-3 gap-5 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaBookOpen className="text-primary text-2xl" />
            <p className="text-gray-500 mt-4">Courses in Progress</p>
            <h2 className="text-3xl font-bold mt-2">2</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaCheckCircle className="text-green-600 text-2xl" />
            <p className="text-gray-500 mt-4">Lessons Completed</p>
            <h2 className="text-3xl font-bold mt-2">18</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaClock className="text-secondary text-2xl" />
            <p className="text-gray-500 mt-4">Hours Learned</p>
            <h2 className="text-3xl font-bold mt-2">36</h2>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mt-8">
          <h2 className="text-2xl font-bold">Course Completion</h2>

          <div className="mt-7">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-bold">Complete Web Development</h3>
                <p className="text-sm text-gray-500 mt-1">15 of 24 lessons completed</p>
              </div>
              <span className="font-bold text-primary">63%</span>
            </div>
            <div className="bg-gray-200 h-3 rounded-full mt-3">
              <div className="bg-primary h-3 rounded-full w-[63%]"></div>
            </div>
            <Link to="/lesson/1" className="inline-block text-primary font-semibold mt-3">Continue course →</Link>
          </div>

          <div className="mt-8">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-bold">UI/UX Design Masterclass</h3>
                <p className="text-sm text-gray-500 mt-1">8 of 20 lessons completed</p>
              </div>
              <span className="font-bold text-primary">40%</span>
            </div>
            <div className="bg-gray-200 h-3 rounded-full mt-3">
              <div className="bg-secondary h-3 rounded-full w-2/5"></div>
            </div>
            <Link to="/lesson/1" className="inline-block text-primary font-semibold mt-3">Continue course →</Link>
          </div>

          <div className="mt-8">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-bold">Python Programming Basics</h3>
                <p className="text-sm text-gray-500 mt-1">20 of 20 lessons completed</p>
              </div>
              <span className="font-bold text-green-600">100%</span>
            </div>
            <div className="bg-gray-200 h-3 rounded-full mt-3">
              <div className="bg-green-600 h-3 rounded-full w-full"></div>
            </div>
            <Link to="/certificates" className="inline-block text-primary font-semibold mt-3">View certificate →</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold">Recent Activity</h2>

          <div className="border-b py-4">
            <p className="font-semibold">Completed: HTML Elements</p>
            <p className="text-sm text-gray-500 mt-1">Complete Web Development · Today</p>
          </div>

          <div className="border-b py-4">
            <p className="font-semibold">Quiz score: 80%</p>
            <p className="text-sm text-gray-500 mt-1">HTML Basics Quiz · Yesterday</p>
          </div>

          <div className="py-4">
            <p className="font-semibold">Completed: Python Fundamentals</p>
            <p className="text-sm text-gray-500 mt-1">Python Programming Basics · 3 days ago</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default LearningProgress
