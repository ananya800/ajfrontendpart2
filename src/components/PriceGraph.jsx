import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PriceGraph = ({ history }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: history.map((_, i) => `T${i + 1}`),
        datasets: [
          {
            label: "Price",
            data: history,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: true } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
  }, [history]);

  return <div className="h-32 w-full"><canvas ref={canvasRef} /></div>;
};

export default PriceGraph; 