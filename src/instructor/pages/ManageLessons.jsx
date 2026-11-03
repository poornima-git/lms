import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function ManageLessons() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Manage Lessons</h1>
          <p className="mt-2 text-gray-500">
            Organize video lessons and downloadable learning materials.
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <label className="mb-2 block font-semibold">Select Course</label>
            <select className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3">
              <option>React for Beginners</option>
              <option>UI/UX Design Basics</option>
              <option>Advanced JavaScript</option>
            </select>

            <h2 className="mt-8 text-xl font-bold text-navy">Add New Lesson</h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">Lesson Title</label>
                <input
                  type="text"
                  placeholder="Introduction to React"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">Lesson Type</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
                  <option>Video</option>
                  <option>PDF Material</option>
                  <option>Text Lesson</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">Video URL</label>
              <input
                type="url"
                placeholder="https://example.com/video"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">Upload PDF or Material</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full rounded-lg border border-gray-300 p-3"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">Lesson Description</label>
              <textarea
                rows="3"
                placeholder="Describe this lesson"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <button
              type="button"
              className="mt-5 rounded-lg bg-primary px-6 py-3 font-semibold text-white"
            >
              Add Lesson
            </button>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy">Existing Lessons</h2>

            <div className="mt-5 divide-y">
              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">1. Introduction to React</p>
                  <p className="mt-1 text-sm text-gray-500">Video lesson · 12 minutes</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Published
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">2. Components and Props</p>
                  <p className="mt-1 text-sm text-gray-500">Video lesson · 18 minutes</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Published
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">3. React Study Notes</p>
                  <p className="mt-1 text-sm text-gray-500">PDF material</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  Draft
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ManageLessons