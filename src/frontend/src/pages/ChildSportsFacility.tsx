import {
  AlertTriangle,
  Baby,
  CheckCircle,
  Clock,
  Dumbbell,
  Plus,
  Settings,
  Shield,
  Users,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Facility {
  id: string;
  name: string;
  type: "playground" | "gym" | "pool" | "court" | "park" | "other";
  status: "active" | "maintenance" | "closed";
  capacity: number;
  ageMin: number | null;
  ageMax: number | null;
  openTime: string;
  closeTime: string;
  lastMaintenance: string;
  nextMaintenance: string;
  rules: string[];
  damageReports: DamageReport[];
}

interface DamageReport {
  id: string;
  date: string;
  description: string;
  reportedBy: string;
  status: "open" | "in_progress" | "resolved";
}

const initialFacilities: Facility[] = [
  {
    id: "1",
    name: "Çocuk Oyun Alanı",
    type: "playground",
    status: "active",
    capacity: 20,
    ageMin: 3,
    ageMax: 12,
    openTime: "08:00",
    closeTime: "20:00",
    lastMaintenance: "2026-03-01",
    nextMaintenance: "2026-06-01",
    rules: [
      "3-12 yaş arası çocuklar için",
      "Ebeveyn gözetiminde kullanılmalı",
      "Gıda ve içecek getirilmez",
      "Hayvan girişi yasak",
    ],
    damageReports: [
      {
        id: "d1",
        date: "2026-03-20",
        description: "Salıncak zinciri gevşemiş",
        reportedBy: "Daire 12",
        status: "in_progress",
      },
    ],
  },
  {
    id: "2",
    name: "Fitness & Spor Salonu",
    type: "gym",
    status: "active",
    capacity: 15,
    ageMin: 16,
    ageMax: null,
    openTime: "06:00",
    closeTime: "23:00",
    lastMaintenance: "2026-02-15",
    nextMaintenance: "2026-05-15",
    rules: [
      "16 yaş ve üzeri",
      "Spor kıyafeti zorunlu",
      "Aletleri kullandıktan sonra temizle",
      "Maksimum 15 kişi kapasitesi",
    ],
    damageReports: [],
  },
  {
    id: "3",
    name: "Yüzme Havuzu",
    type: "pool",
    status: "maintenance",
    capacity: 30,
    ageMin: 5,
    ageMax: null,
    openTime: "09:00",
    closeTime: "21:00",
    lastMaintenance: "2026-03-10",
    nextMaintenance: "2026-04-10",
    rules: [
      "5 yaş altı çocuklar ebeveyn eşliğinde",
      "Mayo zorunlu",
      "Havuz etrafında koşmak yasak",
      "Yemek sonrası 1 saat bekle",
    ],
    damageReports: [
      {
        id: "d2",
        date: "2026-03-10",
        description: "Filtre sistemi arızası, temizlik yapılıyor",
        reportedBy: "Yönetim",
        status: "in_progress",
      },
    ],
  },
  {
    id: "4",
    name: "Basketbol & Tenis Kortu",
    type: "court",
    status: "active",
    capacity: 12,
    ageMin: 10,
    ageMax: null,
    openTime: "07:00",
    closeTime: "22:00",
    lastMaintenance: "2026-01-20",
    nextMaintenance: "2026-07-20",
    rules: [
      "10 yaş ve üzeri",
      "Spor ayakkabısı zorunlu",
      "Gürültü saatlerine dikkat et",
      "Ekipmanları zamanında bırak",
    ],
    damageReports: [],
  },
  {
    id: "5",
    name: "Piknik & Yeşil Alan",
    type: "park",
    status: "active",
    capacity: 50,
    ageMin: null,
    ageMax: null,
    openTime: "07:00",
    closeTime: "22:00",
    lastMaintenance: "2026-03-05",
    nextMaintenance: "2026-04-05",
    rules: [
      "Tüm sakinler kullanabilir",
      "Piknik artıklarını topla",
      "Çimlere zarar verme",
      "Barbekü izin gerektirmez",
    ],
    damageReports: [],
  },
];

const typeIcons: Record<Facility["type"], typeof Baby> = {
  playground: Baby,
  gym: Dumbbell,
  pool: Waves,
  court: Shield,
  park: Users,
  other: Settings,
};

const typeLabels: Record<Facility["type"], string> = {
  playground: "Oyun Alanı",
  gym: "Spor Salonu",
  pool: "Yüzme Havuzu",
  court: "Kort / Saha",
  park: "Park / Yeşil Alan",
  other: "Diğer",
};

const statusLabels: Record<Facility["status"], string> = {
  active: "Aktif",
  maintenance: "Bakımda",
  closed: "Kapalı",
};

const statusColors: Record<Facility["status"], string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  maintenance: "bg-yellow-100 text-yellow-700 border-yellow-200",
  closed: "bg-red-100 text-red-700 border-red-200",
};

const damageStatusLabels: Record<DamageReport["status"], string> = {
  open: "Açık",
  in_progress: "İşlemde",
  resolved: "Çözüldü",
};

const damageStatusColors: Record<DamageReport["status"], string> = {
  open: "bg-red-100 text-red-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
};

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

export default function ChildSportsFacility({ isOwner }: Props) {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [activeTab, setActiveTab] = useState<"list" | "damage" | "maintenance">(
    "list",
  );
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null,
  );
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [damageDesc, setDamageDesc] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Facility["status"]>(
    "all",
  );

  const filtered = facilities.filter(
    (f) => statusFilter === "all" || f.status === statusFilter,
  );

  const allDamageReports = facilities.flatMap((f) =>
    f.damageReports.map((r) => ({ ...r, facilityName: f.name })),
  );

  const openReports = allDamageReports.filter(
    (r) => r.status !== "resolved",
  ).length;
  const maintenanceDue = facilities.filter((f) => {
    const next = new Date(f.nextMaintenance);
    const now = new Date();
    const diff = (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).length;

  const handleStatusChange = (
    facilityId: string,
    newStatus: Facility["status"],
  ) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === facilityId ? { ...f, status: newStatus } : f)),
    );
  };

  const handleDamageReport = () => {
    if (!selectedFacility || !damageDesc.trim()) return;
    const newReport: DamageReport = {
      id: `d${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      description: damageDesc,
      reportedBy: "Sakin",
      status: "open",
    };
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === selectedFacility.id
          ? { ...f, damageReports: [...f.damageReports, newReport] }
          : f,
      ),
    );
    setDamageDesc("");
    setShowDamageModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1B2E]">
            Çocuk & Spor Tesisi Yönetimi
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Ortak tesisler, bakım takibi ve hasar bildirimleri
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-4">
            <p className="text-xs text-blue-600 font-medium">Toplam Tesis</p>
            <p className="text-2xl font-bold text-blue-700">
              {facilities.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-green-50">
          <CardContent className="p-4">
            <p className="text-xs text-green-600 font-medium">Aktif Tesis</p>
            <p className="text-2xl font-bold text-green-700">
              {facilities.filter((f) => f.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-red-50">
          <CardContent className="p-4">
            <p className="text-xs text-red-600 font-medium">Açık Hasar</p>
            <p className="text-2xl font-bold text-red-700">{openReports}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-xs text-yellow-600 font-medium">
              Bakım Yaklaşan
            </p>
            <p className="text-2xl font-bold text-yellow-700">
              {maintenanceDue}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(["list", "damage", "maintenance"] as const).map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#0B1B2E] text-[#0B1B2E]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "list" && "Tesisler"}
            {tab === "damage" &&
              `Hasar Bildirimleri ${openReports > 0 ? `(${openReports})` : ""}`}
            {tab === "maintenance" && "Bakım Takvimi"}
          </button>
        ))}
      </div>

      {/* Facilities List */}
      {activeTab === "list" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="maintenance">Bakımda</SelectItem>
                <SelectItem value="closed">Kapalı</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((facility) => {
              const Icon = typeIcons[facility.type];
              return (
                <Card key={facility.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {facility.name}
                          </CardTitle>
                          <p className="text-xs text-gray-500">
                            {typeLabels[facility.type]}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs border ${statusColors[facility.status]}`}
                      >
                        {statusLabels[facility.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Users className="w-3.5 h-3.5" />
                        <span>Max {facility.capacity} kişi</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {facility.openTime} - {facility.closeTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Baby className="w-3.5 h-3.5" />
                        <span>
                          {facility.ageMin !== null
                            ? `${facility.ageMin}+`
                            : ""}
                          {facility.ageMin !== null && facility.ageMax !== null
                            ? " - "
                            : ""}
                          {facility.ageMax !== null
                            ? `${facility.ageMax} yaş`
                            : facility.ageMin !== null
                              ? " yaş"
                              : "Tüm yaşlar"}
                        </span>
                      </div>
                      {facility.damageReports.filter(
                        (r) => r.status !== "resolved",
                      ).length > 0 && (
                        <div className="flex items-center gap-1.5 text-red-500">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>
                            {
                              facility.damageReports.filter(
                                (r) => r.status !== "resolved",
                              ).length
                            }{" "}
                            hasar
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setShowRulesModal(true);
                        }}
                      >
                        Kurallar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setShowDamageModal(true);
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Hasar Bildir
                      </Button>
                      {isOwner && (
                        <Select
                          value={facility.status}
                          onValueChange={(v) =>
                            handleStatusChange(
                              facility.id,
                              v as Facility["status"],
                            )
                          }
                        >
                          <SelectTrigger className="w-28 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="maintenance">Bakımda</SelectItem>
                            <SelectItem value="closed">Kapalı</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Damage Reports */}
      {activeTab === "damage" && (
        <div className="space-y-3">
          {allDamageReports.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <p className="text-gray-500">Açık hasar bildirimi yok</p>
              </CardContent>
            </Card>
          ) : (
            allDamageReports.map((report) => (
              <Card key={report.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-[#0B1B2E]">
                          {report.facilityName}
                        </span>
                        <Badge
                          className={`text-xs ${damageStatusColors[report.status]}`}
                        >
                          {damageStatusLabels[report.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {report.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {report.date} · {report.reportedBy}
                      </p>
                    </div>
                    {isOwner && report.status !== "resolved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setFacilities((prev) =>
                            prev.map((f) => ({
                              ...f,
                              damageReports: f.damageReports.map((r) =>
                                r.id === report.id
                                  ? {
                                      ...r,
                                      status:
                                        r.status === "open"
                                          ? "in_progress"
                                          : "resolved",
                                    }
                                  : r,
                              ),
                            })),
                          );
                        }}
                      >
                        {report.status === "open" ? "İşleme Al" : "Çözüldü"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Maintenance Schedule */}
      {activeTab === "maintenance" && (
        <div className="space-y-3">
          {facilities.map((facility) => {
            const next = new Date(facility.nextMaintenance);
            const now = new Date();
            const daysLeft = Math.ceil(
              (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
            );
            const urgent = daysLeft <= 14;
            const soon = daysLeft <= 30;
            return (
              <Card
                key={facility.id}
                className={`border-0 shadow-sm ${
                  urgent
                    ? "border-l-4 border-l-red-400"
                    : soon
                      ? "border-l-4 border-l-yellow-400"
                      : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-[#0B1B2E]">
                        {facility.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Son bakım: {facility.lastMaintenance}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          urgent
                            ? "text-red-600"
                            : soon
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {daysLeft <= 0 ? "Gecikti" : `${daysLeft} gün`}
                      </p>
                      <p className="text-xs text-gray-400">
                        Sonraki: {facility.nextMaintenance}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Rules Modal */}
      <Dialog open={showRulesModal} onOpenChange={setShowRulesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedFacility?.name} -- Kullanım Kuralları
            </DialogTitle>
          </DialogHeader>
          <ul className="space-y-2">
            {selectedFacility?.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      {/* Damage Report Modal */}
      <Dialog open={showDamageModal} onOpenChange={setShowDamageModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedFacility?.name} -- Hasar Bildir</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Gördüğünüz hasarı veya arızayı kısaca açıklayın.
            </p>
            <Input
              placeholder="Hasar açıklaması..."
              value={damageDesc}
              onChange={(e) => setDamageDesc(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDamageModal(false)}
              >
                İptal
              </Button>
              <Button
                onClick={handleDamageReport}
                disabled={!damageDesc.trim()}
                className="bg-[#0B1B2E] text-white"
              >
                Gönder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
