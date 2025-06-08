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


export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-2">
      <div className="font-semibold text-xl">
        <span>Welcome </span>
        <span className="text-sky-500">Wirawan</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-2 w-full bg-base-100 rounded p-3 sm:p-5 shadow-lg">
        <span className="font-bold text-lg col-span-1 sm:col-span-2">Info Hari Ini</span>
        <div className="shadow-md rounded flex flex-col gap-y-1 p-3 text-center bg-primary text-primary-content">
          <span className="font-semibold">40 Order</span>
          <span>Hari Ini</span>
        </div>
        <div className="shadow-md rounded flex flex-col gap-y-1 p-3 text-center bg-warning text-warning-content">
          <span className="font-semibold">1</span>
          <span>Sedang Diproses</span>
        </div>
        <div className="shadow-md rounded flex flex-col gap-y-1 p-3 text-center bg-success text-success-content">
          <span className="font-semibold">Rp {Number(1_400_000).toLocaleString("id")}</span>
          <span>Pendapatan</span>
        </div>
        <div className="shadow-md rounded flex flex-col gap-y-1 p-3 text-center bg-info text-info-content">
          <span className="font-semibold">120</span>
          <span>Pelanggan</span>
        </div>
      </div>

      <div className="flex flex-col justify-between mt-3 gap-2 w-full bg-base-100 rounded p-3 sm:p-5 shadow-lg text-xs">
        <span className="font-bold text-lg col-span-4">Akses Cepat</span>
        <div className="flex justify-between">
          <div className="grid grid-cols-2 text-center">
            <span className="col-span-2 font-semibold">Pesanan</span>
            <div className="flex flex-col items-center">
              <img className="w-2/3" src={pesananIcon} alt="view-pesanan" />
              <span>Detail</span>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-2/3" src={addPesananIcon} alt="tambah-pesanan" />
              <span>Tambah</span>
            </div>
          </div>

          <div className="grid grid-cols-2 text-center">
            <span className="col-span-2 font-semibold">Layanan</span>
            <div className="flex flex-col items-center">
              <img className="w-2/3" src={layananIcon} alt="view-layanan" />
              <span>Detail</span>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-2/3" src={addLayananIcon} alt="tambah-layanan" />
              <span>Tambah</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded p-3 sm:p-5 shadow-lg">
        <h2 className="font-bold text-lg">Daftar Orderan Terbaru</h2>

        <div className="flex items-center p-3 text-sm shadow">
          <div className="p-1 rounded mr-7">
            <GiWashingMachine size={32} />
          </div>
          <div className="flex flex-col mr-auto">
            <span className="font-semibold">Pesanan No #12343</span>
            <span>Rp 200.000</span>
          </div>
          <div className="badge badge-primary">Detail</div>
        </div>

        <div className="flex items-center p-3 text-sm shadow">
          <div className="p-1 rounded mr-7">
            <GiWashingMachine size={32} />
          </div>
          <div className="flex flex-col mr-auto">
            <span className="font-semibold">Pesanan No #12343</span>
            <span>Rp 200.000</span>
          </div>
          <div className="badge badge-primary">Detail</div>
        </div>

        <div className="flex items-center p-3 text-sm shadow">
          <div className="p-1 rounded mr-7">
            <GiWashingMachine size={32} />
          </div>
          <div className="flex flex-col mr-auto">
            <span className="font-semibold">Pesanan No #12343</span>
            <span>Rp 200.000</span>
          </div>
          <div className="badge badge-primary">Detail</div>
        </div>

      </div>

      <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded p-3 sm:p-5 shadow-lg">
        <h2 className="font-bold text-lg">Bisnis Info</h2>
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


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const RevenueChart: React.FC = () => {
  // Siapkan data untuk Chart.js
  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map((d) => d.revenue),
        backgroundColor: "#3b82f6",
        borderRadius: 4,
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
        ticks: { font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: {
          font: { size: 10 },
          callback: (value) => `Rp${(+value / 1000).toLocaleString("id")}k`,
        },
        grid: { color: "#eee" },
      },
    },
  };

  return (
    <div className="bg-base-100 p-2 sm:p-3 rounded-2xl w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Pendapatan Bulan Ini</h2>
      <div className="w-full" style={{ minHeight: 180 }}>
        <Bar data={chartData} options={options} height={180} className="text-base-content" />
      </div>
    </div>
  );
};