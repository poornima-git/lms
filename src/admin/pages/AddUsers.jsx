
import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'

import { addUserAPI } from '../../services/allAPI'

function AddUsers() {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: 'active'
  })

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setUserData(prev => ({
      ...prev,
      [name]: value
    }))

    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !userData.name.trim() ||
      !userData.email.trim() ||
      !userData.password ||
      !userData.confirmPassword ||
      !userData.role
    ) {
      setMessage('Please fill in all required fields.')
      setMessageType('error')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(userData.email.trim())) {
      setMessage('Please enter a valid email address.')
      setMessageType('error')
      return
    }

    if (userData.password.length < 6) {
      setMessage('Password must contain at least 6 characters.')
      setMessageType('error')
      return
    }

    if (userData.password !== userData.confirmPassword) {
      setMessage('Passwords do not match.')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {

      const newUser = {
        username: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password,
        role: userData.role,
        status: userData.status
      }

      const response = await addUserAPI(newUser)

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Failed to create user.'
        )
        setMessageType('error')
        return
      }

      setMessage('User created successfully!')
      setMessageType('success')

      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        status: 'active'
      })

      // Navigate to users list after successful creation
      setTimeout(() => {
        navigate('/admin/users')
      }, 1200)

    } catch (error) {
      console.error('Create user error:', error)
      setMessage('Something went wrong while creating the user.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          <div className="mb-8">
            <Link
              to="/admin/users"
              className="font-semibold text-primary"
            >
              ← Back to Users
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-navy">
              Add New User
            </h1>

            <p className="mt-2 text-gray-500">
              Enter the details to create a new user account.
            </p>
          </div>

          <div className="max-w-3xl rounded-xl bg-white p-8 shadow-sm">

            <form onSubmit={handleSubmit}>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    User Role
                  </label>

                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Account Status
                  </label>

                  <select
                    name="status"
                    value={userData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

              </div>

              {message && (
                <p
                  className={`mt-6 rounded-lg p-3 text-sm font-medium ${
                    messageType === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Creating User...' : 'Create User'}
                </button>

                <Link
                  to="/admin/users"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>

              </div>

            </form>

          </div>

        </main>
      </div>
    </div>
  )
}

export default AddUsers
