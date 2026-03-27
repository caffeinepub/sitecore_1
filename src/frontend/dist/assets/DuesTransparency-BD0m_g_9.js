import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as Badge, a7 as ChevronUp, G as ChevronDown, w as ChartNoAxesColumn } from "./index-CwbyKW_q.js";
import { R as ResponsiveContainer, b as Cell, T as Tooltip, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, a as Bar, L as Legend } from "./BarChart-C0wLDCoV.js";
import { P as PieChart, a as Pie } from "./PieChart-fi2k-idd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const PERIODS = [
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
        color: "#3B82F6"
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 180,
        category: "Hizmet",
        description: "Ortak alan temizliği, 6 gün/hafta",
        color: "#10B981"
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli maaş payı",
        color: "#F59E0B"
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 95,
        category: "Fatura",
        description: "Merdiven, otopark aydınlatması",
        color: "#8B5CF6"
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 60,
        category: "Hizmet",
        description: "Haftalık bahçe bakım ve sulama",
        color: "#06B6D4"
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 45,
        category: "İdari",
        description: "Kırtasiye, muhasebe, sigorta primleri",
        color: "#EF4444"
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 80,
        category: "Fon",
        description: "Acil onarım ve büyük bakım rezervi",
        color: "#F97316"
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 50,
        category: "Fatura",
        description: "Bahçe, otopark su tüketimi",
        color: "#14B8A6"
      }
    ]
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
        color: "#3B82F6"
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 175,
        category: "Hizmet",
        description: "Ortak alan temizliği",
        color: "#10B981"
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli",
        color: "#F59E0B"
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 88,
        category: "Fatura",
        description: "Ortak alan aydınlatma",
        color: "#8B5CF6"
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 55,
        category: "Hizmet",
        description: "Haftalık bahçe bakımı",
        color: "#06B6D4"
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 42,
        category: "İdari",
        description: "Genel yönetim giderleri",
        color: "#EF4444"
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 80,
        category: "Fon",
        description: "Acil onarım rezervi",
        color: "#F97316"
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 40,
        category: "Fatura",
        description: "Su tüketimi",
        color: "#14B8A6"
      }
    ]
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
        color: "#3B82F6"
      },
      {
        id: "2",
        name: "Temizlik Hizmeti",
        amount: 185,
        category: "Hizmet",
        description: "Ortak alan temizliği",
        color: "#10B981"
      },
      {
        id: "3",
        name: "Güvenlik Personeli",
        amount: 220,
        category: "Güvenlik",
        description: "7/24 güvenlik personeli",
        color: "#F59E0B"
      },
      {
        id: "4",
        name: "Elektrik (Ortak Alan)",
        amount: 110,
        category: "Fatura",
        description: "Kış ayı yüksek tüketim",
        color: "#8B5CF6"
      },
      {
        id: "5",
        name: "Bahçe Bakımı",
        amount: 40,
        category: "Hizmet",
        description: "Kış bakımı",
        color: "#06B6D4"
      },
      {
        id: "6",
        name: "Yönetim Giderleri",
        amount: 45,
        category: "İdari",
        description: "Genel yönetim giderleri",
        color: "#EF4444"
      },
      {
        id: "7",
        name: "Bakım Fonu",
        amount: 100,
        category: "Fon",
        description: "Kazan bakımı dahil",
        color: "#F97316"
      },
      {
        id: "8",
        name: "Su (Ortak Alan)",
        amount: 50,
        category: "Fatura",
        description: "Su tüketimi",
        color: "#14B8A6"
      }
    ]
  }
];
const TREND_DATA = [
  { ay: "Eki", tutar: 780 },
  { ay: "Kas", tutar: 810 },
  { ay: "Ara", tutar: 840 },
  { ay: "Oca", tutar: 870 },
  { ay: "Şub", tutar: 820 },
  { ay: "Mar", tutar: 850 }
];
function DuesTransparency(_props) {
  var _a, _b, _c, _d;
  const [selectedPeriod, setSelectedPeriod] = reactExports.useState(0);
  const [expandedItem, setExpandedItem] = reactExports.useState(null);
  const [activeView, setActiveView] = reactExports.useState("breakdown");
  const period = PERIODS[selectedPeriod];
  const compareData = period.items.map((item) => {
    var _a2;
    const prev = (_a2 = PERIODS[selectedPeriod + 1]) == null ? void 0 : _a2.items.find(
      (i) => i.id === item.id
    );
    return {
      name: item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name,
      buAy: item.amount,
      oncekiAy: (prev == null ? void 0 : prev.amount) ?? 0
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B1B2E]", children: "Aidat Kalem Şeffaflığı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Aidatınızın hangi kaleme gittiğini görün" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: selectedPeriod,
          onChange: (e) => setSelectedPeriod(Number(e.target.value)),
          className: "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white",
          children: PERIODS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i, children: p.label }, p.label))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-[#0B1B2E] to-[#1e3a5f] rounded-xl p-6 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-white/60 mb-1", children: [
          period.label,
          " Aidatı"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-bold", children: [
          period.total.toLocaleString("tr-TR"),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-white/70 mt-1", children: [
          period.items.length,
          " kalem gider"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60 mb-1", children: "Önceki Ay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-semibold", children: [
          ((_a = PERIODS[selectedPeriod + 1]) == null ? void 0 : _a.total.toLocaleString("tr-TR")) ?? "—",
          " ",
          PERIODS[selectedPeriod + 1] ? "₺" : ""
        ] }),
        PERIODS[selectedPeriod + 1] && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `text-sm mt-1 ${period.total > (((_b = PERIODS[selectedPeriod + 1]) == null ? void 0 : _b.total) ?? 0) ? "text-red-300" : "text-green-300"}`,
            children: [
              period.total > (((_c = PERIODS[selectedPeriod + 1]) == null ? void 0 : _c.total) ?? 0) ? "▲" : "▼",
              " ",
              Math.abs(
                period.total - (((_d = PERIODS[selectedPeriod + 1]) == null ? void 0 : _d.total) ?? 0)
              ),
              " ",
              "₺"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["breakdown", "trend", "compare"].map((view) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveView(view),
        className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === view ? "bg-[#2563EB] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`,
        children: view === "breakdown" ? "📊 Döküm" : view === "trend" ? "📈 Trend" : "🔀 Karşılaştırma"
      },
      view
    )) }),
    activeView === "breakdown" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-white rounded-xl p-5 border border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E] mb-4", children: "Kategori Dağılımı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: period.items,
              dataKey: "amount",
              nameKey: "name",
              cx: "50%",
              cy: "50%",
              outerRadius: 80,
              children: period.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: item.color }, item.id))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (val) => [`${val} ₺`, ""] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 bg-white rounded-xl p-5 border border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E] mb-4", children: "Gider Kalemleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: period.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gray-100 rounded-lg overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors",
                  onClick: () => setExpandedItem(expandedItem === item.id ? null : item.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-3 h-3 rounded-full",
                          style: { backgroundColor: item.color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-gray-100 text-gray-600 border-0", children: item.category })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#0B1B2E]", children: [
                        item.amount,
                        " ₺"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                        Math.round(item.amount / period.total * 100),
                        "%"
                      ] }),
                      expandedItem === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400" })
                    ] })
                  ]
                }
              ),
              expandedItem === item.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 bg-gray-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 inline mr-1" }),
                  item.description
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 bg-gray-200 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full",
                    style: {
                      width: `${item.amount / period.total * 100}%`,
                      backgroundColor: item.color
                    }
                  }
                ) })
              ] })
            ]
          },
          item.id
        )) })
      ] })
    ] }),
    activeView === "trend" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E] mb-4", children: "6 Aylık Aidat Trendi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: TREND_DATA,
          margin: { top: 5, right: 30, left: 20, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (val) => [`${val} ₺`, "Aidat"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "tutar", fill: "#2563EB", radius: [4, 4, 0, 0] })
          ]
        }
      ) })
    ] }),
    activeView === "compare" && selectedPeriod < PERIODS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0B1B2E] mb-4", children: [
        period.label,
        " vs ",
        PERIODS[selectedPeriod + 1].label,
        " ",
        "Karşılaştırması"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: compareData,
          margin: { top: 5, right: 30, left: 20, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 10 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (val) => [`${val} ₺`, ""] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "buAy",
                name: period.label,
                fill: "#2563EB",
                radius: [4, 4, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "oncekiAy",
                name: PERIODS[selectedPeriod + 1].label,
                fill: "#94A3B8",
                radius: [4, 4, 0, 0]
              }
            )
          ]
        }
      ) })
    ] }),
    activeView === "compare" && selectedPeriod >= PERIODS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-12 text-center border border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Karşılaştırma için önceki dönem verisi bulunmuyor" })
    ] })
  ] });
}
export {
  DuesTransparency as default
};
