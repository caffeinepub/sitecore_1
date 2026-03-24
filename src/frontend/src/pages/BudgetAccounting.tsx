import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface IncomeEntry {
  id: string;
  source: string;
  amount: number;
  month: string;
}

interface Props {
  buildingId: string;
  userId: string;
  isOwner: boolean;
  t: any;
}

const KEY = (id: string) => `sitecore_budget_${id}`;
const DUES_KEY = (id: string) => `sitecore_dues_${id}`;
const EXPENSE_KEY = (id: string) => `sitecore_expenses_${id}`;

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
const PIE_COLORS = [
  "#4A90D9",
  "#F2A23A",
  "#E74C3C",
  "#2ECC71",
  "#9B59B6",
  "#1ABC9C",
  "#E67E22",
  "#34495E",
];

export default function BudgetAccounting({ buildingId, isOwner, t }: Props) {
  const [annualBudget, setAnnualBudget] = useState(0);
  const [budgetInput, setBudgetInput] = useState("");
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [incomeForm, setIncomeForm] = useState({
    source: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });
  const [currentYear] = useState(new Date().getFullYear());
  const [duesIncome, setDuesIncome] = useState<Record<string, number>>({});
  const [expensesData, setExpensesData] = useState<Record<string, number>>({});
  const [expensesByCategory, setExpensesByCategory] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const data = JSON.parse(raw);
      setAnnualBudget(data.annualBudget || 0);
      setBudgetInput(String(data.annualBudget || ""));
      setIncomeEntries(data.incomeEntries || []);
    } else {
      const defaultEntries: IncomeEntry[] = [
        {
          id: "i1",
          source: "Reklam Panosu Kirası",
          amount: 2500,
          month: "2026-01",
        },
        {
          id: "i2",
          source: "Çatı Anten Kirası",
          amount: 1200,
          month: "2026-02",
        },
        {
          id: "i3",
          source: "Otopark Ek Geliri",
          amount: 800,
          month: "2026-03",
        },
      ];
      setAnnualBudget(120000);
      setBudgetInput("120000");
      setIncomeEntries(defaultEntries);
      localStorage.setItem(
        KEY(buildingId),
        JSON.stringify({ annualBudget: 120000, incomeEntries: defaultEntries }),
      );
    }

    const duesRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (duesRaw) {
      const dues = JSON.parse(duesRaw);
      const inc: Record<string, number> = {};
      for (const d of dues.filter((d: any) => d.status === "paid")) {
        const key = d.month || new Date().toISOString().slice(0, 7);
        inc[key] = (inc[key] || 0) + (d.amount || 0);
      }
      setDuesIncome(inc);
    }

    const expRaw = localStorage.getItem(EXPENSE_KEY(buildingId));
    if (expRaw) {
      const expenses = JSON.parse(expRaw);
      const exp: Record<string, number> = {};
      const byCat: Record<string, number> = {};
      for (const e of expenses) {
        const key = e.date
          ? e.date.slice(0, 7)
          : new Date().toISOString().slice(0, 7);
        exp[key] = (exp[key] || 0) + (e.amount || 0);
        const cat = e.category || "Diğer";
        byCat[cat] = (byCat[cat] || 0) + (e.amount || 0);
      }
      setExpensesData(exp);
      setExpensesByCategory(byCat);
    } else {
      // Seed expense categories for demo
      setExpensesByCategory({
        Temizlik: 3200,
        Bakım: 5800,
        Güvenlik: 4500,
        "Ortak Alan": 2100,
        Diğer: 1400,
      });
    }
  }, [buildingId]);

  const persist = (budget: number, entries: IncomeEntry[]) => {
    localStorage.setItem(
      KEY(buildingId),
      JSON.stringify({ annualBudget: budget, incomeEntries: entries }),
    );
  };

  const saveBudget = () => {
    const val = Number(budgetInput) || 0;
    setAnnualBudget(val);
    persist(val, incomeEntries);
  };

  const addIncome = () => {
    if (!incomeForm.source.trim() || !incomeForm.amount) return;
    const updated = [
      ...incomeEntries,
      {
        id: Date.now().toString(),
        source: incomeForm.source,
        amount: Number(incomeForm.amount),
        month: incomeForm.month,
      },
    ];
    setIncomeEntries(updated);
    persist(annualBudget, updated);
    setShowIncomeDialog(false);
    setIncomeForm({
      source: "",
      amount: "",
      month: new Date().toISOString().slice(0, 7),
    });
  };

  const getMonthlyData = (monthIndex: number) => {
    const key = `${currentYear}-${String(monthIndex + 1).padStart(2, "0")}`;
    const dueInc = duesIncome[key] || 0;
    const manualInc = incomeEntries
      .filter((e) => e.month === key)
      .reduce((s, e) => s + e.amount, 0);
    return { income: dueInc + manualInc, expense: expensesData[key] || 0 };
  };

  const totals = MONTHS.reduce(
    (acc, _, i) => {
      const d = getMonthlyData(i);
      acc.income += d.income;
      acc.expense += d.expense;
      return acc;
    },
    { income: 0, expense: 0 },
  );

  const netBalance = totals.income - totals.expense;

  const fmt = (n: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(n);

  // Last 6 months bar chart data
  const now = new Date();
  const last6MonthsData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const monthIndex = d.getMonth();
    const year = d.getFullYear();
    const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const dueInc = duesIncome[key] || 0;
    const manualInc = incomeEntries
      .filter((e) => e.month === key)
      .reduce((s, e) => s + e.amount, 0);
    return {
      name: MONTHS[monthIndex].slice(0, 3),
      Gelir: dueInc + manualInc,
      Gider: expensesData[key] || 0,
    };
  });

  // Pie chart data
  const pieData = Object.entries(expensesByCategory)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#0E1116]">
          {t.budgetAccounting || "Gelir-Gider Muhasebesi"}
        </h2>
        <Button
          onClick={() => setShowIncomeDialog(true)}
          className="bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
          data-ocid="budget.primary_button"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.addIncome || "Gelir Ekle"}
        </Button>
      </div>

      {isOwner && (
        <div className="bg-white rounded-2xl border border-[#E8EDF5] p-4">
          <p className="text-sm font-medium text-[#3A4654] mb-2">
            {t.annualBudget || "Yıllık Bütçe Hedefi"} {currentYear}
          </p>
          <div className="flex gap-3">
            <Input
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              placeholder="120000"
              className="max-w-xs"
              data-ocid="budget.input"
            />
            <Button
              onClick={saveBudget}
              className="bg-[#0B1B2E] text-white rounded-full"
              data-ocid="budget.save_button"
            >
              {t.setBudget || "Kaydet"}
            </Button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-4 w-4 text-[#6B7A8D]" />
          </div>
          <p className="text-xl font-bold text-[#0E1116]">
            {fmt(annualBudget)}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {t.annualBudget || "Yıllık Hedef"}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-xl font-bold text-green-600">
            {fmt(totals.income)}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {t.totalIncome || "Toplam Gelir"}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-[#E8EDF5]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-xl font-bold text-red-600">
            {fmt(totals.expense)}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {t.totalExpensesLabel || "Toplam Gider"}
          </p>
        </div>
        <div
          className={`rounded-2xl p-4 border ${netBalance >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {netBalance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          <p
            className={`text-xl font-bold ${netBalance >= 0 ? "text-green-700" : "text-red-700"}`}
          >
            {fmt(netBalance)}
          </p>
          <p className="text-sm text-[#6B7A8D] mt-1">Net Bakiye</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Last 6 Months */}
        <div className="bg-white rounded-2xl border border-[#E8EDF5] p-5">
          <h3 className="font-semibold text-[#0E1116] mb-4">
            Son 6 Ay Gelir vs Gider
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={last6MonthsData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F8" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip formatter={(value: number) => fmt(value)} />
              <Legend />
              <Bar dataKey="Gelir" fill="#4A90D9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Gider" fill="#E74C3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Expense Categories */}
        <div className="bg-white rounded-2xl border border-[#E8EDF5] p-5">
          <h3 className="font-semibold text-[#0E1116] mb-4">Gider Dağılımı</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => fmt(value)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-[#6B7A8D] py-8">Gider kaydı yok.</p>
          )}
        </div>
      </div>

      {/* Monthly Table */}
      <div className="bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden">
        <div className="px-4 py-3 bg-[#F3F6FB] border-b border-[#E8EDF5]">
          <h3 className="font-semibold text-[#0E1116]">
            {currentYear} {t.budgetVsActual || "Aylık Özet"}
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#FAFBFD]">
            <tr>
              <th className="text-left px-4 py-3 text-[#6B7A8D] font-medium">
                {t.month || "Ay"}
              </th>
              <th className="text-right px-4 py-3 text-[#6B7A8D] font-medium">
                {t.monthlyIncome || "Gelir"}
              </th>
              <th className="text-right px-4 py-3 text-[#6B7A8D] font-medium">
                {t.monthlyExpenses || "Gider"}
              </th>
              <th className="text-right px-4 py-3 text-[#6B7A8D] font-medium">
                {t.balance || "Bakiye"}
              </th>
            </tr>
          </thead>
          <tbody>
            {MONTHS.map((month, i) => {
              const { income, expense } = getMonthlyData(i);
              const balance = income - expense;
              return (
                <tr
                  key={month}
                  className="border-t border-[#F0F3F8] hover:bg-[#FAFBFD]"
                  data-ocid={`budget.item.${i + 1}`}
                >
                  <td className="px-4 py-2 text-[#3A4654]">{month}</td>
                  <td className="px-4 py-2 text-right text-green-700 font-medium">
                    {income > 0 ? fmt(income) : "—"}
                  </td>
                  <td className="px-4 py-2 text-right text-red-600 font-medium">
                    {expense > 0 ? fmt(expense) : "—"}
                  </td>
                  <td
                    className={`px-4 py-2 text-right font-bold ${balance >= 0 ? "text-green-700" : "text-red-600"}`}
                  >
                    {income > 0 || expense > 0 ? fmt(balance) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={showIncomeDialog} onOpenChange={setShowIncomeDialog}>
        <DialogContent className="max-w-md" data-ocid="budget.dialog">
          <DialogHeader>
            <DialogTitle>{t.addIncome || "Gelir Ekle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.incomeSource || "Kaynak"}
              </p>
              <Input
                value={incomeForm.source}
                onChange={(e) =>
                  setIncomeForm((p) => ({ ...p, source: e.target.value }))
                }
                data-ocid="budget.source_input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.incomeAmount || "Tutar (₺)"}
              </p>
              <Input
                type="number"
                value={incomeForm.amount}
                onChange={(e) =>
                  setIncomeForm((p) => ({ ...p, amount: e.target.value }))
                }
                data-ocid="budget.amount_input"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3A4654] block mb-1">
                {t.month || "Ay"}
              </p>
              <Input
                type="month"
                value={incomeForm.month}
                onChange={(e) =>
                  setIncomeForm((p) => ({ ...p, month: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={addIncome}
                className="flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full"
                data-ocid="budget.submit_button"
              >
                {t.addIncome || "Ekle"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowIncomeDialog(false)}
                className="flex-1 rounded-full"
                data-ocid="budget.cancel_button"
              >
                {t.cancel || "İptal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
