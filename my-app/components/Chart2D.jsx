import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

export default function Chart2D({ data, xKey, yKey }) {
  const chartRef = useRef(null);
  const chartData = {
    labels: data.map((d) => d[xKey]),
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data: data.map((d) => d[yKey]),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
  };

  const handleDownload = async (type) => {
    const element = chartRef.current;

    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: "#fff",
    });

    const imageData = canvas.toDataURL("image/png");

    if (type === "png") {
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${xKey}_vs_${yKey}.png`;
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imageData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${xKey}_vs_${yKey}.pdf`);
    }
  };

  return (
    <div>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "500px", // Increase height as needed
        }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
      <button onClick={() => handleDownload("png")}>Download PNG</button>
      <button onClick={() => handleDownload("pdf")}>Download PDF</button>
    </div>
  );
}
