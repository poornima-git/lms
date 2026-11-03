
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaUser, FaEnvelope, FaGraduationCap } from 'react-icons/fa'

function Profile() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">
        <h1 className="text-3xl font-extrabold text-deep">My Profile</h1>
        <p className="text-gray-500 mt-2">View and update your account details.</p>

        <div className="grid lg:grid-cols-3 gap-8 mt-9">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center h-fit">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <FaUser className="text-4xl text-primary" />
            </div>
            <h2 className="text-xl font-bold mt-5">Poornima V</h2>
            <p className="text-gray-500 text-sm mt-2">Student Account</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mt-4">Active</span>
            <p className="text-sm text-gray-500 mt-5">Member since September 2026</p>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold">Personal Information</h2>

            <form className="mt-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-sm mb-2">Full Name</label>
                  <input type="text" defaultValue="Poornima V" className="w-full border border-gray-200 rounded-lg p-3 outline-none" />
                </div>

                <div>
                  <label className="block font-semibold text-sm mb-2">Email Address</label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3">
                    <FaEnvelope className="text-secondary" />
                    <input type="email" defaultValue="Poornima@example.com" className="w-full p-3 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-sm mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-gray-200 rounded-lg p-3 outline-none" />
                </div>

                <div>
                  <label className="block font-semibold text-sm mb-2">Role</label>
                  <div className="flex items-center border border-gray-200 rounded-lg p-3 gap-2">
                    <FaGraduationCap className="text-secondary" />
                    <span>Student</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block font-semibold text-sm mb-2">About Me</label>
                <textarea rows="4" defaultValue="I enjoy learning web development and exploring new technologies." className="w-full border border-gray-200 rounded-lg p-3 outline-none"></textarea>
              </div>

              <button type="button" className="bg-primary text-white px-6 py-3 rounded-lg font-bold mt-6">
                Save Changes
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
