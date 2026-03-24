import { AlertTriangle, PieChart } from "lucide-react";
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

export default function BudgetPlanning({ buildingId, isOwner }: Props) {
  const currentYear = new Date().getFullYear();

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

  const healthColor =
    percentUsed <= 80
      ? "text-green-600"
      : percentUsed <= 100
        ? "text-yellow-600"
        : "text-red-600";

  const catTotal = Object.values(budget.categories).reduce((s, v) => s + v, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <PieChart className="w-6 h-6 text-[#0B1B2E]" />
        <h2 className="text-xl font-bold text-[#0E1116]">
          Bütçe Planlama & Projeksiyon
        </h2>
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
            <p className={`text-2xl font-bold ${healthColor}`}>
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
          <h3 className="font-semibold text-[#0E1116]">Kategori Dağılımı</h3>
          <Badge
            className={`border-0 ${catTotal === 100 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            Toplam: %{catTotal}
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(budget.categories).map(([cat, pct]) => (
            <div key={cat} className="bg-[#F3F6FB] rounded-xl p-3">
              <p className="text-xs text-[#6B7A8D] mb-1">{cat}</p>
              <div className="flex items-center gap-1">
                {isOwner ? (
                  <Input
                    value={pct}
                    onChange={(e) => handleCategoryChange(cat, e.target.value)}
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
                {Math.round((budget.totalBudget * pct) / 100).toLocaleString(
                  "tr-TR",
                )}
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
                        onChange={(e) => handleActualChange(i, e.target.value)}
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
  );
}
