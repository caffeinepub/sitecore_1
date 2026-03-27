import {
  AlertTriangle,
  Car,
  CheckCircle,
  Clock,
  FileText,
  Fuel,
  Plus,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: string;
  year: number;
  brand: string;
  inspectionDate: string;
  insuranceDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage: number;
  status: "active" | "maintenance" | "inactive";
  fuelType: string;
}

interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  technician: string;
  status: "completed" | "pending" | "scheduled";
}

interface FuelRecord {
  id: string;
  vehicleId: string;
  date: string;
  liters: number;
  cost: number;
  mileage: number;
  station: string;
}

const vehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Bakım Aracı",
    plate: "34 ABC 123",
    type: "Kamyonet",
    year: 2019,
    brand: "Ford Transit",
    inspectionDate: "2024-08-15",
    insuranceDate: "2024-12-31",
    lastMaintenance: "2024-10-01",
    nextMaintenance: "2025-04-01",
    mileage: 87500,
    status: "active",
    fuelType: "Dizel",
  },
  {
    id: "v2",
    name: "Temizlik Aracı",
    plate: "34 DEF 456",
    type: "Minivan",
    year: 2021,
    brand: "Renault Trafic",
    inspectionDate: "2025-03-20",
    insuranceDate: "2025-06-15",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-07-15",
    mileage: 32000,
    status: "active",
    fuelType: "Dizel",
  },
  {
    id: "v3",
    name: "Güvenlik Aracı",
    plate: "34 GHI 789",
    type: "Sedan",
    year: 2018,
    brand: "Toyota Corolla",
    inspectionDate: "2024-06-10",
    insuranceDate: "2024-11-30",
    lastMaintenance: "2024-09-20",
    nextMaintenance: "2025-03-20",
    mileage: 124300,
    status: "maintenance",
    fuelType: "Benzin",
  },
];

const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "m1",
    vehicleId: "v1",
    date: "2024-10-01",
    type: "Periyodik Bakım",
    description: "Yağ değişimi, filtre değişimi, fren kontrolü",
    cost: 3200,
    technician: "Oto Servis A.Ş.",
    status: "completed",
  },
  {
    id: "m2",
    vehicleId: "v2",
    date: "2025-01-15",
    type: "Periyodik Bakım",
    description: "Yağ değişimi, triger kayışı kontrolü",
    cost: 2800,
    technician: "Yetkili Servis",
    status: "completed",
  },
  {
    id: "m3",
    vehicleId: "v3",
    date: "2025-03-27",
    type: "Arıza Onarımı",
    description: "Fren balatası değişimi, rot-balans",
    cost: 1900,
    technician: "Oto Servis A.Ş.",
    status: "pending",
  },
  {
    id: "m4",
    vehicleId: "v1",
    date: "2025-04-01",
    type: "Periyodik Bakım",
    description: "Planlı 6 aylık bakım",
    cost: 0,
    technician: "-",
    status: "scheduled",
  },
  {
    id: "m5",
    vehicleId: "v3",
    date: "2025-04-10",
    type: "Muayene Hazırlık",
    description: "Muayene öncesi genel kontrol",
    cost: 0,
    technician: "-",
    status: "scheduled",
  },
  {
    id: "m6",
    vehicleId: "v2",
    date: "2024-08-20",
    type: "Lastik Değişimi",
    description: "4 adet lastik yenilendi",
    cost: 4600,
    technician: "Lastikçi",
    status: "completed",
  },
];

const fuelRecords: FuelRecord[] = [
  {
    id: "f1",
    vehicleId: "v1",
    date: "2025-03-25",
    liters: 45,
    cost: 2250,
    mileage: 87500,
    station: "Shell - Levent",
  },
  {
    id: "f2",
    vehicleId: "v2",
    date: "2025-03-24",
    liters: 38,
    cost: 1900,
    mileage: 32000,
    station: "BP - Maslak",
  },
  {
    id: "f3",
    vehicleId: "v1",
    date: "2025-03-10",
    liters: 50,
    cost: 2500,
    mileage: 87100,
    station: "Total - Şişli",
  },
  {
    id: "f4",
    vehicleId: "v3",
    date: "2025-02-28",
    liters: 40,
    cost: 2000,
    mileage: 124100,
    station: "Opet - Beşiktaş",
  },
  {
    id: "f5",
    vehicleId: "v2",
    date: "2025-02-15",
    liters: 35,
    cost: 1750,
    mileage: 31600,
    station: "Shell - Levent",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  maintenance: "bg-orange-100 text-orange-700",
  inactive: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  active: "Aktif",
  maintenance: "Bakımda",
  inactive: "Pasif",
};

const maintenanceStatusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  scheduled: "bg-blue-100 text-blue-700",
};

const maintenanceStatusLabels: Record<string, string> = {
  completed: "Tamamlandı",
  pending: "Devam Ediyor",
  scheduled: "Planlandı",
};

function isExpiringSoon(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 30 && diff >= 0;
}

function isExpired(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date < now;
}

export default function VehicleMaintenanceTracking({ t: _t }: { t: any }) {
  const [activeTab, setActiveTab] = useState<
    "vehicles" | "maintenance" | "fuel"
  >("vehicles");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const filteredMaintenance = selectedVehicle
    ? maintenanceRecords.filter((r) => r.vehicleId === selectedVehicle)
    : maintenanceRecords;

  const filteredFuel = selectedVehicle
    ? fuelRecords.filter((r) => r.vehicleId === selectedVehicle)
    : fuelRecords;

  const totalFuelCost = filteredFuel.reduce((sum, r) => sum + r.cost, 0);
  const totalMaintenanceCost = maintenanceRecords
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.cost, 0);

  const alerts = vehicles.filter(
    (v) =>
      isExpired(v.inspectionDate) ||
      isExpired(v.insuranceDate) ||
      isExpiringSoon(v.inspectionDate) ||
      isExpiringSoon(v.insuranceDate),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Araç Bakım & Muayene Takibi
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Bina araçlarının bakım, muayene ve yakıt yönetimi
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Yeni Araç Ekle
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Toplam Araç</p>
              <p className="text-xl font-bold text-gray-800">
                {vehicles.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Aktif Araç</p>
              <p className="text-xl font-bold text-gray-800">
                {vehicles.filter((v) => v.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Toplam Bakım</p>
              <p className="text-xl font-bold text-gray-800">
                {totalMaintenanceCost.toLocaleString("tr-TR")} ₺
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Uyarı</p>
              <p className="text-xl font-bold text-gray-800">{alerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-700 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" /> Dikkat Gerektiren Durumlar
          </h3>
          <div className="space-y-1">
            {alerts.map((v) => (
              <div key={v.id} className="text-sm text-red-600">
                <span className="font-medium">
                  {v.name} ({v.plate})
                </span>
                :
                {isExpired(v.inspectionDate) && (
                  <span className="ml-1">
                    Muayene süresi dolmuş ({v.inspectionDate})
                  </span>
                )}
                {!isExpired(v.inspectionDate) &&
                  isExpiringSoon(v.inspectionDate) && (
                    <span className="ml-1">
                      Muayene yakında doluyor ({v.inspectionDate})
                    </span>
                  )}
                {isExpired(v.insuranceDate) && (
                  <span className="ml-1 ml-2">
                    Sigorta süresi dolmuş ({v.insuranceDate})
                  </span>
                )}
                {!isExpired(v.insuranceDate) &&
                  isExpiringSoon(v.insuranceDate) && (
                    <span className="ml-1">
                      Sigorta yakında doluyor ({v.insuranceDate})
                    </span>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          {(["vehicles", "maintenance", "fuel"] as const).map((tab) => {
            const labels = {
              vehicles: "Araçlar",
              maintenance: "Bakım Geçmişi",
              fuel: "Yakıt Kaydı",
            };
            return (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="p-4">
          {/* Vehicle filter for maintenance and fuel tabs */}
          {(activeTab === "maintenance" || activeTab === "fuel") && (
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedVehicle(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedVehicle === null
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Tümü
              </button>
              {vehicles.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedVehicle === v.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === "vehicles" && (
            <div className="space-y-3">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{v.name}</p>
                        <p className="text-sm text-gray-500">
                          {v.brand} · {v.plate} · {v.year}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[v.status]}`}
                    >
                      {statusLabels[v.status]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-400 mb-0.5">Yakıt</p>
                      <p className="font-medium text-gray-700">{v.fuelType}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-400 mb-0.5">Kilometre</p>
                      <p className="font-medium text-gray-700">
                        {v.mileage.toLocaleString("tr-TR")} km
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-2 ${isExpired(v.inspectionDate) ? "bg-red-50" : isExpiringSoon(v.inspectionDate) ? "bg-yellow-50" : "bg-gray-50"}`}
                    >
                      <p className="text-xs text-gray-400 mb-0.5">Muayene</p>
                      <p
                        className={`font-medium text-sm ${isExpired(v.inspectionDate) ? "text-red-600" : isExpiringSoon(v.inspectionDate) ? "text-yellow-600" : "text-gray-700"}`}
                      >
                        {v.inspectionDate}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-2 ${isExpired(v.insuranceDate) ? "bg-red-50" : isExpiringSoon(v.insuranceDate) ? "bg-yellow-50" : "bg-gray-50"}`}
                    >
                      <p className="text-xs text-gray-400 mb-0.5">Sigorta</p>
                      <p
                        className={`font-medium text-sm ${isExpired(v.insuranceDate) ? "text-red-600" : isExpiringSoon(v.insuranceDate) ? "text-yellow-600" : "text-gray-700"}`}
                      >
                        {v.insuranceDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Son bakım: {v.lastMaintenance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      Sonraki bakım: {v.nextMaintenance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" /> Bakım Kaydı Ekle
                </button>
              </div>
              {filteredMaintenance.map((r) => {
                const vehicle = vehicles.find((v) => v.id === r.vehicleId);
                return (
                  <div
                    key={r.id}
                    className="border border-gray-100 rounded-xl p-4 flex items-start justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg mt-0.5">
                        <Wrench className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800">{r.type}</p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${maintenanceStatusColors[r.status]}`}
                          >
                            {maintenanceStatusLabels[r.status]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {vehicle?.name} · {r.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {r.date} · {r.technician}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      {r.cost > 0 ? `${r.cost.toLocaleString("tr-TR")} ₺` : "-"}
                    </p>
                  </div>
                );
              })}
              <div className="bg-blue-50 rounded-xl p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">
                  Toplam Bakım Gideri
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {filteredMaintenance
                    .filter((r) => r.status === "completed")
                    .reduce((s, r) => s + r.cost, 0)
                    .toLocaleString("tr-TR")}{" "}
                  ₺
                </span>
              </div>
            </div>
          )}

          {/* Fuel Tab */}
          {activeTab === "fuel" && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" /> Yakıt Kaydı Ekle
                </button>
              </div>
              {filteredFuel.map((r) => {
                const vehicle = vehicles.find((v) => v.id === r.vehicleId);
                return (
                  <div
                    key={r.id}
                    className="border border-gray-100 rounded-xl p-4 flex items-start justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-lg mt-0.5">
                        <Fuel className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {vehicle?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {r.liters} litre · {r.station}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {r.date} · {r.mileage.toLocaleString("tr-TR")} km
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {r.cost.toLocaleString("tr-TR")} ₺
                    </p>
                  </div>
                );
              })}
              <div className="bg-green-50 rounded-xl p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">
                  Toplam Yakıt Gideri
                </span>
                <span className="text-sm font-bold text-green-700">
                  {totalFuelCost.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
