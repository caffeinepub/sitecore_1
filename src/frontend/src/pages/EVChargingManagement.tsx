import {
  AlertCircle,
  Battery,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  Plus,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface EVChargingManagementProps {
  buildingId: string;
  t: Record<string, string>;
}

const stations = [
  {
    id: "st1",
    name: "Şarj İstasyonu 1",
    location: "B1 - Kapalı Otopark",
    type: "AC 7.4kW",
    status: "available",
    connector: "Type 2",
    power: 7.4,
  },
  {
    id: "st2",
    name: "Şarj İstasyonu 2",
    location: "B1 - Kapalı Otopark",
    type: "AC 7.4kW",
    status: "occupied",
    connector: "Type 2",
    power: 7.4,
  },
  {
    id: "st3",
    name: "Şarj İstasyonu 3",
    location: "B2 - Açık Otopark",
    type: "DC 50kW",
    status: "available",
    connector: "CCS",
    power: 50,
  },
  {
    id: "st4",
    name: "Şarj İstasyonu 4",
    location: "B2 - Açık Otopark",
    type: "AC 22kW",
    status: "maintenance",
    connector: "Type 2",
    power: 22,
  },
  {
    id: "st5",
    name: "Şarj İstasyonu 5",
    location: "B3 - Misafir Otopark",
    type: "AC 7.4kW",
    status: "available",
    connector: "Type 2",
    power: 7.4,
  },
];

const reservations = [
  {
    id: "r1",
    station: "Şarj İstasyonu 1",
    apartment: "D:12",
    resident: "Ahmet K.",
    date: "2026-03-28",
    startTime: "09:00",
    endTime: "11:00",
    status: "confirmed",
  },
  {
    id: "r2",
    station: "Şarj İstasyonu 2",
    apartment: "D:5",
    resident: "Fatma Ö.",
    date: "2026-03-28",
    startTime: "08:00",
    endTime: "10:00",
    status: "active",
  },
  {
    id: "r3",
    station: "Şarj İstasyonu 3",
    apartment: "D:7",
    resident: "Mehmet S.",
    date: "2026-03-29",
    startTime: "14:00",
    endTime: "15:30",
    status: "confirmed",
  },
  {
    id: "r4",
    station: "Şarj İstasyonu 1",
    apartment: "D:3",
    resident: "Ayşe T.",
    date: "2026-03-29",
    startTime: "10:00",
    endTime: "12:00",
    status: "pending",
  },
  {
    id: "r5",
    station: "Şarj İstasyonu 5",
    apartment: "D:18",
    resident: "Hasan Y.",
    date: "2026-03-30",
    startTime: "16:00",
    endTime: "18:00",
    status: "confirmed",
  },
];

const usageHistory = [
  {
    id: "h1",
    station: "Şarj İstasyonu 2",
    apartment: "D:8",
    date: "2026-03-27",
    duration: "2.5 saat",
    energy: "18.5 kWh",
    cost: "55.50 ₺",
  },
  {
    id: "h2",
    station: "Şarj İstasyonu 1",
    apartment: "D:12",
    date: "2026-03-26",
    duration: "3 saat",
    energy: "22.2 kWh",
    cost: "66.60 ₺",
  },
  {
    id: "h3",
    station: "Şarj İstasyonu 3",
    apartment: "D:5",
    date: "2026-03-25",
    duration: "1.5 saat",
    energy: "75 kWh",
    cost: "225.00 ₺",
  },
  {
    id: "h4",
    station: "Şarj İstasyonu 5",
    apartment: "D:7",
    date: "2026-03-24",
    duration: "2 saat",
    energy: "14.8 kWh",
    cost: "44.40 ₺",
  },
  {
    id: "h5",
    station: "Şarj İstasyonu 2",
    apartment: "D:15",
    date: "2026-03-23",
    duration: "4 saat",
    energy: "29.6 kWh",
    cost: "88.80 ₺",
  },
  {
    id: "h6",
    station: "Şarj İstasyonu 1",
    apartment: "D:3",
    date: "2026-03-22",
    duration: "2 saat",
    energy: "14.8 kWh",
    cost: "44.40 ₺",
  },
];

const monthlyUsage = [
  { month: "Eyl", kwh: 280 },
  { month: "Eki", kwh: 320 },
  { month: "Kas", kwh: 290 },
  { month: "Ara", kwh: 350 },
  { month: "Oca", kwh: 410 },
  { month: "Şub", kwh: 380 },
  { month: "Mar", kwh: 445 },
];

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  occupied: "bg-blue-100 text-blue-700",
  maintenance: "bg-red-100 text-red-700",
  confirmed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
};

const statusLabels: Record<string, string> = {
  available: "Müsait",
  occupied: "Dolu",
  maintenance: "Bakımda",
  confirmed: "Onaylandı",
  active: "Aktif",
  pending: "Bekliyor",
};

export default function EVChargingManagement({
  buildingId: _buildingId,
  t: _t,
}: EVChargingManagementProps) {
  const [activeTab, setActiveTab] = useState<
    "stations" | "reservations" | "history" | "stats"
  >("stations");
  const [showForm, setShowForm] = useState(false);

  const available = stations.filter((s) => s.status === "available").length;
  const occupied = stations.filter((s) => s.status === "occupied").length;
  const maintenance = stations.filter((s) => s.status === "maintenance").length;
  const totalEnergy = usageHistory.reduce(
    (sum, h) => sum + Number.parseFloat(h.energy),
    0,
  );
  const maxKwh = Math.max(...monthlyUsage.map((m) => m.kwh));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2236]">
            Elektrikli Araç Şarj İstasyonu
          </h2>
          <p className="text-sm text-[#6b7a8d] mt-1">
            Şarj noktası yönetimi, rezervasyon ve tüketim takibi
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#4f8ef7] text-white px-4 py-2 rounded-lg hover:bg-[#3a7de0] transition text-sm font-medium"
        >
          <Plus size={16} /> Rezervasyon Yap
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={18} className="text-green-600" />
            <span className="text-xs text-green-600 font-medium">Müsait</span>
          </div>
          <p className="text-2xl font-bold text-green-700">{available}</p>
          <p className="text-xs text-green-600">istasyon</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={18} className="text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">
              Kullanımda
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-700">{occupied}</p>
          <p className="text-xs text-blue-600">istasyon</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={18} className="text-red-600" />
            <span className="text-xs text-red-600 font-medium">Bakımda</span>
          </div>
          <p className="text-2xl font-bold text-red-700">{maintenance}</p>
          <p className="text-xs text-red-600">istasyon</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Battery size={18} className="text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">
              Bu Ay Tüketim
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {totalEnergy.toFixed(0)}
          </p>
          <p className="text-xs text-purple-600">kWh toplam</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(["stations", "reservations", "history", "stats"] as const).map(
          (tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab
                  ? "border-[#4f8ef7] text-[#4f8ef7]"
                  : "border-transparent text-[#6b7a8d] hover:text-[#1a2236]"
              }`}
            >
              {tab === "stations"
                ? "İstasyonlar"
                : tab === "reservations"
                  ? "Rezervasyonlar"
                  : tab === "history"
                    ? "Kullanım Geçmişi"
                    : "İstatistikler"}
            </button>
          ),
        )}
      </div>

      {/* Stations Tab */}
      {activeTab === "stations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      station.status === "available"
                        ? "bg-green-100"
                        : station.status === "occupied"
                          ? "bg-blue-100"
                          : "bg-red-100"
                    }`}
                  >
                    <Zap
                      size={20}
                      className={
                        station.status === "available"
                          ? "text-green-600"
                          : station.status === "occupied"
                            ? "text-blue-600"
                            : "text-red-600"
                      }
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a2236] text-sm">
                      {station.name}
                    </p>
                    <p className="text-xs text-[#6b7a8d]">{station.location}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[station.status]}`}
                >
                  {statusLabels[station.status]}
                </span>
              </div>
              <div className="space-y-2 text-xs text-[#6b7a8d]">
                <div className="flex justify-between">
                  <span>Tip:</span>
                  <span className="font-medium text-[#1a2236]">
                    {station.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Konnektör:</span>
                  <span className="font-medium text-[#1a2236]">
                    {station.connector}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Güç:</span>
                  <span className="font-medium text-[#1a2236]">
                    {station.power} kW
                  </span>
                </div>
              </div>
              {station.status === "available" && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-3 w-full bg-[#4f8ef7] text-white text-xs py-2 rounded-lg hover:bg-[#3a7de0] transition"
                >
                  Rezervasyon Yap
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reservations Tab */}
      {activeTab === "reservations" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  İstasyon
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Sakin
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Tarih
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Saat
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => (
                <tr
                  key={r.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium text-[#1a2236]">
                    {r.station}
                  </td>
                  <td className="px-4 py-3 text-[#6b7a8d]">
                    {r.resident} ({r.apartment})
                  </td>
                  <td className="px-4 py-3 text-[#6b7a8d]">{r.date}</td>
                  <td className="px-4 py-3 text-[#6b7a8d]">
                    {r.startTime} - {r.endTime}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[r.status]}`}
                    >
                      {statusLabels[r.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  İstasyon
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Daire
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Tarih
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Süre
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Enerji
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]">
                  Tutar
                </th>
              </tr>
            </thead>
            <tbody>
              {usageHistory.map((h, i) => (
                <tr
                  key={h.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium text-[#1a2236]">
                    {h.station}
                  </td>
                  <td className="px-4 py-3 text-[#6b7a8d]">{h.apartment}</td>
                  <td className="px-4 py-3 text-[#6b7a8d]">{h.date}</td>
                  <td className="px-4 py-3 text-[#6b7a8d]">{h.duration}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-blue-600">
                      {h.energy}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-green-600">{h.cost}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-[#1a2236] mb-4">
              Aylık Enerji Tüketimi (kWh)
            </h3>
            <div className="flex items-end gap-3 h-40">
              {monthlyUsage.map((m) => (
                <div
                  key={m.month}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className="text-xs text-[#6b7a8d]">{m.kwh}</span>
                  <div
                    className="w-full bg-[#4f8ef7] rounded-t-md transition-all"
                    style={{ height: `${(m.kwh / maxKwh) * 120}px` }}
                  />
                  <span className="text-xs text-[#6b7a8d]">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Car size={18} className="text-[#4f8ef7]" />
                <span className="font-semibold text-sm text-[#1a2236]">
                  Kayıtlı EV
                </span>
              </div>
              <p className="text-3xl font-bold text-[#4f8ef7]">12</p>
              <p className="text-xs text-[#6b7a8d] mt-1">
                Binada elektrikli araç sahibi
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-orange-500" />
                <span className="font-semibold text-sm text-[#1a2236]">
                  Ort. Şarj Süresi
                </span>
              </div>
              <p className="text-3xl font-bold text-orange-500">2.4</p>
              <p className="text-xs text-[#6b7a8d] mt-1">saat / oturum</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Battery size={18} className="text-green-500" />
                <span className="font-semibold text-sm text-[#1a2236]">
                  Bu Ay Gelir
                </span>
              </div>
              <p className="text-3xl font-bold text-green-500">1.335</p>
              <p className="text-xs text-[#6b7a8d] mt-1">₺ tahsilat</p>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-[#1a2236] mb-4">
              Şarj Rezervasyonu
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="ev-station"
                  className="block text-xs font-medium text-[#6b7a8d] mb-1"
                >
                  İstasyon Seç
                </label>
                <select
                  id="ev-station"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  {stations
                    .filter((s) => s.status === "available")
                    .map((s) => (
                      <option key={s.id}>
                        {s.name} - {s.location} ({s.type})
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="ev-date"
                    className="block text-xs font-medium text-[#6b7a8d] mb-1"
                  >
                    Tarih
                  </label>
                  <input
                    id="ev-date"
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    defaultValue="2026-03-29"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ev-time"
                    className="block text-xs font-medium text-[#6b7a8d] mb-1"
                  >
                    Başlangıç Saati
                  </label>
                  <input
                    id="ev-time"
                    type="time"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    defaultValue="09:00"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="ev-duration"
                  className="block text-xs font-medium text-[#6b7a8d] mb-1"
                >
                  Tahmini Süre
                </label>
                <select
                  id="ev-duration"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option>1 saat</option>
                  <option>1.5 saat</option>
                  <option selected>2 saat</option>
                  <option>3 saat</option>
                  <option>4 saat</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="ev-apt"
                  className="block text-xs font-medium text-[#6b7a8d] mb-1"
                >
                  Daire No
                </label>
                <input
                  id="ev-apt"
                  type="text"
                  placeholder="Örn: D:12"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 text-[#6b7a8d] py-2 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-[#4f8ef7] text-white py-2 rounded-lg text-sm hover:bg-[#3a7de0] transition font-medium"
              >
                Rezervasyonu Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
