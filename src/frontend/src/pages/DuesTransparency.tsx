import { BarChart2, ChevronDown, ChevronUp, Info } from "lucide-react";
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

interface DueItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  description: string;
  color: string;
}

interface Period {
  label: string;
  total: number;
  items: DueItem[];
}

const PERIODS: Period[] = [
  {
    label: "Mart 2026",
    total: 850,
    items: [
      {
        id: "1",
        name: "Asansör Bakımı",
        amount: 120,
        category: "Teknik",
        description: "Aylık periyodik asansör bakımı ve denetim ücreti",
        color: "#3B82F6",
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 180,
        category: "Hizmet",
        description: "Ortak alan temizliği, 6 gün/hafta",
        color: "#10B981",
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli maaş payı",
        color: "#F59E0B",
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 95,
        category: "Fatura",
        description: "Merdiven, otopark aydınlatması",
        color: "#8B5CF6",
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 60,
        category: "Hizmet",
        description: "Haftalık bahçe bakım ve sulama",
        color: "#06B6D4",
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 45,
        category: "İdari",
        description: "Kırtasiye, muhasebe, sigorta primleri",
        color: "#EF4444",
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 80,
        category: "Fon",
        description: "Acil onarım ve büyük bakım rezervi",
        color: "#F97316",
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 50,
        category: "Fatura",
        description: "Bahçe, otopark su tüketimi",
        color: "#14B8A6",
      },
    ],
  },
  {
    label: "Şubat 2026",
    total: 820,
    items: [
      {
        id: "1",
        name: "Asansör Bakımı",
        amount: 120,
        category: "Teknik",
        description: "Aylık periyodik asansör bakımı",
        color: "#3B82F6",
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 175,
        category: "Hizmet",
        description: "Ortak alan temizliği",
        color: "#10B981",
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli",
        color: "#F59E0B",
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 88,
        category: "Fatura",
        description: "Ortak alan aydınlatma",
        color: "#8B5CF6",
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 55,
        category: "Hizmet",
        description: "Haftalık bahçe bakımı",
        color: "#06B6D4",
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 42,
        category: "İdari",
        description: "Genel yönetim giderleri",
        color: "#EF4444",
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 80,
        category: "Fon",
        description: "Acil onarım rezervi",
        color: "#F97316",
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 40,
        category: "Fatura",
        description: "Su tüketimi",
        color: "#14B8A6",
      },
    ],
  },
  {
    label: "Ocak 2026",
    total: 870,
    items: [
      {
        id: "1",
        name: "Asansör Bakımı",
        amount: 120,
        category: "Teknik",
        description: "Aylık periyodik asansör bakımı",
        color: "#3B82F6",
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 185,
        category: "Hizmet",
        description: "Ortak alan temizliği",
        color: "#10B981",
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli",
        color: "#F59E0B",
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 110,
        category: "Fatura",
        description: "Kış ayı yüksek tüketim",
        color: "#8B5CF6",
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 40,
        category: "Hizmet",
        description: "Kış bakımı",
        color: "#06B6D4",
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 45,
        category: "İdari",
        description: "Genel yönetim giderleri",
        color: "#EF4444",
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 100,
        category: "Fon",
        description: "Kazan bakımı dahil",
        color: "#F97316",
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 50,
        category: "Fatura",
        description: "Su tüketimi",
        color: "#14B8A6",
      },
    ],
  },
];

const TREND_DATA = [
  { ay: "Eki", tutar: 780 },
  { ay: "Kas", tutar: 810 },
  { ay: "Ara", tutar: 840 },
  { ay: "Oca", tutar: 870 },
  { ay: "Şub", tutar: 820 },
  { ay: "Mar", tutar: 850 },
];

interface Props {
  buildingId: string;
  isOwner: boolean;
  t: Record<string, string>;
}

export default function DuesTransparency(_props: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<
    "breakdown" | "trend" | "compare"
  >("breakdown");

  const period = PERIODS[selectedPeriod];

  const compareData = period.items.map((item) => {
    const prev = PERIODS[selectedPeriod + 1]?.items.find(
      (i) => i.id === item.id,
    );
    return {
      name: item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name,
      buAy: item.amount,
      oncekiAy: prev?.amount ?? 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1B2E]">
            Aidat Kalem Şeffaflığı
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Aidatınızın hangi kaleme gittiğini görün
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          {PERIODS.map((p, i) => (
            <option key={p.label} value={i}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-[#0B1B2E] to-[#1e3a5f] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60 mb-1">
              {period.label} Aidatı
            </div>
            <div className="text-4xl font-bold">
              {period.total.toLocaleString("tr-TR")} ₺
            </div>
            <div className="text-sm text-white/70 mt-1">
              {period.items.length} kalem gider
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60 mb-1">Önceki Ay</div>
            <div className="text-2xl font-semibold">
              {PERIODS[selectedPeriod + 1]?.total.toLocaleString("tr-TR") ??
                "—"}{" "}
              {PERIODS[selectedPeriod + 1] ? "₺" : ""}
            </div>
            {PERIODS[selectedPeriod + 1] && (
              <div
                className={`text-sm mt-1 ${
                  period.total > (PERIODS[selectedPeriod + 1]?.total ?? 0)
                    ? "text-red-300"
                    : "text-green-300"
                }`}
              >
                {period.total > (PERIODS[selectedPeriod + 1]?.total ?? 0)
                  ? "▲"
                  : "▼"}{" "}
                {Math.abs(
                  period.total - (PERIODS[selectedPeriod + 1]?.total ?? 0),
                )}{" "}
                ₺
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2">
        {(["breakdown", "trend", "compare"] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === view
                ? "bg-[#2563EB] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {view === "breakdown"
              ? "📊 Döküm"
              : view === "trend"
                ? "📈 Trend"
                : "🔀 Karşılaştırma"}
          </button>
        ))}
      </div>

      {activeView === "breakdown" && (
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-[#0B1B2E] mb-4">
              Kategori Dağılımı
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={period.items}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {period.items.map((item) => (
                    <Cell key={item.id} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val} ₺`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-[#0B1B2E] mb-4">
              Gider Kalemleri
            </h3>
            <div className="space-y-2">
              {period.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setExpandedItem(expandedItem === item.id ? null : item.id)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                      <Badge className="text-xs bg-gray-100 text-gray-600 border-0">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B1B2E]">
                        {item.amount} ₺
                      </span>
                      <span className="text-xs text-gray-400">
                        {Math.round((item.amount / period.total) * 100)}%
                      </span>
                      {expandedItem === item.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {expandedItem === item.id && (
                    <div className="px-3 pb-3 bg-gray-50">
                      <div className="text-sm text-gray-600">
                        <Info className="w-3 h-3 inline mr-1" />
                        {item.description}
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(item.amount / period.total) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === "trend" && (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-[#0B1B2E] mb-4">
            6 Aylık Aidat Trendi
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={TREND_DATA}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="ay" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val: number) => [`${val} ₺`, "Aidat"]} />
              <Bar dataKey="tutar" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeView === "compare" && selectedPeriod < PERIODS.length - 1 && (
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-[#0B1B2E] mb-4">
            {period.label} vs {PERIODS[selectedPeriod + 1].label}{" "}
            Karşılaştırması
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={compareData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val: number) => [`${val} ₺`, ""]} />
              <Legend />
              <Bar
                dataKey="buAy"
                name={period.label}
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="oncekiAy"
                name={PERIODS[selectedPeriod + 1].label}
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeView === "compare" && selectedPeriod >= PERIODS.length - 1 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            Karşılaştırma için önceki dönem verisi bulunmuyor
          </p>
        </div>
      )}
    </div>
  );
}
