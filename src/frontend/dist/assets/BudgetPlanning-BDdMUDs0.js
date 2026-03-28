import { r as reactExports, j as jsxRuntimeExports, l as ChartPie, I as Input, e as Badge, T as TriangleAlert } from "./index-huPFjtKr.js";
import { P as Progress } from "./progress-Yb2aJa0v.js";
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
const KEY = (id) => `sitecore_budget_plan_${id}`;
const DEFAULT_CATEGORIES = {
  Bakım: 25,
  Temizlik: 15,
  Güvenlik: 20,
  Personel: 25,
  Altyapı: 10,
  Diğer: 5
};
function makeDefaultMonths(total) {
  const base = Math.round(total / 12);
  const actuals = [98e3, 95e3, 102e3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return MONTHS.map((_, i) => ({ planned: base, actual: actuals[i] || 0 }));
}
function BudgetPlanning({ buildingId, isOwner }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const [budget, setBudget] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return {
      year: currentYear,
      totalBudget: 12e5,
      months: makeDefaultMonths(12e5),
      categories: DEFAULT_CATEGORIES
    };
  });
  const [totalInput, setTotalInput] = reactExports.useState(String(budget.totalBudget));
  const save = (b) => {
    setBudget(b);
    localStorage.setItem(KEY(buildingId), JSON.stringify(b));
  };
  const handleTotalChange = () => {
    const val = Number(totalInput);
    if (!val || val <= 0) return;
    save({ ...budget, totalBudget: val, months: makeDefaultMonths(val) });
  };
  const handleActualChange = (index, val) => {
    const months = [...budget.months];
    months[index] = { ...months[index], actual: Number(val) || 0 };
    save({ ...budget, months });
  };
  const handlePlannedChange = (index, val) => {
    const months = [...budget.months];
    months[index] = { ...months[index], planned: Number(val) || 0 };
    save({ ...budget, months });
  };
  const handleCategoryChange = (cat, val) => {
    save({
      ...budget,
      categories: { ...budget.categories, [cat]: Number(val) || 0 }
    });
  };
  const totalActual = budget.months.reduce((s, m) => s + m.actual, 0);
  const totalPlanned = budget.months.reduce((s, m) => s + m.planned, 0);
  const percentUsed = budget.totalBudget > 0 ? Math.round(totalActual / budget.totalBudget * 100) : 0;
  const healthColor = percentUsed <= 80 ? "text-green-600" : percentUsed <= 100 ? "text-yellow-600" : "text-red-600";
  const catTotal = Object.values(budget.categories).reduce((s, v) => s + v, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-6 h-6 text-[#0B1B2E]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Bütçe Planlama & Projeksiyon" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] mb-4", children: [
        budget.year,
        " Yılı Bütçe Özeti"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Yıllık Bütçe (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: totalInput,
                onChange: (e) => setTotalInput(e.target.value),
                disabled: !isOwner
              }
            ),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleTotalChange,
                className: "px-3 py-1 bg-[#4A90D9] text-white text-sm rounded-lg",
                children: "Uygula"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Gerçekleşen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: [
            "₺",
            totalActual.toLocaleString("tr-TR")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Kullanım Oranı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-2xl font-bold ${healthColor}`, children: [
            "%",
            percentUsed
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: Math.min(percentUsed, 100), className: "h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₺0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "₺",
          budget.totalBudget.toLocaleString("tr-TR")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Kategori Dağılımı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: `border-0 ${catTotal === 100 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
            children: [
              "Toplam: %",
              catTotal
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: Object.entries(budget.categories).map(([cat, pct]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: cat }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: pct,
              onChange: (e) => handleCategoryChange(cat, e.target.value),
              className: "h-7 text-sm w-16",
              type: "number",
              min: "0",
              max: "100"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-[#0B1B2E]", children: pct }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654] font-medium", children: "%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1", children: [
          "≈ ₺",
          Math.round(budget.totalBudget * pct / 100).toLocaleString(
            "tr-TR"
          )
        ] })
      ] }, cat)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Aylık Döküm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#E5EAF2]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-[#6B7A8D] font-medium", children: "Ay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-[#6B7A8D] font-medium", children: "Planlanan (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-[#6B7A8D] font-medium", children: "Gerçekleşen (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-[#6B7A8D] font-medium", children: "Sapma" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          budget.months.map((m, i) => {
            const variance = m.actual - m.planned;
            const over = m.actual > 0 && variance / m.planned > 0.1;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-[#F3F6FB] ${over ? "bg-red-50" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-medium text-[#0E1116]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    MONTHS[i],
                    over && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-red-500" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: m.planned,
                      onChange: (e) => handlePlannedChange(i, e.target.value),
                      className: "h-7 text-xs text-right w-28 ml-auto",
                      type: "number"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.planned.toLocaleString("tr-TR") }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: m.actual || "",
                      onChange: (e) => handleActualChange(i, e.target.value),
                      className: "h-7 text-xs text-right w-28 ml-auto",
                      type: "number",
                      placeholder: "0"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: `py-2 text-right font-medium ${m.actual === 0 ? "text-[#6B7A8D]" : variance > 0 ? "text-red-600" : "text-green-600"}`,
                      children: m.actual === 0 ? "-" : `${variance > 0 ? "+" : ""}${variance.toLocaleString("tr-TR")}`
                    }
                  )
                ]
              },
              MONTHS[i]
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: "Toplam" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: totalPlanned.toLocaleString("tr-TR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: totalActual.toLocaleString("tr-TR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: `py-2 text-right ${totalActual - totalPlanned > 0 ? "text-red-600" : "text-green-600"}`,
                children: totalActual > 0 ? `${totalActual - totalPlanned > 0 ? "+" : ""}${(totalActual - totalPlanned).toLocaleString("tr-TR")}` : "-"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  BudgetPlanning as default
};
