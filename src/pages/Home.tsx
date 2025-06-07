import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function Home() {
    return (
      <div className="container mx-auto max-w-4xl px-2">
        <div className="font-semibold text-xl">
            <span>Welcome </span>
            <span className="text-sky-500">Wirawan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-2 w-full bg-base-100 rounded p-3 sm:p-5 shadow-lg">
            <span className="font-bold text-lg col-span-1 sm:col-span-2">Info Bulan Ini</span>
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

        <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded p-3 sm:p-5 shadow-lg">
            <h2 className="font-bold text-lg">Daftar Orderan Terbaru</h2>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra text-xs min-w-[400px] sm:min-w-[600px]">
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th>Nama</th>
                            <th>Tanggal Dibuat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Wirawan</td>
                            <td>{dayjs().format("D/M/YYYY HH:mm")}</td>
                            <td>
                              <NavLink to={"#"} className={"badge badge-warning text-xs"}>
                                Detail
                              </NavLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="flex flex-col gap-y-3 mt-5 bg-base-100 rounded p-3 sm:p-5 shadow-lg">
            <h2 className="font-bold text-lg">Pengingat</h2>
            <RevenueChart />
        </div>
      </div>
    );
}

// Mock data pendapatan 30 hari terakhir
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

const RevenueChart: React.FC = () => {
  return (
    <div className="bg-base-100 p-2 sm:p-4 rounded-2xl shadow w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Pendapatan Bulan Ini</h2>
      <ResponsiveContainer width="100%" height={220} minWidth={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" hide={window.innerWidth < 640} />
          <YAxis tickFormatter={(value) => `Rp${(value / 1000).toLocaleString()}k`} />
          <Tooltip formatter={(value: number) => `Rp${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};