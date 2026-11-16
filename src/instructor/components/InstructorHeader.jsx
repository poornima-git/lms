
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function InstructorHeader() {

  const navigate = useNavigate()

  // Get logged-in instructor details
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const instructorName = user.username || user.name || 'Instructor'

  // Generate instructor initials
  const initials = instructorName
    .trim()
    .split(/\s+/)
    .map(name => name.charAt(0))
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

      <Link to="/instructor" className="text-2xl font-bold text-primary">
        LearnHub
      </Link>

      <div className="flex items-center gap-4">

        <Link
          to="/instructor"
          className="text-sm font-medium text-gray-600 hover:text-primary"
        >
          Instructor Portal
        </Link>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-blue font-bold text-deep-blue">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-navy">
              {instructorName}
            </p>

            <p className="text-xs text-gray-500">
              Instructor
            </p>
          </div>

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

export default InstructorHeader
