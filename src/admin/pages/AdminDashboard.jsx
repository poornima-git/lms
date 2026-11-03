import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminDashboard() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Overview of your learning management platform.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">1,250</h2>
              <p className="mt-2 text-sm text-green-600">Students and instructors</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Courses</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">86</h2>
              <p className="mt-2 text-sm text-gray-500">Across all categories</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-600">12</h2>
              <p className="mt-2 text-sm text-gray-500">Courses awaiting review</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Certificates Issued</p>
              <h2 className="mt-3 text-3xl font-bold text-green-600">342</h2>
              <p className="mt-2 text-sm text-gray-500">Successful completions</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Recent Users</h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-semibold">Alice Johnson</p>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-semibold">John David</p>
                    <p className="text-sm text-gray-500">Instructor</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Michael Smith</p>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pending
                  </span>
                </div>
              </div>

              <Link
                to="/admin/users"
                className="mt-5 inline-block font-semibold text-primary hover:underline"
              >
                View all users →
              </Link>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Pending Courses</h2>

              <div className="mt-5 space-y-4">
                <div className="border-b pb-4">
                  <p className="font-semibold">Advanced React Development</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Instructor: John David
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Awaiting Approval
                  </span>
                </div>

                <div>
                  <p className="font-semibold">Python for Data Science</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Instructor: Emma Wilson
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Awaiting Approval
                  </span>
                </div>
              </div>

              <Link
                to="/admin/courses"
                className="mt-5 inline-block font-semibold text-primary hover:underline"
              >
                Review courses →
              </Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard