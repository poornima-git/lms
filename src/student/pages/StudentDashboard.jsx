
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaBookOpen, FaGraduationCap, FaClock, FaTrophy } from 'react-icons/fa'

function StudentDashboard() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="text-primary font-semibold">STUDENT DASHBOARD</p>
            <h1 className="text-3xl font-extrabold text-deep mt-2">
              Welcome back, Poornima!
            </h1>
            <p className="text-gray-500 mt-2">
              Continue learning and achieve your goals.
            </p>
          </div>

          <Link to="/courses" className="bg-primary text-white px-5 py-3 rounded-lg h-fit text-center">
            Explore Courses
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaBookOpen className="text-primary text-2xl" />
            <p className="text-gray-500 mt-4">Enrolled Courses</p>
            <h2 className="text-3xl font-bold mt-1">4</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaGraduationCap className="text-secondary text-2xl" />
            <p className="text-gray-500 mt-4">Completed Courses</p>
            <h2 className="text-3xl font-bold mt-1">2</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaClock className="text-primary text-2xl" />
            <p className="text-gray-500 mt-4">Learning Hours</p>
            <h2 className="text-3xl font-bold mt-1">36</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <FaTrophy className="text-yellow-500 text-2xl" />
            <p className="text-gray-500 mt-4">Certificates</p>
            <h2 className="text-3xl font-bold mt-1">2</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-deep">Continue Learning</h2>

            <div className="bg-white rounded-xl p-5 mt-5 shadow-sm md:flex gap-5">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
                alt="Web development"
                className="w-full md:w-48 h-40 object-cover rounded-lg"
              />

              <div className="flex-1 mt-4 md:mt-0">
                <span className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full">
                  Development
                </span>
                <h3 className="text-xl font-bold mt-3">Complete Web Development</h3>
                <p className="text-sm text-gray-500 mt-2">Instructor: Rahul Sharma</p>

                <div className="bg-gray-200 h-2 rounded-full mt-4">
                  <div className="bg-primary h-2 rounded-full w-3/5"></div>
                </div>

                <p className="text-sm text-gray-500 mt-2">60% completed</p>

                <Link to="/lesson/1" className="inline-block bg-primary text-white px-4 py-2 rounded-lg mt-4">
                  Resume Learning
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 mt-5 shadow-sm md:flex gap-5">
              <img
                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600"
                alt="UI UX design"
                className="w-full md:w-48 h-40 object-cover rounded-lg"
              />

              <div className="flex-1 mt-4 md:mt-0">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  Design
                </span>
                <h3 className="text-xl font-bold mt-3">UI/UX Design Masterclass</h3>
                <p className="text-sm text-gray-500 mt-2">Instructor: Anjali Nair</p>

                <div className="bg-gray-200 h-2 rounded-full mt-4">
                  <div className="bg-secondary h-2 rounded-full w-2/5"></div>
                </div>

                <p className="text-sm text-gray-500 mt-2">40% completed</p>

                <Link to="/lesson/1" className="inline-block bg-primary text-white px-4 py-2 rounded-lg mt-4">
                  Resume Learning
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-deep">Upcoming Activities</h2>

            <div className="bg-white rounded-xl p-5 mt-5 shadow-sm">
              <p className="text-sm text-primary font-semibold">TODAY</p>
              <h3 className="font-bold mt-2">JavaScript Quiz</h3>
              <p className="text-sm text-gray-500 mt-2">Test your knowledge of JavaScript basics.</p>
              <Link to="/quiz" className="text-primary font-semibold text-sm inline-block mt-4">
                Take Quiz →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-5 mt-5 shadow-sm">
              <p className="text-sm text-secondary font-semibold">COURSE PROGRESS</p>
              <h3 className="font-bold mt-2">Weekly Learning Goal</h3>
              <p className="text-sm text-gray-500 mt-2">6 of 8 learning hours completed.</p>
              <div className="bg-gray-200 h-2 rounded-full mt-4">
                <div className="bg-secondary h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <Link to="/certificates" className="block bg-deep text-white p-5 rounded-xl mt-5">
              <FaTrophy className="text-2xl text-yellow-400" />
              <h3 className="font-bold mt-3">My Certificates</h3>
              <p className="text-sm text-gray-300 mt-1">View your achievements.</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default StudentDashboard
