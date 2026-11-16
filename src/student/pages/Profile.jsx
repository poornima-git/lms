
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap
} from 'react-icons/fa'

import axiosInstance from '../../api/axiosInstance'

import {
  getUserProfileAPI,
  userUpdateAPI
} from '../../services/allAPI'

function Profile() {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    role: '',
    status: '',
    picture: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    setLoading(true)

    const response = await getUserProfileAPI()

    if (response?.response) {
      setMessage(
        response.response.data?.message ||
        'Unable to load profile.'
      )
      setLoading(false)
      return
    }

    const user = response?.data

    if (user) {
      setUserData({
        name: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        about: user.bio || '',
        role: user.role || 'student',
        status: user.status || 'active',
        picture: user.picture || ''
      })
    }

    setLoading(false)
  }

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

    if (!userData.name.trim()) {
      setMessage('Name is required.')
      return
    }

    setSaving(true)
    setMessage('')

    const reqBody = {
      username: userData.name.trim(),
      phone: userData.phone,
      bio: userData.about
    }

    const response = await userUpdateAPI(reqBody)

    if (response?.response) {
      setMessage(
        response.response.data?.message ||
        'Profile update failed.'
      )
    } else {
      setMessage(
        response?.data?.message ||
        'Profile updated successfully!'
      )

      // Update locally stored user details if available.
      const storedUser = JSON.parse(
        sessionStorage.getItem('user') || '{}'
      )

      sessionStorage.setItem(
        'user',
        JSON.stringify({
          ...storedUser,
          username: userData.name.trim()
        })
      )
    }

    setSaving(false)
  }

  const getProfileImage = () => {
    if (!userData.picture) return ''

    if (userData.picture.startsWith('http')) {
      return userData.picture
    }

    return `${axiosInstance.defaults.baseURL}${userData.picture.startsWith('/')
      ? userData.picture
      : `/${userData.picture}`}`
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-primary font-semibold">
            Loading profile...
          </p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">

        <h1 className="text-3xl font-extrabold text-deep">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View and update your account details.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-9">

          {/* Profile Card */}

          <div className="bg-white rounded-xl shadow-sm p-8 text-center h-fit">

            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto overflow-hidden">

              {userData.picture ? (
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-4xl text-primary" />
              )}

            </div>

            <h2 className="text-xl font-bold mt-5">
              {userData.name || 'Student Name'}
            </h2>

            <p className="text-gray-500 text-sm mt-2 capitalize">
              {userData.role || 'Student'} Account
            </p>

            <span className={`inline-block px-3 py-1 rounded-full text-xs mt-4 ${
              userData.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {userData.status || 'Unknown'}
            </span>

          </div>

          {/* Personal Information */}

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 md:p-8">

            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="mt-6">

              <div className="grid md:grid-cols-2 gap-5">

                {/* Full Name */}

                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-primary"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Email Address
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-lg px-3 bg-gray-50">
                    <FaEnvelope className="text-secondary" />

                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      readOnly
                      className="w-full p-3 outline-none bg-transparent cursor-not-allowed"
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Email address cannot be changed.
                  </p>
                </div>

                {/* Phone */}

                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-primary"
                  />
                </div>

                {/* Role */}

                <div>
                  <label className="block font-semibold text-sm mb-2">
                    Role
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-lg p-3 gap-2 bg-gray-50">
                    <FaGraduationCap className="text-secondary" />

                    <span className="capitalize">
                      {userData.role || 'Student'}
                    </span>
                  </div>
                </div>

              </div>

              {/* About Me */}

              <div className="mt-5">

                <label className="block font-semibold text-sm mb-2">
                  About Me
                </label>

                <textarea
                  rows="4"
                  name="about"
                  value={userData.about}
                  onChange={handleChange}
                  placeholder="Write something about yourself"
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-primary"
                ></textarea>

              </div>

              {/* Success / Error Message */}

              {message && (
                <p className={`mt-4 text-sm font-semibold ${
                  message.toLowerCase().includes('success')
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}>
                  {message}
                </p>
              )}

              {/* Save Button */}

              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-6 py-3 rounded-lg font-bold mt-6 hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

            </form>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
