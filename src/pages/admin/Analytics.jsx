import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const mockUserGrowth = [
  { date: "2024-05-01", users: 100 },
  { date: "2024-05-08", users: 150 },
  { date: "2024-05-15", users: 220 },
  { date: "2024-05-22", users: 300 },
  { date: "2024-06-01", users: 400 },
];
const mockCategories = [
  { name: "Smartphones", count: 120 },
  { name: "Laptops", count: 80 },
  { name: "Accessories", count: 60 },
  { name: "Tablets", count: 40 },
];
const mockFunnel = [
  { step: "Visit", count: 1000 },
  { step: "Track", count: 400 },
  { step: "Alert", count: 120 },
  { step: "Buy", count: 30 },
];
const mockPriceUpdates = [
  { date: "2024-05-28", updates: 20 },
  { date: "2024-05-29", updates: 25 },
  { date: "2024-05-30", updates: 18 },
  { date: "2024-05-31", updates: 30 },
  { date: "2024-06-01", updates: 22 },
];

function LineChart({ labels, data, label }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
  }, [labels, data, label]);
  return <div className="h-48 w-full"><canvas ref={canvasRef} /></div>;
}

function BarChart({ labels, data, label }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: [
              "#6366f1",
              "#f59e42",
              "#10b981",
              "#f43f5e",
              "#a21caf",
            ],
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
  }, [labels, data, label]);
  return <div className="h-48 w-full"><canvas ref={canvasRef} /></div>;
}

function PieChart({ labels, data, label }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: [
              "#6366f1",
              "#f59e42",
              "#10b981",
              "#f43f5e",
              "#a21caf",
            ],
          },
        ],
      },
      options: {
        plugins: { legend: { display: true } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
  }, [labels, data, label]);
  return <div className="h-48 w-full"><canvas ref={canvasRef} /></div>;
}

function FunnelChart({ steps }) {
  // Simple step indicator for funnel
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-6">
      {steps.map((step, idx) => (
        <div key={step.step} className="flex flex-col items-center flex-1">
          <div className={`rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold ${idx === 0 ? 'bg-blue-200 text-blue-800' : idx === steps.length-1 ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{step.count}</div>
          <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">{step.step}</div>
          {idx < steps.length - 1 && <div className="h-8 w-1 bg-gray-300 dark:bg-gray-600 mx-auto my-2 md:h-1 md:w-8 md:my-0 md:mx-2 md:self-center" />}
        </div>
      ))}
    </div>
  );
}

const Analytics = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Analytics & Reports</h2>
      {/* User Growth Over Time */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">User Growth Over Time</h3>
        <LineChart
          labels={mockUserGrowth.map(u => u.date)}
          data={mockUserGrowth.map(u => u.users)}
          label="Users"
        />
      </div>
      {/* Top Tracked Categories/Brands */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Top Tracked Categories</h3>
        <BarChart
          labels={mockCategories.map(c => c.name)}
          data={mockCategories.map(c => c.count)}
          label="Tracked"
        />
      </div>
      {/* Conversion Funnel */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Conversion Funnel</h3>
        <FunnelChart steps={mockFunnel} />
      </div>
      {/* Daily/Weekly Price Update Stats */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Daily Price Update Stats</h3>
        <LineChart
          labels={mockPriceUpdates.map(p => p.date)}
          data={mockPriceUpdates.map(p => p.updates)}
          label="Price Updates"
        />
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-left">Updates</th>
              </tr>
            </thead>
            <tbody>
              {mockPriceUpdates.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 text-gray-700 dark:text-gray-200">{row.date}</td>
                  <td className="px-2 py-1 text-blue-700 dark:text-blue-400 font-semibold">{row.updates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 