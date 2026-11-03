
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaAward, FaDownload } from 'react-icons/fa'

function Certificates() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">
        <h1 className="text-3xl font-extrabold text-deep">My Certificates</h1>
        <p className="text-gray-500 mt-2">Your learning achievements and completed courses.</p>

        <div className="grid md:grid-cols-2 gap-7 mt-9">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="border-4 border-[#A8C4EC] p-6 text-center rounded-lg">
              <FaAward className="text-5xl text-yellow-500 mx-auto" />
              <p className="text-primary font-bold tracking-widest mt-4 text-sm">CERTIFICATE OF COMPLETION</p>
              <h2 className="text-2xl font-serif font-bold text-deep mt-5">Web Development</h2>
              <p className="text-gray-500 mt-3">This certificate is presented to</p>
              <h3 className="text-xl font-bold mt-2">Poornima V</h3>
              <p className="text-gray-500 mt-3">For successfully completing the course</p>
              <p className="text-sm text-gray-500 mt-4">Issued: 20 October 2026</p>
            </div>
            <button type="button" className="w-full bg-primary text-white p-3 rounded-lg mt-5">
              <FaDownload className="inline me-2" />
              Download Certificate
            </button>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="border-4 border-[#A8C4EC] p-6 text-center rounded-lg">
              <FaAward className="text-5xl text-yellow-500 mx-auto" />
              <p className="text-primary font-bold tracking-widest mt-4 text-sm">CERTIFICATE OF COMPLETION</p>
              <h2 className="text-2xl font-serif font-bold text-deep mt-5">Python Programming</h2>
              <p className="text-gray-500 mt-3">This certificate is presented to</p>
              <h3 className="text-xl font-bold mt-2">Poornima V</h3>
              <p className="text-gray-500 mt-3">For successfully completing the course</p>
              <p className="text-sm text-gray-500 mt-4">Issued: 12 September 2026</p>
            </div>
            <button type="button" className="w-full bg-primary text-white p-3 rounded-lg mt-5">
              <FaDownload className="inline me-2" />
              Download Certificate
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Certificates
