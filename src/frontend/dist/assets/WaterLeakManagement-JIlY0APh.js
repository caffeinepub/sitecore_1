import { r as reactExports, j as jsxRuntimeExports, B as Button, aD as Droplets, T as TriangleAlert, k as TrendingUp, W as Wrench, e as Badge } from "./index-CN7AkLBl.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DbAPgkYC.js";
import { P as Progress } from "./progress-BzNVYDxO.js";
import { T as TrendingDown } from "./trending-down-_wqdk4xM.js";
import { C as CircleCheckBig } from "./circle-check-big-DqCfhhFd.js";
import { C as Clock } from "./clock-CDrKT4Og.js";
import { C as CircleX } from "./circle-x-A0QGGS2q.js";
const leakReports = [
  {
    id: "L001",
    location: "Bodrum Kat - Su Deposu",
    type: "Depo Sızıntısı",
    severity: "critical",
    status: "investigating",
    reportedBy: "Ahmet Yılmaz",
    reportedDate: "2026-03-15",
    estimatedLoss: 250,
    description: "Su deposunda ciddi sızıntı tespit edildi, acil müdahale gerekiyor."
  },
  {
    id: "L002",
    location: "4. Kat - Ortak Koridor",
    type: "Boru Patlaması",
    severity: "high",
    status: "repaired",
    reportedBy: "Fatma Kaya",
    reportedDate: "2026-03-10",
    resolvedDate: "2026-03-12",
    estimatedLoss: 80,
    description: "Koridor borusunda patlama, hızlı müdahale ile onarıldı."
  },
  {
    id: "L003",
    location: "Çatı - Yağmur Suyu Hattı",
    type: "İzolasyon Sorunu",
    severity: "medium",
    status: "open",
    reportedBy: "Mehmet Demir",
    reportedDate: "2026-03-20",
    estimatedLoss: 45,
    description: "Çatı yağmur suyu hattında izolasyon bozukluğu."
  },
  {
    id: "L004",
    location: "Bahçe - Sulama Hattı",
    type: "Boru Kırığı",
    severity: "low",
    status: "closed",
    reportedBy: "Yönetim",
    reportedDate: "2026-03-05",
    resolvedDate: "2026-03-07",
    estimatedLoss: 20,
    description: "Bahçe sulama hattında küçük kırık tespit edildi ve onarıldı."
  },
  {
    id: "L005",
    location: "1. Kat - Daire 103",
    type: "Musluk Sızıntısı",
    severity: "low",
    status: "investigating",
    reportedBy: "Zeynep Arslan",
    reportedDate: "2026-03-22",
    estimatedLoss: 15,
    description: "Daire mutfak musluğunda sızıntı bildirildi."
  }
];
const monthlyData = [
  { month: "Nis 2025", total: 420, common: 85, average: 8.4, change: 0 },
  { month: "May 2025", total: 438, common: 92, average: 8.76, change: 4.3 },
  { month: "Haz 2025", total: 510, common: 105, average: 10.2, change: 16.4 },
  { month: "Tem 2025", total: 548, common: 112, average: 10.96, change: 7.5 },
  { month: "Ağu 2025", total: 532, common: 108, average: 10.64, change: -2.9 },
  { month: "Eyl 2025", total: 465, common: 95, average: 9.3, change: -12.6 },
  { month: "Eki 2025", total: 430, common: 88, average: 8.6, change: -7.5 },
  { month: "Kas 2025", total: 415, common: 82, average: 8.3, change: -3.5 },
  { month: "Ara 2025", total: 408, common: 80, average: 8.16, change: -1.7 },
  { month: "Oca 2026", total: 395, common: 78, average: 7.9, change: -3.2 },
  { month: "Şub 2026", total: 402, common: 80, average: 8.04, change: 1.8 },
  { month: "Mar 2026", total: 428, common: 87, average: 8.56, change: 6.5 }
];
const apartmentUsage = [
  {
    unit: "D-101",
    resident: "Ahmet Yılmaz",
    currentMonth: 6.2,
    lastMonth: 5.8,
    status: "normal"
  },
  {
    unit: "D-102",
    resident: "Fatma Kaya",
    currentMonth: 18.5,
    lastMonth: 7.2,
    status: "suspicious"
  },
  {
    unit: "D-103",
    resident: "Mehmet Demir",
    currentMonth: 8.1,
    lastMonth: 7.9,
    status: "normal"
  },
  {
    unit: "D-104",
    resident: "Zeynep Arslan",
    currentMonth: 9.3,
    lastMonth: 8.5,
    status: "normal"
  },
  {
    unit: "D-201",
    resident: "Ali Çelik",
    currentMonth: 14.2,
    lastMonth: 8.1,
    status: "very_high"
  },
  {
    unit: "D-202",
    resident: "Ayşe Şahin",
    currentMonth: 7.6,
    lastMonth: 7.4,
    status: "normal"
  },
  {
    unit: "D-203",
    resident: "Hasan Öztürk",
    currentMonth: 7.9,
    lastMonth: 8.2,
    status: "normal"
  },
  {
    unit: "D-204",
    resident: "Emine Yıldız",
    currentMonth: 12.1,
    lastMonth: 7.8,
    status: "high"
  },
  {
    unit: "D-301",
    resident: "İbrahim Koç",
    currentMonth: 6.8,
    lastMonth: 6.5,
    status: "normal"
  },
  {
    unit: "D-302",
    resident: "Hatice Doğan",
    currentMonth: 7.2,
    lastMonth: 7,
    status: "normal"
  }
];
const SEVERITY_LABELS = {
  critical: "Kritik",
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük"
};
const STATUS_LABELS = {
  open: "Açık",
  investigating: "İnceleniyor",
  repaired: "Onarıldı",
  closed: "Kapatıldı"
};
const USAGE_STATUS_LABELS = {
  normal: "Normal",
  high: "Yüksek",
  very_high: "Çok Yüksek",
  suspicious: "Şüpheli"
};
function severityColor(s) {
  if (s === "critical") return "bg-red-100 text-red-700";
  if (s === "high") return "bg-orange-100 text-orange-700";
  if (s === "medium") return "bg-yellow-100 text-yellow-700";
  return "bg-blue-100 text-blue-700";
}
function statusColor(s) {
  if (s === "open") return "bg-red-100 text-red-700";
  if (s === "investigating") return "bg-yellow-100 text-yellow-700";
  if (s === "repaired") return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-600";
}
function usageStatusColor(s) {
  if (s === "suspicious") return "bg-red-100 text-red-700";
  if (s === "very_high") return "bg-orange-100 text-orange-700";
  if (s === "high") return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}
const maxConsumption = Math.max(...monthlyData.map((m) => m.total));
function WaterLeakManagement() {
  const [activeTab, setActiveTab] = reactExports.useState("consumption");
  const [showNewReportForm, setShowNewReportForm] = reactExports.useState(false);
  const openLeaks = leakReports.filter(
    (r) => r.status === "open" || r.status === "investigating"
  ).length;
  const totalLoss = leakReports.reduce((s, r) => s + r.estimatedLoss, 0);
  const latestMonth = monthlyData[monthlyData.length - 1];
  const suspiciousCount = apartmentUsage.filter(
    (a) => a.status === "suspicious" || a.status === "very_high"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Su Tüketimi & Kaçak Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Bina su tüketimi analizi, kaçak tespiti ve daire bazlı izleme" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowNewReportForm(!showNewReportForm),
          className: "bg-blue-600 hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 mr-2" }),
            "Kaçak Bildir"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Bu Ay Toplam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-gray-800", children: [
            latestMonth.total,
            " m³"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aktif Kaçak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: openLeaks })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Şüpheli Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-gray-800", children: suspiciousCount })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5 text-yellow-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Tahmini Kayıp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-gray-800", children: [
            totalLoss,
            " m³"
          ] })
        ] })
      ] }) }) })
    ] }),
    showNewReportForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm border-l-4 border-l-blue-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Yeni Kaçak Bildirimi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "loc-input",
                className: "text-sm font-medium text-gray-700 block mb-1",
                children: "Konum"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "loc-input",
                type: "text",
                placeholder: "Örn: 3. Kat Koridor",
                className: "w-full border rounded-lg px-3 py-2 text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "type-select",
                className: "text-sm font-medium text-gray-700 block mb-1",
                children: "Kaçak Türü"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "type-select",
                className: "w-full border rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Boru Sızıntısı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Musluk Arızası" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Depo Sızıntısı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "İzolasyon Sorunu" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Diğer" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "sev-select",
                className: "text-sm font-medium text-gray-700 block mb-1",
                children: "Aciliyet"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "sev-select",
                className: "w-full border rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Düşük" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Orta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yüksek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kritik" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "desc-input",
                className: "text-sm font-medium text-gray-700 block mb-1",
                children: "Açıklama"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "desc-input",
                type: "text",
                placeholder: "Kısa açıklama...",
                className: "w-full border rounded-lg px-3 py-2 text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", children: "Bildir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setShowNewReportForm(false),
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b", children: ["consumption", "leaks", "apartments"].map((tab) => {
      const labels = {
        consumption: "📊 Aylık Tüketim",
        leaks: "💧 Kaçak Raporları",
        apartments: "🏠 Daire Analizi"
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab),
          className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          children: labels[tab]
        },
        tab
      );
    }) }),
    activeTab === "consumption" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "12 Aylık Su Tüketimi (m³)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: monthlyData.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 w-20 shrink-0", children: m.month }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-5 rounded bg-blue-400 flex items-center px-2 text-white text-xs font-medium transition-all",
                  style: {
                    width: `${m.common / maxConsumption * 100}%`,
                    minWidth: 32
                  },
                  children: m.common
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-5 rounded bg-blue-200 flex items-center px-2 text-blue-700 text-xs font-medium transition-all",
                  style: {
                    width: `${(m.total - m.common) / maxConsumption * 100}%`,
                    minWidth: 32
                  },
                  children: m.total - m.common
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 w-20 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-gray-700", children: [
                m.total,
                " m³"
              ] }),
              m.change > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-red-500" }) : m.change < 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3 text-green-500" }) : null
            ] })
          ] }, m.month)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4 pt-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded bg-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Ortak Alan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded bg-blue-200" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Daireler" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Yıllık Toplam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
            monthlyData.reduce((s, m) => s + m.total, 0),
            " m³"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Son 12 ay" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aylık Ortalama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
            (monthlyData.reduce((s, m) => s + m.total, 0) / 12).toFixed(
              0
            ),
            " ",
            "m³"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
            "Daire başına ",
            latestMonth.average,
            " m³"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Ortak Alan Oranı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-orange-600", children: [
            (latestMonth.common / latestMonth.total * 100).toFixed(0),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: latestMonth.common / latestMonth.total * 100,
              className: "mt-2 h-1.5"
            }
          )
        ] }) })
      ] })
    ] }),
    activeTab === "leaks" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: leakReports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${report.status === "closed" || report.status === "repaired" ? "bg-green-100" : "bg-red-100"}`,
            children: report.status === "closed" || report.status === "repaired" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-gray-800", children: report.location }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs ${severityColor(report.severity)}`,
                children: SEVERITY_LABELS[report.severity]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs ${statusColor(report.status)}`,
                children: STATUS_LABELS[report.status]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
            report.type,
            " — ",
            report.description
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              " ",
              report.reportedDate
            ] }),
            report.resolvedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
              " Onarıldı:",
              " ",
              report.resolvedDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Bildiren: ",
              report.reportedBy
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Tahmini Kayıp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-red-600", children: [
          report.estimatedLoss,
          " m³"
        ] })
      ] })
    ] }) }) }, report.id)) }),
    activeTab === "apartments" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600", children: "Şüpheli/Çok Yüksek" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-700", children: apartmentUsage.filter(
              (a) => a.status === "suspicious" || a.status === "very_high"
            ).length })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-yellow-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-yellow-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-600", children: "Yüksek Tüketim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-700", children: apartmentUsage.filter((a) => a.status === "high").length })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "Normal Tüketim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-700", children: apartmentUsage.filter((a) => a.status === "normal").length })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daire Bazlı Su Tüketimi (m³)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: apartmentUsage.sort((a, b) => b.currentMonth - a.currentMonth).map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 text-xs font-medium text-gray-700 shrink-0", children: apt.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 text-xs text-gray-500 shrink-0 truncate", children: apt.resident }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: apt.currentMonth / 20 * 100,
              className: "h-2"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-gray-800 w-12 text-right shrink-0", children: [
            apt.currentMonth,
            " m³"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 text-right shrink-0", children: apt.currentMonth > apt.lastMonth ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-red-500 flex items-center justify-end gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
            "+",
            (apt.currentMonth - apt.lastMonth).toFixed(1)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-500 flex items-center justify-end gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
            (apt.currentMonth - apt.lastMonth).toFixed(1)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs shrink-0 ${usageStatusColor(apt.status)}`,
              children: USAGE_STATUS_LABELS[apt.status]
            }
          )
        ] }, apt.unit)) }) })
      ] })
    ] })
  ] });
}
export {
  WaterLeakManagement as default
};
