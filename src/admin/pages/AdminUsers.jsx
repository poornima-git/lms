import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { Link } from 'react-router-dom'

function AdminUsers() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy">Manage Users</h1>
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

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Students</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">1,080</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Instructors</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">170</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Inactive Accounts</p>
              <h2 className="mt-2 text-3xl font-bold text-red-500">18</h2>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[750px] text-left">
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
                <tr className="border-b">
                  <td className="p-4 font-semibold">Alice Johnson</td>
                  <td className="p-4">alice@example.com</td>
                  <td className="p-4">Student</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">John David</td>
                  <td className="p-4">john@example.com</td>
                  <td className="p-4">Instructor</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">Michael Smith</td>
                  <td className="p-4">michael@example.com</td>
                  <td className="p-4">Student</td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">Emma Wilson</td>
                  <td className="p-4">emma@example.com</td>
                  <td className="p-4">Instructor</td>
                  <td className="p-4">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                      Inactive
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminUsers