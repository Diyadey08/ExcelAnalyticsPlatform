"use client"

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"
import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import React from "react"

// Register necessary chart components
ChartJS.register(LineElement, BarElement, PointElement, ArcElement, LinearScale, CategoryScale, Tooltip, Legend)

// Icon components
const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8M4 4h16v12a1 1 0 01-1-1H5a1 1 0 01-1-1V4z"
    />
  </svg>
)

const BarChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const LineChart = ({ className }) => (
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

const FileImage = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

export default function Chart2D({ data, xKey, yKey }) {
  const chartRef = useRef(null)
  const [chartType, setChartType] = useState("line")
  const [selectedDataPoint, setSelectedDataPoint] = useState(null)
  const [showDataPanel, setShowDataPanel] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  // Calculate statistics
  const values = data.map((row) => Number.parseFloat(row[yKey]) || 0)
  const chartStats = {
    min: Math.min(...values),
    max: Math.max(...values),
    total: values.reduce((sum, val) => sum + val, 0),
    average: values.reduce((sum, val) => sum + val, 0) / values.length,
    count: data.length,
  }

  const chartData = {
    labels: data.map((d) => d[xKey]),
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data: data.map((d, i) => (chartType === "scatter" ? { x: d[xKey], y: d[yKey] } : d[yKey])),
        backgroundColor:
          chartType === "pie"
            ? data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 60%)`)
            : "rgba(59, 130, 246, 0.6)",
        borderColor: chartType === "pie" ? data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 50%)`) : "#3b82f6",
        borderWidth: 2,
        fill: chartType === "line" ? false : true,
        tension: chartType === "line" ? 0.4 : 0,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: chartType === "line" ? 6 : 4,
        pointHoverRadius: 8,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          afterLabel: (context) => {
            if (chartType === "pie") {
              const percentage = ((context.raw / chartStats.total) * 100).toFixed(1)
              return `Percentage: ${percentage}%`
            }
            return null
          },
        },
      },
    },
    scales:
      chartType === "pie"
        ? {}
        : {
            x: {
              beginAtZero: true,
              grid: {
                color: "#f3f4f6",
                borderColor: "#d1d5db",
              },
              ticks: {
                color: "#6b7280",
                font: {
                  size: 11,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "#f3f4f6",
                borderColor: "#d1d5db",
              },
              ticks: {
                color: "#6b7280",
                font: {
                  size: 11,
                },
              },
            },
          },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        setSelectedDataPoint({
          ...data[index],
          index,
          value: data[index][yKey],
        })
      }
    },
  }

  const handleDownload = async (type) => {
    setIsDownloading(true)
    try {
      const element = chartRef.current
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: "#fff",
        scale: 2,
      })
      const imageData = canvas.toDataURL("image/png")

      if (type === "png") {
        const link = document.createElement("a")
        link.href = imageData
        link.download = `${xKey}_vs_${yKey}_${chartType}.png`
        link.click()
      } else if (type === "pdf") {
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imageData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight)
        pdf.save(`${xKey}_vs_${yKey}_${chartType}.pdf`)
      }
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const getChartIcon = (type) => {
    switch (type) {
      case "bar":
        return <BarChart className="w-4 h-4" />
      case "pie":
        return <PieChart className="w-4 h-4" />
      case "scatter":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        )
      default:
        return <LineChart className="w-4 h-4" />
    }
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={chartOptions} />
      case "pie":
        return <Pie data={chartData} options={chartOptions} />
      case "scatter":
        return <Line data={chartData} options={chartOptions} />
      default:
        return <Line data={chartData} options={chartOptions} />
    }
  }

  return (
    <div className="relative">
      {/* Top Controls Bar */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-2 z-10">
        {/* Chart Type Selector */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border">
          <div className="flex items-center gap-2 mb-2">
            {getChartIcon(chartType)}
            <span className="font-semibold text-gray-800 text-sm">Chart Type</span>
          </div>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="line">📈 Line Chart</option>
            <option value="bar">📊 Bar Chart</option>
            <option value="pie">🥧 Pie Chart</option>
            <option value="scatter">🔵 Scatter Plot</option>
          </select>
        </div>

        {/* Download Controls */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-800 text-sm">Export</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload("png")}
              disabled={isDownloading}
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FileImage className="w-3 h-3" />
              PNG
            </button>
            <button
              onClick={() => handleDownload("pdf")}
              disabled={isDownloading}
              className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <FileText className="w-3 h-3" />
              PDF
            </button>
          </div>
        </div>

        {/* Toggle Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDataPanel(!showDataPanel)}
            className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-lg border hover:bg-white transition-colors"
          >
            {showDataPanel ? "Hide" : "Show"} Data
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-lg border hover:bg-white transition-colors"
          >
            {showStats ? "Hide" : "Show"} Stats
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div
        ref={chartRef}
        className="w-full bg-white rounded-lg shadow-inner border border-gray-200"
        style={{
          height: "500px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        {renderChart()}
      </div>

      {/* Left Side - Data Panel */}
      {showDataPanel && (
        <div className="absolute left-2 top-16 bottom-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border overflow-hidden">
          <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">📋 Data Points</h3>
            <p className="text-xs text-gray-600 mt-1">Click chart elements for details</p>
          </div>
          <div className="overflow-y-auto h-full p-2">
            <div className="space-y-2">
              {data.map((row, index) => {
                const value = Number.parseFloat(row[yKey]) || 0
                const isSelected = selectedDataPoint?.index === index
                return (
                  <div
                    key={index}
                    className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-100 border-blue-300 shadow-md"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedDataPoint({ ...row, index, value })}
                  >
                    <div className="font-medium text-gray-800">{row[xKey]}</div>
                    <div className="text-gray-600">
                      {yKey}: {value}
                    </div>
                    <div className="text-gray-500">#{index + 1}</div>
                    {chartType === "pie" && (
                      <div className="text-blue-600 font-medium">{((value / chartStats.total) * 100).toFixed(1)}%</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Statistics Panel */}
      {showStats && (
        <div className="absolute right-2 top-16 bottom-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border overflow-hidden">
          <div className="p-3 border-b bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">📊 Statistics</h3>
          </div>
          <div className="overflow-y-auto h-full p-3 space-y-4">
            {/* Chart Info */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Chart Information</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-mono capitalize">{chartType}</span>
                </div>
                <div className="flex justify-between">
                  <span>X-Axis:</span>
                  <span className="font-mono">{xKey}</span>
                </div>
                <div className="flex justify-between">
                  <span>Y-Axis:</span>
                  <span className="font-mono">{yKey}</span>
                </div>
              </div>
            </div>

            {/* Statistical Data */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Data Statistics</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Count:</span>
                  <span className="font-mono">{chartStats.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum:</span>
                  <span className="font-mono">{chartStats.min.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum:</span>
                  <span className="font-mono">{chartStats.max.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average:</span>
                  <span className="font-mono">{chartStats.average.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-mono">{chartStats.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                {chartType === "pie" ? (
                  data.slice(0, 8).map((row, index) => {
                    const hue = (index * 360) / data.length
                    const color = `hsl(${hue}, 70%, 60%)`
                    const value = Number.parseFloat(row[yKey]) || 0
                    const percentage = ((value / chartStats.total) * 100).toFixed(1)
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
                        <span className="truncate flex-1">{row[xKey]}</span>
                        <span className="text-gray-500">{percentage}%</span>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>{yKey} values</span>
                  </div>
                )}
                {chartType === "pie" && data.length > 8 && (
                  <div className="text-gray-500 italic">...and {data.length - 8} more</div>
                )}
              </div>
            </div>

            {/* Chart Tips */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Tips</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• Click on chart elements to select</div>
                <div>• Hover for detailed tooltips</div>
                <div>• Use export buttons to save</div>
                <div>• Toggle panels to focus on chart</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom - Selected Data Details */}
      {selectedDataPoint && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">🎯 Selected Data Point</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                <div>
                  <span className="text-gray-600">Label:</span>
                  <div className="font-medium">{selectedDataPoint[xKey]}</div>
                </div>
                <div>
                  <span className="text-gray-600">{yKey}:</span>
                  <div className="font-medium">{selectedDataPoint[yKey]}</div>
                </div>
                <div>
                  <span className="text-gray-600">Index:</span>
                  <div className="font-medium">#{selectedDataPoint.index + 1}</div>
                </div>
                {chartType === "pie" && (
                  <div>
                    <span className="text-gray-600">Percentage:</span>
                    <div className="font-medium">
                      {((selectedDataPoint.value / chartStats.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedDataPoint(null)}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isDownloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-20">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Generating download...</span>
          </div>
        </div>
      )}

      {/* Interactive Guide */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        👆 Click chart elements • 📊 View stats • 💾 Export charts
      </div>
    </div>
  )
}
