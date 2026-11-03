import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorReviews() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Course Reviews</h1>
          <p className="mt-2 text-gray-500">
            Read student feedback about your courses.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Average Rating</p>
              <h2 className="mt-2 text-4xl font-bold text-yellow-500">4.8 / 5</h2>
              <p className="mt-2 text-yellow-500">★★★★★</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Reviews</p>
              <h2 className="mt-2 text-4xl font-bold text-primary">128</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Positive Reviews</p>
              <h2 className="mt-2 text-4xl font-bold text-green-600">92%</h2>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-navy">Alice Johnson</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    React for Beginners · October 12, 2026
                  </p>
                </div>
                <p className="text-lg text-yellow-500">★★★★★</p>
              </div>

              <p className="mt-4 leading-7 text-gray-600">
                Excellent course! The lessons are easy to understand, and the
                practical examples helped me build my first React application.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-navy">Michael Smith</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    UI/UX Design Basics · October 8, 2026
                  </p>
                </div>
                <p className="text-lg text-yellow-500">★★★★☆</p>
              </div>

              <p className="mt-4 leading-7 text-gray-600">
                The course explains design fundamentals very well. I would
                appreciate a few more real-world design projects.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-navy">Sarah Williams</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    React for Beginners · October 3, 2026
                  </p>
                </div>
                <p className="text-lg text-yellow-500">★★★★★</p>
              </div>

              <p className="mt-4 leading-7 text-gray-600">
                The course structure is great, and the lesson materials are
                useful for revision. I highly recommend it to beginners.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InstructorReviews