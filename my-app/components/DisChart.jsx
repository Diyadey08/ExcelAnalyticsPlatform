"use client"

import { useState, useEffect } from "react"
import Chart2D from "../components/Chart2D"
import Chart3D from "../components/Chart3D"
import React from "react"
// Icon components
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

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

// Error Modal Component
const ErrorModal = ({ isOpen, onClose, title, message, type = "error", actionButton = null }) => {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-amber-500" />
      case "auth":
        return <Lock className="w-12 h-12 text-red-500" />
      case "success":
        return <CheckCircle className="w-12 h-12 text-green-500" />
      default:
        return <AlertTriangle className="w-12 h-12 text-red-500" />
    }
  }

  const getColors = () => {
    switch (type) {
      case "warning":
        return {
          bg: "from-amber-50 to-orange-50",
          border: "border-amber-200",
          text: "text-amber-800",
        }
      case "auth":
        return {
          bg: "from-red-50 to-pink-50",
          border: "border-red-200",
          text: "text-red-800",
        }
      case "success":
        return {
          bg: "from-green-50 to-emerald-50",
          border: "border-green-200",
          text: "text-green-800",
        }
      default:
        return {
          bg: "from-red-50 to-pink-50",
          border: "border-red-200",
          text: "text-red-800",
        }
    }
  }

  const colors = getColors()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        <div
          className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-2 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-4">{getIcon()}</div>

            {/* Title */}
            <h3 className={`text-xl font-bold ${colors.text} mb-3`}>{title}</h3>

            {/* Message */}
            <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {actionButton}
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Login Redirect Component
const LoginRedirect = ({ isVisible, onCancel, onLogin }) => {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onLogin()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, onLogin])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-2xl transform transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-center gap-3">
              <User className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Authentication Required</h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-700 text-lg mb-2">You need to be logged in to upload files</p>
              <p className="text-gray-500">
                Redirecting to login page in <span className="font-bold text-blue-600 text-xl">{countdown}</span>{" "}
                seconds...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={onLogin}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Go to Login Now
              </button>
              <button
                onClick={onCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [sheets, setSheets] = useState({})
  const [selectedSheet, setSelectedSheet] = useState("")
  const [xKey, setXKey] = useState("")
  const [yKey, setYKey] = useState("")
  const [chart3DType, setChart3DType] = useState("points")
  const [isUploading, setIsUploading] = useState(false)

  // Error and Auth states
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  })
  const [showLoginRedirect, setShowLoginRedirect] = useState(false)

  const showError = (title, message, type = "error") => {
    setErrorModal({
      isOpen: true,
      title,
      message,
      type,
    })
  }

  const closeError = () => {
    setErrorModal({
      isOpen: false,
      title: "",
      message: "",
      type: "error",
    })
  }

  const handleLoginRedirect = () => {
    window.location.href = "/login"
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const token = localStorage.getItem("token")
    if (!token) {
      setShowLoginRedirect(true)
      return
    }

    setIsUploading(true)
    const form = new FormData()
    form.append("excel", file)
    form.append("token", token)

    try {
      const res = await fetch("https://excelanalyticsplatform.onrender.com/upload", {
        method: "POST",
        body: form,
      })

      if (res.status === 403) {
        setShowLoginRedirect(true)
        return
      }

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Upload failed:", res.status, errorText)

        // Show different error messages based on status
        switch (res.status) {
          case 400:
            showError(
              "Invalid File",
              "The uploaded file is not a valid Excel file. Please upload a .xlsx or .xls file.",
              "warning",
            )
            break
          case 413:
            showError(
              "File Too Large",
              "The uploaded file is too large. Please upload a smaller file (max 10MB).",
              "warning",
            )
            break
          case 500:
            showError("Server Error", "There was a problem processing your file. Please try again later.", "error")
            break
          default:
            showError("Upload Failed", `Upload failed with status ${res.status}. Please try again.`, "error")
        }
        return
      }

      const json = await res.json()
      setSheets(json.sheets)
      setSelectedSheet("")
      setXKey("")
      setYKey("")

      // Show success message
      showError(
        "Upload Successful! 🎉",
        "Your Excel file has been processed successfully. You can now select sheets and create visualizations.",
        "success",
      )
    } catch (err) {
      console.error("Upload error", err)
      showError(
        "Connection Error",
        "Failed to connect to the server. Please check your internet connection and try again.",
        "error",
      )
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
        <div className="relative text-center space-y-6 py-8">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* Main header content */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <FileSpreadsheet className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Excel Chart
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  Visualizer
                </h1>
              </div>
            </div>

            {/* Tagline with enhanced styling */}
            <div className="relative mb-8">
              <div className="inline-block">
                <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
                  Visualization made
                  <span className="relative ml-2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                      simpler
                    </span>
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transform scale-x-0 animate-[scaleX_2s_ease-in-out_infinite] origin-left"></div>
                  </span>
                </p>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  Transform your Excel data into stunning 2D and 3D visualizations with just a few clicks. No complex
                  setup, no learning curve – just beautiful charts in seconds.
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Instant Upload</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">2D & 3D Charts</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Interactive Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Upload Section */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Excel File</h2>
              <p className="text-gray-600 text-lg">Drop your file below and watch the magic happen ✨</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center w-full">
              <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 hover:from-blue-100/50 hover:via-indigo-100/50 hover:to-purple-100/50 transition-all duration-500 group overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-purple-400/5 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative flex flex-col items-center justify-center pt-6 pb-6 z-10">
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 rounded-full ${isUploading ? "bg-blue-400/20 animate-ping" : ""}`}
                    ></div>
                    <Upload
                      className={`relative w-12 h-12 mb-3 transition-all duration-300 ${
                        isUploading
                          ? "animate-bounce text-blue-600 scale-110"
                          : "text-gray-400 group-hover:text-blue-500 group-hover:scale-110"
                      }`}
                    />
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-lg font-semibold text-gray-700 group-hover:text-gray-800 transition-colors">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mb-2">Excel files (.xlsx, .xls)</p>
                    <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
                  </div>
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
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-5 w-5 border border-blue-400 opacity-20"></div>
                  </div>
                  <span className="text-blue-700 font-medium">Processing your file...</span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 w-full max-w-md mx-auto">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
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

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={closeError}
        title={errorModal.title}
        message={errorModal.message}
        type={errorModal.type}
      />

      {/* Login Redirect Modal */}
      <LoginRedirect
        isVisible={showLoginRedirect}
        onCancel={() => setShowLoginRedirect(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes scaleX {
          0%, 100% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
        }

        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
