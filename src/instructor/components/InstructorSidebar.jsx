
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function InstructorSidebar() {

  const location = useLocation()

  // Check whether the current route matches the menu link
  const isActive = (path) => {
    if (path === '/instructor') {
      return location.pathname === path
    }

    return location.pathname === path ||
      location.pathname.startsWith(path + '/')
  }

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/instructor'
    },
    {
      title: 'My Courses',
      path: '/instructor/courses'
    },
    {
      title: 'Create Course',
      path: '/instructor/create-course'
    },
    {
      title: 'Manage Lessons',
      path: '/instructor/lessons'
    },
    {
      title: 'Manage Quizzes',
      path: '/instructor/quizzes'
    },
    {
      title: 'My Students',
      path: '/instructor/students'
    },
    {
      title: 'Course Reviews',
      path: '/instructor/reviews'
    }
  ]

  return (
    <aside className="min-h-screen w-64 shrink-0 bg-[#29285B] p-5 text-white">

      <h2 className="mb-8 text-xl font-bold">
        Instructor Menu
      </h2>

      {/* Navigation Menu */}
      <nav className="space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block rounded-lg px-4 py-3 transition ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            {item.title}
          </Link>
        ))}

      </nav>

      {/* Help Section */}
      <div className="mt-12 rounded-xl bg-white/10 p-4">

        <p className="font-semibold">
          Need help?
        </p>

        <p className="mt-2 text-sm text-gray-300">
          Contact the LearnHub support team for assistance.
        </p>

      </div>

    </aside>
  )
}

export default InstructorSidebar
