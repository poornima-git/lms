
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

import {
  getAdminCertificatesAPI,
  updateCertificateStatusAPI
} from '../../services/allAPI'

function AdminCertificates() {

  const [certificates, setCertificates] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  // Load certificates from backend
  const fetchCertificates = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await getAdminCertificatesAPI()

      if (response?.response) {
        setError(response.response.data?.message || 'Failed to load certificates')
        setCertificates([])
      } else {
        const certificateData = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : []

        setCertificates(certificateData)
      }

    } catch (err) {
      console.error('Certificate loading error:', err)
      setError('Something went wrong while loading certificates.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  // Certificate statistics
  const totalIssued = certificates.filter(
    certificate => certificate.status === 'issued'
  ).length

  const pendingCertificates = certificates.filter(
    certificate => certificate.status === 'pending'
  ).length

  // Certificates issued during the current month
  const currentDate = new Date()

  const issuedThisMonth = certificates.filter(certificate => {
    if (certificate.status !== 'issued' || !certificate.issueDate) {
      return false
    }

    const issueDate = new Date(certificate.issueDate)

    return (
      issueDate.getMonth() === currentDate.getMonth() &&
      issueDate.getFullYear() === currentDate.getFullYear()
    )
  }).length

  // Search and filter
  const filteredCertificates = certificates.filter(certificate => {

    const certificateId = certificate.certificateId || ''
    const studentName = certificate.student?.username || ''
    const courseName = certificate.course?.title || ''

    const matchesSearch =
      certificateId.toLowerCase().includes(searchKey.toLowerCase()) ||
      studentName.toLowerCase().includes(searchKey.toLowerCase()) ||
      courseName.toLowerCase().includes(searchKey.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      certificate.status === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Approve certificate
  const handleApprove = async (certificate) => {

    if (!certificate?._id) {
      alert('Certificate ID is missing.')
      return
    }

    setUpdatingId(certificate._id)

    try {
      const response = await updateCertificateStatusAPI(
        certificate._id,
        'issued'
      )

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to approve certificate.'
        )
        return
      }

      const updatedCertificate = response?.data || response

      setCertificates(prevCertificates =>
        prevCertificates.map(item =>
          item._id === certificate._id
            ? {
                ...item,
                ...updatedCertificate,
                status: 'issued'
              }
            : item
        )
      )

      setSelectedCertificate(prev =>
        prev?._id === certificate._id
          ? {
              ...prev,
              ...updatedCertificate,
              status: 'issued'
            }
          : prev
      )

      alert('Certificate approved successfully.')

    } catch (err) {
      console.error('Certificate approval error:', err)
      alert('Something went wrong while approving the certificate.')
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusStyle = (status) => {
    if (status === 'issued') {
      return 'bg-green-100 text-green-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  const formatDate = (date) => {
    if (!date) return 'Not available'

    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-navy">
            Certificates
          </h1>

          <p className="mt-2 text-gray-500">
            Review issued certificates and student course completions.
          </p>

          {/* Statistics */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Certificates Issued</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalIssued}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">This Month</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {issuedThisMonth}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Pending Review</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                {pendingCertificates}
              </h2>
            </div>

          </div>

          {/* Search and Filter */}
          <div className="mt-8 flex flex-wrap gap-4">

            <input
              type="text"
              placeholder="Search certificate, student or course..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="min-w-[220px] flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchKey('')
                setStatusFilter('All')
              }}
              className="rounded-lg border border-primary px-4 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              Clear Filters
            </button>

          </div>

          {/* Certificates Table */}
          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">

            <table className="w-full min-w-[850px] text-left">

              <thead className="bg-blue-50 text-deep-blue">
                <tr>
                  <th className="p-4">Certificate ID</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Loading certificates...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filteredCertificates.length > 0 ? (
                  filteredCertificates.map(certificate => (

                    <tr key={certificate._id} className="border-b">

                      <td className="p-4 font-semibold">
                        {certificate.certificateId}
                      </td>

                      <td className="p-4">
                        {certificate.student?.username || 'Unknown'}
                      </td>

                      <td className="p-4">
                        {certificate.course?.title || 'Unknown'}
                      </td>

                      <td className="p-4">
                        {formatDate(certificate.issueDate)}
                      </td>

                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-sm ${getStatusStyle(certificate.status)}`}>
                          {certificate.status}
                        </span>
                      </td>

                      <td className="flex gap-3 p-4">

                        <button
                          type="button"
                          onClick={() => setSelectedCertificate(certificate)}
                          className="font-semibold text-primary"
                        >
                          View
                        </button>

                        {certificate.status === 'pending' && (
                          <button
                            type="button"
                            disabled={updatingId === certificate._id}
                            onClick={() => handleApprove(certificate)}
                            className="font-semibold text-green-600 disabled:opacity-50"
                          >
                            {updatingId === certificate._id
                              ? 'Approving...'
                              : 'Approve'}
                          </button>
                        )}

                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-8 text-center text-gray-500"
                    >
                      No certificates found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredCertificates.length} of {certificates.length} certificates
          </p>

          {/* Certificate Details */}
          {selectedCertificate && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy">
                  Certificate Details
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="font-semibold text-red-500"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 space-y-3 text-gray-600">

                <p>
                  <strong>Certificate ID:</strong> {selectedCertificate.certificateId}
                </p>

                <p>
                  <strong>Student:</strong> {selectedCertificate.student?.username || 'Unknown'}
                </p>

                <p>
                  <strong>Course:</strong> {selectedCertificate.course?.title || 'Unknown'}
                </p>

                <p>
                  <strong>Issue Date:</strong> {formatDate(selectedCertificate.issueDate)}
                </p>

                <p>
                  <strong>Status:</strong> {selectedCertificate.status}
                </p>

              </div>

              {selectedCertificate.status === 'pending' && (
                <button
                  type="button"
                  disabled={updatingId === selectedCertificate._id}
                  onClick={() => handleApprove(selectedCertificate)}
                  className="mt-5 rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {updatingId === selectedCertificate._id
                    ? 'Approving...'
                    : 'Approve Certificate'}
                </button>
              )}

            </div>
          )}

          {/* Certificate Policy */}
          <div className="mt-8 rounded-xl border border-light-blue bg-blue-50 p-6">

            <h2 className="text-lg font-bold text-deep-blue">
              Certificate Policy
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              Students should receive a certificate after meeting the required
              course completion criteria. Pending certificates can be reviewed
              and approved by the administrator.
            </p>

          </div>

        </main>
      </div>
    </div>
  )
}

export default AdminCertificates
