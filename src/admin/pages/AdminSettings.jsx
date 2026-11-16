
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

import {
  getUserProfileAPI,
  userUpdateAPI
} from '../../services/allAPI'

function AdminSettings() {

  const [settings, setSettings] = useState({
    platformName: 'LearnHub',
    contactEmail: 'support@learnhub.com',
    description: 'An online learning platform for students and instructors.',
    adminName: '',
    adminEmail: '',
    newPassword: '',
    courseApproval: true
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load logged-in admin profile
  const fetchAdminProfile = async () => {

    setLoading(true)

    try {
      const response = await getUserProfileAPI()

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Failed to load admin profile.'
        )
        return
      }

      const user = response?.data || response

      setSettings(prev => ({
        ...prev,
        adminName: user.username || '',
        adminEmail: user.email || ''
      }))

    } catch (error) {
      console.error('Admin profile error:', error)
      setMessage('Something went wrong while loading admin profile.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminProfile()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setSettings(prev => ({
      ...prev,
      [name]: value
    }))

    setMessage('')
  }

  // Handle course approval setting
  const handleApprovalChange = (e) => {
    setSettings(prev => ({
      ...prev,
      courseApproval: e.target.checked
    }))

    setMessage('')
  }

  // Save admin profile
  const handleSubmit = async (e) => {

    e.preventDefault()
    setMessage('')

    if (
      !settings.platformName.trim() ||
      !settings.contactEmail.trim() ||
      !settings.adminName.trim() ||
      !settings.adminEmail.trim()
    ) {
      setMessage('Please fill in all required fields.')
      return
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.adminEmail)
    ) {
      setMessage('Please enter valid email addresses.')
      return
    }

    if (settings.newPassword && settings.newPassword.length < 6) {
      setMessage('New password must contain at least 6 characters.')
      return
    }

    if (
      settings.platformName !== 'LearnHub' ||
      settings.contactEmail !== 'support@learnhub.com' ||
      settings.description !== 'An online learning platform for students and instructors.' ||
      settings.courseApproval !== true ||
      settings.newPassword
    ) {
      setMessage(
        'Only admin name can currently be saved. Other platform settings and password changes need backend support.'
      )
    }

    setSaving(true)

    try {

      const response = await userUpdateAPI({
        username: settings.adminName.trim()
      })

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Failed to update admin profile.'
        )
        return
      }

      setMessage(
        'Admin profile updated successfully. Other settings are not saved to the backend yet.'
      )

      setSettings(prev => ({
        ...prev,
        newPassword: ''
      }))

    } catch (error) {
      console.error('Admin profile update error:', error)
      setMessage('Something went wrong while updating admin profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-navy">
            Platform Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Configure your LMS platform preferences.
          </p>

          {loading ? (
            <p className="mt-8 text-gray-500">
              Loading admin settings...
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-3xl space-y-6"
            >

              {/* General Information */}
              <section className="rounded-xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-navy">
                  General Information
                </h2>

                <div className="mt-5 space-y-5">

                  <div>
                    <label className="mb-2 block font-semibold">
                      Platform Name
                    </label>

                    <input
                      type="text"
                      name="platformName"
                      value={settings.platformName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">
                      Contact Email
                    </label>

                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">
                      Platform Description
                    </label>

                    <textarea
                      rows="3"
                      name="description"
                      value={settings.description}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    />

                  </div>

                </div>
              </section>

              {/* Account Settings */}
              <section className="rounded-xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-navy">
                  Account Settings
                </h2>

                <div className="mt-5 space-y-5">

                  <div>
                    <label className="mb-2 block font-semibold">
                      Admin Name
                    </label>

                    <input
                      type="text"
                      name="adminName"
                      value={settings.adminName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">
                      Admin Email
                    </label>

                    <input
                      type="email"
                      name="adminEmail"
                      value={settings.adminEmail}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      Email cannot currently be changed through the profile API.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">
                      New Password
                    </label>

                    <input
                      type="password"
                      name="newPassword"
                      value={settings.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      Password changes require a separate backend API.
                    </p>
                  </div>

                </div>
              </section>

              {/* Course Approval */}
              <section className="rounded-xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-navy">
                  Course Approval
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  New instructor courses should be reviewed by an administrator
                  before they become publicly available.
                </p>

                <div className="mt-4 flex items-center gap-3">

                  <input
                    type="checkbox"
                    id="courseApproval"
                    checked={settings.courseApproval}
                    onChange={handleApprovalChange}
                    className="h-5 w-5 accent-blue-600"
                  />

                  <label
                    htmlFor="courseApproval"
                    className="font-semibold text-gray-700"
                  >
                    Enable manual course approval
                  </label>

                </div>

                <span className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  settings.courseApproval
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {settings.courseApproval
                    ? 'Manual approval enabled'
                    : 'Manual approval disabled'}
                </span>

                <p className="mt-3 text-sm text-gray-500">
                  This option is currently a UI setting and is not saved to the backend.
                </p>

              </section>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>

              {/* Success / Error Message */}
              {message && (
                <p className={`rounded-lg p-3 text-sm font-semibold ${
                  message.includes('successfully')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </p>
              )}

            </form>
          )}

        </main>
      </div>
    </div>
  )
}

export default AdminSettings
