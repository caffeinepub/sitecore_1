import {
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface ParkingAllocationProps {
  buildingId: string;
  isOwner: boolean;
  t: any;
}

const MOCK_SPOTS = [
  {
    id: "P-01",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: "Daire 3",
    resident: "Ali Kaya",
    since: "2024-01-15",
    status: "assigned",
  },
  {
    id: "P-02",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: "Daire 7",
    resident: "Ayşe Demir",
    since: "2023-06-20",
    status: "assigned",
  },
  {
    id: "P-03",
    type: "Kapalı",
    floor: "B1",
    size: "Geniş",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free",
  },
  {
    id: "P-04",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: "Daire 12",
    resident: "Mehmet Şahin",
    since: "2024-03-01",
    status: "assigned",
  },
  {
    id: "P-05",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free",
  },
  {
    id: "P-06",
    type: "Kapalı",
    floor: "B2",
    size: "Normal",
    assignedTo: "Daire 5",
    resident: "Fatma Yıldız",
    since: "2022-11-10",
    status: "assigned",
  },
  {
    id: "P-07",
    type: "Kapalı",
    floor: "B2",
    size: "Motosiklet",
    assignedTo: null,
    resident: null,
    since: null,
    status: "free",
  },
  {
    id: "P-08",
    type: "Açık",
    floor: "Z",
    size: "Normal",
    assignedTo: "Daire 1",
    resident: "Hasan Öztürk",
    since: "2025-01-05",
    status: "assigned",
  },
  {
    id: "P-09",
    type: "Kapalı",
    floor: "B1",
    size: "Normal",
    assignedTo: null,
    resident: null,
    since: null,
    status: "maintenance",
  },
  {
    id: "P-10",
    type: "Açık",
    floor: "Z",
    size: "Geniş",
    assignedTo: "Daire 9",
    resident: "Zeynep Arslan",
    since: "2024-08-22",
    status: "assigned",
  },
];

const MOCK_WAITLIST = [
  {
    id: 1,
    apartment: "Daire 4",
    resident: "Burak Çelik",
    requestDate: "2026-01-10",
    type: "Kapalı",
    priority: "normal",
  },
  {
    id: 2,
    apartment: "Daire 6",
    resident: "Selin Kara",
    requestDate: "2026-02-05",
    type: "Kapalı",
    priority: "urgent",
  },
  {
    id: 3,
    apartment: "Daire 11",
    resident: "Murat Boz",
    requestDate: "2026-03-01",
    type: "Açık",
    priority: "normal",
  },
];

const statusColors: Record<string, string> = {
  assigned: "bg-blue-100 text-blue-800",
  free: "bg-green-100 text-green-800",
  maintenance: "bg-yellow-100 text-yellow-800",
};

const statusLabels: Record<string, string> = {
  assigned: "Tahsisli",
  free: "Boş",
  maintenance: "Bakımda",
};

export default function ParkingAllocation({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: ParkingAllocationProps) {
  const [activeTab, setActiveTab] = useState<
    "spots" | "waitlist" | "transfers"
  >("spots");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);
  const [spots, setSpots] = useState(MOCK_SPOTS);
  const [waitlist, setWaitlist] = useState(MOCK_WAITLIST);

  const assigned = spots.filter((s) => s.status === "assigned").length;
  const free = spots.filter((s) => s.status === "free").length;
  const _maintenance = spots.filter((s) => s.status === "maintenance").length;

  const filtered = spots.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (filterType !== "all" && s.type !== filterType) return false;
    return true;
  });

  const handleFree = (spotId: string) => {
    setSpots((prev) =>
      prev.map((s) =>
        s.id === spotId
          ? {
              ...s,
              status: "free",
              assignedTo: null,
              resident: null,
              since: null,
            }
          : s,
      ),
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2332]">
            Park Yeri Tahsis Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sakinlere park yeri tahsisi, bekleme listesi ve devir yönetimi
          </p>
        </div>
        {isOwner && (
          <button
            type="button"
            className="flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]"
          >
            <Plus size={16} /> Spot Ekle
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-[#1a2332]">
            {spots.length}
          </div>
          <div className="text-sm text-gray-500">Toplam Spot</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{assigned}</div>
          <div className="text-sm text-gray-500">Tahsisli</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{free}</div>
          <div className="text-sm text-gray-500">Boş</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-500">
            {waitlist.length}
          </div>
          <div className="text-sm text-gray-500">Bekleme Listesi</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["spots", "waitlist", "transfers"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-white text-[#4F8EF7] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "spots"
              ? "Park Noktaları"
              : tab === "waitlist"
                ? `Bekleme Listesi (${waitlist.length})`
                : "Devir & Transfer"}
          </button>
        ))}
      </div>

      {activeTab === "spots" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "free", "assigned", "maintenance"].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterStatus === s
                    ? "bg-[#4F8EF7] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "Tümü" : statusLabels[s]}
              </button>
            ))}
            <div className="w-px bg-gray-200 mx-1" />
            {["all", "Kapalı", "Açık"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filterType === type
                    ? "bg-[#1a2332] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "Tüm Tip" : type}
              </button>
            ))}
          </div>

          {/* Parking Map Grid */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#4F8EF7]" />
              <h3 className="font-semibold text-[#1a2332]">Park Haritası</h3>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {filtered.map((spot) => (
                <div
                  key={spot.id}
                  className={`rounded-lg p-2 text-center cursor-pointer transition-all hover:scale-105 ${
                    spot.status === "free"
                      ? "bg-green-100 border-2 border-green-300"
                      : spot.status === "maintenance"
                        ? "bg-yellow-100 border-2 border-yellow-300"
                        : "bg-blue-100 border-2 border-blue-300"
                  }`}
                  title={spot.assignedTo || "Boş"}
                >
                  <Car
                    size={16}
                    className={`mx-auto ${
                      spot.status === "free"
                        ? "text-green-600"
                        : spot.status === "maintenance"
                          ? "text-yellow-600"
                          : "text-blue-600"
                    }`}
                  />
                  <div className="text-xs font-bold mt-1 text-gray-700">
                    {spot.id}
                  </div>
                  <div className="text-xs text-gray-500">{spot.floor}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-300 inline-block" />{" "}
                Boş
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-300 inline-block" />{" "}
                Tahsisli
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-yellow-300 inline-block" />{" "}
                Bakımda
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Spot No</th>
                  <th className="px-4 py-3 text-left">Tip / Kat</th>
                  <th className="px-4 py-3 text-left">Tahsis</th>
                  <th className="px-4 py-3 text-left">Sakin</th>
                  <th className="px-4 py-3 text-left">Tarih</th>
                  <th className="px-4 py-3 text-left">Durum</th>
                  {isOwner && <th className="px-4 py-3 text-right">İşlem</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((spot) => (
                  <tr key={spot.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-[#4F8EF7]">
                      {spot.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {spot.type} / {spot.floor} - {spot.size}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {spot.assignedTo || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {spot.resident || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {spot.since || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[spot.status]}`}
                      >
                        {statusLabels[spot.status]}
                      </span>
                    </td>
                    {isOwner && (
                      <td className="px-4 py-3 text-right">
                        {spot.status === "free" ? (
                          <button
                            type="button"
                            onClick={() => setShowAssignModal(spot.id)}
                            className="text-xs bg-[#4F8EF7] text-white px-3 py-1 rounded-lg hover:bg-[#3a7de8]"
                          >
                            Tahsis Et
                          </button>
                        ) : spot.status === "assigned" ? (
                          <button
                            type="button"
                            onClick={() => handleFree(spot.id)}
                            className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100"
                          >
                            Boşalt
                          </button>
                        ) : null}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "waitlist" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-[#1a2332]">
              Park Yeri Bekleme Listesi
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Boş spot oluştuğunda sırayla tahsis yapılır
            </p>
          </div>
          {waitlist.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400">Bekleme listesi boş</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Sıra</th>
                  <th className="px-4 py-3 text-left">Daire</th>
                  <th className="px-4 py-3 text-left">Sakin</th>
                  <th className="px-4 py-3 text-left">Talep Tarihi</th>
                  <th className="px-4 py-3 text-left">Tip Tercihi</th>
                  <th className="px-4 py-3 text-left">Öncelik</th>
                  {isOwner && <th className="px-4 py-3 text-right">İşlem</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {waitlist.map((entry, index) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">{entry.apartment}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {entry.resident}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {entry.requestDate}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{entry.type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          entry.priority === "urgent"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {entry.priority === "urgent" ? "Acil" : "Normal"}
                      </span>
                    </td>
                    {isOwner && (
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setWaitlist((prev) =>
                              prev.filter((w) => w.id !== entry.id),
                            )
                          }
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Çıkar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "transfers" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-[#1a2332] mb-4 flex items-center gap-2">
              <RefreshCw size={16} className="text-[#4F8EF7]" /> Devir &
              Transfer Talebi
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mevcut Spot</p>
                <select className="w-full border rounded-lg px-3 py-2 text-sm">
                  {spots
                    .filter((s) => s.status === "assigned")
                    .map((s) => (
                      <option key={s.id}>
                        {s.id} - {s.assignedTo}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Hedef Spot (Boş)</p>
                <select className="w-full border rounded-lg px-3 py-2 text-sm">
                  {spots
                    .filter((s) => s.status === "free")
                    .map((s) => (
                      <option key={s.id}>
                        {s.id} - {s.type} / {s.floor}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Transfer Nedeni</p>
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-sm"
                rows={2}
                placeholder="Transfer talebinin gerekçesi..."
              />
            </div>
            <button
              type="button"
              className="mt-3 bg-[#4F8EF7] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7de8]"
            >
              Transfer Talebi Gönder
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#1a2332]">
                Geçmiş Transferler
              </h3>
            </div>
            <div className="divide-y">
              {[
                {
                  from: "P-03",
                  to: "P-06",
                  apartment: "Daire 7",
                  date: "2026-02-15",
                  status: "approved",
                },
                {
                  from: "P-08",
                  to: "P-01",
                  apartment: "Daire 2",
                  date: "2026-01-20",
                  status: "rejected",
                },
              ].map((tr) => (
                <div
                  key={tr.from + tr.to}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium text-sm">{tr.apartment}</span>
                    <span className="text-gray-400 text-xs ml-2">
                      {tr.from} → {tr.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{tr.date}</span>
                    {tr.status === "approved" ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs">
                        <CheckCircle size={12} />
                        Onaylandı
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 text-xs">
                        <XCircle size={12} />
                        Reddedildi
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-[#1a2332] mb-4">
              {showAssignModal} - Tahsis Et
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Daire</p>
                <select className="w-full border rounded-lg px-3 py-2 text-sm">
                  {[
                    "Daire 2",
                    "Daire 4",
                    "Daire 6",
                    "Daire 10",
                    "Daire 11",
                  ].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tahsis Tarihi</p>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowAssignModal(null)}
                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => setShowAssignModal(null)}
                className="flex-1 bg-[#4F8EF7] text-white rounded-lg py-2 text-sm font-medium"
              >
                Tahsis Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
