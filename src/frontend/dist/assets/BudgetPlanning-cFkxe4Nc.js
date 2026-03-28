import { r as reactExports, j as jsxRuntimeExports, l as ChartPie, k as TrendingUp, m as Calendar, I as Input, e as Badge, T as TriangleAlert } from "./index-5GfTJQeF.js";
import { P as Progress } from "./progress-Ct9_AiFT.js";
import { C as ChartColumn } from "./chart-column-DH9WoNRP.js";
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
const EXPENSE_ITEMS = {
  Bakım: [
    {
      name: "Asansör Bakımı",
      planned: 18e3,
      actual: 17500,
      date: "2025-03-15",
      status: "Ödendi"
    },
    {
      name: "Kazan Servisi",
      planned: 12e3,
      actual: 11800,
      date: "2025-03-20",
      status: "Ödendi"
    },
    {
      name: "Bahçe Bakımı",
      planned: 8e3,
      actual: 0,
      date: "2025-04-01",
      status: "Bekliyor"
    },
    {
      name: "Boya-Badana",
      planned: 25e3,
      actual: 0,
      date: "2025-05-01",
      status: "Bekliyor"
    }
  ],
  Temizlik: [
    {
      name: "Temizlik Malzemeleri",
      planned: 4500,
      actual: 4200,
      date: "2025-03-10",
      status: "Ödendi"
    },
    {
      name: "Temizlik Personeli",
      planned: 12e3,
      actual: 12e3,
      date: "2025-03-31",
      status: "Ödendi"
    },
    {
      name: "Dezenfeksiyon",
      planned: 3e3,
      actual: 0,
      date: "2025-04-15",
      status: "Bekliyor"
    }
  ],
  Güvenlik: [
    {
      name: "Güvenlik Personeli",
      planned: 24e3,
      actual: 24e3,
      date: "2025-03-31",
      status: "Ödendi"
    },
    {
      name: "Kamera Bakımı",
      planned: 5e3,
      actual: 4800,
      date: "2025-02-28",
      status: "Ödendi"
    },
    {
      name: "Alarm Sistemi",
      planned: 3500,
      actual: 0,
      date: "2025-04-20",
      status: "Bekliyor"
    },
    {
      name: "Güvenlik Yazılımı",
      planned: 2e3,
      actual: 0,
      date: "2025-06-01",
      status: "İptal"
    }
  ],
  Personel: [
    {
      name: "Kapıcı Maaşı",
      planned: 18e3,
      actual: 18e3,
      date: "2025-03-31",
      status: "Ödendi"
    },
    {
      name: "Yönetici Ücreti",
      planned: 12e3,
      actual: 12e3,
      date: "2025-03-31",
      status: "Ödendi"
    },
    {
      name: "SGK Primleri",
      planned: 9e3,
      actual: 8900,
      date: "2025-03-25",
      status: "Ödendi"
    }
  ],
  Altyapı: [
    {
      name: "Su Borusu Tamiri",
      planned: 8e3,
      actual: 7600,
      date: "2025-02-10",
      status: "Ödendi"
    },
    {
      name: "Elektrik Tesisatı",
      planned: 6e3,
      actual: 0,
      date: "2025-05-15",
      status: "Bekliyor"
    },
    {
      name: "Isı Yalıtımı",
      planned: 15e3,
      actual: 0,
      date: "2025-06-01",
      status: "Bekliyor"
    }
  ],
  Diğer: [
    {
      name: "Sigorta Ödemeleri",
      planned: 9500,
      actual: 9500,
      date: "2025-01-15",
      status: "Ödendi"
    },
    {
      name: "Yasal Danışmanlık",
      planned: 3e3,
      actual: 0,
      date: "2025-04-30",
      status: "Bekliyor"
    },
    {
      name: "Ofis Giderleri",
      planned: 1500,
      actual: 1200,
      date: "2025-03-31",
      status: "Ödendi"
    }
  ]
};
const YEAR_DATA = [
  { year: 2023, budget: 11e5, actual: 1085e3 },
  { year: 2024, budget: 115e4, actual: 1198e3 },
  { year: 2025, budget: 12e5, actual: 31e4, inProgress: true }
];
const CAT_COLORS = {
  Bakım: "#4A90D9",
  Temizlik: "#52B788",
  Güvenlik: "#E67E22",
  Personel: "#9B59B6",
  Altyapı: "#E74C3C",
  Diğer: "#95A5A6"
};
function healthScore(pct) {
  if (pct <= 90) return { grade: "A", color: "#166534", bgColor: "#DCFCE7" };
  if (pct <= 100) return { grade: "B", color: "#14532D", bgColor: "#BBF7D0" };
  if (pct <= 110) return { grade: "C", color: "#713F12", bgColor: "#FEF08A" };
  return { grade: "F", color: "#7F1D1D", bgColor: "#FEE2E2" };
}
function BudgetPlanning({ buildingId, isOwner }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const [activeTab, setActiveTab] = reactExports.useState("genel");
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
  const catTotal = Object.values(budget.categories).reduce((s, v) => s + v, 0);
  const health = healthScore(percentUsed);
  const completedMonths = budget.months.filter((m) => m.actual > 0);
  const avgMonthly = completedMonths.length > 0 ? completedMonths.reduce((s, m) => s + m.actual, 0) / completedMonths.length : 0;
  const remainingMonths = 12 - completedMonths.length;
  const projectedTotal = totalActual + avgMonthly * remainingMonths;
  const projectedVariance = projectedTotal - budget.totalBudget;
  const projectedPct = budget.totalBudget > 0 ? Math.round(projectedTotal / budget.totalBudget * 100) : 0;
  const maxBar = Math.max(projectedTotal, budget.totalBudget) * 1.1;
  const tabs = [
    { id: "genel", label: "Genel Bakış", icon: ChartPie },
    { id: "gider", label: "Gider Kalemleri", icon: ChartColumn },
    { id: "projeksiyon", label: "Projeksiyon", icon: TrendingUp },
    { id: "karsilastirma", label: "Yıl Karşılaştırması", icon: Calendar }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-6 h-6 text-[#0B1B2E]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Bütçe Planlama & Projeksiyon" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-[#F3F6FB] rounded-xl p-1 overflow-x-auto", children: tabs.map((tab) => {
      const Icon = tab.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `budget.${tab.id}.tab`,
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white text-[#0B1B2E] shadow-sm" : "text-[#6B7A8D] hover:text-[#0B1B2E]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
            tab.label
          ]
        },
        tab.id
      );
    }) }),
    activeTab === "genel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Bütçe Sağlığı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0",
              style: { backgroundColor: health.bgColor },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-4xl font-bold",
                  style: { color: health.color },
                  children: health.grade
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Kullanım Oranı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-[#0B1B2E]", children: [
                "%",
                percentUsed
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: percentUsed <= 90 ? "İdeal" : percentUsed <= 100 ? "Dikkat" : "Aşım" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Sapma Durumu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xl font-bold ${totalActual - totalPlanned <= 0 ? "text-green-600" : "text-red-600"}`,
                  children: totalActual > 0 ? `${totalActual - totalPlanned > 0 ? "+" : ""}₺${Math.abs(totalActual - totalPlanned).toLocaleString("tr-TR")}` : "—"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "Planlamaya göre" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Tahmini Kapanış" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-xl font-bold ${projectedVariance <= 0 ? "text-green-600" : "text-red-600"}`,
                  children: [
                    "%",
                    projectedPct
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "Yıl sonu tahmini" })
            ] })
          ] })
        ] })
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
                  "data-ocid": "budget.apply.button",
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-2xl font-bold",
                style: { color: health.color },
                children: [
                  "%",
                  percentUsed
                ]
              }
            )
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2.5 h-2.5 rounded-full",
                style: { backgroundColor: CAT_COLORS[cat] ?? "#4A90D9" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: cat })
          ] }),
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
            Math.round(
              budget.totalBudget * pct / 100
            ).toLocaleString("tr-TR")
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
    ] }),
    activeTab === "gider" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.entries(EXPENSE_ITEMS).map(([cat, items]) => {
      const catColor = CAT_COLORS[cat] ?? "#4A90D9";
      const catPlanned = items.reduce((s, it) => s + it.planned, 0);
      const catActual = items.reduce((s, it) => s + it.actual, 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 px-5 py-3.5",
                style: { borderLeft: `4px solid ${catColor}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-3 h-3 rounded-full",
                      style: { backgroundColor: catColor }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: cat }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-[#6B7A8D]", children: [
                      "Planlanan: ₺",
                      catPlanned.toLocaleString("tr-TR")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-[#0B1B2E]", children: [
                      "Gerçekleşen: ₺",
                      catActual.toLocaleString("tr-TR")
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 text-[#6B7A8D] font-medium", children: "Kalem Adı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-[#6B7A8D] font-medium", children: "Planlanan (₺)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-[#6B7A8D] font-medium", children: "Gerçekleşen (₺)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-[#6B7A8D] font-medium", children: "Tarih" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-2.5 text-[#6B7A8D] font-medium", children: "Durum" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-t border-[#F3F6FB] hover:bg-[#F9FAFB]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-[#0E1116]", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-[#0B1B2E]", children: [
                        "₺",
                        item.planned.toLocaleString("tr-TR")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          defaultValue: item.actual || "",
                          className: "h-7 text-xs text-right w-28 ml-auto",
                          type: "number",
                          placeholder: "0"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-[#6B7A8D] text-xs", children: item.date }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Ödendi" ? "bg-green-100 text-green-700" : item.status === "Bekliyor" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500 line-through"}`,
                          children: item.status
                        }
                      ) })
                    ]
                  },
                  item.name
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-[#E5EAF2] bg-[#F3F6FB] font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-[#0B1B2E]", children: "Kategori Toplamı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-[#0B1B2E]", children: [
                    "₺",
                    catPlanned.toLocaleString("tr-TR")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: catActual > catPlanned ? "text-red-600" : "text-green-600",
                      children: [
                        "₺",
                        catActual.toLocaleString("tr-TR")
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-medium ${catActual > catPlanned ? "text-red-600" : "text-green-600"}`,
                      children: catActual > catPlanned ? `+₺${(catActual - catPlanned).toLocaleString("tr-TR")} aşım` : `₺${(catPlanned - catActual).toLocaleString("tr-TR")} tasarruf`
                    }
                  ) })
                ] })
              ] })
            ] }) })
          ]
        },
        cat
      );
    }) }),
    activeTab === "projeksiyon" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        {
          label: "Gerçekleşen Toplam",
          value: `₺${totalActual.toLocaleString("tr-TR")}`,
          sub: `${completedMonths.length} ay`,
          color: "text-[#0B1B2E]"
        },
        {
          label: "Projeksiyon Tahmini",
          value: `₺${Math.round(projectedTotal).toLocaleString("tr-TR")}`,
          sub: "Yıl sonu",
          color: projectedVariance > 0 ? "text-red-600" : "text-green-600"
        },
        {
          label: "Bütçe Hedefi",
          value: `₺${budget.totalBudget.toLocaleString("tr-TR")}`,
          sub: String(budget.year),
          color: "text-[#0B1B2E]"
        },
        {
          label: "Beklenen Fark",
          value: `${projectedVariance > 0 ? "+" : ""}₺${Math.abs(Math.round(projectedVariance)).toLocaleString("tr-TR")}`,
          sub: projectedVariance > 0 ? "Aşım bekleniyor" : "Tasarruf bekleniyor",
          color: projectedVariance > 0 ? "text-red-600" : "text-green-600"
        }
      ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: card.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold ${card.color}`, children: card.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: card.sub })
          ]
        },
        card.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Tahmini Bütçe Kullanımı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-sm font-semibold ${projectedPct > 100 ? "text-red-600" : "text-green-600"}`,
              children: [
                "%",
                projectedPct
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-6 bg-[#F3F6FB] rounded-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-all",
              style: {
                width: `${Math.min(projectedPct, 100)}%`,
                background: projectedPct > 100 ? "#EF4444" : projectedPct > 90 ? "#F59E0B" : "#4A90D9"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 bottom-0 w-0.5 bg-red-500",
              style: { left: "100%", transform: "translateX(-100%)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₺0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-500 font-medium", children: [
            "Bütçe Limiti: ₺",
            budget.totalBudget.toLocaleString("tr-TR")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Aylık Harcama Grafiği" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-40", children: budget.months.map((m, i) => {
          const isCompleted = m.actual > 0;
          const value = isCompleted ? m.actual : Math.round(avgMonthly);
          const heightPct = maxBar > 0 ? value / maxBar * 100 : 0;
          const budgetLinePct = maxBar > 0 ? budget.totalBudget / 12 / maxBar * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative w-full flex items-end",
                    style: { height: "120px" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute left-0 right-0 border-t border-dashed border-red-400 z-10",
                          style: { bottom: `${budgetLinePct}%` }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-full rounded-t-md transition-all ${isCompleted ? "" : "opacity-50"}`,
                          style: {
                            height: `${Math.max(heightPct, 2)}%`,
                            background: isCompleted ? "#4A90D9" : "#A8C8EC",
                            borderTop: isCompleted ? "none" : "2px dashed #4A90D9"
                          }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-[#6B7A8D] text-center leading-tight", children: MONTHS[i].slice(0, 3) })
              ]
            },
            `proj-bar-${MONTHS[i]}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-[#4A90D9]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Gerçekleşen" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-[#A8C8EC] border border-dashed border-[#4A90D9]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Projeksiyon" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 border-t border-dashed border-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Aylık Bütçe Limiti" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Aylık Detay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 text-[#6B7A8D] font-medium", children: "Ay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 text-[#6B7A8D] font-medium", children: "Tutar (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2 text-[#6B7A8D] font-medium", children: "Tür" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: budget.months.map((m, i) => {
            const isCompleted = m.actual > 0;
            const value = isCompleted ? m.actual : Math.round(avgMonthly);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-[#F3F6FB]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-medium text-[#0E1116]", children: MONTHS[i] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-[#0B1B2E]", children: [
                    "₺",
                    value.toLocaleString("tr-TR")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isCompleted ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`,
                      children: isCompleted ? "Gerçekleşen" : "Projeksiyon"
                    }
                  ) })
                ]
              },
              `proj-row-${MONTHS[i]}`
            );
          }) })
        ] }) })
      ] })
    ] }),
    activeTab === "karsilastirma" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-5", children: "Yıllık Bütçe vs Gerçekleşen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-around gap-6 h-52", children: YEAR_DATA.map((yd) => {
          const maxVal = Math.max(
            ...YEAR_DATA.map((d) => Math.max(d.budget, d.actual))
          ) * 1.1;
          const budgetH = yd.budget / maxVal * 100;
          const actualH = yd.actual / maxVal * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-2 flex-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-end gap-2 w-full justify-center",
                    style: { height: "160px" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D] font-medium", children: [
                          "₺",
                          (yd.budget / 1e3).toFixed(0),
                          "K"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-12 rounded-t-md bg-[#4A90D9]",
                            style: { height: `${budgetH}%` }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `text-xs font-medium ${yd.actual > yd.budget ? "text-red-500" : "text-green-600"}`,
                            children: [
                              "₺",
                              (yd.actual / 1e3).toFixed(0),
                              "K"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-12 rounded-t-md ${yd.actual > yd.budget ? "bg-red-400" : "bg-[#52B788]"} ${yd.inProgress ? "opacity-60" : ""}`,
                            style: {
                              height: `${actualH}%`,
                              borderTop: yd.inProgress ? "2px dashed #52B788" : "none"
                            }
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0B1B2E] text-sm", children: yd.year }),
                  yd.inProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full", children: "Devam ediyor" })
                ] })
              ]
            },
            yd.year
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 justify-center mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-[#4A90D9]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Bütçe" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-[#52B788]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Gerçekleşen" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Aşım" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Yıllık Özet Tablosu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 text-[#6B7A8D] font-medium", children: "Yıl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 text-[#6B7A8D] font-medium", children: "Bütçe (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 text-[#6B7A8D] font-medium", children: "Gerçekleşen (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 text-[#6B7A8D] font-medium", children: "Fark (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2.5 text-[#6B7A8D] font-medium", children: "Performans" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: YEAR_DATA.map((yd) => {
            const variance = yd.actual - yd.budget;
            const pct = Math.round(yd.actual / yd.budget * 100);
            const perf = healthScore(pct);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-[#F3F6FB] hover:bg-[#F9FAFB]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-semibold text-[#0B1B2E]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    yd.year,
                    yd.inProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full", children: "Devam" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right text-[#0B1B2E]", children: [
                    "₺",
                    yd.budget.toLocaleString("tr-TR")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right text-[#0B1B2E]", children: [
                    "₺",
                    yd.actual.toLocaleString("tr-TR")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: `py-3 text-right font-medium ${variance > 0 ? "text-red-600" : "text-green-600"}`,
                      children: [
                        variance > 0 ? "+" : "",
                        "₺",
                        variance.toLocaleString("tr-TR")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold",
                      style: {
                        backgroundColor: perf.bgColor,
                        color: perf.color
                      },
                      children: perf.grade
                    }
                  ) })
                ]
              },
              yd.year
            );
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Yıllık Trendler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Bütçe Büyümesi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[#0B1B2E]", children: "+%9.1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "2023–2025 arası" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "En Verimli Yıl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-600", children: "2023" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "%98.6 kullanım" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1", children: "Ortalama Sapma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-red-500", children: "+%2.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: "Son 2 yıl ortalaması" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  BudgetPlanning as default
};
