
import React from 'react'
import { FaGraduationCap, FaUser } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-5 md:px-16 py-4 bg-white">
        <Link to="/" className="flex items-center">
          <div className="bg-primary text-white p-3 rounded-xl">
            <FaGraduationCap className="text-2xl" />
          </div>
          <div className="ms-3">
            <h1 className="text-2xl font-extrabold text-deep">LearnHub</h1>
            <p className="text-xs text-secondary">Learn. Grow. Achieve.</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-secondary font-medium">Home</Link>
          <Link to="/courses" className="hover:text-secondary font-medium">Courses</Link>
          <Link to="/login" className="hover:text-secondary font-medium">Become a Learner</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:flex items-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-lavender">
            <FaUser className="me-2" /> Login
          </Link>
          <Link to="/register" className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-deep">
            Sign Up <FaArrowRight className="ms-2" />
          </Link>
        </div>
      </div>

      <nav className="bg-deep text-white px-5 md:px-16 py-3">
        <div className="flex justify-center md:justify-start gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-lavender">HOME</Link>
          <Link to="/courses" className="hover:text-lavender">EXPLORE COURSES</Link>
          <Link to="/login" className="hover:text-lavender">STUDENT LOGIN</Link>
        </div>
      </nav>
    </>
  )
}

export default Header
