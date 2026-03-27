import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, n as Calendar, B as Button, W as Wrench, U as Users, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, H as House, x as Package, T as TriangleAlert, e as Badge, k as TrendingUp, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-CwbyKW_q.js";
import { P as Printer } from "./printer-B2yMMgiu.js";
import { D as Download } from "./download-7uPALsuH.js";
import { D as DollarSign } from "./dollar-sign-DifRZzRb.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, b as Cell } from "./BarChart-C0wLDCoV.js";
import { P as PieChart, a as Pie } from "./PieChart-fi2k-idd.js";
import { T as TrendingDown } from "./trending-down-DykccCAe.js";
import { C as Clock } from "./clock-D82O9hiS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M22 11v1a10 10 0 1 1-9-10", key: "ew0xw9" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }],
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }]
];
const SmilePlus = createLucideIcon("smile-plus", __iconNode);
const DATE_RANGES = [
  { key: "month", label: "Bu Ay" },
  { key: "3months", label: "Son 3 Ay" },
  { key: "6months", label: "Son 6 Ay" },
  { key: "year", label: "Bu Yıl" }
];
const MONTHLY_DUES_DATA = [
  { ay: "Nis", tahsilat: 18500, hedef: 22e3 },
  { ay: "May", tahsilat: 21e3, hedef: 22e3 },
  { ay: "Haz", tahsilat: 19800, hedef: 22e3 },
  { ay: "Tem", tahsilat: 20500, hedef: 22e3 },
  { ay: "Аğu", tahsilat: 17200, hedef: 22e3 },
  { ay: "Eyl", tahsilat: 21800, hedef: 22e3 },
  { ay: "Eki", tahsilat: 22e3, hedef: 22e3 },
  { ay: "Kas", tahsilat: 19600, hedef: 22e3 },
  { ay: "Ara", tahsilat: 20900, hedef: 22e3 },
  { ay: "Oca", tahsilat: 21400, hedef: 22e3 },
  { ay: "Şub", tahsilat: 18700, hedef: 22e3 },
  { ay: "Mar", tahsilat: 22e3, hedef: 22e3 }
];
const INCOME_EXPENSE_DATA = [
  { ay: "Oca", gelir: 28e3, gider: 19500 },
  { ay: "Şub", gelir: 26500, gider: 22e3 },
  { ay: "Mar", gelir: 29e3, gider: 18e3 },
  { ay: "Nis", gelir: 27e3, gider: 21e3 },
  { ay: "May", gelir: 31e3, gider: 23500 },
  { ay: "Haz", gelir: 28500, gider: 2e4 }
];
const AGING_DATA = [
  { name: "0-30 Gün", value: 8, color: "#22c55e" },
  { name: "31-60 Gün", value: 4, color: "#F2A23A" },
  { name: "60+ Gün", value: 2, color: "#ef4444" }
];
const MAINTENANCE_DONUT_DATA = [
  { name: "Tamamlanan", value: 68, color: "#22c55e" },
  { name: "Devam Eden", value: 22, color: "#F2A23A" },
  { name: "Bekleyen", value: 10, color: "#ef4444" }
];
const OCCUPANCY_DATA = [
  { ay: "Eki", dolu: 38, bos: 2 },
  { ay: "Kas", dolu: 37, bos: 3 },
  { ay: "Ara", dolu: 39, bos: 1 },
  { ay: "Oca", dolu: 38, bos: 2 },
  { ay: "Şub", dolu: 40, bos: 0 },
  { ay: "Mar", dolu: 39, bos: 1 }
];
const PERIOD_COMPARISON_DATA = [
  { metrik: "Tahsilat %", buDonem: 94.5, gecenDonem: 92.4 },
  { metrik: "Bakım %", buDonem: 68, gecenDonem: 61 },
  { metrik: "Şikayet", buDonem: 7, gecenDonem: 11 },
  { metrik: "İş Emri", buDonem: 12, gecenDonem: 15 },
  { metrik: "Ziyaretçi", buDonem: 127, gecenDonem: 113 },
  { metrik: "Doluluk %", buDonem: 97.5, gecenDonem: 95 }
];
const STAFF_PERFORMANCE_DATA = [
  {
    ad: "Ahmet Y.",
    gorev: "Teknik",
    tamamlanan: 24,
    ortSure: "2.1 gün",
    puan: 4.7
  },
  {
    ad: "Mehmet K.",
    gorev: "Temizlik",
    tamamlanan: 31,
    ortSure: "0.5 gün",
    puan: 4.4
  },
  {
    ad: "Ayşe D.",
    gorev: "Güvenlik",
    tamamlanan: 18,
    ortSure: "1.2 gün",
    puan: 3.9
  },
  {
    ad: "Fatma S.",
    gorev: "Yönetim",
    tamamlanan: 42,
    ortSure: "3.0 gün",
    puan: 4.8
  },
  {
    ad: "Can T.",
    gorev: "Bahçe",
    tamamlanan: 15,
    ortSure: "1.8 gün",
    puan: 3.2
  }
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
      ["Geciken Ödeme (Daire)", "14"]
    ]
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
      ["Geciken Bakım", "3"]
    ]
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
      ["Ort. Yanıt Süresi", "4.2 saat"]
    ]
  }
];
function KPICard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  trend,
  trendValue,
  trendColor
}) {
  const tc = trendColor === "orange" ? "text-orange-500" : trend === "up" ? "text-green-600" : "text-red-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` })
        }
      ),
      trend && trendValue && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `flex items-center gap-0.5 text-xs font-semibold ${tc}`,
          children: [
            trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
            trendValue
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: label })
  ] });
}
function ReportingCenter({ buildingId, t: _t }) {
  const [dateRange, setDateRange] = reactExports.useState("month");
  const [dateStart, setDateStart] = reactExports.useState("");
  const [dateEnd, setDateEnd] = reactExports.useState("");
  const [exportModal, setExportModal] = reactExports.useState(false);
  const [exportTemplate, setExportTemplate] = reactExports.useState(null);
  const apartments = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(`sitecore_apartments_${buildingId}`) || "[]"
      );
    } catch {
      return [];
    }
  })();
  const packages = (() => {
    try {
      return JSON.parse(
        localStorage.getItem(`sitecore_packages_${buildingId}`) || "[]"
      );
    } catch {
      return [];
    }
  })();
  const totalApartments = apartments.length || 40;
  const occupiedApartments = apartments.filter((a) => a.status === "occupied").length || 39;
  const pendingPackages = packages.filter((p) => p.status === "pending").length || 3;
  const openExport = (tpl) => {
    setExportTemplate(tpl);
    setExportModal(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Raporlama & Analitik Merkezi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-0.5", children: "Bina performans özeti ve detaylı analizler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-[#F3F6FB] rounded-full p-1", children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDateRange(r.key),
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${dateRange === r.key ? "bg-[#0B1B2E] text-white" : "text-[#6B7A8D] hover:text-[#0E1116]"}`,
            "data-ocid": "reporting.tab",
            children: r.label
          },
          r.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border border-[#E5EAF2] rounded-full px-3 py-1.5 bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-[#6B7A8D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: dateStart,
              onChange: (e) => setDateStart(e.target.value),
              className: "text-xs text-[#3A4654] bg-transparent outline-none w-28",
              "data-ocid": "reporting.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: dateEnd,
              onChange: (e) => setDateEnd(e.target.value),
              className: "text-xs text-[#3A4654] bg-transparent outline-none w-28"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2 rounded-full border-[#E5EAF2]",
            onClick: () => window.print(),
            "data-ocid": "reporting.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
              "Yazdır"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-2 rounded-full bg-[#0B1B2E] text-white",
            onClick: () => {
              setExportTemplate(null);
              setExportModal(true);
            },
            "data-ocid": "reporting.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Dışa Aktar"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: TEMPLATES.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => openExport(tpl),
        className: "bg-white rounded-xl border border-[#E5EAF2] p-4 text-left hover:border-[#4A90D9] hover:shadow-sm transition-all",
        "data-ocid": "reporting.button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tpl.icon, { className: `w-5 h-5 ${tpl.color}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: tpl.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: tpl.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-[#4A90D9]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Raporu Oluştur" })
          ] })
        ]
      },
      tpl.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "genel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB] rounded-xl mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "genel", "data-ocid": "reporting.tab", children: "Genel Özet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "finansal", "data-ocid": "reporting.tab", children: "Finansal Rapor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "teknik", "data-ocid": "reporting.tab", children: "Teknik Rapor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sakin", "data-ocid": "reporting.tab", children: "Sakin & Bina" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "performans", "data-ocid": "reporting.tab", children: "Performans" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "genel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Toplam Daire",
              value: totalApartments,
              icon: House,
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              trend: "up",
              trendValue: "+2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Geciken Aidat",
              value: "14",
              icon: DollarSign,
              color: "text-red-600",
              bgColor: "bg-red-50",
              trend: "down",
              trendValue: "-3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Tahsilat Oranı",
              value: "%94",
              icon: DollarSign,
              color: "text-purple-600",
              bgColor: "bg-purple-50",
              trend: "up",
              trendValue: "+5%"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Açık Arızalar",
              value: "7",
              icon: Wrench,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
              trend: "down",
              trendValue: "-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Bekleyen Paket",
              value: pendingPackages,
              icon: Package,
              color: "text-yellow-600",
              bgColor: "bg-yellow-50"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Toplam Sakin",
              value: occupiedApartments,
              icon: TriangleAlert,
              color: "text-red-600",
              bgColor: "bg-red-50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Gelir - Gider Özeti (Son 6 Ay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: INCOME_EXPENSE_DATA, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 12 },
                  tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (v) => [
                    `₺${v.toLocaleString("tr-TR")}`,
                    ""
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "gelir",
                  name: "Gelir",
                  fill: "#22c55e",
                  radius: [4, 4, 0, 0]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "gider",
                  name: "Gider",
                  fill: "#ef4444",
                  radius: [4, 4, 0, 0]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Borç Yaşlandırma Dağılımı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: AGING_DATA,
                  cx: "50%",
                  cy: "50%",
                  outerRadius: 80,
                  dataKey: "value",
                  label: ({ name, value }) => `${name}: ${value}`,
                  children: AGING_DATA.map((entry, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, index)
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 mt-2 justify-center", children: AGING_DATA.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-3 h-3 rounded-full",
                  style: { backgroundColor: d.color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                d.name,
                ":",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0E1116]", children: [
                  d.value,
                  " daire"
                ] })
              ] })
            ] }, d.name)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "finansal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Aidat Tahsilat Grafiği (12 Ay)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: MONTHLY_DUES_DATA, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 12 },
                tickFormatter: (v) => `₺${(v / 1e3).toFixed(0)}k`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                formatter: (v) => [`₺${v.toLocaleString("tr-TR")}`, ""]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "tahsilat",
                name: "Tahsilat",
                fill: "#0B1B2E",
                radius: [4, 4, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "hedef",
                name: "Hedef",
                fill: "#E5EAF2",
                radius: [4, 4, 0, 0]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Toplam Tahsilat (Bu Ay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: "₺22.000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2 bg-green-50 text-green-700 border-0", children: "Hedef Tutturuldu" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Toplam Gider (Bu Ay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-500", children: "₺18.400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2 bg-red-50 text-red-600 border-0", children: "Bütçe Dahilinde" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Net Bakiye" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: "₺3.600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2 bg-blue-50 text-blue-600 border-0", children: "Fon Birikimi" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "teknik", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Bakım Tamamlanma Oranı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: MAINTENANCE_DONUT_DATA,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 55,
                  outerRadius: 85,
                  dataKey: "value",
                  children: MAINTENANCE_DONUT_DATA.map((entry, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: recharts Cell
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, index)
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [`%${v}`, ""] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 justify-center", children: MAINTENANCE_DONUT_DATA.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-3 h-3 rounded-full",
                  style: { backgroundColor: d.color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                d.name,
                ":",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                  d.value,
                  "%"
                ] })
              ] })
            ] }, d.name)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Ekipman Durum Özeti" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              { name: "Asansör A", status: "Çalışıyor", color: "green" },
              { name: "Asansör B", status: "Bakımda", color: "orange" },
              {
                name: "Kalorifer Kazanı",
                status: "Çalışıyor",
                color: "green"
              },
              { name: "Jeneratir", status: "Çalışıyor", color: "green" },
              { name: "Su Pompası", status: "Arızalı", color: "red" },
              {
                name: "Güvenlik Sistemi",
                status: "Çalışıyor",
                color: "green"
              }
            ].map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-2 border-b border-[#F3F6FB] last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#0E1116]", children: eq.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${eq.color === "green" ? "bg-green-50 text-green-700" : eq.color === "orange" ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"} border-0 text-xs`,
                      children: eq.status
                    }
                  )
                ]
              },
              eq.name
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#0B1B2E]", children: "4.2 gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Ort. Arıza Çözüm Süresi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: "%68" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Bakım Tamamlanma" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-orange-500", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Geciken Bakım" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "sakin", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Doluluk Trendi (Son 6 Ay)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: OCCUPANCY_DATA, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "dolu",
                name: "Dolu Daire",
                fill: "#0B1B2E",
                radius: [4, 4, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "bos",
                name: "Boş Daire",
                fill: "#E5EAF2",
                radius: [4, 4, 0, 0]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Aylık Ziyaretçi Sayısı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: "127" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-green-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-green-600", children: "+12% geçen aya göre" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Araç Park Doluluk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: "%82" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-orange-600", children: "+5% geçen aya göre" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mb-1", children: "Taşınan Daire (Bu Ay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3 text-blue-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-blue-600", children: "-1 geçen aya göre" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "performans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Açık İş Emirleri",
              value: "7",
              icon: Wrench,
              color: "text-orange-600",
              bgColor: "bg-orange-50",
              trend: "up",
              trendValue: "+2 geçen ay",
              trendColor: "orange"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Ort. Çözüm Süresi",
              value: "3.8 gün",
              icon: Clock,
              color: "text-green-600",
              bgColor: "bg-green-50",
              trend: "down",
              trendValue: "-0.4 gün iyileşme",
              trendColor: "green"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Tahsilat Oranı",
              value: "%94.5",
              icon: DollarSign,
              color: "text-green-600",
              bgColor: "bg-green-50",
              trend: "up",
              trendValue: "+%2.1 geçen ay",
              trendColor: "green"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Sakin Memnuniyeti",
              value: "4.2 / 5",
              icon: SmilePlus,
              color: "text-green-600",
              bgColor: "bg-green-50",
              trend: "up",
              trendValue: "+0.3 geçen ay",
              trendColor: "green"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E5EAF2] mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Dönem Karşılaştırması (Bu Ay vs Geçen Ay)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: PERIOD_COMPARISON_DATA,
              margin: { top: 4, right: 16, left: 0, bottom: 4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "metrik", tick: { fontSize: 11 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "buDonem",
                    name: "Bu Dönem",
                    fill: "#0B1B2E",
                    radius: [4, 4, 0, 0]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "gecenDonem",
                    name: "Geçen Dönem",
                    fill: "#CBD5E1",
                    radius: [4, 4, 0, 0]
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-[#E5EAF2] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Personel Performans Özeti" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-[#6B7A8D] font-medium", children: "Ad Soyad" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-[#6B7A8D] font-medium", children: "Görev" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 text-[#6B7A8D] font-medium", children: "Tamamlanan İş" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 text-[#6B7A8D] font-medium", children: "Ort. Süre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-5 py-3 text-[#6B7A8D] font-medium", children: "Puan" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#F3F6FB]", children: STAFF_PERFORMANCE_DATA.map((s, i) => {
              const puanColor = s.puan >= 4.5 ? "bg-green-50 text-green-700" : s.puan >= 3.5 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-[#FAFBFD] transition-colors",
                  "data-ocid": `reporting.row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-[#0E1116]", children: s.ad }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-[#6B7A8D]", children: s.gorev }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-center font-semibold text-[#0B1B2E]", children: s.tamamlanan }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-center text-[#6B7A8D]", children: s.ortSure }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: `${puanColor} border-0 font-semibold`,
                        children: [
                          "★ ",
                          s.puan.toFixed(1)
                        ]
                      }
                    ) })
                  ]
                },
                i
              );
            }) })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: exportModal, onOpenChange: setExportModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", "data-ocid": "reporting.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: exportTemplate ? exportTemplate.title : "Rapor Seç" }) }) }),
      !exportTemplate ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: TEMPLATES.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setExportTemplate(tpl),
          className: "bg-[#F3F6FB] rounded-xl p-4 text-left hover:bg-[#E5EAF2] transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tpl.icon, { className: `w-5 h-5 ${tpl.color} mb-2` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: tpl.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: tpl.desc })
          ]
        },
        tpl.key
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: exportTemplate.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#E5EAF2] rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B1B2E] text-white px-4 py-2 text-sm font-semibold", children: [
            exportTemplate.title,
            " —",
            " ",
            dateRange === "month" ? "Bu Ay" : dateRange === "year" ? "Bu Yıl" : dateRange === "3months" ? "Son 3 Ay" : "Son 6 Ay"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-[#6B7A8D] font-medium", children: "Gösterge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-[#6B7A8D] font-medium", children: "Değer" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#F3F6FB]", children: exportTemplate.rows.map(([label, value], i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static rows
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-[#FAFBFD]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-[#3A4654]", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-semibold text-[#0E1116]", children: value })
              ] }, i)
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setExportTemplate(null),
              "data-ocid": "reporting.cancel_button",
              children: "← Geri"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-[#0B1B2E] text-white",
              onClick: () => {
                setExportModal(false);
                setExportTemplate(null);
              },
              "data-ocid": "reporting.confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                " İndir"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ReportingCenter as default
};
