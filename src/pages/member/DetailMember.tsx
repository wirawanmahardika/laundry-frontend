import { useNavigate } from "react-router-dom";
import { useState } from "react";
import memberIcon from "../../assets/img/member.png";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import dayjs from "dayjs";

export default function DetailMember() {
    // Dummy data, ganti dengan fetch dari API jika perlu
    const [member, setMember] = useState({
        name: "Wirawan Mahardika",
        joinedAt: "2024-01-15",
        email: "wirawan@email.com",
        phone: "08123456789",
        avgOrder: 8,
        orders: [
            { id: 1, tanggal: "2024-06-01", total: 200000 },
            { id: 2, tanggal: "2024-05-28", total: 150000 },
            { id: 3, tanggal: "2024-05-20", total: 180000 },
            { id: 4, tanggal: "2024-05-15", total: 210000 },
            { id: 5, tanggal: "2024-05-10", total: 170000 },
            { id: 6, tanggal: "2024-05-01", total: 160000 },
            { id: 7, tanggal: "2024-04-25", total: 190000 },
            { id: 8, tanggal: "2024-04-18", total: 200000 },
            { id: 9, tanggal: "2024-04-10", total: 175000 },
            { id: 10, tanggal: "2024-04-01", total: 165000 },
        ],
    });
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(member);
    const navigate = useNavigate();

    const handleEdit = () => {
        setEditMode(true);
        setEditData(member);
    };

    const handleSave = () => {
        setEditMode(false);
        setMember(editData);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditData(member);
    };

    const sendWhatsapp = () => {
        if (!member.phone) return;
        window.open(`https://wa.me/${member.phone.replace(/^0/, "62")}`, "_blank");
    };

    const sendEmail = () => {
        if (!member.email) return;
        window.open(`mailto:${member.email}`, "_blank");
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 flex flex-col gap-y-6">
            <button
                className="btn btn-circle btn-sm bg-base-100/90 border border-base-300 shadow text-sky-700 hover:bg-sky-100 transition self-start mb-2"
                onClick={() => navigate(-1)}
                type="button"
                title="Kembali"
            >
                <MdArrowBack size={20} />
            </button>
            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-3">
                <img
                    className="rounded-full w-24 h-24 object-cover border-4 border-sky-400 shadow"
                    src={memberIcon}
                    alt="Member"
                />
                {editMode ? (
                    <input
                        className="input input-bordered text-xl font-bold text-center"
                        value={editData.name}
                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                    />
                ) : (
                    <span className="text-2xl font-bold text-slate-800">{member.name}</span>
                )}
                <span className="text-slate-500 text-sm">
                    Bergabung pada {dayjs(member.joinedAt).format("D MMMM YYYY")}
                </span>
                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                    <div className="flex items-center gap-x-2">
                        <MdEmail className="text-sky-400" />
                        {editMode ? (
                            <input
                                className="input input-bordered input-xs"
                                value={editData.email}
                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                                placeholder="Tidak ada email"
                            />
                        ) : member.email ? (
                            <span className="text-slate-700">{member.email}</span>
                        ) : (
                            <span className="italic text-rose-400">Tidak ada email</span>
                        )}
                    </div>
                    <div className="flex items-center gap-x-2">
                        <FaWhatsapp className="text-green-500" />
                        {editMode ? (
                            <input
                                className="input input-bordered input-xs"
                                value={editData.phone}
                                onChange={e => setEditData({ ...editData, phone: e.target.value })}
                                placeholder="Tidak ada nomor HP"
                            />
                        ) : member.phone ? (
                            <span className="text-slate-700">{member.phone}</span>
                        ) : (
                            <span className="italic text-rose-400">Tidak ada nomor HP</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-x-2 mt-2">
                    <button
                        className="btn btn-success btn-xs rounded-full flex items-center gap-x-1"
                        onClick={sendWhatsapp}
                        disabled={!member.phone}
                        type="button"
                    >
                        <FaWhatsapp /> Whatsapp
                    </button>
                    <button
                        className="btn btn-info btn-xs rounded-full flex items-center gap-x-1"
                        onClick={sendEmail}
                        disabled={!member.email}
                        type="button"
                    >
                        <MdEmail /> Email
                    </button>
                </div>
                {/* Rata-rata order per bulan */}
                <div className="flex flex-col items-center w-full mt-2">
                    <div className="w-fit px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-cyan-100 border border-sky-200 shadow flex items-center gap-x-2">
                        <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sky-700 font-semibold text-base">
                            {member.avgOrder}
                        </span>
                        <span className="text-xs text-slate-500">order/bulan</span>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-2">
                    {editMode ? (
                        <>
                            <button className="btn btn-primary btn-xs rounded-full" onClick={handleSave} type="button">
                                Simpan
                            </button>
                            <button className="btn btn-ghost btn-xs rounded-full" onClick={handleCancel} type="button">
                                Batal
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-warning btn-xs rounded-full" onClick={handleEdit} type="button">
                            Edit
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200">
                <h3 className="font-bold text-lg mb-2 text-sky-700">10 Order Terakhir</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra text-xs">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {member.orders.map((o, i) => (
                                <tr key={o.id}>
                                    <td>{i + 1}</td>
                                    <td>{dayjs(o.tanggal).format("D MMM YYYY")}</td>
                                    <td>
                                        <span className="font-semibold text-sky-700">
                                            Rp {o.total.toLocaleString("id")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}