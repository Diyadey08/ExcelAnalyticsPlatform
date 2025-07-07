"use client"

import { useEffect, useState,useRef  } from "react"
import Chart2D from "../components/Chart2D"
import Chart3D from "../components/Chart3D"
import React from "react"
// Icon components
const FileSpreadsheet = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const Trash2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const HardDrive = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
)

const Table = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"
    />
  </svg>
)

const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const Scatter3D = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1-1H5a1 1 0 01-1-1V4z"
    />
  </svg>
)

const AlertTriangle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
)

const Folder = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, fileName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete File</h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete <span className="font-medium">"{fileName}"</span>? This action cannot be
            undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserUploads() {
  const [uploads, setUploads] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [xKey, setXKey] = useState("")
  const [yKey, setYKey] = useState("")
  const [chart3DType, setChart3DType] = useState("points")
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, fileName: "" })
  const [isLoading, setIsLoading] = useState(true)
    const previewRef = useRef(null);

  const fetchUploads = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:3000/user/history", 
      )
      const json = await res.json()
      setUploads(json)
    } catch (error) {
      console.error("Failed to fetch uploads:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUpload = async (id) => {
    try {
      await fetch(`http://localhost:3000/upload/${id}`, {
        method: "DELETE",
        
      })
      setSelectedRecord(null)
      fetchUploads()
      setDeleteModal({ isOpen: false, id: null, fileName: "" })
    } catch (error) {
      console.error("Failed to delete upload:", error)
    }
  }

  const viewUpload = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/upload/${id}`)
    const json = await res.json();
    setSelectedRecord(json);
    setXKey("");
    setYKey("");

    // Smooth scroll to preview section
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // slight delay ensures DOM update
  } catch (error) {
    console.error("Failed to view upload:", error);
  }
};


  useEffect(() => {
    fetchUploads()
  }, [])

  const keys = selectedRecord?.data?.[0] ? Object.keys(selectedRecord.data[0]) : []

  const formatFileSize = (sizeKB) => {
    if (sizeKB < 1024) return `${sizeKB.toFixed(1)} KB`
    return `${(sizeKB / 1024).toFixed(1)} MB`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <Folder className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Uploads
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your uploaded Excel files and create beautiful visualizations
          </p>
        </div>

        {/* Uploads Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                  Uploaded Files
                </h2>
                <p className="text-gray-600 mt-1">
                  {uploads.length} file{uploads.length !== 1 ? "s" : ""} uploaded
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Loading your files...</span>
              </div>
            ) : uploads.length === 0 ? (
              <div className="text-center py-12">
                <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files uploaded yet</h3>
                <p className="text-gray-600">Upload your first Excel file to get started with visualizations</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        File Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4" />
                        Size
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Uploaded
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {uploads.map((upload, index) => (
                    <tr
                      key={upload._id}
                      className={`hover:bg-blue-50/50 transition-colors ${
                        selectedRecord?._id === upload._id
                          ? "bg-blue-50"
                          : index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                            <FileSpreadsheet className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{upload.fileName}</div>
                            <div className="text-sm text-gray-500">Excel File</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{formatFileSize(upload.sizeKB)}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(upload.uploadedAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewUpload(upload._id)}
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: upload._id, fileName: upload.fileName })}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected Record Preview */}
        {selectedRecord && (
          <div ref={previewRef} className="space-y-8">
            {/* Data Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Table className="w-5 h-5 text-indigo-600" />
                      Data Preview - {selectedRecord.fileName}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Showing first 5 rows of {selectedRecord.data.length} total rows
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        {keys.slice(0, 5).map((key) => (
                          <th key={key} className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {selectedRecord.data.slice(0, 5).map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          {keys.slice(0, 5).map((key) => (
                            <td key={key} className="px-4 py-3 border-b border-gray-100">
                              {row[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Chart Configuration */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Chart Configuration
                </h3>
                <p className="text-gray-600 mt-1">Select columns to create visualizations</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      X-Axis Column
                    </label>
                    <select
                      value={xKey}
                      onChange={(e) => setXKey(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    >
                      <option value="">Choose X column</option>
                      {keys.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Y-Axis Column
                    </label>
                    <select
                      value={yKey}
                      onChange={(e) => setYKey(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    >
                      <option value="">Choose Y column</option>
                      {keys.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Scatter3D className="w-4 h-4" />
                      3D Chart Type
                    </label>
                    <select
                      value={chart3DType}
                      onChange={(e) => setChart3DType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    >
                      <option value="points">🔵 3D Points</option>
                      <option value="bar">📊 3D Bar</option>
                      <option value="column">📈 3D Column</option>
                      <option value="pie">🥧 3D Pie</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            {xKey && yKey && (
              <div className="space-y-8">
                {/* 2D Chart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h4 className="text-xl font-semibold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      2D Interactive Chart
                    </h4>
                    <p className="text-gray-600 mt-1">Multiple chart types with detailed statistics</p>
                  </div>
                  <div className="p-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                      <Chart2D data={selectedRecord.data} xKey={xKey} yKey={yKey} />
                    </div>
                  </div>
                </div>

                {/* 3D Chart */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h4 className="text-xl font-semibold flex items-center gap-2">
                      <Scatter3D className="w-5 h-5 text-indigo-600" />
                      3D Interactive Visualization
                    </h4>
                    <p className="text-gray-600 mt-1">Immersive 3D representation with readable overlays</p>
                  </div>
                  <div className="p-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                      <Chart3D data={selectedRecord.data} xKey={xKey} yKey={yKey} chartType={chart3DType} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, fileName: "" })}
        onConfirm={() => deleteUpload(deleteModal.id)}
        fileName={deleteModal.fileName}
      />
    </div>
  )
}
