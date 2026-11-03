
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaStar, FaClock, FaBook, FaGraduationCap, FaPlayCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CourseView() {
  return (
    <>
      <Header />

      <div className="bg-deep text-white px-5 md:px-20 py-12">
        <p className="text-[#B8B8D5]">Courses / Development / Web Development</p>
        <div className="md:grid grid-cols-3 gap-10 mt-6">
          <div className="col-span-2">
            <span className="bg-accent px-3 py-1 rounded-full text-sm">Development</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-5">Complete Web Development Bootcamp</h1>
            <p className="text-gray-300 mt-5 leading-7">
              Learn to build modern websites from scratch using HTML, CSS,
              JavaScript and React. This course takes you from the basics
              to building real-world projects.
            </p>
            <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-200">
              <span><FaStar className="inline text-yellow-400" /> 4.9 (120 reviews)</span>
              <span><FaClock className="inline me-1" /> 8 Weeks</span>
              <span><FaBook className="inline me-1" /> 24 Lessons</span>
            </div>
            <p className="mt-6">Instructor: <b>Rahul Sharma</b></p>
          </div>

          <div className="bg-white text-primary rounded-2xl p-4 shadow-xl mt-8 md:mt-0">
            <img className="w-full h-44 object-cover rounded-xl" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800" alt="Web development course" />
            <h2 className="font-bold text-2xl mt-4">Free Course</h2>
            <p className="text-gray-500 text-sm mt-2">Start learning today and improve your skills.</p>
            <Link to="/login" className="block bg-primary text-white text-center p-3 rounded-lg font-bold mt-5">
              Enroll Now
            </Link>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p><FaGraduationCap className="inline me-2" /> Certificate of Completion</p>
              <p><FaPlayCircle className="inline me-2" /> 24 Video Lessons</p>
              <p><FaBook className="inline me-2" /> Downloadable PDF Notes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-20 py-12">
        <div className="md:grid grid-cols-3 gap-10">

          <div className="col-span-2">
            <h2 className="text-2xl font-bold">About This Course</h2>
            <p className="text-gray-600 leading-7 mt-4">
              This course is designed for beginners who want to understand
              website development. You will learn the fundamentals of web
              technologies, build responsive pages, and create a final project
              to demonstrate your skills.
            </p>

            <h2 className="text-2xl font-bold mt-10">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-5 text-gray-600">
              <p>✓ HTML page structure and elements</p>
              <p>✓ CSS styling and responsive layouts</p>
              <p>✓ JavaScript programming basics</p>
              <p>✓ React components and JSX</p>
              <p>✓ Working with forms and navigation</p>
              <p>✓ Building a complete website project</p>
            </div>

            <h2 className="text-2xl font-bold mt-10">Course Content</h2>
            <div className="mt-5 space-y-3">
              <div className="bg-lavender p-5 rounded-xl">
                <h3 className="font-bold">Module 1: Introduction to Web Development</h3>
                <p className="text-sm text-gray-500 mt-2">5 Lessons · 45 Minutes</p>
              </div>
              <div className="bg-lavender p-5 rounded-xl">
                <h3 className="font-bold">Module 2: HTML and CSS Fundamentals</h3>
                <p className="text-sm text-gray-500 mt-2">7 Lessons · 2 Hours</p>
              </div>
              <div className="bg-lavender p-5 rounded-xl">
                <h3 className="font-bold">Module 3: JavaScript Essentials</h3>
                <p className="text-sm text-gray-500 mt-2">6 Lessons · 3 Hours</p>
              </div>
              <div className="bg-lavender p-5 rounded-xl">
                <h3 className="font-bold">Module 4: Introduction to React</h3>
                <p className="text-sm text-gray-500 mt-2">6 Lessons · 3 Hours</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white shadow-sm rounded-xl p-6 mt-10 md:mt-0">
              <h2 className="font-bold text-xl">Student Reviews</h2>
              <div className="flex items-center gap-3 mt-5">
                <h3 className="text-4xl font-extrabold">4.9</h3>
                <div>
                  <p className="text-yellow-500">★★★★★</p>
                  <p className="text-xs text-gray-500">120 Reviews</p>
                </div>
              </div>
              <hr className="my-5" />
              <div className="mb-5">
                <h4 className="font-bold">Poornima V</h4>
                <p className="text-yellow-500 text-sm">★★★★★</p>
                <p className="text-gray-500 text-sm mt-2">Excellent course! The explanations were very clear and easy to follow.</p>
              </div>
              <div>
                <h4 className="font-bold">Adarsh Kumar</h4>
                <p className="text-yellow-500 text-sm">★★★★★</p>
                <p className="text-gray-500 text-sm mt-2">A great learning experience. I enjoyed building projects.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default CourseView
