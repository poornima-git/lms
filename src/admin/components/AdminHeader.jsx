import { Link } from 'react-router-dom'

function AdminHeader() {
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
          AD
        </div>

        <div className="hidden sm:block">
          <p className="font-semibold text-navy">Admin User</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>

        <Link
          to="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-deep-blue"
        >
          Logout
        </Link>
      </div>
    </header>
  )
}

export default AdminHeader