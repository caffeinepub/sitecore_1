import {
  BarChart2,
  Car,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface GuestParkingRecord {
  id: string;
  plate: string;
  ownerApartment: string;
  guestName: string;
  spotNo: string;
  checkIn: string;
  checkOut: string;
  duration: number; // hours
  status: "aktif" | "tamamlandı" | "bekleniyor";
  accessCode: string;
}

const SPOTS = ["Z-01", "Z-02", "Z-03", "Z-04", "Z-05", "Z-06", "Z-07", "Z-08"];

const INITIAL_RECORDS: GuestParkingRecord[] = [
  {
    id: "1",
    plate: "34 ABC 123",
    ownerApartment: "A-101",
    guestName: "Mehmet Yılmaz",
    spotNo: "Z-03",
    checkIn: "2026-03-25 09:30",
    checkOut: "2026-03-25 18:00",
    duration: 8,
    status: "aktif",
    accessCode: "MZ8K4",
  },
  {
    id: "2",
    plate: "06 DEF 456",
    ownerApartment: "B-205",
    guestName: "Ayşe Kara",
    spotNo: "Z-05",
    checkIn: "2026-03-25 10:00",
    checkOut: "2026-03-25 14:00",
    duration: 4,
    status: "aktif",
    accessCode: "AK3R9",
  },
  {
    id: "3",
    plate: "35 GHI 789",
    ownerApartment: "C-302",
    guestName: "Fatih Arslan",
    spotNo: "Z-01",
    checkIn: "2026-03-24 11:00",
    checkOut: "2026-03-24 16:00",
    duration: 5,
    status: "tamamlandı",
    accessCode: "FA5T2",
  },
  {
    id: "4",
    plate: "41 JKL 321",
    ownerApartment: "A-203",
    guestName: "Zeynep Demir",
    spotNo: "Z-02",
    checkIn: "2026-03-26 08:00",
    checkOut: "2026-03-26 20:00",
    duration: 12,
    status: "bekleniyor",
    accessCode: "ZD7P1",
  },
];

export default function GuestParking({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [records, setRecords] = useState<GuestParkingRecord[]>(INITIAL_RECORDS);
  const [showModal, setShowModal] = useState(false);
  const [showCode, setShowCode] = useState<string | null>(null);
  const [form, setForm] = useState({
    plate: "",
    ownerApartment: "",
    guestName: "",
    spotNo: "Z-01",
    checkIn: "",
    checkOut: "",
    duration: "4",
  });

  const activeRecords = records.filter((r) => r.status === "aktif");
  const usedSpots = activeRecords.map((r) => r.spotNo);
  const availableSpots = SPOTS.filter((s) => !usedSpots.includes(s));

  const handleSave = () => {
    if (!form.plate || !form.ownerApartment || !form.guestName) return;
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    const newRecord: GuestParkingRecord = {
      id: Date.now().toString(),
      plate: form.plate.toUpperCase(),
      ownerApartment: form.ownerApartment,
      guestName: form.guestName,
      spotNo: form.spotNo,
      checkIn:
        form.checkIn ||
        new Date().toISOString().replace("T", " ").substring(0, 16),
      checkOut: form.checkOut,
      duration: Number(form.duration),
      status: "bekleniyor",
      accessCode: code,
    };
    setRecords((prev) => [newRecord, ...prev]);
    setShowCode(code);
    setShowModal(false);
  };

  const complete = (id: string) =>
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "tamamlandı" } : r)),
    );
  const activate = (id: string) =>
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "aktif" } : r)),
    );

  const statusColor = (status: string) =>
    status === "aktif"
      ? "bg-green-100 text-green-800"
      : status === "bekleniyor"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-gray-600";

  const spotOccupancy = SPOTS.map((spot) => ({
    spot,
    status: activeRecords.find((r) => r.spotNo === spot) ? "dolu" : "boş",
    record: activeRecords.find((r) => r.spotNo === spot),
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Car className="w-7 h-7 text-blue-600" /> Misafir Otopark Yönetimi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Ziyaretçi araç giriş takibi, geçici park tahsisi ve erişim kodları
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Misafir Kaydı
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {activeRecords.length}
          </div>
          <div className="text-sm text-gray-500">Aktif Park</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {availableSpots.length}
          </div>
          <div className="text-sm text-gray-500">Boş Yer</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">
            {SPOTS.length - availableSpots.length}
          </div>
          <div className="text-sm text-gray-500">Dolu Yer</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {records.filter((r) => r.status === "tamamlandı").length}
          </div>
          <div className="text-sm text-gray-500">Bugün Tamamlanan</div>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Park Haritası</TabsTrigger>
          <TabsTrigger value="list">Kayıt Listesi</TabsTrigger>
          <TabsTrigger value="history">Geçmiş</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> Misafir Park Alanları
            </h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {spotOccupancy.map(({ spot, status, record }) => (
                <div
                  key={spot}
                  className={`rounded-xl p-3 border-2 transition ${status === "dolu" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50"}`}
                >
                  <div className="text-center">
                    <Car
                      className={`w-6 h-6 mx-auto mb-1 ${status === "dolu" ? "text-red-500" : "text-green-400"}`}
                    />
                    <div className="font-bold text-sm text-gray-900">
                      {spot}
                    </div>
                    <div
                      className={`text-xs font-medium mt-0.5 ${status === "dolu" ? "text-red-600" : "text-green-600"}`}
                    >
                      {status}
                    </div>
                    {record && (
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {record.plate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                Boş ({availableSpots.length})
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                Dolu ({usedSpots.length})
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Plaka
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Ziyaretçi
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Daire
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Yer
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Giriş
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Çıkış
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Durum
                  </th>
                  {isOwner && <th className="px-4 py-3" />}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {records
                  .filter((r) => r.status !== "tamamlandı")
                  .map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-bold text-gray-900">
                        {r.plate}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.guestName}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {r.ownerApartment}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono text-sm">
                          {r.spotNo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {r.checkIn}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {r.checkOut || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(r.status)}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      {isOwner && (
                        <td className="px-4 py-3">
                          {r.status === "bekleniyor" && (
                            <button
                              type="button"
                              onClick={() => activate(r.id)}
                              className="text-xs text-green-600 hover:underline"
                            >
                              Giriş Yaptı
                            </button>
                          )}
                          {r.status === "aktif" && (
                            <button
                              type="button"
                              onClick={() => complete(r.id)}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Çıkış Yaptı
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Plaka
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Ziyaretçi
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Daire
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Süre
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {records
                  .filter((r) => r.status === "tamamlandı")
                  .map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-bold text-gray-900">
                        {r.plate}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.guestName}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {r.ownerApartment}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {r.duration} saat
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {r.checkIn.split(" ")[0]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Record Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Misafir Park Kaydı</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="gp-plate"
                  className="text-xs font-medium text-gray-600"
                >
                  Plaka
                </label>
                <Input
                  id="gp-plate"
                  value={form.plate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, plate: e.target.value }))
                  }
                  placeholder="34 ABC 123"
                  className="mt-1 font-mono"
                />
              </div>
              <div>
                <label
                  htmlFor="gp-guest-name"
                  className="text-xs font-medium text-gray-600"
                >
                  Ziyaretçi Adı
                </label>
                <Input
                  id="gp-guest-name"
                  value={form.guestName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, guestName: e.target.value }))
                  }
                  placeholder="Ad Soyad"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="gp-owner-apt"
                  className="text-xs font-medium text-gray-600"
                >
                  Ev Sahibi Daire
                </label>
                <Input
                  id="gp-owner-apt"
                  value={form.ownerApartment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ownerApartment: e.target.value }))
                  }
                  placeholder="A-101"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="gp-spot-no"
                  className="text-xs font-medium text-gray-600"
                >
                  Park Yeri
                </label>
                <select
                  id="gp-spot-no"
                  value={form.spotNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, spotNo: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                >
                  {availableSpots.map((s) => (
                    <option key={s} value={s}>
                      {s} (Boş)
                    </option>
                  ))}
                  {usedSpots.map((s) => (
                    <option key={s} value={s} disabled>
                      {s} (Dolu)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="gp-check-in"
                  className="text-xs font-medium text-gray-600"
                >
                  Giriş Zamanı
                </label>
                <Input
                  id="gp-check-in"
                  type="datetime-local"
                  value={form.checkIn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, checkIn: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="gp-check-out"
                  className="text-xs font-medium text-gray-600"
                >
                  Tahmini Çıkış
                </label>
                <Input
                  id="gp-check-out"
                  type="datetime-local"
                  value={form.checkOut}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, checkOut: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Kaydet & Kod Üret
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Access Code Modal */}
      <Dialog open={!!showCode} onOpenChange={() => setShowCode(null)}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Erişim Kodu Oluşturuldu</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="text-5xl font-bold font-mono tracking-widest text-blue-700 bg-blue-50 rounded-xl py-6 px-4 mb-4">
              {showCode}
            </div>
            <p className="text-sm text-gray-600">
              Bu kodu ziyaretçinizle paylaşın. Güvenlik görevlisi giriş için bu
              kodu kullanacak.
            </p>
          </div>
          <Button onClick={() => setShowCode(null)} className="w-full">
            Tamam
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
