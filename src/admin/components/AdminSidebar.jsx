
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AdminSidebar() {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin'
    },
    {
      title: 'Manage Users',
      path: '/admin/users'
    },
    {
      title: 'Manage Courses',
      path: '/admin/courses'
    },
    {
      title: 'Certificates',
      path: '/admin/certificates'
    },
    {
      title: 'Course Reviews',
      path: '/admin/reviews'
    },
    {
      title: 'Settings',
      path: '/admin/settings'
    }
  ]

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }

    return location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="min-h-screen w-64 shrink-0 bg-primary p-5 text-white">
      <h2 className="mb-8 text-xl font-bold">Admin Menu</h2>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`block rounded-lg px-4 py-3 transition ${
              isActive(item.path)
                ? 'bg-accent font-bold'
                : 'hover:bg-accent'
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mt-12 rounded-xl bg-white/10 p-4">
        <p className="font-semibold">Admin Support</p>

        <p className="mt-2 text-sm text-gray-300">
          Manage your platform and monitor learning activities.
        </p>
      </div>
    </aside>
  )
}

export default AdminSidebar
