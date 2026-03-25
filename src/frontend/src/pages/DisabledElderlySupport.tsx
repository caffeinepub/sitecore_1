import {
  AlertCircle,
  CheckCircle,
  Heart,
  Phone,
  Plus,
  User,
  X,
} from "lucide-react";
import type React from "react";
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

type NeedType = "Engelli" | "Yaşlı" | "Kronik Hasta" | "Diğer";
type PriorityLevel = "Acil" | "Yüksek" | "Normal";

interface SupportService {
  id: string;
  type: string;
  provider: string;
  frequency: string;
  notes: string;
}

interface SupportResident {
  id: string;
  name: string;
  apartment: string;
  needType: NeedType;
  priority: PriorityLevel;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  accessibilityNeeds: string[];
  services: SupportService[];
  notes: string;
  registeredDate: string;
}

const ACCESSIBILITY_OPTIONS = [
  "Tekerlekli sandalye erişimi",
  "Asansör önceliği",
  "Rampa ihtiyacı",
  "İşitme cihazı",
  "Görme engeli",
  "Yürüme yardımcısı",
  "Özel otopark",
  "Acil müdahale önceliği",
];

const DEFAULT_RESIDENTS: SupportResident[] = [
  {
    id: "1",
    name: "Fatma Kaya",
    apartment: "Daire 12",
    needType: "Yaşlı",
    priority: "Yüksek",
    phone: "0532 111 22 33",
    emergencyContact: "Ali Kaya (Oğlu)",
    emergencyPhone: "0533 444 55 66",
    accessibilityNeeds: ["Asansör önceliği", "Acil müdahale önceliği"],
    services: [
      {
        id: "s1",
        type: "Evde Sağlık",
        provider: "Aile Sağlığı Merkezi",
        frequency: "Haftada 2 kez",
        notes: "Salı ve Perşembe",
      },
    ],
    notes: "Yalnız yaşıyor, komşu ziyareti öneriliyor.",
    registeredDate: "2025-09-15",
  },
  {
    id: "2",
    name: "Mehmet Demir",
    apartment: "Daire 5",
    needType: "Engelli",
    priority: "Acil",
    phone: "0545 222 33 44",
    emergencyContact: "Ayşe Demir (Eşi)",
    emergencyPhone: "0546 777 88 99",
    accessibilityNeeds: [
      "Tekerlekli sandalye erişimi",
      "Rampa ihtiyacı",
      "Özel otopark",
    ],
    services: [
      {
        id: "s2",
        type: "Fizyoterapi",
        provider: "Özel Klinik",
        frequency: "Haftada 3 kez",
        notes: "Servis ile geliyor",
      },
    ],
    notes: "Giriş rampası hâlâ eksik, teknik ekibe bildirildi.",
    registeredDate: "2025-11-01",
  },
  {
    id: "3",
    name: "Hüseyin Arslan",
    apartment: "Daire 21",
    needType: "Kronik Hasta",
    priority: "Normal",
    phone: "0551 333 44 55",
    emergencyContact: "Zeynep Arslan (Kızı)",
    emergencyPhone: "0552 666 77 88",
    accessibilityNeeds: ["Asansör önceliği"],
    services: [],
    notes: "Kalp hastası, merdiven tırmanma önerilmiyor.",
    registeredDate: "2026-01-20",
  },
];

const NEED_COLORS: Record<NeedType, string> = {
  Engelli: "bg-blue-100 text-blue-700",
  Yaşlı: "bg-purple-100 text-purple-700",
  "Kronik Hasta": "bg-orange-100 text-orange-700",
  Diğer: "bg-gray-100 text-gray-700",
};

const PRIORITY_COLORS: Record<PriorityLevel, string> = {
  Acil: "bg-red-100 text-red-700",
  Yüksek: "bg-yellow-100 text-yellow-700",
  Normal: "bg-green-100 text-green-700",
};

const PRIORITY_ICON: Record<PriorityLevel, React.ReactElement> = {
  Acil: <AlertCircle className="w-3 h-3" />,
  Yüksek: <AlertCircle className="w-3 h-3" />,
  Normal: <CheckCircle className="w-3 h-3" />,
};

export default function DisabledElderlySupport({
  buildingId,
  isOwner,
}: { buildingId: string; isOwner: boolean; t: any }) {
  const key = `sitecore_disabled_support_${buildingId}`;
  const load = (): SupportResident[] => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_RESIDENTS;
    } catch {
      return DEFAULT_RESIDENTS;
    }
  };
  const [items, setItems] = useState<SupportResident[]>(load);
  const [filterType, setFilterType] = useState("Tümü");
  const [filterPriority, setFilterPriority] = useState("Tümü");
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    apartment: "",
    needType: "Yaşlı" as NeedType,
    priority: "Normal" as PriorityLevel,
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    accessibilityNeeds: [] as string[],
    notes: "",
  });

  const save = (data: SupportResident[]) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const filtered = items.filter((r) => {
    if (filterType !== "Tümü" && r.needType !== filterType) return false;
    if (filterPriority !== "Tümü" && r.priority !== filterPriority)
      return false;
    return true;
  });

  const detail = items.find((r) => r.id === showDetail);

  const handleAdd = () => {
    if (!form.name.trim() || !form.apartment.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        services: [],
        registeredDate: new Date().toISOString().slice(0, 10),
      },
    ]);
    setShowAdd(false);
    setForm({
      name: "",
      apartment: "",
      needType: "Yaşlı",
      priority: "Normal",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      accessibilityNeeds: [],
      notes: "",
    });
  };

  const toggleAccessibility = (opt: string) => {
    setForm((f) => ({
      ...f,
      accessibilityNeeds: f.accessibilityNeeds.includes(opt)
        ? f.accessibilityNeeds.filter((x) => x !== opt)
        : [...f.accessibilityNeeds, opt],
    }));
  };

  const handleDelete = (id: string) => save(items.filter((r) => r.id !== id));

  const acilCount = items.filter((r) => r.priority === "Acil").length;
  const yuksekCount = items.filter((r) => r.priority === "Yüksek").length;
  const serviceCount = items.reduce((acc, r) => acc + r.services.length, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0E1116]">
          Engelli & Yaşlı Destek Rehberi
        </h2>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Sakin Ekle
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-[#4A90D9]">{items.length}</p>
          <p className="text-sm text-[#3A4654] mt-1">Kayıtlı Sakin</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-red-500">{acilCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Acil Öncelik</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-yellow-500">{yuksekCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Yüksek Öncelik</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center">
          <p className="text-3xl font-bold text-green-600">{serviceCount}</p>
          <p className="text-sm text-[#3A4654] mt-1">Aktif Hizmet</p>
        </div>
      </div>

      {/* Erişilebilirlik Durumu */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100">
        <h3 className="font-semibold text-[#0E1116] mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400" />
          Bina Erişilebilirlik Durumu
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Rampa", status: "Eksik", color: "text-red-600" },
            {
              label: "Geniş Asansör",
              status: "Mevcut",
              color: "text-green-600",
            },
            { label: "Engelli WC", status: "Mevcut", color: "text-green-600" },
            {
              label: "Sesli Yönlendirme",
              status: "Yok",
              color: "text-gray-400",
            },
            {
              label: "Engelli Otopark",
              status: "2 Alan",
              color: "text-green-600",
            },
            { label: "Dokunsal Zemin", status: "Yok", color: "text-gray-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-3 flex items-center justify-between"
            >
              <span className="text-sm text-[#3A4654]">{item.label}</span>
              <span className={`text-sm font-semibold ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["Tümü", "Engelli", "Yaşlı", "Kronik Hasta", "Diğer"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilterType(t)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterType === t
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="text-[#D7DEE9] mx-1">|</span>
        {["Tümü", "Acil", "Yüksek", "Normal"].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilterPriority(p)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterPriority === p
                ? "bg-[#0B1B2E] text-white"
                : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#4A90D9]" />
                  <span className="font-semibold text-[#0E1116]">{r.name}</span>
                  <span className="text-sm text-[#6B7A8D]">{r.apartment}</span>
                  <Badge
                    className={`text-xs border-0 ${NEED_COLORS[r.needType]}`}
                  >
                    {r.needType}
                  </Badge>
                  <Badge
                    className={`text-xs border-0 flex items-center gap-1 ${PRIORITY_COLORS[r.priority]}`}
                  >
                    {PRIORITY_ICON[r.priority]}
                    {r.priority}
                  </Badge>
                </div>
                {r.phone && (
                  <div className="flex items-center gap-1 text-sm text-[#3A4654] mb-1">
                    <Phone className="w-3 h-3" /> {r.phone}
                  </div>
                )}
                {r.emergencyContact && (
                  <p className="text-sm text-[#6B7A8D]">
                    Acil: {r.emergencyContact} — {r.emergencyPhone}
                  </p>
                )}
                {r.accessibilityNeeds.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {r.accessibilityNeeds.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-[#EEF3FA] text-[#4A90D9] px-2 py-0.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                {r.services.length > 0 && (
                  <p className="text-sm text-[#3A4654] mt-1">
                    {r.services.length} aktif hizmet
                  </p>
                )}
                {r.notes && (
                  <p className="text-sm text-[#6B7A8D] mt-1 italic">
                    {r.notes}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-3">
                <Button
                  onClick={() => setShowDetail(r.id)}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                >
                  Detay
                </Button>
                {isOwner && (
                  <Button
                    onClick={() => handleDelete(r.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#3A4654] py-10">Kayıt bulunamadı.</p>
        )}
      </div>

      {/* Add Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sakin Kaydı Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Ad Soyad</p>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Daire</p>
                <Input
                  value={form.apartment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, apartment: e.target.value }))
                  }
                  placeholder="Daire 12"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">İhtiyaç Türü</p>
                <select
                  value={form.needType}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      needType: e.target.value as NeedType,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option>Yaşlı</option>
                  <option>Engelli</option>
                  <option>Kronik Hasta</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Öncelik</p>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      priority: e.target.value as PriorityLevel,
                    }))
                  }
                  className="w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
                >
                  <option>Normal</option>
                  <option>Yüksek</option>
                  <option>Acil</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium mb-1">Telefon</p>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="0500 000 00 00"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Acil İletişim Adı</p>
                <Input
                  value={form.emergencyContact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, emergencyContact: e.target.value }))
                  }
                  placeholder="İsim (yakınlık)"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Acil Telefon</p>
              <Input
                value={form.emergencyPhone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, emergencyPhone: e.target.value }))
                }
                placeholder="0500 000 00 00"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">
                Erişilebilirlik İhtiyaçları
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ACCESSIBILITY_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.accessibilityNeeds.includes(opt)}
                      onChange={() => toggleAccessibility(opt)}
                      className="rounded"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Notlar</p>
              <Input
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Ek bilgi..."
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={!form.name.trim() || !form.apartment.trim()}
              className="w-full bg-[#4A90D9] text-white rounded-full"
            >
              Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{detail?.name} — Detay</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[#6B7A8D]">Daire</p>
                  <p className="font-medium">{detail.apartment}</p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Kayıt Tarihi</p>
                  <p className="font-medium">{detail.registeredDate}</p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Telefon</p>
                  <p className="font-medium">{detail.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-[#6B7A8D]">Acil İletişim</p>
                  <p className="font-medium">
                    {detail.emergencyContact || "-"}
                  </p>
                </div>
              </div>
              {detail.accessibilityNeeds.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">
                    Erişilebilirlik İhtiyaçları
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {detail.accessibilityNeeds.map((a) => (
                      <span
                        key={a}
                        className="text-xs bg-[#EEF3FA] text-[#4A90D9] px-2 py-1 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-2">
                  Aktif Destek Hizmetleri
                </p>
                {detail.services.length === 0 ? (
                  <p className="text-sm text-[#6B7A8D]">Kayıtlı hizmet yok.</p>
                ) : (
                  <div className="space-y-2">
                    {detail.services.map((s) => (
                      <div
                        key={s.id}
                        className="bg-[#F3F6FB] rounded-xl p-3 text-sm"
                      >
                        <p className="font-medium">{s.type}</p>
                        <p className="text-[#3A4654]">
                          {s.provider} — {s.frequency}
                        </p>
                        {s.notes && (
                          <p className="text-[#6B7A8D] italic">{s.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {detail.notes && (
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-sm text-yellow-800">{detail.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
