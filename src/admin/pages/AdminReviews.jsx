import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminReviews() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Course Reviews</h1>
          <p className="mt-2 text-gray-500">
            Monitor student feedback and review reported comments.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Total Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">1,284</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Average Rating</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-500">4.7 / 5</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Reported Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-red-500">4</h2>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-navy">Alice Johnson</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    React for Beginners
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Approved
                </span>
              </div>

              <p className="mt-3 text-yellow-500">★★★★★</p>
              <p className="mt-3 leading-7 text-gray-600">
                The lessons are clear, practical, and suitable for beginners.
                I enjoyed building projects while learning.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500"
                >
                  Hide Review
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-navy">Michael Smith</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    UI/UX Design Basics
                  </p>
                </div>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  Reported
                </span>
              </div>

              <p className="mt-3 text-yellow-500">★★☆☆☆</p>
              <p className="mt-3 leading-7 text-gray-600">
                Some topics need more examples and additional practice exercises.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  Keep Review
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500"
                >
                  Hide Review
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-navy">Sarah Williams</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    HTML and CSS Essentials
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Approved
                </span>
              </div>

              <p className="mt-3 text-yellow-500">★★★★★</p>
              <p className="mt-3 leading-7 text-gray-600">
                Great explanations and useful examples. This course helped me
                understand responsive layouts.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminReviews