"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import React from "react"
export default function Chart3D({ data, xKey, yKey, chartType }) {
  const mountRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartStats, setChartStats] = useState({ min: 0, max: 0, total: 0, average: 0 })
  const [selectedDataPoint, setSelectedDataPoint] = useState(null)
  const [showDataPanel, setShowDataPanel] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  useEffect(() => {
    if (!data || data.length === 0) return

    setIsLoading(true)
    const width = 1000
    const height = 700

    // Calculate statistics
    const values = data.map((row) => Number.parseFloat(row[yKey]) || 0)
    const stats = {
      min: Math.min(...values),
      max: Math.max(...values),
      total: values.reduce((sum, val) => sum + val, 0),
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
    }
    setChartStats(stats)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8fafc)

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000)
    camera.position.set(200, 200, 400)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0xf8fafc, 1)

    // Clear and setup container
    if (mountRef.current) {
      mountRef.current.innerHTML = ""
      mountRef.current.appendChild(renderer.domElement)
    }

    // Add orbit controls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = true
    controls.maxPolarAngle = Math.PI / 2
    controls.minDistance = 100
    controls.maxDistance = 800

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(100, 200, 100)
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 2048
    directionalLight1.shadow.mapSize.height = 2048
    directionalLight1.shadow.camera.near = 0.5
    directionalLight1.shadow.camera.far = 500
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
    directionalLight2.position.set(-100, 100, -100)
    scene.add(directionalLight2)

    // Create ground plane
    const groundGeometry = new THREE.PlaneGeometry(400, 400)
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -5
    ground.receiveShadow = true
    scene.add(ground)

    // Create axes helper function
    const createAxis = (start, end, color, label) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
      const material = new THREE.LineBasicMaterial({ color, linewidth: 3 })
      const line = new THREE.Line(geometry, material)
      scene.add(line)

      // Add arrow head
      const arrowGeometry = new THREE.ConeGeometry(2, 8, 8)
      const arrowMaterial = new THREE.MeshBasicMaterial({ color })
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
      arrow.position.copy(end)

      if (label === "X") {
        arrow.rotation.z = -Math.PI / 2
      } else if (label === "Y") {
        // Default orientation for Y
      } else if (label === "Z") {
        arrow.rotation.x = Math.PI / 2
      }

      scene.add(arrow)
    }

    // Create coordinate system
    createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(150, 0, 0), 0xff0000, "X")
    createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 150, 0), 0x00ff00, "Y")
    createAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 150), 0x0000ff, "Z")

    // Create grid
    const createGrid = () => {
      const gridSize = 200
      const divisions = 10
      const gridHelper = new THREE.GridHelper(gridSize, divisions, 0xcccccc, 0xeeeeee)
      gridHelper.position.y = 0
      scene.add(gridHelper)

      // Vertical grid
      for (let i = -gridSize / 2; i <= gridSize / 2; i += gridSize / divisions) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, 0, -gridSize / 2),
          new THREE.Vector3(i, 100, -gridSize / 2),
        ])
        const material = new THREE.LineBasicMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.3 })
        const line = new THREE.Line(geometry, material)
        scene.add(line)
      }
    }
    createGrid()

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const clickableObjects = []

    const onMouseClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(clickableObjects)

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object
        if (clickedObject.userData) {
          setSelectedDataPoint(clickedObject.userData)
        }
      }
    }

    renderer.domElement.addEventListener("click", onMouseClick)

    const fontLoader = new FontLoader()
    fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
      if (chartType === "pie") {
        const total = data.reduce((sum, row) => sum + (Number.parseFloat(row[yKey]) || 0), 0)
        let angleStart = 0
        const radius = 60
        const height = 30

        data.forEach((row, i) => {
          const value = Number.parseFloat(row[yKey]) || 0
          const label = row[xKey] || `Slice ${i + 1}`
          const angle = (value / total) * Math.PI * 2
          const percentage = ((value / total) * 100).toFixed(1)

          const shape = new THREE.Shape()
          shape.moveTo(0, 0)
          shape.absarc(0, 0, radius, angleStart, angleStart + angle, false)

          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: height,
            bevelEnabled: true,
            bevelThickness: 3,
            bevelSize: 2,
            bevelSegments: 8,
          })

          // Enhanced colors
          const hue = i / data.length
          const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
          const material = new THREE.MeshPhongMaterial({
            color,
            shininess: 100,
            specular: 0x444444,
          })

          const mesh = new THREE.Mesh(geometry, material)
          mesh.rotation.x = -Math.PI / 2
          mesh.position.y = height / 2
          mesh.castShadow = true
          mesh.receiveShadow = true
          mesh.userData = { label, value, percentage, index: i, type: "pie" }
          clickableObjects.push(mesh)
          scene.add(mesh)

          angleStart += angle
        })
      } else if (chartType === "bar" || chartType === "column") {
        const maxValue = Math.max(...data.map((row) => Number.parseFloat(row[yKey]) || 0))
        const spacing = 20

        data.forEach((row, index) => {
          const value = Number.parseFloat(row[yKey]) || 0
          const normalizedHeight = (value / maxValue) * 80 + 5
          const x = (index - data.length / 2) * spacing
          const z = 0

          // Create bar with rounded edges
          const barGeometry = new THREE.BoxGeometry(12, normalizedHeight, 12)

          // Enhanced colors with gradient effect
          const hue = index / data.length
          const color = new THREE.Color().setHSL(hue, 0.7, 0.6)
          const material = new THREE.MeshPhongMaterial({
            color,
            shininess: 80,
            specular: 0x333333,
          })

          const bar = new THREE.Mesh(barGeometry, material)
          bar.position.set(x, normalizedHeight / 2, z)
          bar.castShadow = true
          bar.receiveShadow = true
          bar.userData = {
            label: row[xKey],
            value,
            index,
            type: "bar",
            xValue: row[xKey],
            yValue: value,
          }
          clickableObjects.push(bar)
          scene.add(bar)

          // Grid lines for values
          if (index === 0) {
            for (let i = 0; i <= maxValue; i += maxValue / 5) {
              const gridY = (i / maxValue) * 80
              const gridGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-100, gridY, -20),
                new THREE.Vector3(100, gridY, -20),
              ])
              const gridMaterial = new THREE.LineBasicMaterial({
                color: 0xcccccc,
                transparent: true,
                opacity: 0.5,
              })
              const gridLine = new THREE.Line(gridGeometry, gridMaterial)
              scene.add(gridLine)
            }
          }
        })
      } else if (chartType === "points") {
        data.forEach((row, index) => {
          const x = (Number.parseFloat(row[xKey]) || 0) * 3
          const y = (Number.parseFloat(row[yKey]) || 0) * 2
          const z = (index - data.length / 2) * 15

          const color = new THREE.Color().setHSL((y + 50) / 100, 0.8, 0.6)

          // Add sphere for better visibility
          const sphereGeometry = new THREE.SphereGeometry(Math.max(3, y / 15), 16, 16)
          const sphereMaterial = new THREE.MeshPhongMaterial({
            color,
            shininess: 100,
            transparent: true,
            opacity: 0.8,
          })
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
          sphere.position.set(x, y, z)
          sphere.castShadow = true
          sphere.userData = {
            label: row[xKey],
            value: row[yKey],
            index,
            type: "point",
            xValue: row[xKey],
            yValue: row[yKey],
          }
          clickableObjects.push(sphere)
          scene.add(sphere)
        })
      }

      setIsLoading(false)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    })

    // Cleanup function
    return () => {
      renderer.domElement.removeEventListener("click", onMouseClick)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      controls.dispose()
      renderer.dispose()
    }
  }, [data, xKey, yKey, chartType])

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No data available for 3D visualization</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-10">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Rendering 3D chart...</span>
          </div>
        </div>
      )}

      <div
        ref={mountRef}
        className="w-full max-w-full overflow-hidden rounded-lg shadow-inner bg-gradient-to-br from-slate-50 to-slate-100 border border-gray-200"
        style={{
          width: "100%",
          height: "500px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      />

      {/* Top Controls Bar */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-2">
        {/* Chart Info */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-lg border">
          <div className="font-semibold text-gray-800 mb-1">📊 Chart Information</div>
          <div className="text-gray-600">Type: {chartType.toUpperCase()}</div>
          <div className="text-gray-600">Data Points: {data.length}</div>
          <div className="text-gray-600">🖱️ Click on elements for details</div>
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
            onClick={() => setShowLegend(!showLegend)}
            className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-lg border hover:bg-white transition-colors"
          >
            {showLegend ? "Hide" : "Show"} Legend
          </button>
        </div>
      </div>

      {/* Left Side - Data Panel */}
      {showDataPanel && (
        <div className="absolute left-2 top-16 bottom-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border overflow-hidden">
          <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">📋 Data Values</h3>
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
                    <div className="text-gray-500">Index: {index + 1}</div>
                    {chartType === "pie" && (
                      <div className="text-blue-600">{((value / chartStats.total) * 100).toFixed(1)}%</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Legend and Statistics */}
      {showLegend && (
        <div className="absolute right-2 top-16 bottom-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border overflow-hidden">
          <div className="p-3 border-b bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">🎯 Legend & Stats</h3>
          </div>
          <div className="overflow-y-auto h-full p-3 space-y-4">
            {/* Axis Legend */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Axes</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>X-Axis: {xKey}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Y-Axis: {yKey}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Z-Axis: Index</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Statistics</h4>
              <div className="space-y-1 text-xs">
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
                <div className="flex justify-between">
                  <span>Count:</span>
                  <span className="font-mono">{data.length}</span>
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Colors</h4>
              <div className="space-y-1 text-xs">
                {data.slice(0, 8).map((row, index) => {
                  const hue = index / data.length
                  const color = `hsl(${hue * 360}, 70%, 60%)`
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
                      <span className="truncate">{row[xKey]}</span>
                    </div>
                  )
                })}
                {data.length > 8 && <div className="text-gray-500 italic">...and {data.length - 8} more</div>}
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
                  <div className="font-medium">{selectedDataPoint.label || selectedDataPoint[xKey]}</div>
                </div>
                <div>
                  <span className="text-gray-600">{yKey}:</span>
                  <div className="font-medium">{selectedDataPoint.value || selectedDataPoint[yKey]}</div>
                </div>
                <div>
                  <span className="text-gray-600">Index:</span>
                  <div className="font-medium">{(selectedDataPoint.index || 0) + 1}</div>
                </div>
                {selectedDataPoint.percentage && (
                  <div>
                    <span className="text-gray-600">Percentage:</span>
                    <div className="font-medium">{selectedDataPoint.percentage}%</div>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setSelectedDataPoint(null)} className="text-gray-400 hover:text-gray-600 text-xl">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Interactive Guide */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Click elements for details
      </div>
    </div>
  )
}
