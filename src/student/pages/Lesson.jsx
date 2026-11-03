
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FaPlay, FaFilePdf, FaCheckCircle, FaDownload } from 'react-icons/fa'

function Lesson() {
  return (
    <>
      <Header />

      <div className="bg-deep text-white px-5 md:px-16 py-6">
        <p className="text-blue-200 text-sm">My Courses / Web Development</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-3">
          Complete Web Development
        </h1>
        <p className="text-gray-300 mt-2">Module 1: Introduction to Web Development</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-5 md:p-10 bg-gray-50">
        <div className="lg:col-span-3">
          <div className="bg-black rounded-xl overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/UB1O30fR-EE"
              title="Introduction to Web Development"
              allowFullScreen
            ></iframe>
          </div>

          <div className="bg-white rounded-xl p-6 mt-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-primary font-semibold text-sm">LESSON 01</p>
                <h2 className="text-2xl font-bold mt-2">Introduction to HTML</h2>
                <p className="text-gray-500 mt-2">Duration: 18 minutes</p>
              </div>

              <span className="text-green-600 font-semibold text-sm">
                <FaCheckCircle className="inline me-2" />
                Sample lesson status
              </span>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-bold">About This Lesson</h3>
            <p className="text-gray-600 leading-7 mt-3">
              Learn the basic structure of an HTML document, understand common
              HTML elements, and discover how web pages are organized.
            </p>

            <h3 className="text-xl font-bold mt-7">Lesson Resources</h3>

            <div className="border border-gray-200 rounded-lg p-4 mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FaFilePdf className="text-red-500 text-3xl" />
                <div>
                  <h4 className="font-bold">HTML Beginner Notes.pdf</h4>
                  <p className="text-sm text-gray-500">PDF study material</p>
                </div>
              </div>

              <a href="/sample-notes.pdf" className="text-primary font-semibold">
                <FaDownload className="inline me-2" />
                Download
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <Link to="/courses/1" className="border border-primary text-primary px-5 py-3 rounded-lg text-center">
                Back to Course
              </Link>

              <Link to="/quiz" className="bg-primary text-white px-5 py-3 rounded-lg text-center">
                Continue to Quiz →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 className="text-xl font-bold">Course Content</h2>
          <p className="text-sm text-gray-500 mt-2">4 modules · 24 lessons</p>

          <div className="mt-5">
            <h3 className="bg-blue-50 text-deep font-bold p-3 rounded-lg">
              Module 1: Getting Started
            </h3>

            <div className="p-3 border-b">
              <FaPlay className="inline text-primary me-2" />
              <span className="text-sm font-semibold">Introduction to HTML</span>
              <p className="text-xs text-gray-500 ms-6 mt-1">18 minutes</p>
            </div>

            <div className="p-3 border-b">
              <FaPlay className="inline text-gray-400 me-2" />
              <span className="text-sm">HTML Elements</span>
              <p className="text-xs text-gray-500 ms-6 mt-1">22 minutes</p>
            </div>

            <div className="p-3 border-b">
              <FaPlay className="inline text-gray-400 me-2" />
              <span className="text-sm">HTML Forms</span>
              <p className="text-xs text-gray-500 ms-6 mt-1">16 minutes</p>
            </div>

            <h3 className="bg-gray-100 font-bold p-3 rounded-lg mt-4">
              Module 2: CSS Basics
            </h3>

            <div className="p-3 border-b">
              <FaPlay className="inline text-gray-400 me-2" />
              <span className="text-sm">Introduction to CSS</span>
            </div>

            <div className="p-3">
              <FaPlay className="inline text-gray-400 me-2" />
              <span className="text-sm">Styling Web Pages</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Lesson
