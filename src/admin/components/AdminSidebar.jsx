import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 bg-primary p-5 text-white">
      <h2 className="mb-8 text-xl font-bold">Admin Menu</h2>

      <nav className="space-y-2">
        <Link
          to="/admin"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/courses"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Manage Courses
        </Link>

        <Link
          to="/admin/certificates"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Certificates
        </Link>

        <Link
          to="/admin/reviews"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Course Reviews
        </Link>

        <Link
          to="/admin/settings"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Settings
        </Link>
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