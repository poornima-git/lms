import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'

function AddUsers() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <div className="mb-8">
            <Link
              to="/admin/users"
              className="font-semibold text-primary"
            >
              ← Back to Users
            </Link>

            <h1 className="mt-4 text-3xl font-bold text-navy">
              Add New User
            </h1>

            <p className="mt-2 text-gray-500">
              Enter the details to create a new user account.
            </p>
          </div>

          <div className="max-w-3xl rounded-xl bg-white p-8 shadow-sm">
            <form>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    User Role
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary">
                    <option value="">Select role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-navy">
                    Account Status
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue"
                >
                  Create User
                </button>

                <Link
                  to="/admin/users"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddUsers