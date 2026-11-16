
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FaAward, FaDownload } from 'react-icons/fa'

import {
  getMyCertificatesAPI
} from '../../services/allAPI'

function Certificates() {

  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    setLoading(true)
    setError('')

    const response = await getMyCertificatesAPI()

    if (response?.response) {
      setError(
        response.response.data?.message ||
        'Unable to load certificates.'
      )
      setLoading(false)
      return
    }

    setCertificates(response?.data || [])
    setLoading(false)
  }

  const handleDownload = (certificateId) => {
    const certificateElement = document.getElementById(
      `certificate-${certificateId}`
    )

    if (!certificateElement) return

    const printWindow = window.open('', '_blank')

    if (!printWindow) {
      setError('Please allow pop-ups to download your certificate.')
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate of Completion</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
            }
            .certificate {
              border: 8px solid #A8C4EC;
              padding: 50px 30px;
              text-align: center;
              min-height: 450px;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            h1 {
              color: #272757;
              letter-spacing: 4px;
              font-size: 24px;
            }
            h2 {
              color: #272757;
              font-size: 30px;
              margin-top: 30px;
            }
            h3 {
              font-size: 26px;
              margin-top: 15px;
            }
            p {
              color: #666;
              font-size: 16px;
              margin-top: 15px;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            ${certificateElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          <\/script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">

        <h1 className="text-3xl font-extrabold text-deep">
          My Certificates
        </h1>

        <p className="text-gray-500 mt-2">
          Your learning achievements and completed courses.
        </p>

        {loading ? (

          <div className="text-center py-16">
            <p className="text-primary font-semibold">
              Loading certificates...
            </p>
          </div>

        ) : error ? (

          <div className="bg-white rounded-xl p-8 text-center mt-9">
            <p className="text-red-500">
              {error}
            </p>

            <button
              onClick={loadCertificates}
              className="bg-primary text-white px-5 py-2 rounded-lg mt-4"
            >
              Try Again
            </button>
          </div>

        ) : certificates.length > 0 ? (

          <div className="grid md:grid-cols-2 gap-7 mt-9">

            {certificates.map(certificate => {

              const courseName =
                certificate.course?.title || 'Completed Course'

              const studentName =
                certificate.student?.username || 'Student'

              const issuedDate = certificate.issueDate
                ? new Date(certificate.issueDate).toLocaleDateString(
                    'en-IN',
                    {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }
                  )
                : 'Not available'

              return (
                <div
                  key={certificate._id}
                  className="bg-white p-5 rounded-xl shadow-sm"
                >

                  {/* Certificate Design */}

                  <div
                    id={`certificate-${certificate._id}`}
                    className="border-4 border-[#A8C4EC] p-6 text-center rounded-lg"
                  >

                    <div className="text-5xl text-yellow-500">
                      <FaAward className="mx-auto" />
                    </div>

                    <p className="text-primary font-bold tracking-widest mt-4 text-sm">
                      CERTIFICATE OF COMPLETION
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-deep mt-5">
                      {courseName}
                    </h2>

                    <p className="text-gray-500 mt-3">
                      This certificate is presented to
                    </p>

                    <h3 className="text-xl font-bold mt-2">
                      {studentName}
                    </h3>

                    <p className="text-gray-500 mt-3">
                      For successfully completing the course
                    </p>

                    <p className="text-sm text-gray-500 mt-4">
                      Issued: {issuedDate}
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      Certificate ID: {certificate.certificateId}
                    </p>

                  </div>

                  {/* Download Button */}

                  <button
                    type="button"
                    onClick={() => handleDownload(certificate._id)}
                    className="w-full bg-primary text-white p-3 rounded-lg mt-5 hover:opacity-90"
                  >
                    <FaDownload className="inline me-2" />
                    Download Certificate
                  </button>

                </div>
              )
            })}

          </div>

        ) : (

          <div className="bg-white rounded-xl shadow-sm p-10 text-center mt-9">

            <FaAward className="text-5xl text-gray-300 mx-auto" />

            <h2 className="text-xl font-bold text-deep mt-4">
              No Certificates Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Complete a course to earn your certificate.
            </p>

            <Link
              to="/student/my-courses"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg mt-5"
            >
              View My Courses
            </Link>

          </div>

        )}

      </div>

      <Footer />
    </>
  )
}

export default Certificates
