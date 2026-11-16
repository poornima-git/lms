
import React from 'react'
import { Link } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa'

function Pnf() {
  return (
    <div className="min-h-screen bg-lavender flex justify-center items-center flex-col text-center p-5">

      <FaGraduationCap className="text-7xl text-primary" />

      <h1 className="text-6xl font-extrabold text-deep mt-5">
        404
      </h1>

      <h2 className="text-2xl font-bold mt-3">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        Sorry! The page you are looking for does not exist
        or may have been moved.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-7">

        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-deep-blue"
        >
          Back to Home
        </Link>

        <Link
          to="/courses"
          className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-white"
        >
          Explore Courses
        </Link>

      </div>
    </div>
  )
}

export default Pnf
