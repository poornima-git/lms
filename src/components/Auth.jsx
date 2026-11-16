import React, { useState } from 'react'

import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaUser
} from 'react-icons/fa'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { registerAPI, loginAPI } from '../services/allAPI'

function Auth() {

  const location = useLocation()
  const navigate = useNavigate()

  const insideRegister = location.pathname === '/register'

  // Form state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })

  // Error and loading states
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setUserData({
      ...userData,
      [name]: value
    })

    setError('')
  }

  // Navigate according to user role
  const navigateUser = (role) => {

    if (role === 'admin') {
      navigate('/admin')
    }
    else if (role === 'instructor') {
      navigate('/instructor')
    }
    else {
      navigate('/student')
    }

  }

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault()
    setError('')

    // Basic validation
    if (!userData.email || !userData.password) {
      setError('Please enter your email and password.')
      return
    }

    if (insideRegister) {

      if (!userData.name.trim()) {
        setError('Please enter your full name.')
        return
      }

      if (userData.password.length < 6) {
        setError('Password must contain at least 6 characters.')
        return
      }

      if (userData.password !== userData.confirmPassword) {
        setError('Password and confirm password do not match.')
        return
      }

    }

    try {

      setLoading(true)

      let response

      if (insideRegister) {

        // REGISTER API
        const reqBody = {
          username: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        }

        response = await registerAPI(reqBody)

      }
      else {

        // LOGIN API
        const reqBody = {
          email: userData.email,
          password: userData.password
        }

        response = await loginAPI(reqBody)

      }

      // apiService returns an error object when the request fails
      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Something went wrong. Please try again.'
        )
        return
      }

      const result = response?.data

      if (!result) {
        setError(response?.message || 'Unable to connect to the server.')
        return
      }

      // Check whether backend returned a JWT token
      if (result.token) {

        sessionStorage.setItem('token', result.token)

        const loggedUser = result.user || result.existingUser || {
          username: userData.name,
          email: userData.email,
          role: userData.role
        }

        sessionStorage.setItem('user', JSON.stringify(loggedUser))

        const role = loggedUser.role || userData.role

        navigateUser(role)

      }
      else if (insideRegister) {

        // Registration successful without automatic login
        navigate('/login', {
          state: {
            message: result.message || 'Registration successful. Please login.'
          }
        })

      }
      else {

        setError('Login successful, but the authentication token was not received.')

      }

    }
    catch (err) {

      console.log('Authentication Error:', err)

      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.'
      )

    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-lavender flex justify-center items-center p-5">

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl md:grid md:grid-cols-2">

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

          <Link to="/" className="text-primary font-bold hover:underline">
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

            {location.state?.message && !insideRegister && (
              <p className="text-green-600 text-sm mt-3">
                {location.state.message}
              </p>
            )}

          </div>

          <form className="mt-8" onSubmit={handleSubmit}>

            {/* Full Name */}
            {insideRegister && (
              <div className="mb-5">

                <label className="font-semibold text-sm">
                  Full Name
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3 focus-within:border-primary">

                  <FaUser className="text-secondary" />

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-3 outline-none"
                    autoComplete="name"
                  />

                </div>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">

              <label className="font-semibold text-sm">
                Email Address
              </label>

              <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3 focus-within:border-primary">

                <FaEnvelope className="text-secondary" />

                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                  autoComplete="email"
                />

              </div>
            </div>

            {/* Password */}
            <div className="mb-5">

              <label className="font-semibold text-sm">
                Password
              </label>

              <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3 focus-within:border-primary">

                <FaLock className="text-secondary" />

                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="Enter your password"
                  className="w-full p-3 outline-none"
                  autoComplete={insideRegister ? 'new-password' : 'current-password'}
                />

              </div>
            </div>

            {/* Confirm Password */}
            {insideRegister && (
              <div className="mb-5">

                <label className="font-semibold text-sm">
                  Confirm Password
                </label>

                <div className="flex items-center border border-gray-200 rounded-lg mt-2 px-3 focus-within:border-primary">

                  <FaLock className="text-secondary" />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full p-3 outline-none"
                    autoComplete="new-password"
                  />

                </div>
              </div>
            )}

            {/* Role Selection */}
            {insideRegister && (
              <div className="mb-5">

                <label className="font-semibold text-sm">
                  Register As
                </label>

                <select
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg mt-2 p-3 outline-none focus:border-primary"
                >

                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>

                </select>

              </div>
            )}

            {/* Forgot Password */}
            {!insideRegister && (
              <div className="text-right mb-5">

                <Link
                  to="/forgot-password"
                  className="text-sm text-accent underline"
                >
                  Forgot Password?
                </Link>

              </div>
            )}

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-deep transition disabled:opacity-60"
            >
              {loading
                ? 'Please wait...'
                : insideRegister
                  ? 'Create Account'
                  : 'Login'}
            </button>

            {/* Switch Between Login and Register */}
            <div className="text-center mt-7 text-sm text-gray-500">

              {insideRegister
                ? 'Already have an account?'
                : "Don't have an account?"}

              <Link
                to={insideRegister ? '/login' : '/register'}
                className="text-primary font-bold ms-2 hover:underline"
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