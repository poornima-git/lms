
import React from 'react'
import { Link } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa'

function Pnf() {
  return (
    <div className="min-h-screen bg-lavender flex justify-center items-center flex-col text-center p-5">
      <FaGraduationCap className="text-7xl text-primary" />
      <h1 className="text-6xl font-extrabold text-deep mt-5">404</h1>
      <h2 className="text-2xl font-bold mt-3">Page Not Found</h2>
      <p className="text-gray-500 mt-3">Sorry, the page you are looking for is not available.</p>
      <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg mt-7">
        Back to Home
      </Link>
    </div>
  )
}

export default Pnf
