
import React from 'react'
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaUser
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

function Auth() {
  const location = useLocation()
  const insideRegister = location.pathname === '/register'

  return (
    <div className="min-h-screen bg-lavender flex justify-center items-center p-5">

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl md:grid grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-deep text-white flex-col justify-center items-center p-10 text-center">
          <FaGraduationCap className="text-7xl text-[#AFAFD0]" />

          <h1 className="text-3xl font-extrabold mt-6">
            LearnHub
          </h1>

          <h2 className="text-xl mt-4">
            Learn without limits.
          </h2>

          <p className="text-gray-300 mt-4 leading-7">
            Discover new skills, connect with expert instructors,
            and achieve your learning goals with LearnHub.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-10">

          <Link to="/" className="text-primary font-bold">
            ← Back to Home
          </Link>

          <div className="text-center mt-8">
            <h1 className="text-3xl font-extrabold text-deep">
              {insideRegister ? 'Create Account' : 'Welcome Back'}
            </h1>

            <p className="text-gray-500 mt-2">
              {insideRegister
                ? 'Join our learning community today'
                : 'Login to continue your learning journey'}
            </p>
          </div>

          <form className="mt-8">

            {/* Full Name - Register Only */}
            {insideRegister && (
              <div className="mb-5">
                <label className="font-semibold text-sm">
                  Full Name
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3">
                  <FaUser className="text-secondary" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label className="font-semibold text-sm">
                Email Address
              </label>

              <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3">
                <FaEnvelope className="text-secondary" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="font-semibold text-sm">
                Password
              </label>

              <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3">
                <FaLock className="text-secondary" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            {/* Confirm Password - Register Only */}
            {insideRegister && (
              <div className="mb-5">
                <label className="font-semibold text-sm">
                  Confirm Password
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3">
                  <FaLock className="text-secondary" />

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full p-3 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Role - Register Only */}
            {insideRegister && (
              <div className="mb-5">
                <label className="font-semibold text-sm">
                  Select Role
                </label>

                <select className="w-full border border-gray-200 rounded-lg mt-2 p-3 bg-white outline-none">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
            )}

            {/* Forgot Password - Login Only */}
            {!insideRegister && (
              <div className="text-right mb-5">
                <Link
                  to="/login"
                  className="text-sm text-accent underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-deep"
            >
              {insideRegister ? 'Create Account' : 'Login'}
            </button>

            {/* Switch Between Login and Register */}
            <div className="text-center mt-7 text-sm text-gray-500">
              {insideRegister
                ? 'Already have an account?'
                : "Don't have an account?"}

              <Link
                to={insideRegister ? '/login' : '/register'}
                className="text-primary font-bold ms-2"
              >
                {insideRegister ? 'Login' : 'Register'}
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
