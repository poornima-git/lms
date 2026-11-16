import React, { useState } from 'react'
import { FaGraduationCap, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <>
      {/* Main Header */}
      <div className="flex justify-between items-center px-5 md:px-16 py-4 bg-white">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-primary text-white p-3 rounded-xl">
            <FaGraduationCap className="text-2xl" />
          </div>

          <div className="ms-3">
            <h1 className="text-2xl font-extrabold text-deep">
              LearnHub
            </h1>
            <p className="text-xs text-secondary">
              Learn. Grow. Achieve.
            </p>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-medium hover:text-secondary ${
              isActive('/') ? 'text-primary' : ''
            }`}
          >
            Home
          </Link>

          <Link
            to="/courses"
            className={`font-medium hover:text-secondary ${
              isActive('/courses') ? 'text-primary' : ''
            }`}
          >
            Courses
          </Link>

          {!user && (
            <Link
              to="/login"
              className="font-medium hover:text-secondary"
            >
              Become a Learner
            </Link>
          )}

          {user && (
            <>
              <Link
                to="/student"
                className={`font-medium hover:text-secondary ${
                  isActive('/student') ? 'text-primary' : ''
                }`}
              >
                My Dashboard
              </Link>

              <Link
                to="/student/profile"
                className={`font-medium hover:text-secondary ${
                  isActive('/student/profile') ? 'text-primary' : ''
                }`}
              >
                My Profile
              </Link>
            </>
          )}
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2">

          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:flex items-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-lavender"
              >
                <FaUser className="me-2" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-deep"
              >
                Sign Up
                <FaArrowRight className="ms-2" />
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block font-medium text-primary">
                Hi, {user.username || user.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-deep"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </>
          )}

        </div>
      </div>

      {/* Secondary Navigation */}
      <nav className="bg-deep text-white px-5 md:px-16 py-3">
        <div className="flex justify-center md:justify-start gap-8 text-sm font-medium">

          <Link
            to="/"
            className={`hover:text-lavender ${
              isActive('/') ? 'text-lavender' : ''
            }`}
          >
            HOME
          </Link>

          <Link
            to="/courses"
            className={`hover:text-lavender ${
              isActive('/courses') ? 'text-lavender' : ''
            }`}
          >
            EXPLORE COURSES
          </Link>

          {!user && (
            <Link to="/login" className="hover:text-lavender">
              STUDENT LOGIN
            </Link>
          )}

          {user && (
            <>
              <Link to="/student" className="hover:text-lavender">
                DASHBOARD
              </Link>

              <Link
                to="/student/profile"
                className={`hover:text-lavender ${
                  isActive('/student/profile') ? 'text-lavender' : ''
                }`}
              >
                MY PROFILE
              </Link>
            </>
          )}

        </div>
      </nav>
    </>
  )
}

export default Header
