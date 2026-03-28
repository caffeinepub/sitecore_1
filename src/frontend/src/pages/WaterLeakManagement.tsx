import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Droplets,
  TrendingDown,
  TrendingUp,
  Wrench,
  XCircle,
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
import { Progress } from "../components/ui/progress";

interface LeakReport {
  id: string;
  location: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "investigating" | "repaired" | "closed";
  reportedBy: string;
  reportedDate: string;
  resolvedDate?: string;
  estimatedLoss: number;
  description: string;
}

interface MonthlyConsumption {
  month: string;
  total: number;
  common: number;
  average: number;
  change: number;
}

interface ApartmentUsage {
  unit: string;
  resident: string;
  currentMonth: number;
  lastMonth: number;
  status: "normal" | "high" | "very_high" | "suspicious";
}

const leakReports: LeakReport[] = [
  {
    id: "L001",
    location: "Bodrum Kat - Su Deposu",
    type: "Depo Sızıntısı",
    severity: "critical",
    status: "investigating",
    reportedBy: "Ahmet Yılmaz",
    reportedDate: "2026-03-15",
    estimatedLoss: 250,
    description:
      "Su deposunda ciddi sızıntı tespit edildi, acil müdahale gerekiyor.",
  },
  {
    id: "L002",
    location: "4. Kat - Ortak Koridor",
    type: "Boru Patlaması",
    severity: "high",
    status: "repaired",
    reportedBy: "Fatma Kaya",
    reportedDate: "2026-03-10",
    resolvedDate: "2026-03-12",
    estimatedLoss: 80,
    description: "Koridor borusunda patlama, hızlı müdahale ile onarıldı.",
  },
  {
    id: "L003",
    location: "Çatı - Yağmur Suyu Hattı",
    type: "İzolasyon Sorunu",
    severity: "medium",
    status: "open",
    reportedBy: "Mehmet Demir",
    reportedDate: "2026-03-20",
    estimatedLoss: 45,
    description: "Çatı yağmur suyu hattında izolasyon bozukluğu.",
  },
  {
    id: "L004",
    location: "Bahçe - Sulama Hattı",
    type: "Boru Kırığı",
    severity: "low",
    status: "closed",
    reportedBy: "Yönetim",
    reportedDate: "2026-03-05",
    resolvedDate: "2026-03-07",
    estimatedLoss: 20,
    description: "Bahçe sulama hattında küçük kırık tespit edildi ve onarıldı.",
  },
  {
    id: "L005",
    location: "1. Kat - Daire 103",
    type: "Musluk Sızıntısı",
    severity: "low",
    status: "investigating",
    reportedBy: "Zeynep Arslan",
    reportedDate: "2026-03-22",
    estimatedLoss: 15,
    description: "Daire mutfak musluğunda sızıntı bildirildi.",
  },
];

const monthlyData: MonthlyConsumption[] = [
  { month: "Nis 2025", total: 420, common: 85, average: 8.4, change: 0 },
  { month: "May 2025", total: 438, common: 92, average: 8.76, change: 4.3 },
  { month: "Haz 2025", total: 510, common: 105, average: 10.2, change: 16.4 },
  { month: "Tem 2025", total: 548, common: 112, average: 10.96, change: 7.5 },
  { month: "Ağu 2025", total: 532, common: 108, average: 10.64, change: -2.9 },
  { month: "Eyl 2025", total: 465, common: 95, average: 9.3, change: -12.6 },
  { month: "Eki 2025", total: 430, common: 88, average: 8.6, change: -7.5 },
  { month: "Kas 2025", total: 415, common: 82, average: 8.3, change: -3.5 },
  { month: "Ara 2025", total: 408, common: 80, average: 8.16, change: -1.7 },
  { month: "Oca 2026", total: 395, common: 78, average: 7.9, change: -3.2 },
  { month: "Şub 2026", total: 402, common: 80, average: 8.04, change: 1.8 },
  { month: "Mar 2026", total: 428, common: 87, average: 8.56, change: 6.5 },
];

const apartmentUsage: ApartmentUsage[] = [
  {
    unit: "D-101",
    resident: "Ahmet Yılmaz",
    currentMonth: 6.2,
    lastMonth: 5.8,
    status: "normal",
  },
  {
    unit: "D-102",
    resident: "Fatma Kaya",
    currentMonth: 18.5,
    lastMonth: 7.2,
    status: "suspicious",
  },
  {
    unit: "D-103",
    resident: "Mehmet Demir",
    currentMonth: 8.1,
    lastMonth: 7.9,
    status: "normal",
  },
  {
    unit: "D-104",
    resident: "Zeynep Arslan",
    currentMonth: 9.3,
    lastMonth: 8.5,
    status: "normal",
  },
  {
    unit: "D-201",
    resident: "Ali Çelik",
    currentMonth: 14.2,
    lastMonth: 8.1,
    status: "very_high",
  },
  {
    unit: "D-202",
    resident: "Ayşe Şahin",
    currentMonth: 7.6,
    lastMonth: 7.4,
    status: "normal",
  },
  {
    unit: "D-203",
    resident: "Hasan Öztürk",
    currentMonth: 7.9,
    lastMonth: 8.2,
    status: "normal",
  },
  {
    unit: "D-204",
    resident: "Emine Yıldız",
    currentMonth: 12.1,
    lastMonth: 7.8,
    status: "high",
  },
  {
    unit: "D-301",
    resident: "İbrahim Koç",
    currentMonth: 6.8,
    lastMonth: 6.5,
    status: "normal",
  },
  {
    unit: "D-302",
    resident: "Hatice Doğan",
    currentMonth: 7.2,
    lastMonth: 7.0,
    status: "normal",
  },
];

const SEVERITY_LABELS: Record<string, string> = {
  critical: "Kritik",
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
};

const STATUS_LABELS: Record<string, string> = {
  open: "Açık",
  investigating: "İnceleniyor",
  repaired: "Onarıldı",
  closed: "Kapatıldı",
};

const USAGE_STATUS_LABELS: Record<string, string> = {
  normal: "Normal",
  high: "Yüksek",
  very_high: "Çok Yüksek",
  suspicious: "Şüpheli",
};

function severityColor(s: string) {
  if (s === "critical") return "bg-red-100 text-red-700";
  if (s === "high") return "bg-orange-100 text-orange-700";
  if (s === "medium") return "bg-yellow-100 text-yellow-700";
  return "bg-blue-100 text-blue-700";
}

function statusColor(s: string) {
  if (s === "open") return "bg-red-100 text-red-700";
  if (s === "investigating") return "bg-yellow-100 text-yellow-700";
  if (s === "repaired") return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-600";
}

function usageStatusColor(s: string) {
  if (s === "suspicious") return "bg-red-100 text-red-700";
  if (s === "very_high") return "bg-orange-100 text-orange-700";
  if (s === "high") return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}

const maxConsumption = Math.max(...monthlyData.map((m) => m.total));

export default function WaterLeakManagement() {
  const [activeTab, setActiveTab] = useState<
    "consumption" | "leaks" | "apartments"
  >("consumption");
  const [showNewReportForm, setShowNewReportForm] = useState(false);

  const openLeaks = leakReports.filter(
    (r) => r.status === "open" || r.status === "investigating",
  ).length;
  const totalLoss = leakReports.reduce((s, r) => s + r.estimatedLoss, 0);
  const latestMonth = monthlyData[monthlyData.length - 1];
  const suspiciousCount = apartmentUsage.filter(
    (a) => a.status === "suspicious" || a.status === "very_high",
  ).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Su Tüketimi & Kaçak Takibi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Bina su tüketimi analizi, kaçak tespiti ve daire bazlı izleme
          </p>
        </div>
        <Button
          onClick={() => setShowNewReportForm(!showNewReportForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Droplets className="w-4 h-4 mr-2" />
          Kaçak Bildir
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Bu Ay Toplam</p>
                <p className="text-xl font-bold text-gray-800">
                  {latestMonth.total} m³
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Aktif Kaçak</p>
                <p className="text-xl font-bold text-gray-800">{openLeaks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Şüpheli Daire</p>
                <p className="text-xl font-bold text-gray-800">
                  {suspiciousCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Tahmini Kayıp</p>
                <p className="text-xl font-bold text-gray-800">
                  {totalLoss} m³
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Report Form */}
      {showNewReportForm && (
        <Card className="border-0 shadow-sm border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-base">Yeni Kaçak Bildirimi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="loc-input"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Konum
                </label>
                <input
                  id="loc-input"
                  type="text"
                  placeholder="Örn: 3. Kat Koridor"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="type-select"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Kaçak Türü
                </label>
                <select
                  id="type-select"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Boru Sızıntısı</option>
                  <option>Musluk Arızası</option>
                  <option>Depo Sızıntısı</option>
                  <option>İzolasyon Sorunu</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sev-select"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Aciliyet
                </label>
                <select
                  id="sev-select"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option>Düşük</option>
                  <option>Orta</option>
                  <option>Yüksek</option>
                  <option>Kritik</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="desc-input"
                  className="text-sm font-medium text-gray-700 block mb-1"
                >
                  Açıklama
                </label>
                <input
                  id="desc-input"
                  type="text"
                  placeholder="Kısa açıklama..."
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Bildir
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewReportForm(false)}
              >
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(["consumption", "leaks", "apartments"] as const).map((tab) => {
          const labels = {
            consumption: "📊 Aylık Tüketim",
            leaks: "💧 Kaçak Raporları",
            apartments: "🏠 Daire Analizi",
          };
          return (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
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

      {activeTab === "consumption" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                12 Aylık Su Tüketimi (m³)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {monthlyData.map((m) => (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 shrink-0">
                      {m.month}
                    </span>
                    <div className="flex-1">
                      <div className="flex gap-1">
                        <div
                          className="h-5 rounded bg-blue-400 flex items-center px-2 text-white text-xs font-medium transition-all"
                          style={{
                            width: `${(m.common / maxConsumption) * 100}%`,
                            minWidth: 32,
                          }}
                        >
                          {m.common}
                        </div>
                        <div
                          className="h-5 rounded bg-blue-200 flex items-center px-2 text-blue-700 text-xs font-medium transition-all"
                          style={{
                            width: `${((m.total - m.common) / maxConsumption) * 100}%`,
                            minWidth: 32,
                          }}
                        >
                          {m.total - m.common}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 w-20 justify-end">
                      <span className="text-xs font-medium text-gray-700">
                        {m.total} m³
                      </span>
                      {m.change > 0 ? (
                        <TrendingUp className="w-3 h-3 text-red-500" />
                      ) : m.change < 0 ? (
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-400" />
                  <span className="text-xs text-gray-500">Ortak Alan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-200" />
                  <span className="text-xs text-gray-500">Daireler</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500">Yıllık Toplam</p>
                <p className="text-2xl font-bold text-blue-600">
                  {monthlyData.reduce((s, m) => s + m.total, 0)} m³
                </p>
                <p className="text-xs text-gray-400 mt-1">Son 12 ay</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500">Aylık Ortalama</p>
                <p className="text-2xl font-bold text-green-600">
                  {(monthlyData.reduce((s, m) => s + m.total, 0) / 12).toFixed(
                    0,
                  )}{" "}
                  m³
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Daire başına {latestMonth.average} m³
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-gray-500">Ortak Alan Oranı</p>
                <p className="text-2xl font-bold text-orange-600">
                  {((latestMonth.common / latestMonth.total) * 100).toFixed(0)}%
                </p>
                <Progress
                  value={(latestMonth.common / latestMonth.total) * 100}
                  className="mt-2 h-1.5"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "leaks" && (
        <div className="space-y-3">
          {leakReports.map((report) => (
            <Card key={report.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        report.status === "closed" ||
                        report.status === "repaired"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {report.status === "closed" ||
                      report.status === "repaired" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-gray-800">
                          {report.location}
                        </span>
                        <Badge
                          className={`text-xs ${severityColor(report.severity)}`}
                        >
                          {SEVERITY_LABELS[report.severity]}
                        </Badge>
                        <Badge
                          className={`text-xs ${statusColor(report.status)}`}
                        >
                          {STATUS_LABELS[report.status]}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.type} — {report.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {report.reportedDate}
                        </span>
                        {report.resolvedDate && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" /> Onarıldı:{" "}
                            {report.resolvedDate}
                          </span>
                        )}
                        <span>Bildiren: {report.reportedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">Tahmini Kayıp</p>
                    <p className="text-sm font-bold text-red-600">
                      {report.estimatedLoss} m³
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "apartments" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-xs text-red-600">Şüpheli/Çok Yüksek</p>
                    <p className="text-2xl font-bold text-red-700">
                      {
                        apartmentUsage.filter(
                          (a) =>
                            a.status === "suspicious" ||
                            a.status === "very_high",
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-xs text-yellow-600">Yüksek Tüketim</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {apartmentUsage.filter((a) => a.status === "high").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-green-600">Normal Tüketim</p>
                    <p className="text-2xl font-bold text-green-700">
                      {
                        apartmentUsage.filter((a) => a.status === "normal")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                Daire Bazlı Su Tüketimi (m³)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apartmentUsage
                  .sort((a, b) => b.currentMonth - a.currentMonth)
                  .map((apt) => (
                    <div key={apt.unit} className="flex items-center gap-4">
                      <div className="w-14 text-xs font-medium text-gray-700 shrink-0">
                        {apt.unit}
                      </div>
                      <div className="w-28 text-xs text-gray-500 shrink-0 truncate">
                        {apt.resident}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={(apt.currentMonth / 20) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-800 w-12 text-right shrink-0">
                        {apt.currentMonth} m³
                      </div>
                      <div className="w-12 text-right shrink-0">
                        {apt.currentMonth > apt.lastMonth ? (
                          <span className="text-xs text-red-500 flex items-center justify-end gap-0.5">
                            <TrendingUp className="w-3 h-3" />+
                            {(apt.currentMonth - apt.lastMonth).toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-xs text-green-500 flex items-center justify-end gap-0.5">
                            <TrendingDown className="w-3 h-3" />
                            {(apt.currentMonth - apt.lastMonth).toFixed(1)}
                          </span>
                        )}
                      </div>
                      <Badge
                        className={`text-xs shrink-0 ${usageStatusColor(apt.status)}`}
                      >
                        {USAGE_STATUS_LABELS[apt.status]}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
