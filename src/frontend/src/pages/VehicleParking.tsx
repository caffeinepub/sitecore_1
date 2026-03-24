import { Car, Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface Vehicle {
  id: string;
  licensePlate: string;
  vehicleType: "car" | "motorcycle" | "truck";
  color: string;
  ownerName: string;
  apartmentNo: string;
  parkingSpot: string;
  isVisitor: boolean;
  visitorUntil?: string;
  addedAt: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_vehicles_${id}`;

export default function VehicleParking({ buildingId, isOwner, t }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [capacity, setCapacity] = useState(20);
  const [form, setForm] = useState({
    licensePlate: "",
    vehicleType: "car" as Vehicle["vehicleType"],
    color: "",
    ownerName: "",
    apartmentNo: "",
    parkingSpot: "",
    isVisitor: false,
    visitorUntil: "",
  });

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) setVehicles(JSON.parse(raw));
    else {
      const seed: Vehicle[] = [
        {
          id: "v1",
          licensePlate: "34 ABC 123",
          vehicleType: "car",
          color: "Siyah",
          ownerName: "Ahmet Yılmaz",
          apartmentNo: "101",
          parkingSpot: "A-1",
          isVisitor: false,
          addedAt: new Date().toISOString(),
        },
        {
          id: "v2",
          licensePlate: "34 XYZ 456",
          vehicleType: "car",
          color: "Beyaz",
          ownerName: "Fatma Kaya",
          apartmentNo: "202",
          parkingSpot: "A-2",
          isVisitor: false,
          addedAt: new Date().toISOString(),
        },
        {
          id: "v3",
          licensePlate: "34 ZZZ 789",
          vehicleType: "motorcycle",
          color: "Kırmızı",
          ownerName: "Ziyaretçi",
          apartmentNo: "301",
          parkingSpot: "Z-1",
          isVisitor: true,
          visitorUntil: new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0],
          addedAt: new Date().toISOString(),
        },
      ];
      setVehicles(seed);
      localStorage.setItem(KEY(buildingId), JSON.stringify(seed));
    }
  }, [buildingId]);

  const save = (updated: Vehicle[]) => {
    setVehicles(updated);
    localStorage.setItem(KEY(buildingId), JSON.stringify(updated));
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm({
      licensePlate: "",
      vehicleType: "car",
      color: "",
      ownerName: "",
      apartmentNo: "",
      parkingSpot: "",
      isVisitor: false,
      visitorUntil: "",
    });
    setShowDialog(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditTarget(v);
    setForm({
      licensePlate: v.licensePlate,
      vehicleType: v.vehicleType,
      color: v.color,
      ownerName: v.ownerName,
      apartmentNo: v.apartmentNo,
      parkingSpot: v.parkingSpot,
      isVisitor: v.isVisitor,
      visitorUntil: v.visitorUntil || "",
    });
    setShowDialog(true);
  };

  const handleSubmit = () => {
    if (!form.licensePlate.trim()) return;
    if (editTarget) {
      save(
        vehicles.map((v) => (v.id === editTarget.id ? { ...v, ...form } : v)),
      );
    } else {
      save([
        ...vehicles,
        {
          id: Date.now().toString(),
          ...form,
          addedAt: new Date().toISOString(),
        },
      ]);
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) =>
    save(vehicles.filter((v) => v.id !== id));

  const occupied = vehicles.filter((v) => v.parkingSpot).length;

  const filteredVehicles = searchQuery.trim()
    ? vehicles.filter((v) =>
        v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : vehicles;

  const typeBadge = (type: string) => {
    if (type === "car")
      return (
        <Badge className="bg-blue-100 text-blue-700">
          {t.carType || "Otomobil"}
        </Badge>
      );
    if (type === "motorcycle")
      return (
        <Badge className="bg-orange-100 text-orange-700">
          {t.motorcycleType || "Motosiklet"}
        </Badge>
      );
    return (
      <Badge className="bg-purple-100 text-purple-700">
        {t.truckType || "Kamyon/Van"}
      </Badge>
    );
  };

  // Build parking grid: collect all spot labels from vehicles
  const occupiedSpots: Record<string, Vehicle> = {};
  for (const v of vehicles) {
    if (v.parkingSpot) occupiedSpots[v.parkingSpot] = v;
  }
  const totalSlots = Math.max(capacity, Object.keys(occupiedSpots).length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.vehicleParking || "Araç & Otopark"}
        </h2>
        <Button
          onClick={openAdd}
          className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
          data-ocid="vehicles.primary_button"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.addVehicle || "Araç Ekle"}
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Plakaya göre ara... (ör. 34 ABC)"
          className="max-w-xs"
          data-ocid="vehicles.search_input"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-sm text-[#6B7A8D] hover:text-[#0E1116]"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.registeredVehicles || "Kayıtlı Araçlar"}
          </p>
          <p className="text-2xl font-bold text-[#0E1116]">{vehicles.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.occupiedSpots || "Dolu Spot"}
          </p>
          <p className="text-2xl font-bold text-red-600">{occupied}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <p className="text-sm text-[#6B7A8D]">
            {t.visitorVehicle || "Ziyaretçi Araçları"}
          </p>
          <p className="text-2xl font-bold text-amber-600">
            {vehicles.filter((v) => v.isVisitor).length}
          </p>
        </div>
      </div>

      {/* Parking Grid */}
      <div className="bg-white rounded-2xl border border-[#E8EDF5] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0E1116]">🅿️ Park Yeri Haritası</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7A8D]">Kapasite:</span>
            <input
              type="number"
              min={1}
              max={200}
              value={capacity}
              onChange={(e) => setCapacity(Math.max(1, Number(e.target.value)))}
              className="w-16 border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm text-center"
            />
          </div>
        </div>
        {(() => {
          const vehiclesWithSpots = vehicles.filter((v) => v.parkingSpot);
          const parkingSlots = Array.from({ length: totalSlots }).map(
            (_, idx) => ({
              slotNum: idx + 1,
              vehicle: vehiclesWithSpots[idx] ?? null,
            }),
          );
          return (
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
              {parkingSlots.map((slot) => (
                <div
                  key={`parking-${slot.slotNum}`}
                  className={`rounded-lg p-2 text-xs text-center border transition-colors ${slot.vehicle ? "bg-red-100 border-red-300 text-red-700" : "bg-green-50 border-green-200 text-green-700"}`}
                  title={
                    slot.vehicle
                      ? `${slot.vehicle.licensePlate} - Daire ${slot.vehicle.apartmentNo}`
                      : "Boş"
                  }
                >
                  <div className="font-bold">
                    {slot.vehicle
                      ? slot.vehicle.parkingSpot || String(slot.slotNum)
                      : String(slot.slotNum)}
                  </div>
                  {slot.vehicle && (
                    <div className="truncate mt-0.5 text-[10px]">
                      {slot.vehicle.licensePlate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="flex gap-4 mt-3 text-xs text-[#6B7A8D]">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-200 inline-block" /> Dolu (
            {occupied})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-100 inline-block" /> Boş (
            {totalSlots - occupied})
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
        {filteredVehicles.length === 0 ? (
          <p
            className="text-center text-[#6B7A8D] py-12"
            data-ocid="vehicles.empty_state"
          >
            {searchQuery
              ? "Araç bulunamadı."
              : t.noVehicles || "Kayıtlı araç yok."}
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#F3F6FB]">
              <tr>
                <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                  {t.licensePlate || "Plaka"}
                </th>
                <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                  {t.vehicleType || "Tür"}
                </th>
                <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                  {t.vehicleColor || "Renk"}
                </th>
                <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                  {t.apartmentNo || "Daire"}
                </th>
                <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                  {t.parkingSpot || "Park Yeri"}
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((v, i) => (
                <tr
                  key={v.id}
                  className="border-t border-[#F0F3F8] hover:bg-[#FAFBFD]"
                  data-ocid={`vehicles.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono font-semibold text-[#0E1116]">
                    {v.licensePlate}
                  </td>
                  <td className="px-4 py-3">{typeBadge(v.vehicleType)}</td>
                  <td className="px-4 py-3 text-[#3A4654]">{v.color}</td>
                  <td className="px-4 py-3 text-[#3A4654]">
                    {v.apartmentNo}
                    {v.isVisitor && (
                      <Badge className="ml-2 bg-amber-100 text-amber-700 text-xs">
                        Ziyaretçi
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {v.parkingSpot ? (
                      <Badge className="bg-green-100 text-green-700">
                        {v.parkingSpot}
                      </Badge>
                    ) : (
                      <span className="text-[#9CA8B4]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isOwner && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(v)}
                          data-ocid={`vehicles.edit_button.${i + 1}`}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(v.id)}
                          className="text-red-500"
                          data-ocid={`vehicles.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md" data-ocid="vehicles.dialog">
          <DialogHeader>
            <DialogTitle>
              {editTarget
                ? t.editVehicle || "Araç Düzenle"
                : t.addVehicle || "Araç Ekle"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.licensePlate || "Plaka"}
              </p>
              <Input
                value={form.licensePlate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, licensePlate: e.target.value }))
                }
                placeholder="34 ABC 123"
                data-ocid="vehicles.input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.vehicleType || "Araç Türü"}
              </p>
              <select
                value={form.vehicleType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    vehicleType: e.target.value as Vehicle["vehicleType"],
                  }))
                }
                className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                data-ocid="vehicles.select"
              >
                <option value="car">{t.carType || "Otomobil"}</option>
                <option value="motorcycle">
                  {t.motorcycleType || "Motosiklet"}
                </option>
                <option value="truck">{t.truckType || "Kamyon/Van"}</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.vehicleColor || "Renk"}
              </p>
              <Input
                value={form.color}
                onChange={(e) =>
                  setForm((p) => ({ ...p, color: e.target.value }))
                }
                placeholder="Siyah"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.ownerName || "Sahip Adı"}
              </p>
              <Input
                value={form.ownerName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, ownerName: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.apartmentNo || "Daire No"}
              </p>
              <Input
                value={form.apartmentNo}
                onChange={(e) =>
                  setForm((p) => ({ ...p, apartmentNo: e.target.value }))
                }
                placeholder="101"
              />
            </div>
            {isOwner && (
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.parkingSpot || "Park Yeri"}
                </p>
                <Input
                  value={form.parkingSpot}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, parkingSpot: e.target.value }))
                  }
                  placeholder="A-1"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isVisitor"
                checked={form.isVisitor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isVisitor: e.target.checked }))
                }
                className="rounded"
              />
              <label htmlFor="isVisitor" className="text-sm text-[#3A4654]">
                {t.visitorVehicle || "Ziyaretçi Aracı"}
              </label>
            </div>
            {form.isVisitor && (
              <div>
                <p className="text-sm font-medium text-[#3A4654] block mb-1">
                  {t.visitorUntil || "Çıkış Tarihi"}
                </p>
                <Input
                  type="date"
                  value={form.visitorUntil}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, visitorUntil: e.target.value }))
                  }
                />
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="vehicles.submit_button"
              >
                {editTarget ? t.save || "Kaydet" : t.addVehicle || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="vehicles.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
