
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {

  const navigate = useNavigate()

  // Get logged-in admin details
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const adminName = user.username || user.name || 'Administrator'

  const initials = adminName
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">

      <Link to="/admin" className="text-2xl font-bold text-primary">
        LearnHub
      </Link>

      <div className="flex items-center gap-4">

        <span className="hidden text-sm text-gray-500 sm:block">
          Administration Panel
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-blue font-bold text-deep-blue">
          {initials}
        </div>

        <div className="hidden sm:block">
          <p className="font-semibold text-navy">{adminName}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-deep-blue"
        >
          Logout
        </button>

      </div>
    </header>
  )
}

export default AdminHeader
