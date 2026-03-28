import {
  AlertTriangle,
  BarChart3,
  Calendar,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

interface MonthData {
  planned: number;
  actual: number;
}

interface BudgetState {
  year: number;
  totalBudget: number;
  months: MonthData[];
  categories: Record<string, number>;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_budget_plan_${id}`;

const DEFAULT_CATEGORIES = {
  Bakım: 25,
  Temizlik: 15,
  Güvenlik: 20,
  Personel: 25,
  Altyapı: 10,
  Diğer: 5,
};

function makeDefaultMonths(total: number): MonthData[] {
  const base = Math.round(total / 12);
  const actuals = [98000, 95000, 102000, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return MONTHS.map((_, i) => ({ planned: base, actual: actuals[i] || 0 }));
}

const EXPENSE_ITEMS: Record<
  string,
  {
    name: string;
    planned: number;
    actual: number;
    date: string;
    status: "Ödendi" | "Bekliyor" | "İptal";
  }[]
> = {
  Bakım: [
    {
      name: "Asansör Bakımı",
      planned: 18000,
      actual: 17500,
      date: "2025-03-15",
      status: "Ödendi",
    },
    {
      name: "Kazan Servisi",
      planned: 12000,
      actual: 11800,
      date: "2025-03-20",
      status: "Ödendi",
    },
    {
      name: "Bahçe Bakımı",
      planned: 8000,
      actual: 0,
      date: "2025-04-01",
      status: "Bekliyor",
    },
    {
      name: "Boya-Badana",
      planned: 25000,
      actual: 0,
      date: "2025-05-01",
      status: "Bekliyor",
    },
  ],
  Temizlik: [
    {
      name: "Temizlik Malzemeleri",
      planned: 4500,
      actual: 4200,
      date: "2025-03-10",
      status: "Ödendi",
    },
    {
      name: "Temizlik Personeli",
      planned: 12000,
      actual: 12000,
      date: "2025-03-31",
      status: "Ödendi",
    },
    {
      name: "Dezenfeksiyon",
      planned: 3000,
      actual: 0,
      date: "2025-04-15",
      status: "Bekliyor",
    },
  ],
  Güvenlik: [
    {
      name: "Güvenlik Personeli",
      planned: 24000,
      actual: 24000,
      date: "2025-03-31",
      status: "Ödendi",
    },
    {
      name: "Kamera Bakımı",
      planned: 5000,
      actual: 4800,
      date: "2025-02-28",
      status: "Ödendi",
    },
    {
      name: "Alarm Sistemi",
      planned: 3500,
      actual: 0,
      date: "2025-04-20",
      status: "Bekliyor",
    },
    {
      name: "Güvenlik Yazılımı",
      planned: 2000,
      actual: 0,
      date: "2025-06-01",
      status: "İptal",
    },
  ],
  Personel: [
    {
      name: "Kapıcı Maaşı",
      planned: 18000,
      actual: 18000,
      date: "2025-03-31",
      status: "Ödendi",
    },
    {
      name: "Yönetici Ücreti",
      planned: 12000,
      actual: 12000,
      date: "2025-03-31",
      status: "Ödendi",
    },
    {
      name: "SGK Primleri",
      planned: 9000,
      actual: 8900,
      date: "2025-03-25",
      status: "Ödendi",
    },
  ],
  Altyapı: [
    {
      name: "Su Borusu Tamiri",
      planned: 8000,
      actual: 7600,
      date: "2025-02-10",
      status: "Ödendi",
    },
    {
      name: "Elektrik Tesisatı",
      planned: 6000,
      actual: 0,
      date: "2025-05-15",
      status: "Bekliyor",
    },
    {
      name: "Isı Yalıtımı",
      planned: 15000,
      actual: 0,
      date: "2025-06-01",
      status: "Bekliyor",
    },
  ],
  Diğer: [
    {
      name: "Sigorta Ödemeleri",
      planned: 9500,
      actual: 9500,
      date: "2025-01-15",
      status: "Ödendi",
    },
    {
      name: "Yasal Danışmanlık",
      planned: 3000,
      actual: 0,
      date: "2025-04-30",
      status: "Bekliyor",
    },
    {
      name: "Ofis Giderleri",
      planned: 1500,
      actual: 1200,
      date: "2025-03-31",
      status: "Ödendi",
    },
  ],
};

const YEAR_DATA = [
  { year: 2023, budget: 1100000, actual: 1085000 },
  { year: 2024, budget: 1150000, actual: 1198000 },
  { year: 2025, budget: 1200000, actual: 310000, inProgress: true },
];

const CAT_COLORS: Record<string, string> = {
  Bakım: "#4A90D9",
  Temizlik: "#52B788",
  Güvenlik: "#E67E22",
  Personel: "#9B59B6",
  Altyapı: "#E74C3C",
  Diğer: "#95A5A6",
};

function healthScore(pct: number): {
  grade: string;
  color: string;
  bgColor: string;
} {
  if (pct <= 90) return { grade: "A", color: "#166534", bgColor: "#DCFCE7" };
  if (pct <= 100) return { grade: "B", color: "#14532D", bgColor: "#BBF7D0" };
  if (pct <= 110) return { grade: "C", color: "#713F12", bgColor: "#FEF08A" };
  return { grade: "F", color: "#7F1D1D", bgColor: "#FEE2E2" };
}

export default function BudgetPlanning({ buildingId, isOwner }: Props) {
  const currentYear = new Date().getFullYear();
  const [activeTab, setActiveTab] = useState<
    "genel" | "gider" | "projeksiyon" | "karsilastirma"
  >("genel");

  const [budget, setBudget] = useState<BudgetState>(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      year: currentYear,
      totalBudget: 1200000,
      months: makeDefaultMonths(1200000),
      categories: DEFAULT_CATEGORIES,
    };
  });

  const [totalInput, setTotalInput] = useState(String(budget.totalBudget));

  const save = (b: BudgetState) => {
    setBudget(b);
    localStorage.setItem(KEY(buildingId), JSON.stringify(b));
  };

  const handleTotalChange = () => {
    const val = Number(totalInput);
    if (!val || val <= 0) return;
    save({ ...budget, totalBudget: val, months: makeDefaultMonths(val) });
  };

  const handleActualChange = (index: number, val: string) => {
    const months = [...budget.months];
    months[index] = { ...months[index], actual: Number(val) || 0 };
    save({ ...budget, months });
  };

  const handlePlannedChange = (index: number, val: string) => {
    const months = [...budget.months];
    months[index] = { ...months[index], planned: Number(val) || 0 };
    save({ ...budget, months });
  };

  const handleCategoryChange = (cat: string, val: string) => {
    save({
      ...budget,
      categories: { ...budget.categories, [cat]: Number(val) || 0 },
    });
  };

  const totalActual = budget.months.reduce((s, m) => s + m.actual, 0);
  const totalPlanned = budget.months.reduce((s, m) => s + m.planned, 0);
  const percentUsed =
    budget.totalBudget > 0
      ? Math.round((totalActual / budget.totalBudget) * 100)
      : 0;
  const catTotal = Object.values(budget.categories).reduce((s, v) => s + v, 0);
  const health = healthScore(percentUsed);

  // Projeksiyon calculations
  const completedMonths = budget.months.filter((m) => m.actual > 0);
  const avgMonthly =
    completedMonths.length > 0
      ? completedMonths.reduce((s, m) => s + m.actual, 0) /
        completedMonths.length
      : 0;
  const remainingMonths = 12 - completedMonths.length;
  const projectedTotal = totalActual + avgMonthly * remainingMonths;
  const projectedVariance = projectedTotal - budget.totalBudget;
  const projectedPct =
    budget.totalBudget > 0
      ? Math.round((projectedTotal / budget.totalBudget) * 100)
      : 0;
  const maxBar = Math.max(projectedTotal, budget.totalBudget) * 1.1;

  const tabs = [
    { id: "genel", label: "Genel Bakış", icon: PieChart },
    { id: "gider", label: "Gider Kalemleri", icon: BarChart3 },
    { id: "projeksiyon", label: "Projeksiyon", icon: TrendingUp },
    { id: "karsilastirma", label: "Yıl Karşılaştırması", icon: Calendar },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <PieChart className="w-6 h-6 text-[#0B1B2E]" />
        <h2 className="text-xl font-bold text-[#0E1116]">
          Bütçe Planlama & Projeksiyon
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#F3F6FB] rounded-xl p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              data-ocid={`budget.${tab.id}.tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-[#0B1B2E] shadow-sm"
                  : "text-[#6B7A8D] hover:text-[#0B1B2E]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Genel Bakış */}
      {activeTab === "genel" && (
        <div className="space-y-5">
          {/* Budget Health Score */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">Bütçe Sağlığı</h3>
            <div className="flex items-start gap-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: health.bgColor }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: health.color }}
                >
                  {health.grade}
                </span>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="bg-[#F3F6FB] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6B7A8D] mb-1">Kullanım Oranı</p>
                  <p className="text-xl font-bold text-[#0B1B2E]">
                    %{percentUsed}
                  </p>
                  <p className="text-xs text-[#6B7A8D] mt-0.5">
                    {percentUsed <= 90
                      ? "İdeal"
                      : percentUsed <= 100
                        ? "Dikkat"
                        : "Aşım"}
                  </p>
                </div>
                <div className="bg-[#F3F6FB] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6B7A8D] mb-1">Sapma Durumu</p>
                  <p
                    className={`text-xl font-bold ${
                      totalActual - totalPlanned <= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {totalActual > 0
                      ? `${totalActual - totalPlanned > 0 ? "+" : ""}₺${Math.abs(totalActual - totalPlanned).toLocaleString("tr-TR")}`
                      : "—"}
                  </p>
                  <p className="text-xs text-[#6B7A8D] mt-0.5">
                    Planlamaya göre
                  </p>
                </div>
                <div className="bg-[#F3F6FB] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#6B7A8D] mb-1">Tahmini Kapanış</p>
                  <p
                    className={`text-xl font-bold ${
                      projectedVariance <= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    %{projectedPct}
                  </p>
                  <p className="text-xs text-[#6B7A8D] mt-0.5">
                    Yıl sonu tahmini
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget setup */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              {budget.year} Yılı Bütçe Özeti
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-[#6B7A8D] mb-1">Yıllık Bütçe (₺)</p>
                <div className="flex gap-2">
                  <Input
                    value={totalInput}
                    onChange={(e) => setTotalInput(e.target.value)}
                    disabled={!isOwner}
                  />
                  {isOwner && (
                    <button
                      type="button"
                      data-ocid="budget.apply.button"
                      onClick={handleTotalChange}
                      className="px-3 py-1 bg-[#4A90D9] text-white text-sm rounded-lg"
                    >
                      Uygula
                    </button>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7A8D] mb-1">Gerçekleşen</p>
                <p className="text-2xl font-bold text-[#0B1B2E]">
                  ₺{totalActual.toLocaleString("tr-TR")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6B7A8D] mb-1">Kullanım Oranı</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: health.color }}
                >
                  %{percentUsed}
                </p>
              </div>
            </div>
            <Progress value={Math.min(percentUsed, 100)} className="h-3" />
            <div className="flex justify-between text-xs text-[#6B7A8D] mt-1">
              <span>₺0</span>
              <span>₺{budget.totalBudget.toLocaleString("tr-TR")}</span>
            </div>
          </div>

          {/* Category allocation */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#0E1116]">
                Kategori Dağılımı
              </h3>
              <Badge
                className={`border-0 ${
                  catTotal === 100
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Toplam: %{catTotal}
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(budget.categories).map(([cat, pct]) => (
                <div key={cat} className="bg-[#F3F6FB] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: CAT_COLORS[cat] ?? "#4A90D9" }}
                    />
                    <p className="text-xs text-[#6B7A8D]">{cat}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {isOwner ? (
                      <Input
                        value={pct}
                        onChange={(e) =>
                          handleCategoryChange(cat, e.target.value)
                        }
                        className="h-7 text-sm w-16"
                        type="number"
                        min="0"
                        max="100"
                      />
                    ) : (
                      <span className="text-xl font-bold text-[#0B1B2E]">
                        {pct}
                      </span>
                    )}
                    <span className="text-[#3A4654] font-medium">%</span>
                  </div>
                  <p className="text-xs text-[#6B7A8D] mt-1">
                    ≈ ₺
                    {Math.round(
                      (budget.totalBudget * pct) / 100,
                    ).toLocaleString("tr-TR")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly breakdown */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">Aylık Döküm</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5EAF2]">
                    <th className="text-left py-2 text-[#6B7A8D] font-medium">
                      Ay
                    </th>
                    <th className="text-right py-2 text-[#6B7A8D] font-medium">
                      Planlanan (₺)
                    </th>
                    <th className="text-right py-2 text-[#6B7A8D] font-medium">
                      Gerçekleşen (₺)
                    </th>
                    <th className="text-right py-2 text-[#6B7A8D] font-medium">
                      Sapma
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budget.months.map((m, i) => {
                    const variance = m.actual - m.planned;
                    const over = m.actual > 0 && variance / m.planned > 0.1;
                    return (
                      <tr
                        key={MONTHS[i]}
                        className={`border-b border-[#F3F6FB] ${over ? "bg-red-50" : ""}`}
                      >
                        <td className="py-2 font-medium text-[#0E1116]">
                          <div className="flex items-center gap-1">
                            {MONTHS[i]}
                            {over && (
                              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          {isOwner ? (
                            <Input
                              value={m.planned}
                              onChange={(e) =>
                                handlePlannedChange(i, e.target.value)
                              }
                              className="h-7 text-xs text-right w-28 ml-auto"
                              type="number"
                            />
                          ) : (
                            <span>{m.planned.toLocaleString("tr-TR")}</span>
                          )}
                        </td>
                        <td className="py-2 text-right">
                          <Input
                            value={m.actual || ""}
                            onChange={(e) =>
                              handleActualChange(i, e.target.value)
                            }
                            className="h-7 text-xs text-right w-28 ml-auto"
                            type="number"
                            placeholder="0"
                          />
                        </td>
                        <td
                          className={`py-2 text-right font-medium ${
                            m.actual === 0
                              ? "text-[#6B7A8D]"
                              : variance > 0
                                ? "text-red-600"
                                : "text-green-600"
                          }`}
                        >
                          {m.actual === 0
                            ? "-"
                            : `${variance > 0 ? "+" : ""}${variance.toLocaleString("tr-TR")}`}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold">
                    <td className="py-2">Toplam</td>
                    <td className="py-2 text-right">
                      {totalPlanned.toLocaleString("tr-TR")}
                    </td>
                    <td className="py-2 text-right">
                      {totalActual.toLocaleString("tr-TR")}
                    </td>
                    <td
                      className={`py-2 text-right ${totalActual - totalPlanned > 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {totalActual > 0
                        ? `${totalActual - totalPlanned > 0 ? "+" : ""}${(totalActual - totalPlanned).toLocaleString("tr-TR")}`
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Gider Kalemleri */}
      {activeTab === "gider" && (
        <div className="space-y-4">
          {Object.entries(EXPENSE_ITEMS).map(([cat, items]) => {
            const catColor = CAT_COLORS[cat] ?? "#4A90D9";
            const catPlanned = items.reduce((s, it) => s + it.planned, 0);
            const catActual = items.reduce((s, it) => s + it.actual, 0);
            return (
              <div
                key={cat}
                className="bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden"
              >
                <div
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderLeft: `4px solid ${catColor}` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: catColor }}
                  />
                  <h3 className="font-semibold text-[#0E1116]">{cat}</h3>
                  <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-[#6B7A8D]">
                      Planlanan: ₺{catPlanned.toLocaleString("tr-TR")}
                    </span>
                    <span className="text-sm font-semibold text-[#0B1B2E]">
                      Gerçekleşen: ₺{catActual.toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F3F6FB]">
                      <tr>
                        <th className="text-left px-5 py-2.5 text-[#6B7A8D] font-medium">
                          Kalem Adı
                        </th>
                        <th className="text-right px-4 py-2.5 text-[#6B7A8D] font-medium">
                          Planlanan (₺)
                        </th>
                        <th className="text-right px-4 py-2.5 text-[#6B7A8D] font-medium">
                          Gerçekleşen (₺)
                        </th>
                        <th className="text-right px-4 py-2.5 text-[#6B7A8D] font-medium">
                          Tarih
                        </th>
                        <th className="text-center px-4 py-2.5 text-[#6B7A8D] font-medium">
                          Durum
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.name}
                          className="border-t border-[#F3F6FB] hover:bg-[#F9FAFB]"
                        >
                          <td className="px-5 py-3 font-medium text-[#0E1116]">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-right text-[#0B1B2E]">
                            ₺{item.planned.toLocaleString("tr-TR")}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Input
                              defaultValue={item.actual || ""}
                              className="h-7 text-xs text-right w-28 ml-auto"
                              type="number"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-right text-[#6B7A8D] text-xs">
                            {item.date}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.status === "Ödendi"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "Bekliyor"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-500 line-through"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[#E5EAF2] bg-[#F3F6FB] font-semibold">
                        <td className="px-5 py-3 text-[#0B1B2E]">
                          Kategori Toplamı
                        </td>
                        <td className="px-4 py-3 text-right text-[#0B1B2E]">
                          ₺{catPlanned.toLocaleString("tr-TR")}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={
                              catActual > catPlanned
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            ₺{catActual.toLocaleString("tr-TR")}
                          </span>
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`text-xs font-medium ${
                              catActual > catPlanned
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {catActual > catPlanned
                              ? `+₺${(catActual - catPlanned).toLocaleString("tr-TR")} aşım`
                              : `₺${(catPlanned - catActual).toLocaleString("tr-TR")} tasarruf`}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Projeksiyon */}
      {activeTab === "projeksiyon" && (
        <div className="space-y-5">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Gerçekleşen Toplam",
                value: `₺${totalActual.toLocaleString("tr-TR")}`,
                sub: `${completedMonths.length} ay`,
                color: "text-[#0B1B2E]",
              },
              {
                label: "Projeksiyon Tahmini",
                value: `₺${Math.round(projectedTotal).toLocaleString("tr-TR")}`,
                sub: "Yıl sonu",
                color:
                  projectedVariance > 0 ? "text-red-600" : "text-green-600",
              },
              {
                label: "Bütçe Hedefi",
                value: `₺${budget.totalBudget.toLocaleString("tr-TR")}`,
                sub: String(budget.year),
                color: "text-[#0B1B2E]",
              },
              {
                label: "Beklenen Fark",
                value: `${projectedVariance > 0 ? "+" : ""}₺${Math.abs(Math.round(projectedVariance)).toLocaleString("tr-TR")}`,
                sub:
                  projectedVariance > 0
                    ? "Aşım bekleniyor"
                    : "Tasarruf bekleniyor",
                color:
                  projectedVariance > 0 ? "text-red-600" : "text-green-600",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]"
              >
                <p className="text-xs text-[#6B7A8D] mb-1">{card.label}</p>
                <p className={`text-lg font-bold ${card.color}`}>
                  {card.value}
                </p>
                <p className="text-xs text-[#6B7A8D] mt-0.5">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[#0E1116]">
                Tahmini Bütçe Kullanımı
              </h3>
              <span
                className={`text-sm font-semibold ${projectedPct > 100 ? "text-red-600" : "text-green-600"}`}
              >
                %{projectedPct}
              </span>
            </div>
            <div className="relative h-6 bg-[#F3F6FB] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(projectedPct, 100)}%`,
                  background:
                    projectedPct > 100
                      ? "#EF4444"
                      : projectedPct > 90
                        ? "#F59E0B"
                        : "#4A90D9",
                }}
              />
              {/* Budget line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500"
                style={{ left: "100%", transform: "translateX(-100%)" }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#6B7A8D] mt-1.5">
              <span>₺0</span>
              <span className="text-red-500 font-medium">
                Bütçe Limiti: ₺{budget.totalBudget.toLocaleString("tr-TR")}
              </span>
            </div>
          </div>

          {/* Monthly bar chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Aylık Harcama Grafiği
            </h3>
            <div className="flex items-end gap-1.5 h-40">
              {budget.months.map((m, i) => {
                const isCompleted = m.actual > 0;
                const value = isCompleted ? m.actual : Math.round(avgMonthly);
                const heightPct = maxBar > 0 ? (value / maxBar) * 100 : 0;
                const budgetLinePct =
                  maxBar > 0 ? (budget.totalBudget / 12 / maxBar) * 100 : 0;
                return (
                  <div
                    key={`proj-bar-${MONTHS[i]}`}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="relative w-full flex items-end"
                      style={{ height: "120px" }}
                    >
                      {/* Budget line marker */}
                      <div
                        className="absolute left-0 right-0 border-t border-dashed border-red-400 z-10"
                        style={{ bottom: `${budgetLinePct}%` }}
                      />
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isCompleted ? "" : "opacity-50"
                        }`}
                        style={{
                          height: `${Math.max(heightPct, 2)}%`,
                          background: isCompleted ? "#4A90D9" : "#A8C8EC",
                          borderTop: isCompleted
                            ? "none"
                            : "2px dashed #4A90D9",
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-[#6B7A8D] text-center leading-tight">
                      {MONTHS[i].slice(0, 3)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#4A90D9]" />
                <span className="text-xs text-[#6B7A8D]">Gerçekleşen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#A8C8EC] border border-dashed border-[#4A90D9]" />
                <span className="text-xs text-[#6B7A8D]">Projeksiyon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-6 border-t border-dashed border-red-400" />
                <span className="text-xs text-[#6B7A8D]">
                  Aylık Bütçe Limiti
                </span>
              </div>
            </div>
          </div>

          {/* Monthly detail table */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">Aylık Detay</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5EAF2]">
                    <th className="text-left py-2 text-[#6B7A8D] font-medium">
                      Ay
                    </th>
                    <th className="text-right py-2 text-[#6B7A8D] font-medium">
                      Tutar (₺)
                    </th>
                    <th className="text-center py-2 text-[#6B7A8D] font-medium">
                      Tür
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budget.months.map((m, i) => {
                    const isCompleted = m.actual > 0;
                    const value = isCompleted
                      ? m.actual
                      : Math.round(avgMonthly);
                    return (
                      <tr
                        key={`proj-row-${MONTHS[i]}`}
                        className="border-b border-[#F3F6FB]"
                      >
                        <td className="py-2 font-medium text-[#0E1116]">
                          {MONTHS[i]}
                        </td>
                        <td className="py-2 text-right text-[#0B1B2E]">
                          ₺{value.toLocaleString("tr-TR")}
                        </td>
                        <td className="py-2 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              isCompleted
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isCompleted ? "Gerçekleşen" : "Projeksiyon"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Yıl Karşılaştırması */}
      {activeTab === "karsilastirma" && (
        <div className="space-y-5">
          {/* Grouped bar chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-5">
              Yıllık Bütçe vs Gerçekleşen
            </h3>
            <div className="flex items-end justify-around gap-6 h-52">
              {YEAR_DATA.map((yd) => {
                const maxVal =
                  Math.max(
                    ...YEAR_DATA.map((d) => Math.max(d.budget, d.actual)),
                  ) * 1.1;
                const budgetH = (yd.budget / maxVal) * 100;
                const actualH = (yd.actual / maxVal) * 100;
                return (
                  <div
                    key={yd.year}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div
                      className="flex items-end gap-2 w-full justify-center"
                      style={{ height: "160px" }}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs text-[#6B7A8D] font-medium">
                          ₺{(yd.budget / 1000).toFixed(0)}K
                        </span>
                        <div
                          className="w-12 rounded-t-md bg-[#4A90D9]"
                          style={{ height: `${budgetH}%` }}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span
                          className={`text-xs font-medium ${
                            yd.actual > yd.budget
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          ₺{(yd.actual / 1000).toFixed(0)}K
                        </span>
                        <div
                          className={`w-12 rounded-t-md ${
                            yd.actual > yd.budget
                              ? "bg-red-400"
                              : "bg-[#52B788]"
                          } ${yd.inProgress ? "opacity-60" : ""}`}
                          style={{
                            height: `${actualH}%`,
                            borderTop: yd.inProgress
                              ? "2px dashed #52B788"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[#0B1B2E] text-sm">
                        {yd.year}
                      </p>
                      {yd.inProgress && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                          Devam ediyor
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 justify-center mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#4A90D9]" />
                <span className="text-xs text-[#6B7A8D]">Bütçe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#52B788]" />
                <span className="text-xs text-[#6B7A8D]">Gerçekleşen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-xs text-[#6B7A8D]">Aşım</span>
              </div>
            </div>
          </div>

          {/* Summary table */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Yıllık Özet Tablosu
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5EAF2]">
                    <th className="text-left py-2.5 text-[#6B7A8D] font-medium">
                      Yıl
                    </th>
                    <th className="text-right py-2.5 text-[#6B7A8D] font-medium">
                      Bütçe (₺)
                    </th>
                    <th className="text-right py-2.5 text-[#6B7A8D] font-medium">
                      Gerçekleşen (₺)
                    </th>
                    <th className="text-right py-2.5 text-[#6B7A8D] font-medium">
                      Fark (₺)
                    </th>
                    <th className="text-center py-2.5 text-[#6B7A8D] font-medium">
                      Performans
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {YEAR_DATA.map((yd) => {
                    const variance = yd.actual - yd.budget;
                    const pct = Math.round((yd.actual / yd.budget) * 100);
                    const perf = healthScore(pct);
                    return (
                      <tr
                        key={yd.year}
                        className="border-b border-[#F3F6FB] hover:bg-[#F9FAFB]"
                      >
                        <td className="py-3 font-semibold text-[#0B1B2E]">
                          <div className="flex items-center gap-2">
                            {yd.year}
                            {yd.inProgress && (
                              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                                Devam
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-right text-[#0B1B2E]">
                          ₺{yd.budget.toLocaleString("tr-TR")}
                        </td>
                        <td className="py-3 text-right text-[#0B1B2E]">
                          ₺{yd.actual.toLocaleString("tr-TR")}
                        </td>
                        <td
                          className={`py-3 text-right font-medium ${variance > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {variance > 0 ? "+" : ""}₺
                          {variance.toLocaleString("tr-TR")}
                        </td>
                        <td className="py-3 text-center">
                          <span
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
                            style={{
                              backgroundColor: perf.bgColor,
                              color: perf.color,
                            }}
                          >
                            {perf.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Year-over-year insights */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]">
            <h3 className="font-semibold text-[#0E1116] mb-4">
              Yıllık Trendler
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#F3F6FB] rounded-xl p-4">
                <p className="text-xs text-[#6B7A8D] mb-1">Bütçe Büyümesi</p>
                <p className="text-xl font-bold text-[#0B1B2E]">+%9.1</p>
                <p className="text-xs text-[#6B7A8D] mt-0.5">2023–2025 arası</p>
              </div>
              <div className="bg-[#F3F6FB] rounded-xl p-4">
                <p className="text-xs text-[#6B7A8D] mb-1">En Verimli Yıl</p>
                <p className="text-xl font-bold text-green-600">2023</p>
                <p className="text-xs text-[#6B7A8D] mt-0.5">%98.6 kullanım</p>
              </div>
              <div className="bg-[#F3F6FB] rounded-xl p-4">
                <p className="text-xs text-[#6B7A8D] mb-1">Ortalama Sapma</p>
                <p className="text-xl font-bold text-red-500">+%2.5</p>
                <p className="text-xs text-[#6B7A8D] mt-0.5">
                  Son 2 yıl ortalaması
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
