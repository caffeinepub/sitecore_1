import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, aH as PiggyBank, k as TrendingUp, C as CreditCard, T as TriangleAlert, e as Badge } from "./index-CC-G2BYq.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-klDLrOsd.js";
import { P as Progress } from "./progress-bZivyD3x.js";
import { T as Target } from "./target-DVrChQsn.js";
import { C as ChartColumn } from "./chart-column-DLC7EBHN.js";
import { C as CircleCheckBig } from "./circle-check-big-BNsB4jU7.js";
import { D as DollarSign } from "./dollar-sign-CYLBX6Ip.js";
const MONTHS = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara"
];
const contributions = [
  {
    month: "Ocak 2025",
    amount: 15e3,
    status: "tamamlandı",
    note: "Aylık katkı"
  },
  {
    month: "Şubat 2025",
    amount: 15e3,
    status: "tamamlandı",
    note: "Aylık katkı"
  },
  {
    month: "Mart 2025",
    amount: 18e3,
    status: "tamamlandı",
    note: "Özel ek katkı"
  },
  {
    month: "Nisan 2025",
    amount: 15e3,
    status: "tamamlandı",
    note: "Aylık katkı"
  },
  {
    month: "Mayıs 2025",
    amount: 15e3,
    status: "tamamlandı",
    note: "Aylık katkı"
  },
  {
    month: "Haziran 2025",
    amount: 15e3,
    status: "tamamlandı",
    note: "Aylık katkı"
  },
  {
    month: "Temmuz 2025",
    amount: 15e3,
    status: "planlı",
    note: "Aylık katkı"
  },
  {
    month: "Ağustos 2025",
    amount: 15e3,
    status: "planlı",
    note: "Aylık katkı"
  },
  { month: "Eylül 2025", amount: 15e3, status: "planlı", note: "Aylık katkı" },
  { month: "Ekim 2025", amount: 15e3, status: "planlı", note: "Aylık katkı" },
  { month: "Kasım 2025", amount: 15e3, status: "planlı", note: "Aylık katkı" },
  {
    month: "Aralık 2025",
    amount: 15e3,
    status: "planlı",
    note: "Aylık katkı"
  }
];
const expenditures = [
  {
    id: 1,
    date: "15.02.2025",
    description: "Asansör acil onarımı",
    amount: 12e3,
    category: "Teknik",
    approved: true
  },
  {
    id: 2,
    date: "10.04.2025",
    description: "Çatı su yalıtımı (kısmi)",
    amount: 35e3,
    category: "İnşaat",
    approved: true
  },
  {
    id: 3,
    date: "01.06.2025",
    description: "Jeneratör bakım & yedek parça",
    amount: 8500,
    category: "Teknik",
    approved: true
  }
];
const plannedProjects = [
  {
    id: 1,
    name: "Asansör Modernizasyonu",
    estimatedCost: 28e4,
    targetYear: 2026,
    priority: "yüksek",
    funded: 45
  },
  {
    id: 2,
    name: "Çatı Yenileme",
    estimatedCost: 18e4,
    targetYear: 2027,
    priority: "orta",
    funded: 30
  },
  {
    id: 3,
    name: "Otopark Zemin Kaplama",
    estimatedCost: 95e3,
    targetYear: 2026,
    priority: "düşük",
    funded: 18
  },
  {
    id: 4,
    name: "Güvenlik Kamera Sistemi Yenileme",
    estimatedCost: 45e3,
    targetYear: 2025,
    priority: "yüksek",
    funded: 80
  }
];
const monthlyData = [88, 103, 121, 136, 151, 166, 166, 166, 166, 166, 166, 166];
function ReserveFundManagement() {
  const [activeTab, setActiveTab] = reactExports.useState("ozet");
  const currentBalance = 166e3;
  const annualTarget = 3e5;
  const targetProgress = Math.round(currentBalance / annualTarget * 100);
  const totalExpended = expenditures.reduce((sum, e) => sum + e.amount, 0);
  const completedContributions = contributions.filter(
    (c) => c.status === "tamamlandı"
  );
  const completedTotal = completedContributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const tabs = [
    { key: "ozet", label: "Özet" },
    { key: "katkılar", label: "Katkı Geçmişi" },
    { key: "harcamalar", label: "Harcamalar" },
    { key: "projeler", label: "Büyük Projeler" }
  ];
  const priorityColor = (p) => {
    if (p === "yüksek") return "bg-red-100 text-red-700";
    if (p === "orta") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Rezerv Fonu Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Bina büyük onarım ve proje rezerv fonu takibi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "Katkı Ekle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PiggyBank, { className: "w-4 h-4 text-blue-500" }),
          "Mevcut Bakiye"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-blue-700", children: [
          "₺",
          currentBalance.toLocaleString("tr-TR")
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 text-green-500" }),
          "Yıllık Hedef"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-700", children: [
          "₺",
          annualTarget.toLocaleString("tr-TR")
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-purple-500" }),
          "Yıl İçi Katkı"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-purple-700", children: [
          "₺",
          completedTotal.toLocaleString("tr-TR")
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-red-500" }),
          "Toplam Harcama"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-red-700", children: [
          "₺",
          totalExpended.toLocaleString("tr-TR")
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.key),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`,
        children: tab.label
      },
      tab.key
    )) }),
    activeTab === "ozet" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Yıllık Hedef İlerleme" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₺",
              currentBalance.toLocaleString("tr-TR"),
              " birikti"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              targetProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: targetProgress, className: "h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
            "Hedefe ulaşmak için ₺",
            (annualTarget - currentBalance).toLocaleString("tr-TR"),
            " daha gerekiyor"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "2025 Aylık Birikim Grafiği" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-32", children: monthlyData.map((val, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full rounded-t",
                    style: {
                      height: `${val / 180 * 100}%`,
                      backgroundColor: i <= 5 ? "#3B82F6" : "#CBD5E1"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400", children: MONTHS[i] })
              ]
            },
            MONTHS[i]
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-2", children: "Mavi: Gerçekleşen | Gri: Planlanan" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-500" }),
          "Uyarılar"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Güvenlik Kamera Sistemi Yenileme projesi 2025 hedefiyle planlandı -- fon oranı %80. Kalan ₺9.000 için ek katkı gerekebilir." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-blue-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mevcut birikim hızında yıllık hedefe Kasım 2025'te ulaşılması öngörülüyor." })
          ] })
        ] })
      ] })
    ] }),
    activeTab === "katkılar" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: contributions.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between p-4 bg-white rounded-lg border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            c.status === "tamamlandı" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-gray-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: c.month }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: c.note })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm", children: [
              "₺",
              c.amount.toLocaleString("tr-TR")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs ${c.status === "tamamlandı" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`,
                children: c.status === "tamamlandı" ? "Tamamlandı" : "Planlı"
              }
            )
          ] })
        ]
      },
      MONTHS[i]
    )) }),
    activeTab === "harcamalar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      expenditures.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-4 bg-white rounded-lg border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-5 h-5 text-red-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: e.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  e.date,
                  " • ",
                  e.category
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm text-red-600", children: [
                "-₺",
                e.amount.toLocaleString("tr-TR")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 text-xs", children: "Onaylı" })
            ] })
          ]
        },
        e.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-dashed flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-600", children: "Toplam Harcama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-red-600", children: [
          "-₺",
          totalExpended.toLocaleString("tr-TR")
        ] })
      ] })
    ] }),
    activeTab === "projeler" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Rezerv fonundan karşılanması planlanan büyük projeler ve mevcut fonlama durumu." }),
      plannedProjects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
              "Hedef yıl: ",
              p.targetYear
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor(
                  p.priority
                )}`,
                children: [
                  p.priority,
                  " öncelik"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
              "₺",
              p.estimatedCost.toLocaleString("tr-TR")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fonlama durumu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            p.funded,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Progress,
          {
            value: p.funded,
            className: `h-2 ${p.funded >= 70 ? "[&>div]:bg-green-500" : p.funded >= 40 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-400"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
          "Mevcut fondan ₺",
          Math.round(
            p.funded / 100 * p.estimatedCost
          ).toLocaleString("tr-TR"),
          " ",
          "ayrıldı"
        ] })
      ] }) }, p.id))
    ] })
  ] });
}
export {
  ReserveFundManagement as default
};
