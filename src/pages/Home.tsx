import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { GiWashingMachine } from "react-icons/gi";

import layananIcon from "../assets/img/layanan.png"
import addLayananIcon from "../assets/img/add-layanan.png"
import pesananIcon from "../assets/img/pesanan.png"
import addPesananIcon from "../assets/img/add-pesanan.png"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-2">
      <div className="font-bold text-xl mb-2">
        <span>Welcome </span>
        <span className="text-sky-500">Wirawan</span>
      </div>

      {/* Info Hari Ini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-3 w-full bg-base-100 rounded-xl p-3 sm:p-5 shadow-lg">
        <span className="font-bold text-lg col-span-1 sm:col-span-2 mb-1">Info Hari Ini</span>
        <div className="shadow rounded-xl flex flex-col gap-y-1 p-4 text-center bg-sky-100 text-sky-700 border border-sky-200">
          <span className="font-semibold text-lg">Rp {(9000000).toLocaleString("id")}</span>
          <span className="text-xs">Kas</span>
        </div>
        <div className="shadow rounded-xl flex flex-col gap-y-1 p-4 text-center bg-cyan-100 text-cyan-700 border border-cyan-200">
          <span className="font-semibold text-lg">40 Order</span>
          <span className="text-xs">Hari Ini</span>
        </div>
        <div className="shadow rounded-xl flex flex-col gap-y-1 p-4 text-center bg-green-100 text-green-700 border border-green-200">
          <span className="font-semibold text-lg">Rp {(1_400_000).toLocaleString("id")}</span>
          <span className="text-xs">Pendapatan</span>
        </div>
        <div className="shadow rounded-xl flex flex-col gap-y-1 p-4 text-center bg-rose-100 text-rose-700 border border-rose-200">
          <span className="font-semibold text-lg">Rp {(800_000).toLocaleString("id")}</span>
          <span className="text-xs">Pengeluaran</span>
        </div>
      </div>

      {/* Akses Cepat */}
      <div className="flex flex-col justify-between mt-5 gap-2 w-full bg-base-100 rounded-xl p-3 sm:p-5 shadow-lg text-xs">
        <span className="font-bold text-lg col-span-4 mb-1">Akses Cepat</span>
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="grid grid-cols-2 text-center gap-2 bg-sky-50 rounded-lg p-2 shadow">
  <span className="col-span-2 font-semibold text-sky-700">Pesanan</span>
  <div className="flex flex-col items-center">
    <div className="bg-white/80 rounded-full p-2 shadow-md flex items-center justify-center w-16 h-16 mx-auto mb-1 overflow-hidden">
      <img src={pesananIcon} alt="view-pesanan" />
    </div>
    <span>Detail</span>
  </div>
  <div className="flex flex-col items-center">
    <div className="bg-white/80 rounded-full p-2 shadow-md flex items-center justify-center w-16 h-16 mx-auto mb-1 overflow-hidden">
      <img src={addPesananIcon} alt="tambah-pesanan" />
    </div>
    <span>Tambah</span>
  </div>
</div>
<div className="grid grid-cols-2 text-center gap-2 bg-cyan-50 rounded-lg p-2 shadow">
  <span className="col-span-2 font-semibold text-cyan-700">Layanan</span>
  <div className="flex flex-col items-center">
    <div className="bg-white/80 rounded-full p-2 shadow-md flex items-center justify-center w-16 h-16 mx-auto mb-1 overflow-hidden">
      <img src={layananIcon} alt="view-layanan" />
    </div>
    <span>Detail</span>
  </div>
  <div className="flex flex-col items-center">
    <div className="bg-white/80 rounded-full p-2 shadow-md flex items-center justify-center w-16 h-16 mx-auto mb-1 overflow-hidden">
      <img src={addLayananIcon} alt="tambah-layanan" />
    </div>
    <span>Tambah</span>
  </div>
</div>
        </div>
      </div>

      {/* Daftar Orderan Terbaru */}
      <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded-xl p-3 sm:p-5 shadow-lg">
        <h2 className="font-bold text-lg mb-1">Daftar Orderan Terbaru</h2>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="flex items-center p-3 text-sm shadow rounded-lg bg-sky-50 border border-sky-100">
            <div className="p-1 rounded mr-7 bg-white shadow">
              <GiWashingMachine size={32} className="text-sky-400" />
            </div>
            <div className="flex flex-col mr-auto">
              <span className="font-semibold">Pesanan No #{12343 + idx}</span>
              <span className="text-sky-700">Rp 200.000</span>
            </div>
            <button className="btn btn-primary btn-xs rounded-full shadow">Detail</button>
          </div>
        ))}
      </div>

      {/* Grafik Pendapatan */}
      <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded-xl p-3 sm:p-5 shadow-lg">
        <h2 className="font-bold text-lg mb-1">Grafik Pendapatan</h2>
        <RevenueChart />
      </div>
    </div>
  );
}

const data = [
  { day: "1 Jun", revenue: 1200000 },
  { day: "2 Jun", revenue: 950000 },
  { day: "3 Jun", revenue: 1050000 },
  { day: "4 Jun", revenue: 1800000 },
  { day: "5 Jun", revenue: 1250000 },
  { day: "6 Jun", revenue: 1100000 },
  { day: "7 Jun", revenue: 980000 },
  { day: "8 Jun", revenue: 1430000 },
  { day: "9 Jun", revenue: 1200000 },
  { day: "10 Jun", revenue: 1170000 },
  { day: "11 Jun", revenue: 1290000 },
  { day: "12 Jun", revenue: 1350000 },
  { day: "13 Jun", revenue: 1450000 },
  { day: "14 Jun", revenue: 1500000 },
  { day: "15 Jun", revenue: 1370000 },
  { day: "16 Jun", revenue: 990000 },
  { day: "17 Jun", revenue: 1120000 },
  { day: "18 Jun", revenue: 1270000 },
  { day: "19 Jun", revenue: 1350000 },
  { day: "20 Jun", revenue: 1480000 },
  { day: "21 Jun", revenue: 1300000 },
  { day: "22 Jun", revenue: 1250000 },
  { day: "23 Jun", revenue: 1400000 },
  { day: "24 Jun", revenue: 1190000 },
  { day: "25 Jun", revenue: 1520000 },
  { day: "26 Jun", revenue: 1650000 },
  { day: "27 Jun", revenue: 1450000 },
  { day: "28 Jun", revenue: 1580000 },
  { day: "29 Jun", revenue: 1710000 },
  { day: "30 Jun", revenue: 1800000 },
];

const chartColors = [
  "#38bdf8", // sky-400
  "#06b6d4", // cyan-500
  "#22d3ee", // cyan-300
  "#4ade80", // green-400
  "#f472b6", // pink-400
  "#fbbf24", // yellow-400
];

const RevenueChart: React.FC = () => {
  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map((d) => d.revenue),
        backgroundColor: data.map((_, i) => chartColors[i % chartColors.length]),
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Rp${ctx.parsed.y.toLocaleString("id")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, color: "#0ea5e9" }, // sky-500
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { size: 10 },
          color: "#0ea5e9",
          callback: (value) => `Rp${(+value / 1000).toLocaleString("id")}k`,
        },
        grid: { color: "#e0f2fe" }, // sky-100
      },
    },
  };

  return (
    <div className="bg-sky-50 rounded-xl p-3 sm:p-5 shadow border border-sky-100">
      <div className="w-full" style={{ minHeight: 180 }}>
        <Bar data={chartData} options={options} height={180} className="text-base-content" />
      </div>
    </div>
  );
};