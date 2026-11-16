
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'

import {
  getAllUsersAPI,
  updateUserStatusAPI,
  updateUserRoleAPI,
  deleteUserAPI
} from '../../services/allAPI'

function AdminUsers() {

  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const [searchKey, setSearchKey] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)

  // Load users from backend
  const getUsers = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await getAllUsersAPI()

      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Failed to load users.'
        )
        return
      }

      setUsers(Array.isArray(response.data) ? response.data : [])

    } catch (error) {
      console.error('Get users error:', error)

      setError(
        error.response?.data?.message ||
        'Failed to load users. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // Calculate statistics
  const totalStudents = users.filter(
    user => user.role === 'student'
  ).length

  const totalInstructors = users.filter(
    user => user.role === 'instructor'
  ).length

  const inactiveUsers = users.filter(
    user => user.status === 'inactive'
  ).length

  // Search and filter users
  const filteredUsers = users.filter(user => {

    const matchesSearch =
      (user.username || '').toLowerCase().includes(searchKey.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchKey.toLowerCase())

    const matchesRole =
      roleFilter === 'All' || user.role === roleFilter.toLowerCase()

    const matchesStatus =
      statusFilter === 'All' || user.status === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  // Update user status
  const handleStatusChange = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'

    try {
      setActionLoading(true)

      const response = await updateUserStatusAPI(
        user._id,
        newStatus
      )

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to update user status.'
        )
        return
      }

      alert('User status updated successfully.')

      await getUsers()

      if (selectedUser?._id === user._id) {
        setSelectedUser(null)
      }

    } catch (error) {
      console.error('Update status error:', error)
      alert(
        error.response?.data?.message ||
        'Failed to update user status.'
      )
    } finally {
      setActionLoading(false)
    }
  }

  // Approve pending user
  const handleApprove = async (userId) => {
    try {
      setActionLoading(true)

      const response = await updateUserStatusAPI(
        userId,
        'active'
      )

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to approve user.'
        )
        return
      }

      alert('User approved successfully.')

      await getUsers()

      setSelectedUser(null)

    } catch (error) {
      console.error('Approve user error:', error)
      alert(
        error.response?.data?.message ||
        'Failed to approve user.'
      )
    } finally {
      setActionLoading(false)
    }
  }

  // Change user role
  const handleRoleChange = async (userId, role) => {
    try {
      setActionLoading(true)

      const response = await updateUserRoleAPI(userId, role)

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to update user role.'
        )
        return
      }

      alert('User role updated successfully.')

      await getUsers()

      setSelectedUser(null)

    } catch (error) {
      console.error('Update role error:', error)
      alert(
        error.response?.data?.message ||
        'Failed to update user role.'
      )
    } finally {
      setActionLoading(false)
    }
  }

  // Delete user
  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.username}?`
    )

    if (!confirmDelete) return

    try {
      setActionLoading(true)

      const response = await deleteUserAPI(user._id)

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to delete user.'
        )
        return
      }

      alert('User deleted successfully.')

      setUsers(prevUsers =>
        prevUsers.filter(item => item._id !== user._id)
      )

      setSelectedUser(null)

    } catch (error) {
      console.error('Delete user error:', error)
      alert(
        error.response?.data?.message ||
        'Failed to delete user.'
      )
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusStyle = (status) => {
    if (status === 'active') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'pending') {
      return 'bg-yellow-100 text-yellow-700'
    }

    return 'bg-red-100 text-red-700'
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy">
                Manage Users
              </h1>

              <p className="mt-2 text-gray-500">
                View student and instructor accounts.
              </p>
            </div>

            <Link
              to="/admin/add-user"
              className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-deep-blue"
            >
              + Add User
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Students</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalStudents}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Instructors</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalInstructors}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Inactive Accounts</p>
              <h2 className="mt-2 text-3xl font-bold text-red-500">
                {inactiveUsers}
              </h2>
            </div>

          </div>

          {/* Search and Filters */}
          <div className="mt-8 flex flex-wrap gap-4">

            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="min-w-[220px] flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchKey('')
                setRoleFilter('All')
                setStatusFilter('All')
              }}
              className="rounded-lg border border-primary px-4 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              Clear Filters
            </button>

          </div>

          {/* Users Table */}
          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">

            {loading ? (
              <p className="p-8 text-center text-gray-500">
                Loading users...
              </p>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500">{error}</p>

                <button
                  type="button"
                  onClick={getUsers}
                  className="mt-3 font-semibold text-primary hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <table className="w-full min-w-[850px] text-left">

                <thead className="bg-blue-50 text-deep-blue">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (

                      <tr key={user._id} className="border-b">

                        <td className="p-4 font-semibold">
                          {user.username}
                        </td>

                        <td className="p-4">
                          {user.email}
                        </td>

                        <td className="p-4 capitalize">
                          {user.role}
                        </td>

                        <td className="p-4">
                          <span className={`rounded-full px-3 py-1 text-sm capitalize ${getStatusStyle(user.status)}`}>
                            {user.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-3">

                            <button
                              type="button"
                              onClick={() => setSelectedUser(user)}
                              className="font-semibold text-primary"
                            >
                              View
                            </button>

                            {user.status === 'pending' ? (
                              <button
                                type="button"
                                disabled={actionLoading}
                                onClick={() => handleApprove(user._id)}
                                className="font-semibold text-green-600 disabled:opacity-50"
                              >
                                Approve
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={actionLoading}
                                onClick={() => handleStatusChange(user)}
                                className={`font-semibold disabled:opacity-50 ${
                                  user.status === 'active'
                                    ? 'text-red-500'
                                    : 'text-green-600'
                                }`}
                              >
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={actionLoading}
                              onClick={() => handleDelete(user)}
                              className="font-semibold text-red-600 disabled:opacity-50"
                            >
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>

                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            )}

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>

          {/* Selected User Details */}
          {selectedUser && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy">
                  User Details
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="font-semibold text-red-500"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 space-y-3 text-gray-600">
                <p>
                  <strong>Name:</strong> {selectedUser.username}
                </p>

                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>

                <p>
                  <strong>Role:</strong> <span className="capitalize">{selectedUser.role}</span>
                </p>

                <p>
                  <strong>Status:</strong> <span className="capitalize">{selectedUser.status}</span>
                </p>

                <div className="flex flex-wrap gap-3 pt-3">

                  <label className="font-semibold">
                    Change Role:
                    <select
                      value={selectedUser.role}
                      disabled={actionLoading}
                      onChange={(e) =>
                        handleRoleChange(selectedUser._id, e.target.value)
                      }
                      className="ml-3 rounded-lg border border-gray-300 px-3 py-2 font-normal"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => handleDelete(selectedUser)}
                    className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-600 disabled:opacity-50"
                  >
                    Delete User
                  </button>

                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default AdminUsers
