import {
  AlertTriangle,
  Calendar,
  Clock,
  DollarSign,
  Download,
  FileSpreadsheet,
  Home,
  Package,
  Printer,
  SmilePlus,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface Props {
  buildingId: string;
  t: any;
}

const DATE_RANGES = [
  { key: "month", label: "Bu Ay" },
  { key: "3months", label: "Son 3 Ay" },
  { key: "6months", label: "Son 6 Ay" },
  { key: "year", label: "Bu Yıl" },
];

const MONTHLY_DUES_DATA = [
  { ay: "Nis", tahsilat: 18500, hedef: 22000 },
  { ay: "May", tahsilat: 21000, hedef: 22000 },
  { ay: "Haz", tahsilat: 19800, hedef: 22000 },
  { ay: "Tem", tahsilat: 20500, hedef: 22000 },
  { ay: "Аğu", tahsilat: 17200, hedef: 22000 },
  { ay: "Eyl", tahsilat: 21800, hedef: 22000 },
  { ay: "Eki", tahsilat: 22000, hedef: 22000 },
  { ay: "Kas", tahsilat: 19600, hedef: 22000 },
  { ay: "Ara", tahsilat: 20900, hedef: 22000 },
  { ay: "Oca", tahsilat: 21400, hedef: 22000 },
  { ay: "Şub", tahsilat: 18700, hedef: 22000 },
  { ay: "Mar", tahsilat: 22000, hedef: 22000 },
];

const INCOME_EXPENSE_DATA = [
  { ay: "Oca", gelir: 28000, gider: 19500 },
  { ay: "Şub", gelir: 26500, gider: 22000 },
  { ay: "Mar", gelir: 29000, gider: 18000 },
  { ay: "Nis", gelir: 27000, gider: 21000 },
  { ay: "May", gelir: 31000, gider: 23500 },
  { ay: "Haz", gelir: 28500, gider: 20000 },
];

const AGING_DATA = [
  { name: "0-30 Gün", value: 8, color: "#22c55e" },
  { name: "31-60 Gün", value: 4, color: "#F2A23A" },
  { name: "60+ Gün", value: 2, color: "#ef4444" },
];

const MAINTENANCE_DONUT_DATA = [
  { name: "Tamamlanan", value: 68, color: "#22c55e" },
  { name: "Devam Eden", value: 22, color: "#F2A23A" },
  { name: "Bekleyen", value: 10, color: "#ef4444" },
];

const OCCUPANCY_DATA = [
  { ay: "Eki", dolu: 38, bos: 2 },
  { ay: "Kas", dolu: 37, bos: 3 },
  { ay: "Ara", dolu: 39, bos: 1 },
  { ay: "Oca", dolu: 38, bos: 2 },
  { ay: "Şub", dolu: 40, bos: 0 },
  { ay: "Mar", dolu: 39, bos: 1 },
];

const PERIOD_COMPARISON_DATA = [
  { metrik: "Tahsilat %", buDonem: 94.5, gecenDonem: 92.4 },
  { metrik: "Bakım %", buDonem: 68, gecenDonem: 61 },
  { metrik: "Şikayet", buDonem: 7, gecenDonem: 11 },
  { metrik: "İş Emri", buDonem: 12, gecenDonem: 15 },
  { metrik: "Ziyaretçi", buDonem: 127, gecenDonem: 113 },
  { metrik: "Doluluk %", buDonem: 97.5, gecenDonem: 95 },
];

const STAFF_PERFORMANCE_DATA = [
  {
    ad: "Ahmet Y.",
    gorev: "Teknik",
    tamamlanan: 24,
    ortSure: "2.1 gün",
    puan: 4.7,
  },
  {
    ad: "Mehmet K.",
    gorev: "Temizlik",
    tamamlanan: 31,
    ortSure: "0.5 gün",
    puan: 4.4,
  },
  {
    ad: "Ayşe D.",
    gorev: "Güvenlik",
    tamamlanan: 18,
    ortSure: "1.2 gün",
    puan: 3.9,
  },
  {
    ad: "Fatma S.",
    gorev: "Yönetim",
    tamamlanan: 42,
    ortSure: "3.0 gün",
    puan: 4.8,
  },
  {
    ad: "Can T.",
    gorev: "Bahçe",
    tamamlanan: 15,
    ortSure: "1.8 gün",
    puan: 3.2,
  },
];

const TEMPLATES = [
  {
    key: "finansal",
    title: "Aylık Finansal Özet",
    desc: "Aidat tahsilatı, gelir-gider ve borç yaşlandırma",
    icon: DollarSign,
    color: "text-green-600",
    rows: [
      ["Toplam Aidat Hedefi", "₺22.000"],
      ["Tahsilat (Bu Ay)", "₺22.000"],
      ["Tahsilat Oranı", "%100"],
      ["Toplam Gider", "₺18.400"],
      ["Net Bakiye", "₺3.600"],
      ["Geciken Ödeme (Daire)", "14"],
    ],
  },
  {
    key: "teknik",
    title: "Teknik Durum Raporu",
    desc: "Bakım tamamlanma, arıza çözüm süreleri ve ekipman durumu",
    icon: Wrench,
    color: "text-orange-600",
    rows: [
      ["Toplam Arıza Talebi", "28"],
      ["Tamamlanan", "19 (%68)"],
      ["Devam Eden", "6 (%22)"],
      ["Bekleyen", "3 (%10)"],
      ["Ort. Çözüm Süresi", "4.2 gün"],
      ["Geciken Bakım", "3"],
    ],
  },
  {
    key: "memnuniyet",
    title: "Sakin Memnuniyet Raporu",
    desc: "NPS skoru, kategori memnuniyeti ve geri bildirim özeti",
    icon: Users,
    color: "text-blue-600",
    rows: [
      ["NPS Skoru", "72/100"],
      ["Toplam Geri Bildirim", "34"],
      ["Ortalama Puan", "4.1/5"],
      ["Çözüm Oranı", "%87"],
      ["Aktif Şikayet", "7"],
      ["Ort. Yanıt Süresi", "4.2 saat"],
    ],
  },
];

interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  trend?: "up" | "down" | null;
  trendValue?: string;
  trendColor?: "green" | "red" | "orange";
}

function KPICard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  trendValue,
  trendColor,
}: KPICardProps) {
  const tc =
    trendColor === "orange"
      ? "text-orange-500"
      : trend === "up"
        ? "text-green-600"
        : "text-red-500";
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        {trend && trendValue && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${tc}`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trendValue}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#0E1116]">{value}</p>
      <p className="text-xs text-[#6B7A8D] mt-1">{label}</p>
    </div>
  );
}

export default function ReportingCenter({ buildingId, t: _t }: Props) {
  const [dateRange, setDateRange] = useState("month");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [exportModal, setExportModal] = useState(false);
  const [exportTemplate, setExportTemplate] = useState<
    (typeof TEMPLATES)[0] | null
  >(null);

  const apartments = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(`sitecore_apartments_${buildingId}`) || "[]",
      );
    } catch {
      return [];
    }
  })();

  const packages = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(`sitecore_packages_${buildingId}`) || "[]",
      );
    } catch {
      return [];
    }
  })();

  const totalApartments = apartments.length || 40;
  const occupiedApartments =
    apartments.filter((a: any) => a.status === "occupied").length || 39;
  const pendingPackages =
    packages.filter((p: any) => p.status === "pending").length || 3;

  const openExport = (tpl: (typeof TEMPLATES)[0]) => {
    setExportTemplate(tpl);
    setExportModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#0E1116]">
            Raporlama & Analitik Merkezi
          </h2>
          <p className="text-sm text-[#6B7A8D] mt-0.5">
            Bina performans özeti ve detaylı analizler
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date range quick filter */}
          <div className="flex gap-1 bg-[#F3F6FB] rounded-full p-1">
            {DATE_RANGES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setDateRange(r.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  dateRange === r.key
                    ? "bg-[#0B1B2E] text-white"
                    : "text-[#6B7A8D] hover:text-[#0E1116]"
                }`}
                data-ocid="reporting.tab"
              >
                {r.label}
              </button>
            ))}
          </div>
          {/* Custom date range */}
          <div className="flex items-center gap-1 border border-[#E5EAF2] rounded-full px-3 py-1.5 bg-white">
            <Calendar className="w-3.5 h-3.5 text-[#6B7A8D]" />
            <input
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="text-xs text-[#3A4654] bg-transparent outline-none w-28"
              data-ocid="reporting.input"
            />
            <span className="text-xs text-[#6B7A8D]">-</span>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="text-xs text-[#3A4654] bg-transparent outline-none w-28"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full border-[#E5EAF2]"
            onClick={() => window.print()}
            data-ocid="reporting.primary_button"
          >
            <Printer className="w-4 h-4" />
            Yazdır
          </Button>
          <Button
            size="sm"
            className="gap-2 rounded-full bg-[#0B1B2E] text-white"
            onClick={() => {
              setExportTemplate(null);
              setExportModal(true);
            }}
            data-ocid="reporting.secondary_button"
          >
            <Download className="w-4 h-4" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid sm:grid-cols-3 gap-3">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.key}
            type="button"
            onClick={() => openExport(tpl)}
            className="bg-white rounded-xl border border-[#E5EAF2] p-4 text-left hover:border-[#4A90D9] hover:shadow-sm transition-all"
            data-ocid="reporting.button"
          >
            <div className="flex items-center gap-2 mb-2">
              <tpl.icon className={`w-5 h-5 ${tpl.color}`} />
              <p className="font-semibold text-sm text-[#0E1116]">
                {tpl.title}
              </p>
            </div>
            <p className="text-xs text-[#6B7A8D]">{tpl.desc}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-[#4A90D9]">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Raporu Oluştur</span>
            </div>
          </button>
        ))}
      </div>

      <Tabs defaultValue="genel">
        <TabsList className="bg-[#F3F6FB] rounded-xl mb-4">
          <TabsTrigger value="genel" data-ocid="reporting.tab">
            Genel Özet
          </TabsTrigger>
          <TabsTrigger value="finansal" data-ocid="reporting.tab">
            Finansal Rapor
          </TabsTrigger>
          <TabsTrigger value="teknik" data-ocid="reporting.tab">
            Teknik Rapor
          </TabsTrigger>
          <TabsTrigger value="sakin" data-ocid="reporting.tab">
            Sakin & Bina
          </TabsTrigger>
          <TabsTrigger value="performans" data-ocid="reporting.tab">
            Performans
          </TabsTrigger>
        </TabsList>

        {/* Genel Özet */}
        <TabsContent value="genel">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <KPICard
              label="Toplam Daire"
              value={totalApartments}
              icon={Home}
              color="text-blue-600"
              bgColor="bg-blue-50"
              trend="up"
              trendValue="+2"
            />
            <KPICard
              label="Geciken Aidat"
              value="14"
              icon={DollarSign}
              color="text-red-600"
              bgColor="bg-red-50"
              trend="down"
              trendValue="-3"
            />
            <KPICard
              label="Tahsilat Oranı"
              value="%94"
              icon={DollarSign}
              color="text-purple-600"
              bgColor="bg-purple-50"
              trend="up"
              trendValue="+5%"
            />
            <KPICard
              label="Açık Arızalar"
              value="7"
              icon={Wrench}
              color="text-orange-600"
              bgColor="bg-orange-50"
              trend="down"
              trendValue="-2"
            />
            <KPICard
              label="Bekleyen Paket"
              value={pendingPackages}
              icon={Package}
              color="text-yellow-600"
              bgColor="bg-yellow-50"
            />
            <KPICard
              label="Toplam Sakin"
              value={occupiedApartments}
              icon={AlertTriangle}
              color="text-red-600"
              bgColor="bg-red-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Gelir - Gider Özeti (Son 6 Ay)
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={INCOME_EXPENSE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v: any) => [
                      `₺${v.toLocaleString("tr-TR")}`,
                      "",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="gelir"
                    name="Gelir"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="gider"
                    name="Gider"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Borç Yaşlandırma Dağılımı
              </h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={AGING_DATA}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {AGING_DATA.map((entry, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2 justify-center">
                {AGING_DATA.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-xs text-[#6B7A8D]">
                      {d.name}:{" "}
                      <span className="font-semibold text-[#0E1116]">
                        {d.value} daire
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Finansal Rapor */}
        <TabsContent value="finansal">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Aidat Tahsilat Grafiği (12 Ay)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MONTHLY_DUES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: any) => [`₺${v.toLocaleString("tr-TR")}`, ""]}
                />
                <Legend />
                <Bar
                  dataKey="tahsilat"
                  name="Tahsilat"
                  fill="#0B1B2E"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="hedef"
                  name="Hedef"
                  fill="#E5EAF2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">
                Toplam Tahsilat (Bu Ay)
              </p>
              <p className="text-2xl font-bold text-green-600">₺22.000</p>
              <Badge className="mt-2 bg-green-50 text-green-700 border-0">
                Hedef Tutturuldu
              </Badge>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">
                Toplam Gider (Bu Ay)
              </p>
              <p className="text-2xl font-bold text-red-500">₺18.400</p>
              <Badge className="mt-2 bg-red-50 text-red-600 border-0">
                Bütçe Dahilinde
              </Badge>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">Net Bakiye</p>
              <p className="text-2xl font-bold text-[#0B1B2E]">₺3.600</p>
              <Badge className="mt-2 bg-blue-50 text-blue-600 border-0">
                Fon Birikimi
              </Badge>
            </div>
          </div>
        </TabsContent>

        {/* Teknik Rapor */}
        <TabsContent value="teknik">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Bakım Tamamlanma Oranı
              </h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={MAINTENANCE_DONUT_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      dataKey="value"
                    >
                      {MAINTENANCE_DONUT_DATA.map((entry, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`%${v}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 justify-center">
                {MAINTENANCE_DONUT_DATA.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-xs text-[#6B7A8D]">
                      {d.name}:{" "}
                      <span className="font-semibold">{d.value}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]">
              <h3 className="font-semibold text-[#0E1116] mb-4">
                Ekipman Durum Özeti
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Asansör A", status: "Çalışıyor", color: "green" },
                  { name: "Asansör B", status: "Bakımda", color: "orange" },
                  {
                    name: "Kalorifer Kazanı",
                    status: "Çalışıyor",
                    color: "green",
                  },
                  { name: "Jeneratir", status: "Çalışıyor", color: "green" },
                  { name: "Su Pompası", status: "Arızalı", color: "red" },
                  {
                    name: "Güvenlik Sistemi",
                    status: "Çalışıyor",
                    color: "green",
                  },
                ].map((eq) => (
                  <div
                    key={eq.name}
                    className="flex items-center justify-between py-2 border-b border-[#F3F6FB] last:border-0"
                  >
                    <span className="text-sm font-medium text-[#0E1116]">
                      {eq.name}
                    </span>
                    <Badge
                      className={`${
                        eq.color === "green"
                          ? "bg-green-50 text-green-700"
                          : eq.color === "orange"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                      } border-0 text-xs`}
                    >
                      {eq.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#0B1B2E]">4.2 gün</p>
                <p className="text-sm text-[#6B7A8D] mt-1">
                  Ort. Arıza Çözüm Süresi
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">%68</p>
                <p className="text-sm text-[#6B7A8D] mt-1">Bakım Tamamlanma</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-500">3</p>
                <p className="text-sm text-[#6B7A8D] mt-1">Geciken Bakım</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Sakin & Bina */}
        <TabsContent value="sakin">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Doluluk Trendi (Son 6 Ay)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={OCCUPANCY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="dolu"
                  name="Dolu Daire"
                  fill="#0B1B2E"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="bos"
                  name="Boş Daire"
                  fill="#E5EAF2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">
                Aylık Ziyaretçi Sayısı
              </p>
              <p className="text-2xl font-bold text-[#0B1B2E]">127</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">
                  +12% geçen aya göre
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">Araç Park Doluluk</p>
              <p className="text-2xl font-bold text-[#0B1B2E]">%82</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-orange-600">
                  +5% geçen aya göre
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
              <p className="text-sm text-[#6B7A8D] mb-1">
                Taşınan Daire (Bu Ay)
              </p>
              <p className="text-2xl font-bold text-[#0B1B2E]">2</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-600">-1 geçen aya göre</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Performans */}
        <TabsContent value="performans">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard
              label="Açık İş Emirleri"
              value="7"
              icon={Wrench}
              color="text-orange-600"
              bgColor="bg-orange-50"
              trend="up"
              trendValue="+2 geçen ay"
              trendColor="orange"
            />
            <KPICard
              label="Ort. Çözüm Süresi"
              value="3.8 gün"
              icon={Clock}
              color="text-green-600"
              bgColor="bg-green-50"
              trend="down"
              trendValue="-0.4 gün iyileşme"
              trendColor="green"
            />
            <KPICard
              label="Tahsilat Oranı"
              value="%94.5"
              icon={DollarSign}
              color="text-green-600"
              bgColor="bg-green-50"
              trend="up"
              trendValue="+%2.1 geçen ay"
              trendColor="green"
            />
            <KPICard
              label="Sakin Memnuniyeti"
              value="4.2 / 5"
              icon={SmilePlus}
              color="text-green-600"
              bgColor="bg-green-50"
              trend="up"
              trendValue="+0.3 geçen ay"
              trendColor="green"
            />
          </div>

          {/* Period Comparison Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Dönem Karşılaştırması (Bu Ay vs Geçen Ay)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={PERIOD_COMPARISON_DATA}
                margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="metrik" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="buDonem"
                  name="Bu Dönem"
                  fill="#0B1B2E"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="gecenDonem"
                  name="Geçen Dönem"
                  fill="#CBD5E1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Staff Performance Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F3F6FB]">
              <h3 className="font-semibold text-[#0E1116]">
                Personel Performans Özeti
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F3F6FB]">
                  <tr>
                    <th className="text-left px-5 py-3 text-[#6B7A8D] font-medium">
                      Ad Soyad
                    </th>
                    <th className="text-left px-5 py-3 text-[#6B7A8D] font-medium">
                      Görev
                    </th>
                    <th className="text-center px-5 py-3 text-[#6B7A8D] font-medium">
                      Tamamlanan İş
                    </th>
                    <th className="text-center px-5 py-3 text-[#6B7A8D] font-medium">
                      Ort. Süre
                    </th>
                    <th className="text-center px-5 py-3 text-[#6B7A8D] font-medium">
                      Puan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F6FB]">
                  {STAFF_PERFORMANCE_DATA.map((s, i) => {
                    const puanColor =
                      s.puan >= 4.5
                        ? "bg-green-50 text-green-700"
                        : s.puan >= 3.5
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700";
                    return (
                      <tr
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        className="hover:bg-[#FAFBFD] transition-colors"
                        data-ocid={`reporting.row.${i + 1}`}
                      >
                        <td className="px-5 py-3 font-medium text-[#0E1116]">
                          {s.ad}
                        </td>
                        <td className="px-5 py-3 text-[#6B7A8D]">{s.gorev}</td>
                        <td className="px-5 py-3 text-center font-semibold text-[#0B1B2E]">
                          {s.tamamlanan}
                        </td>
                        <td className="px-5 py-3 text-center text-[#6B7A8D]">
                          {s.ortSure}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <Badge
                            className={`${puanColor} border-0 font-semibold`}
                          >
                            ★ {s.puan.toFixed(1)}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Modal */}
      <Dialog open={exportModal} onOpenChange={setExportModal}>
        <DialogContent className="max-w-2xl" data-ocid="reporting.dialog">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>
                {exportTemplate ? exportTemplate.title : "Rapor Seç"}
              </DialogTitle>
            </div>
          </DialogHeader>
          {!exportTemplate ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.key}
                  type="button"
                  onClick={() => setExportTemplate(tpl)}
                  className="bg-[#F3F6FB] rounded-xl p-4 text-left hover:bg-[#E5EAF2] transition-colors"
                >
                  <tpl.icon className={`w-5 h-5 ${tpl.color} mb-2`} />
                  <p className="font-semibold text-sm text-[#0E1116]">
                    {tpl.title}
                  </p>
                  <p className="text-xs text-[#6B7A8D] mt-1">{tpl.desc}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#6B7A8D]">{exportTemplate.desc}</p>
              <div className="border border-[#E5EAF2] rounded-xl overflow-hidden">
                <div className="bg-[#0B1B2E] text-white px-4 py-2 text-sm font-semibold">
                  {exportTemplate.title} —{" "}
                  {dateRange === "month"
                    ? "Bu Ay"
                    : dateRange === "year"
                      ? "Bu Yıl"
                      : dateRange === "3months"
                        ? "Son 3 Ay"
                        : "Son 6 Ay"}
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-[#F3F6FB]">
                    <tr>
                      <th className="text-left px-4 py-2 text-[#6B7A8D] font-medium">
                        Gösterge
                      </th>
                      <th className="text-right px-4 py-2 text-[#6B7A8D] font-medium">
                        Değer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F6FB]">
                    {exportTemplate.rows.map(([label, value], i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static rows
                      <tr key={i} className="hover:bg-[#FAFBFD]">
                        <td className="px-4 py-2.5 text-[#3A4654]">{label}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-[#0E1116]">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setExportTemplate(null)}
                  data-ocid="reporting.cancel_button"
                >
                  ← Geri
                </Button>
                <Button
                  className="bg-[#0B1B2E] text-white"
                  onClick={() => {
                    setExportModal(false);
                    setExportTemplate(null);
                  }}
                  data-ocid="reporting.confirm_button"
                >
                  <Download className="w-4 h-4 mr-2" /> İndir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
