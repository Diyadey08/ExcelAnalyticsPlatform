"use client"

import { useState } from "react"
import Chart2D from "../components/Chart2D"
import Chart3D from "../components/Chart3D"
import React from "react"
// Icon components (you can replace these with any icon library or SVGs)
const Upload = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

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

const PieChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />
  </svg>
)

const BarChart2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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

export default function Home() {
  const [sheets, setSheets] = useState({})
  const [selectedSheet, setSelectedSheet] = useState("")
  const [xKey, setXKey] = useState("")
  const [yKey, setYKey] = useState("")
  const [chart3DType, setChart3DType] = useState("points")
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const form = new FormData()
    form.append("excel", file)
    const token = localStorage.getItem("token")
    form.append("token", token)

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Upload failed:", res.status, errorText)
        alert(`Upload failed: ${res.status}`)
        return
      }

      const json = await res.json()
      setSheets(json.sheets)
      setSelectedSheet("")
      setXKey("")
      setYKey("")
    } catch (err) {
      console.error("Upload error", err)
      alert("Upload failed: Check file or server")
    } finally {
      setIsUploading(false)
    }
  }

  const currentData = sheets?.[selectedSheet] || []
  let keys = []

  if (Array.isArray(currentData) && currentData.length > 0 && currentData[0] !== null) {
    try {
      keys = Object.keys(currentData[0])
    } catch (err) {
      console.error("Error getting keys from sheet row:", err)
      keys = []
    }
  }

  const previewData = currentData.slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <FileSpreadsheet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Excel Chart Visualizer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload your Excel files and create stunning 2D and 3D visualizations with ease
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
                <Upload className="w-6 h-6 text-blue-600" />
                Upload Excel File
              </h2>
              <p className="text-gray-600 mt-1">Select an Excel file to start creating beautiful charts</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload
                    className={`w-10 h-10 mb-3 ${isUploading ? "animate-bounce text-blue-600" : "text-gray-400"}`}
                  />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Excel files (.xlsx, .xls)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            {isUploading && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Processing your file...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        {Object.keys(sheets).length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Configure Your Chart
              </h2>
              <p className="text-gray-600 mt-1">Select the sheet and data columns for visualization</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Select Sheet
                  </label>
                  <select
                    value={selectedSheet}
                    onChange={(e) => setSelectedSheet(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                  >
                    <option value="">Choose a sheet</option>
                    {Object.keys(sheets).map((sheet) => (
                      <option key={sheet} value={sheet}>
                        {sheet}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" />
                    X-Axis Column
                  </label>
                  <select
                    value={xKey}
                    onChange={(e) => setXKey(e.target.value)}
                    disabled={!selectedSheet}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Choose X column</option>
                    {keys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" />
                    Y-Axis Column
                  </label>
                  <select
                    value={yKey}
                    onChange={(e) => setYKey(e.target.value)}
                    disabled={!selectedSheet}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">Choose Y column</option>
                    {keys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Preview */}
        {selectedSheet && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Table className="w-5 h-5 text-purple-600" />
                  Data Preview
                </h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  {currentData.length} rows
                </span>
              </div>
              <p className="text-gray-600 mt-1">Preview of your selected sheet data (showing first 5 rows)</p>
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
                    {previewData.map((row, i) => (
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
        )}

        {/* Charts Section */}
        {xKey && yKey && (
          <div className="space-y-8">
            {/* 2D Chart - Full Width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-blue-600" />
                  2D Interactive Chart Visualization
                </h2>
                <p className="text-gray-600 mt-1">Multiple chart types with detailed statistics and export options</p>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                  <Chart2D data={currentData} xKey={xKey} yKey={yKey} />
                </div>
              </div>
            </div>

            {/* 3D Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Scatter3D className="w-5 h-5 text-indigo-600" />
                      3D Interactive Chart Visualization
                    </h2>
                    <p className="text-gray-600 mt-1">Immersive 3D representation with readable 2D data overlays</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Chart Type:</label>
                    <select
                      value={chart3DType}
                      onChange={(e) => setChart3DType(e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 outline-none transition-all"
                    >
                      <option value="points">🔵 3D Points</option>
                      <option value="bar">📊 3D Bar</option>
                      <option value="column">📈 3D Column</option>
                      <option value="pie">🥧 3D Pie</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                  <Chart3D data={currentData} xKey={xKey} yKey={yKey} chartType={chart3DType} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
