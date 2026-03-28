import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, I as Input, k as TrendingUp, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-DOWBo6uK.js";
import { W as Wallet } from "./wallet-CGofzarn.js";
import { T as TrendingDown } from "./trending-down-DRSIHCz-.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, B as Bar, a as Cell } from "./generateCategoricalChart-C_VCRMet.js";
import { B as BarChart } from "./BarChart-CaT4iaZP.js";
import { P as PieChart, a as Pie } from "./PieChart-Dtp6zDHh.js";
const KEY = (id) => `sitecore_budget_${id}`;
const DUES_KEY = (id) => `sitecore_dues_${id}`;
const EXPENSE_KEY = (id) => `sitecore_expenses_${id}`;
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
  "Aralık"
];
const PIE_COLORS = [
  "#4A90D9",
  "#F2A23A",
  "#E74C3C",
  "#2ECC71",
  "#9B59B6",
  "#1ABC9C",
  "#E67E22",
  "#34495E"
];
function BudgetAccounting({ buildingId, isOwner, t }) {
  const [annualBudget, setAnnualBudget] = reactExports.useState(0);
  const [budgetInput, setBudgetInput] = reactExports.useState("");
  const [incomeEntries, setIncomeEntries] = reactExports.useState([]);
  const [showIncomeDialog, setShowIncomeDialog] = reactExports.useState(false);
  const [incomeForm, setIncomeForm] = reactExports.useState({
    source: "",
    amount: "",
    month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
  });
  const [currentYear] = reactExports.useState((/* @__PURE__ */ new Date()).getFullYear());
  const [duesIncome, setDuesIncome] = reactExports.useState({});
  const [expensesData, setExpensesData] = reactExports.useState({});
  const [expensesByCategory, setExpensesByCategory] = reactExports.useState({});
  reactExports.useEffect(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    if (raw) {
      const data = JSON.parse(raw);
      setAnnualBudget(data.annualBudget || 0);
      setBudgetInput(String(data.annualBudget || ""));
      setIncomeEntries(data.incomeEntries || []);
    } else {
      const defaultEntries = [
        {
          id: "i1",
          source: "Reklam Panosu Kirası",
          amount: 2500,
          month: "2026-01"
        },
        {
          id: "i2",
          source: "Çatı Anten Kirası",
          amount: 1200,
          month: "2026-02"
        },
        {
          id: "i3",
          source: "Otopark Ek Geliri",
          amount: 800,
          month: "2026-03"
        }
      ];
      setAnnualBudget(12e4);
      setBudgetInput("120000");
      setIncomeEntries(defaultEntries);
      localStorage.setItem(
        KEY(buildingId),
        JSON.stringify({ annualBudget: 12e4, incomeEntries: defaultEntries })
      );
    }
    const duesRaw = localStorage.getItem(DUES_KEY(buildingId));
    if (duesRaw) {
      const dues = JSON.parse(duesRaw);
      const inc = {};
      for (const d of dues.filter((d2) => d2.status === "paid")) {
        const key = d.month || (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
        inc[key] = (inc[key] || 0) + (d.amount || 0);
      }
      setDuesIncome(inc);
    }
    const expRaw = localStorage.getItem(EXPENSE_KEY(buildingId));
    if (expRaw) {
      const expenses = JSON.parse(expRaw);
      const exp = {};
      const byCat = {};
      for (const e of expenses) {
        const key = e.date ? e.date.slice(0, 7) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
        exp[key] = (exp[key] || 0) + (e.amount || 0);
        const cat = e.category || "Diğer";
        byCat[cat] = (byCat[cat] || 0) + (e.amount || 0);
      }
      setExpensesData(exp);
      setExpensesByCategory(byCat);
    } else {
      setExpensesByCategory({
        Temizlik: 3200,
        Bakım: 5800,
        Güvenlik: 4500,
        "Ortak Alan": 2100,
        Diğer: 1400
      });
    }
  }, [buildingId]);
  const persist = (budget, entries) => {
    localStorage.setItem(
      KEY(buildingId),
      JSON.stringify({ annualBudget: budget, incomeEntries: entries })
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
        month: incomeForm.month
      }
    ];
    setIncomeEntries(updated);
    persist(annualBudget, updated);
    setShowIncomeDialog(false);
    setIncomeForm({
      source: "",
      amount: "",
      month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)
    });
  };
  const getMonthlyData = (monthIndex) => {
    const key = `${currentYear}-${String(monthIndex + 1).padStart(2, "0")}`;
    const dueInc = duesIncome[key] || 0;
    const manualInc = incomeEntries.filter((e) => e.month === key).reduce((s, e) => s + e.amount, 0);
    return { income: dueInc + manualInc, expense: expensesData[key] || 0 };
  };
  const totals = MONTHS.reduce(
    (acc, _, i) => {
      const d = getMonthlyData(i);
      acc.income += d.income;
      acc.expense += d.expense;
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const netBalance = totals.income - totals.expense;
  const fmt = (n) => new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(n);
  const now = /* @__PURE__ */ new Date();
  const last6MonthsData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const monthIndex = d.getMonth();
    const year = d.getFullYear();
    const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const dueInc = duesIncome[key] || 0;
    const manualInc = incomeEntries.filter((e) => e.month === key).reduce((s, e) => s + e.amount, 0);
    return {
      name: MONTHS[monthIndex].slice(0, 3),
      Gelir: dueInc + manualInc,
      Gider: expensesData[key] || 0
    };
  });
  const pieData = Object.entries(expensesByCategory).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.budgetAccounting || "Gelir-Gider Muhasebesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowIncomeDialog(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
          "data-ocid": "budget.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            t.addIncome || "Gelir Ekle"
          ]
        }
      )
    ] }),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654] mb-2", children: [
        t.annualBudget || "Yıllık Bütçe Hedefi",
        " ",
        currentYear
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: budgetInput,
            onChange: (e) => setBudgetInput(e.target.value),
            placeholder: "120000",
            className: "max-w-xs",
            "data-ocid": "budget.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: saveBudget,
            className: "bg-[#0B1B2E] text-white rounded-full",
            "data-ocid": "budget.save_button",
            children: t.setBudget || "Kaydet"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-[#6B7A8D]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[#0E1116]", children: fmt(annualBudget) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: t.annualBudget || "Yıllık Hedef" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-600", children: fmt(totals.income) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: t.totalIncome || "Toplam Gelir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 border border-[#E8EDF5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-red-600", children: fmt(totals.expense) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: t.totalExpensesLabel || "Toplam Gider" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-2xl p-4 border ${netBalance >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: netBalance >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-red-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-xl font-bold ${netBalance >= 0 ? "text-green-700" : "text-red-700"}`,
                children: fmt(netBalance)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Net Bakiye" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Son 6 Ay Gelir vs Gider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: last6MonthsData,
            margin: { top: 5, right: 5, left: 5, bottom: 5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F0F3F8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11 },
                  tickFormatter: (v) => `${(v / 1e3).toFixed(0)}K`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => fmt(value) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Gelir", fill: "#4A90D9", radius: [4, 4, 0, 0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Gider", fill: "#E74C3C", radius: [4, 4, 0, 0] })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Gider Dağılımı" }),
        pieData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: pieData,
              cx: "50%",
              cy: "50%",
              outerRadius: 75,
              dataKey: "value",
              label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
              labelLine: false,
              children: pieData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: PIE_COLORS[index % PIE_COLORS.length]
                },
                entry.name
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => fmt(value) })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#6B7A8D] py-8", children: "Gider kaydı yok." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-[#E8EDF5] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-[#F3F6FB] border-b border-[#E8EDF5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116]", children: [
        currentYear,
        " ",
        t.budgetVsActual || "Aylık Özet"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#FAFBFD]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: t.month || "Ay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-[#6B7A8D] font-medium", children: t.monthlyIncome || "Gelir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-[#6B7A8D] font-medium", children: t.monthlyExpenses || "Gider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-[#6B7A8D] font-medium", children: t.balance || "Bakiye" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MONTHS.map((month, i) => {
          const { income, expense } = getMonthlyData(i);
          const balance = income - expense;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-[#F0F3F8] hover:bg-[#FAFBFD]",
              "data-ocid": `budget.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: month }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-green-700 font-medium", children: income > 0 ? fmt(income) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-red-600 font-medium", children: expense > 0 ? fmt(expense) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: `px-4 py-2 text-right font-bold ${balance >= 0 ? "text-green-700" : "text-red-600"}`,
                    children: income > 0 || expense > 0 ? fmt(balance) : "—"
                  }
                )
              ]
            },
            month
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showIncomeDialog, onOpenChange: setShowIncomeDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "budget.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t.addIncome || "Gelir Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.incomeSource || "Kaynak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: incomeForm.source,
              onChange: (e) => setIncomeForm((p) => ({ ...p, source: e.target.value })),
              "data-ocid": "budget.source_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.incomeAmount || "Tutar (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: incomeForm.amount,
              onChange: (e) => setIncomeForm((p) => ({ ...p, amount: e.target.value })),
              "data-ocid": "budget.amount_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: t.month || "Ay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: incomeForm.month,
              onChange: (e) => setIncomeForm((p) => ({ ...p, month: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: addIncome,
              className: "flex-1 bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
              "data-ocid": "budget.submit_button",
              children: t.addIncome || "Ekle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowIncomeDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "budget.cancel_button",
              children: t.cancel || "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BudgetAccounting as default
};
