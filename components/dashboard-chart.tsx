"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function DashboardChart() {
  const t = useTranslations("dashboard.chart")
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [t("months.jan"), t("months.feb"), t("months.mar"), t("months.apr"), t("months.may"), t("months.jun")],
        datasets: [
          {
            label: t("sales"),
            data: [65, 59, 80, 81, 56, 55],
            borderColor: "rgb(99, 102, 241)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            tension: 0.3,
            fill: true,
          },
          {
            label: t("revenue"),
            data: [28, 48, 40, 19, 86, 27],
            borderColor: "rgb(14, 165, 233)",
            backgroundColor: "rgba(14, 165, 233, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [t, isMounted])

  // Don't render the canvas until client-side
  if (!isMounted) {
    return <div className="w-full h-[300px] bg-muted/20 animate-pulse rounded-md"></div>
  }

  return (
    <div className="w-full h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}
