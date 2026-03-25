import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Search,
  Settings,
  Shield,
  Thermometer,
  Wind,
  Wrench,
  X,
  Zap,
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

interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNo: string;
  installDate: string;
  warrantyEnd: string;
  lastService: string;
  nextService: string;
  status: "active" | "maintenance" | "faulty" | "inactive";
  location: string;
  serviceHistory: ServiceRecord[];
  notes: string;
}

interface ServiceRecord {
  date: string;
  type: string;
  technician: string;
  cost: number;
  notes: string;
}

const CATEGORIES = [
  { key: "all", label: "Tümü", icon: Settings },
  { key: "elevator", label: "Asansör", icon: Zap },
  { key: "heating", label: "Isıtma", icon: Thermometer },
  { key: "fire", label: "Yangın Sistemi", icon: Shield },
  { key: "hvac", label: "Havalandırma", icon: Wind },
  { key: "pump", label: "Pompa & Su", icon: Settings },
  { key: "generator", label: "Jeneratör", icon: Zap },
  { key: "other", label: "Diğer", icon: Wrench },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-100 text-green-700" },
  maintenance: { label: "Bakımda", color: "bg-yellow-100 text-yellow-700" },
  faulty: { label: "Arızalı", color: "bg-red-100 text-red-700" },
  inactive: { label: "Pasif", color: "bg-gray-100 text-gray-600" },
};

const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "1",
    name: "A Blok Asansörü",
    category: "elevator",
    brand: "Otis",
    model: "GEN2 Comfort",
    serialNo: "OT-2019-4521",
    installDate: "2019-03-15",
    warrantyEnd: "2024-03-15",
    lastService: "2026-01-10",
    nextService: "2026-04-10",
    status: "active",
    location: "A Blok Giriş",
    notes: "6 kişilik kapasite",
    serviceHistory: [
      {
        date: "2026-01-10",
        type: "Periyodik Bakım",
        technician: "Otis Servis",
        cost: 1800,
        notes: "Yağlama, makara kontrolü",
      },
      {
        date: "2025-10-05",
        type: "Arıza Onarım",
        technician: "Otis Servis",
        cost: 2400,
        notes: "Kapı sensörü değişimi",
      },
      {
        date: "2025-07-12",
        type: "Periyodik Bakım",
        technician: "Otis Servis",
        cost: 1800,
        notes: "Genel bakım",
      },
    ],
  },
  {
    id: "2",
    name: "Merkezi Isıtma Kazanı",
    category: "heating",
    brand: "Vaillant",
    model: "EcoTec Plus 35",
    serialNo: "VL-2020-8834",
    installDate: "2020-09-01",
    warrantyEnd: "2025-09-01",
    lastService: "2025-11-20",
    nextService: "2026-05-20",
    status: "active",
    location: "Kazan Dairesi B1",
    notes: "35 kW kapasiteli",
    serviceHistory: [
      {
        date: "2025-11-20",
        type: "Yıllık Bakım",
        technician: "Vaillant Yetkili",
        cost: 3200,
        notes: "Filtre değişimi, verim testi",
      },
      {
        date: "2025-03-15",
        type: "Sezon Kapanış",
        technician: "Vaillant Yetkili",
        cost: 800,
        notes: "Sistem durdurma",
      },
    ],
  },
  {
    id: "3",
    name: "Yangın Alarm Sistemi",
    category: "fire",
    brand: "Hochiki",
    model: "PF-Series",
    serialNo: "HK-2021-1123",
    installDate: "2021-06-10",
    warrantyEnd: "2026-06-10",
    lastService: "2025-12-01",
    nextService: "2026-03-01",
    status: "active",
    location: "Tüm Katlar",
    notes: "48 duman dedektörü, 12 zon",
    serviceHistory: [
      {
        date: "2025-12-01",
        type: "3 Aylık Test",
        technician: "Güvenlik A.Ş.",
        cost: 600,
        notes: "Tüm dedektörler test edildi",
      },
      {
        date: "2025-09-01",
        type: "3 Aylık Test",
        technician: "Güvenlik A.Ş.",
        cost: 600,
        notes: "2 dedektör değişimi",
      },
    ],
  },
  {
    id: "4",
    name: "Hidrofor Pompası",
    category: "pump",
    brand: "Grundfos",
    model: "CM 10-3",
    serialNo: "GF-2022-5567",
    installDate: "2022-01-20",
    warrantyEnd: "2025-01-20",
    lastService: "2025-08-15",
    nextService: "2026-02-15",
    status: "maintenance",
    location: "Su Deposu Bodrum",
    notes: "Basınç artırma pompası",
    serviceHistory: [
      {
        date: "2025-08-15",
        type: "Arıza Bakım",
        technician: "Grundfos Servis",
        cost: 4500,
        notes: "Salmastra değişimi",
      },
    ],
  },
  {
    id: "5",
    name: "Dizel Jeneratör",
    category: "generator",
    brand: "Aksa",
    model: "APD-100",
    serialNo: "AK-2020-2299",
    installDate: "2020-04-05",
    warrantyEnd: "2023-04-05",
    lastService: "2025-10-20",
    nextService: "2026-04-20",
    status: "active",
    location: "Jeneratör Odası",
    notes: "100 kVA, otomatik devreye girme",
    serviceHistory: [
      {
        date: "2025-10-20",
        type: "6 Aylık Bakım",
        technician: "Aksa Yetkili",
        cost: 5200,
        notes: "Yağ, filtre değişimi, yük testi",
      },
    ],
  },
  {
    id: "6",
    name: "Havalandırma Ünitesi",
    category: "hvac",
    brand: "Daikin",
    model: "VRV-IV",
    serialNo: "DK-2023-7710",
    installDate: "2023-05-15",
    warrantyEnd: "2026-05-15",
    lastService: "2025-09-01",
    nextService: "2026-03-01",
    status: "faulty",
    location: "Çatı Kat",
    notes: "Ortak alan havalandırması",
    serviceHistory: [
      {
        date: "2025-09-01",
        type: "Mevsimlik Bakım",
        technician: "Daikin Servis",
        cost: 2800,
        notes: "Filtre temizliği",
      },
    ],
  },
];

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

export default function FacilityEquipment({ isOwner }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );
  const [showAdd, setShowAdd] = useState(false);

  const filtered = MOCK_EQUIPMENT.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || e.category === category;
    return matchSearch && matchCat;
  });

  const stats = {
    total: MOCK_EQUIPMENT.length,
    active: MOCK_EQUIPMENT.filter((e) => e.status === "active").length,
    maintenance: MOCK_EQUIPMENT.filter((e) => e.status === "maintenance")
      .length,
    faulty: MOCK_EQUIPMENT.filter((e) => e.status === "faulty").length,
  };

  // Days until next service
  const getDaysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const isWarrantyExpired = (dateStr: string) => new Date(dateStr) < new Date();
  const isServiceDue = (dateStr: string) => getDaysUntil(dateStr) <= 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1B2E]">
            Tesis & Ekipman Envanteri
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kritik ekipmanların teknik bilgileri ve bakım geçmişi
          </p>
        </div>
        {isOwner && (
          <Button
            onClick={() => setShowAdd(true)}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Ekipman Ekle
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-[#0B1B2E]">{stats.total}</div>
          <div className="text-sm text-gray-500">Toplam Ekipman</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.active}
          </div>
          <div className="text-sm text-gray-500">Aktif</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.maintenance}
          </div>
          <div className="text-sm text-gray-500">Bakımda</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.faulty}</div>
          <div className="text-sm text-gray-500">Arızalı</div>
        </div>
      </div>

      {/* Alerts */}
      {MOCK_EQUIPMENT.some(
        (e) => isServiceDue(e.nextService) || e.status === "faulty",
      ) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-amber-800">
              Dikkat Gerektiren Ekipmanlar
            </span>
          </div>
          <div className="space-y-1">
            {MOCK_EQUIPMENT.filter((e) => e.status === "faulty").map((e) => (
              <div key={e.id} className="text-sm text-amber-700">
                ⚠ {e.name} — Arızalı durumda
              </div>
            ))}
            {MOCK_EQUIPMENT.filter(
              (e) => isServiceDue(e.nextService) && e.status !== "faulty",
            ).map((e) => (
              <div key={e.id} className="text-sm text-amber-700">
                🔔 {e.name} — Bakım tarihi: {e.nextService} (
                {getDaysUntil(e.nextService)} gün)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Ekipman veya marka ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  category === cat.key
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="grid gap-4">
        {filtered.map((eq) => (
          <button
            type="button"
            key={eq.id}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow w-full text-left"
            onClick={() => setSelectedEquipment(eq)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-[#0B1B2E]">{eq.name}</h3>
                  <Badge
                    className={`text-xs ${STATUS_CONFIG[eq.status].color} border-0`}
                  >
                    {STATUS_CONFIG[eq.status].label}
                  </Badge>
                  {isWarrantyExpired(eq.warrantyEnd) && (
                    <Badge className="text-xs bg-orange-100 text-orange-700 border-0">
                      Garanti Bitti
                    </Badge>
                  )}
                  {isServiceDue(eq.nextService) && (
                    <Badge className="text-xs bg-blue-100 text-blue-700 border-0">
                      Bakım Yakın
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {eq.brand} {eq.model} • S/N: {eq.serialNo}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  📍 {eq.location}
                </div>
              </div>
              <div className="text-right text-sm space-y-1">
                <div className="text-gray-500">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Son bakım:{" "}
                  <span className="font-medium text-[#0B1B2E]">
                    {eq.lastService}
                  </span>
                </div>
                <div className="text-gray-500">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Sonraki:{" "}
                  <span
                    className={`font-medium ${isServiceDue(eq.nextService) ? "text-red-600" : "text-green-600"}`}
                  >
                    {eq.nextService}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Ekipman bulunamadı</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEquipment && (
        <Dialog
          open={!!selectedEquipment}
          onOpenChange={() => setSelectedEquipment(null)}
        >
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedEquipment.name}
                <Badge
                  className={`text-xs ${STATUS_CONFIG[selectedEquipment.status].color} border-0`}
                >
                  {STATUS_CONFIG[selectedEquipment.status].label}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Marka / Model
                  </div>
                  <div className="font-semibold">
                    {selectedEquipment.brand} {selectedEquipment.model}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Seri No</div>
                  <div className="font-semibold">
                    {selectedEquipment.serialNo}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Kurulum Tarihi
                  </div>
                  <div className="font-semibold">
                    {selectedEquipment.installDate}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Garanti Bitiş
                  </div>
                  <div
                    className={`font-semibold ${isWarrantyExpired(selectedEquipment.warrantyEnd) ? "text-red-600" : "text-green-600"}`}
                  >
                    {selectedEquipment.warrantyEnd}{" "}
                    {isWarrantyExpired(selectedEquipment.warrantyEnd)
                      ? "(Sona Erdi)"
                      : "(Aktif)"}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Konum</div>
                  <div className="font-semibold">
                    {selectedEquipment.location}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    Sonraki Bakım
                  </div>
                  <div
                    className={`font-semibold ${isServiceDue(selectedEquipment.nextService) ? "text-red-600" : "text-[#0B1B2E]"}`}
                  >
                    {selectedEquipment.nextService}
                  </div>
                </div>
              </div>
              {selectedEquipment.notes && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1 font-medium">
                    Notlar
                  </div>
                  <div className="text-sm">{selectedEquipment.notes}</div>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-[#0B1B2E] mb-3">
                  Servis Geçmişi
                </h4>
                <div className="space-y-3">
                  {selectedEquipment.serviceHistory.map((rec) => (
                    <div
                      key={`${rec.date}-${rec.type}`}
                      className="border border-gray-100 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{rec.type}</span>
                        <span className="text-sm text-gray-500">
                          {rec.date}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Teknisyen: {rec.technician}
                      </div>
                      <div className="text-sm text-gray-600">
                        Maliyet:{" "}
                        <span className="font-semibold text-green-700">
                          {rec.cost.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                      {rec.notes && (
                        <div className="text-sm text-gray-500 mt-1 italic">
                          {rec.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Modal placeholder */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Ekipman Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label htmlFor="eq-name" className="text-sm font-medium">
                Ekipman Adı
              </label>
              <Input
                id="eq-name"
                placeholder="örn: B Blok Asansörü"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="eq-brand" className="text-sm font-medium">
                Marka
              </label>
              <Input id="eq-brand" placeholder="Marka adı" className="mt-1" />
            </div>
            <div>
              <label htmlFor="eq-model" className="text-sm font-medium">
                Model
              </label>
              <Input id="eq-model" placeholder="Model" className="mt-1" />
            </div>
            <div>
              <label htmlFor="eq-location" className="text-sm font-medium">
                Konum
              </label>
              <Input
                id="eq-location"
                placeholder="Ekipmanın bulunduğu yer"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                onClick={() => setShowAdd(false)}
              >
                Kaydet
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAdd(false)}
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
