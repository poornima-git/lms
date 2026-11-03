import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function ManageQuizzes() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Manage Quizzes</h1>
          <p className="mt-2 text-gray-500">
            Create assessments and review quiz information.
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy">Create a Quiz</h2>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">Quiz Title</label>
              <input
                type="text"
                placeholder="React Fundamentals Quiz"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">Course</label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
                <option>React for Beginners</option>
                <option>UI/UX Design Basics</option>
                <option>Advanced JavaScript</option>
              </select>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">Time Limit</label>
                <input
                  type="number"
                  placeholder="20 minutes"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">Total Marks</label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
            </div>

            <h3 className="mt-8 text-lg font-bold text-navy">Sample Question</h3>

            <div className="mt-4 rounded-lg border border-gray-200 p-5">
              <label className="mb-2 block font-semibold">Question</label>
              <input
                type="text"
                placeholder="What is React?"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <p className="mb-3 mt-5 font-semibold">Answer Options</p>

              <input
                type="text"
                placeholder="Option A"
                className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="text"
                placeholder="Option B"
                className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="text"
                placeholder="Option C"
                className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <input
                type="text"
                placeholder="Option D"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />

              <label className="mb-2 mt-5 block font-semibold">Correct Answer</label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
                <option>Option D</option>
              </select>
            </div>

            <button
              type="button"
              className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white"
            >
              Save Quiz
            </button>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-navy">Existing Quizzes</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-blue-50 text-deep-blue">
                  <tr>
                    <th className="p-4">Quiz</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Questions</th>
                    <th className="p-4">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">React Fundamentals</td>
                    <td className="p-4">React for Beginners</td>
                    <td className="p-4">10</td>
                    <td className="p-4">72</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Design Principles</td>
                    <td className="p-4">UI/UX Design Basics</td>
                    <td className="p-4">15</td>
                    <td className="p-4">41</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ManageQuizzes