import {
  AlertTriangle,
  CheckCircle,
  Edit2,
  PawPrint,
  Plus,
  Syringe,
  Trash2,
  X,
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

interface Pet {
  id: string;
  apartmentNo: string;
  ownerName: string;
  petName: string;
  petType: string;
  breed: string;
  age: number;
  vaccineStatus: "güncel" | "eksik" | "bilinmiyor";
  nextVaccineDate: string;
  registeredAt: string;
  notes: string;
}

interface Complaint {
  id: string;
  apartmentNo: string;
  subject: string;
  description: string;
  date: string;
  status: "açık" | "inceleniyor" | "kapatıldı";
}

const INITIAL_PETS: Pet[] = [
  {
    id: "1",
    apartmentNo: "A-101",
    ownerName: "Ahmet Yılmaz",
    petName: "Karamel",
    petType: "Kedi",
    breed: "British Shorthair",
    age: 3,
    vaccineStatus: "güncel" as "güncel" | "eksik" | "bilinmiyor",
    nextVaccineDate: "2026-08-15",
    registeredAt: "2024-03-10",
    notes: "Kısırlaştırılmış",
  },
  {
    id: "2",
    apartmentNo: "B-203",
    ownerName: "Fatma Kaya",
    petName: "Aslan",
    petType: "Köpek",
    breed: "Golden Retriever",
    age: 5,
    vaccineStatus: "güncel" as "güncel" | "eksik" | "bilinmiyor",
    nextVaccineDate: "2026-06-20",
    registeredAt: "2023-11-05",
    notes: "Tasmalı, eğitimli",
  },
  {
    id: "3",
    apartmentNo: "A-305",
    ownerName: "Mehmet Demir",
    petName: "Boncuk",
    petType: "Kedi",
    breed: "Tekir",
    age: 1,
    vaccineStatus: "eksik",
    nextVaccineDate: "",
    registeredAt: "2025-01-20",
    notes: "",
  },
  {
    id: "4",
    apartmentNo: "C-102",
    ownerName: "Zeynep Ak",
    petName: "Pamuk",
    petType: "Tavşan",
    breed: "Angora",
    age: 2,
    vaccineStatus: "bilinmiyor",
    nextVaccineDate: "",
    registeredAt: "2024-07-12",
    notes: "Balkondan çıkmaz",
  },
  {
    id: "5",
    apartmentNo: "B-401",
    ownerName: "Emre Çelik",
    petName: "Duman",
    petType: "Kedi",
    breed: "Van Kedisi",
    age: 4,
    vaccineStatus: "güncel" as "güncel" | "eksik" | "bilinmiyor",
    nextVaccineDate: "2026-09-01",
    registeredAt: "2023-06-18",
    notes: "",
  },
];

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: "1",
    apartmentNo: "A-102",
    subject: "Gürültü şikayeti",
    description:
      "Gece geç saatlerde B-203 dairesindeki köpek sürekli havlıyor.",
    date: "2026-03-10",
    status: "inceleniyor",
  },
  {
    id: "2",
    apartmentNo: "C-201",
    subject: "Ortak alan temizliği",
    description:
      "A-305 sahibi evcil hayvanını ortak bahçede gezdirdikten sonra temizlik yapmıyor.",
    date: "2026-03-18",
    status: "açık",
  },
  {
    id: "3",
    apartmentNo: "B-105",
    subject: "Asansörde evcil hayvan",
    description: "Tasmasız köpek asansörde çocuğumuzu korkuttu.",
    date: "2026-03-20",
    status: "açık",
  },
];

export default function PetManagement({
  buildingId: _buildingId,
  isOwner,
  t: _t,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [showModal, setShowModal] = useState(false);
  const [editPet, setEditPet] = useState<Pet | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("hepsi");

  const [form, setForm] = useState({
    apartmentNo: "",
    ownerName: "",
    petName: "",
    petType: "Kedi",
    breed: "",
    age: "",
    vaccineStatus: "güncel" as "güncel" | "eksik" | "bilinmiyor",
    nextVaccineDate: "",
    notes: "",
  });

  const filteredPets = pets.filter((p) => {
    const matchSearch =
      p.petName.toLowerCase().includes(search.toLowerCase()) ||
      p.apartmentNo.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "hepsi" || p.petType === filterType;
    return matchSearch && matchType;
  });

  const vaccineStats = {
    güncel: pets.filter((p) => p.vaccineStatus === "güncel").length,
    eksik: pets.filter((p) => p.vaccineStatus === "eksik").length,
    bilinmiyor: pets.filter((p) => p.vaccineStatus === "bilinmiyor").length,
  };

  const typeStats = ["Kedi", "Köpek", "Tavşan", "Kuş", "Diğer"]
    .map((type) => ({
      type,
      count: pets.filter((p) => p.petType === type).length,
    }))
    .filter((s) => s.count > 0);

  const openAdd = () => {
    setEditPet(null);
    setForm({
      apartmentNo: "",
      ownerName: "",
      petName: "",
      petType: "Kedi",
      breed: "",
      age: "",
      vaccineStatus: "güncel" as "güncel" | "eksik" | "bilinmiyor",
      nextVaccineDate: "",
      notes: "",
    });
    setShowModal(true);
  };

  const openEdit = (pet: Pet) => {
    setEditPet(pet);
    setForm({
      apartmentNo: pet.apartmentNo,
      ownerName: pet.ownerName,
      petName: pet.petName,
      petType: pet.petType,
      breed: pet.breed,
      age: String(pet.age),
      vaccineStatus: pet.vaccineStatus,
      nextVaccineDate: pet.nextVaccineDate,
      notes: pet.notes,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.apartmentNo || !form.petName || !form.ownerName) return;
    if (editPet) {
      setPets((prev) =>
        prev.map((p) =>
          p.id === editPet.id
            ? { ...editPet, ...form, age: Number(form.age) }
            : p,
        ),
      );
    } else {
      const newPet: Pet = {
        id: Date.now().toString(),
        ...form,
        age: Number(form.age),
        registeredAt: new Date().toISOString().split("T")[0],
      } as Pet;
      setPets((prev) => [newPet, ...prev]);
    }
    setShowModal(false);
  };

  const deletePet = (id: string) =>
    setPets((prev) => prev.filter((p) => p.id !== id));

  const vaccineColor = (status: string) =>
    status === "güncel"
      ? "bg-green-100 text-green-800"
      : status === "eksik"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800";

  const complaintStatusColor = (status: string) =>
    status === "kapatıldı"
      ? "bg-green-100 text-green-800"
      : status === "inceleniyor"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <PawPrint className="w-7 h-7 text-orange-500" /> Evcil Hayvan
            Yönetimi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Bina sakinlerinin kayıtlı evcil hayvanları ve sağlık takibi
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={openAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Yeni Kayıt
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{pets.length}</div>
          <div className="text-sm text-gray-500">Toplam Evcil Hayvan</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {vaccineStats.güncel}
          </div>
          <div className="text-sm text-gray-500">Aşı Güncel</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-red-600">
            {vaccineStats.eksik}
          </div>
          <div className="text-sm text-gray-500">Aşı Eksik</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">
            {complaints.filter((c) => c.status !== "kapatıldı").length}
          </div>
          <div className="text-sm text-gray-500">Açık Şikayet</div>
        </div>
      </div>

      <Tabs defaultValue="pets">
        <TabsList className="mb-4">
          <TabsTrigger value="pets">Kayıtlı Hayvanlar</TabsTrigger>
          <TabsTrigger value="complaints">Şikayetler</TabsTrigger>
          <TabsTrigger value="stats">İstatistikler</TabsTrigger>
        </TabsList>

        <TabsContent value="pets">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
              <Input
                placeholder="Hayvan adı, daire veya sakin ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="hepsi">Tüm Türler</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
                <option value="Tavşan">Tavşan</option>
                <option value="Kuş">Kuş</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Daire
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Sakin
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Hayvan Adı
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Tür / Cins
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Yaş
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Aşı Durumu
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                      Sonraki Aşı
                    </th>
                    {isOwner && <th className="px-4 py-3" />}
                  </tr>
                </thead>
                <tbody>
                  {filteredPets.map((pet) => (
                    <tr
                      key={pet.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {pet.apartmentNo}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {pet.ownerName}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {pet.petName}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {pet.petType} / {pet.breed || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{pet.age} yaş</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${vaccineColor(pet.vaccineStatus)}`}
                        >
                          {pet.vaccineStatus === "güncel"
                            ? "✓ Güncel"
                            : pet.vaccineStatus === "eksik"
                              ? "⚠ Eksik"
                              : "? Bilinmiyor"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">
                        {pet.nextVaccineDate || "—"}
                      </td>
                      {isOwner && (
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEdit(pet)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deletePet(pet.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                  {filteredPets.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-8 text-gray-400"
                      >
                        Kayıt bulunamadı
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="complaints">
          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-900">
                        {c.subject}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${complaintStatusColor(c.status)}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {c.description}
                    </p>
                    <span className="text-xs text-gray-400">
                      Daire {c.apartmentNo} · {c.date}
                    </span>
                  </div>
                  {isOwner && c.status !== "kapatıldı" && (
                    <button
                      type="button"
                      onClick={() =>
                        setComplaints((prev) =>
                          prev.map((item) =>
                            item.id === c.id
                              ? {
                                  ...item,
                                  status:
                                    item.status === "açık"
                                      ? "inceleniyor"
                                      : "kapatıldı",
                                }
                              : item,
                          ),
                        )
                      }
                      className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                    >
                      {c.status === "açık" ? "İncele" : "Kapat"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Tür Dağılımı</h3>
              <div className="space-y-3">
                {typeStats.map((s) => (
                  <div key={s.type} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-20">{s.type}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-orange-400 h-3 rounded-full transition-all"
                        style={{ width: `${(s.count / pets.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-6 text-right">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Aşı Durumu Özeti
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Aşı Güncel
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-700">
                    {vaccineStats.güncel}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-800">
                      Aşı Eksik
                    </span>
                  </div>
                  <span className="text-xl font-bold text-red-700">
                    {vaccineStats.eksik}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Syringe className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      Bilinmiyor
                    </span>
                  </div>
                  <span className="text-xl font-bold text-yellow-700">
                    {vaccineStats.bilinmiyor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editPet ? "Kaydı Düzenle" : "Yeni Evcil Hayvan Kaydı"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pm-apt-no"
                  className="text-xs font-medium text-gray-600"
                >
                  Daire No
                </label>
                <Input
                  id="pm-apt-no"
                  value={form.apartmentNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, apartmentNo: e.target.value }))
                  }
                  placeholder="A-101"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="pm-owner-name"
                  className="text-xs font-medium text-gray-600"
                >
                  Sakin Adı
                </label>
                <Input
                  id="pm-owner-name"
                  value={form.ownerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ownerName: e.target.value }))
                  }
                  placeholder="Ad Soyad"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pm-pet-name"
                  className="text-xs font-medium text-gray-600"
                >
                  Hayvan Adı
                </label>
                <Input
                  id="pm-pet-name"
                  value={form.petName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, petName: e.target.value }))
                  }
                  placeholder="Karamel"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="pm-pet-type"
                  className="text-xs font-medium text-gray-600"
                >
                  Tür
                </label>
                <select
                  id="pm-pet-type"
                  value={form.petType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, petType: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                >
                  {["Kedi", "Köpek", "Kuş", "Tavşan", "Balık", "Diğer"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pm-breed"
                  className="text-xs font-medium text-gray-600"
                >
                  Cins
                </label>
                <Input
                  id="pm-breed"
                  value={form.breed}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, breed: e.target.value }))
                  }
                  placeholder="British Shorthair"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="pm-age"
                  className="text-xs font-medium text-gray-600"
                >
                  Yaş
                </label>
                <Input
                  id="pm-age"
                  type="number"
                  value={form.age}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, age: e.target.value }))
                  }
                  placeholder="3"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pm-vaccine-status"
                  className="text-xs font-medium text-gray-600"
                >
                  Aşı Durumu
                </label>
                <select
                  id="pm-vaccine-status"
                  value={form.vaccineStatus}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      vaccineStatus: e.target.value as any,
                    }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                >
                  <option value="güncel">Güncel</option>
                  <option value="eksik">Eksik</option>
                  <option value="bilinmiyor">Bilinmiyor</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="pm-next-vaccine"
                  className="text-xs font-medium text-gray-600"
                >
                  Sonraki Aşı Tarihi
                </label>
                <Input
                  id="pm-next-vaccine"
                  type="date"
                  value={form.nextVaccineDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nextVaccineDate: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="pm-notes"
                className="text-xs font-medium text-gray-600"
              >
                Notlar
              </label>
              <Input
                id="pm-notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Ek bilgiler..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Kaydet
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
    </div>
  );
}
