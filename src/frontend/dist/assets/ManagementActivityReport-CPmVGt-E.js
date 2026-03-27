import { r as reactExports, j as jsxRuntimeExports, B as Button, F as FileText, k as TrendingUp, W as Wrench, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-COU4G2On.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card--Nsdh5W5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cigvn_Ho.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C7OigPvG.js";
import { W as Wallet } from "./wallet-Ca8l0ZBw.js";
import { C as ChartColumn } from "./chart-column-mOKRazxD.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell, L as Legend } from "./BarChart-DdLGtMDC.js";
import { P as PieChart, a as Pie } from "./PieChart-D8Kn3KB2.js";
import { C as CircleCheck } from "./circle-check-DXTKw_cU.js";
import "./index-B3RipxLQ.js";
const periods = [
  {
    key: "2026-03",
    label: "Mart 2026",
    collectionRate: 87,
    completedMaintenance: 14,
    totalIncome: 124500,
    totalExpense: 98700,
    avgResolutionDays: 3.2,
    overdueApts: [
      { no: "2B", debt: 2400 },
      { no: "3C", debt: 4800 },
      { no: "4A", debt: 1200 }
    ],
    maintenanceItems: [
      { name: "Asansör periyodik bakımı", date: "2026-03-05", cost: 8500 },
      { name: "Bahçe sulama sistemi onarımı", date: "2026-03-08", cost: 2200 },
      { name: "Giriş kat boya", date: "2026-03-12", cost: 5400 },
      { name: "Jeneratör bakımı", date: "2026-03-18", cost: 3800 },
      { name: "Güvenlik kamera sistemi", date: "2026-03-22", cost: 6200 }
    ],
    decisions: [
      "Bina girişine yeni aydınlatma sistemi kurulmasına karar verildi.",
      "2026 yılı bütçesinin %10 artırılması oy birliğiyle kabul edildi.",
      "Temizlik firması sözleşmesi 1 yıl uzatıldı."
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 38500, color: "#3b82f6" },
      { name: "Personel", value: 28e3, color: "#10b981" },
      { name: "Temizlik", value: 12400, color: "#f59e0b" },
      { name: "Enerji", value: 11800, color: "#ef4444" },
      { name: "Diğer", value: 8e3, color: "#8b5cf6" }
    ],
    incomeTarget: 142e3,
    incomeActual: 124500
  },
  {
    key: "2026-02",
    label: "Şubat 2026",
    collectionRate: 92,
    completedMaintenance: 11,
    totalIncome: 138200,
    totalExpense: 105300,
    avgResolutionDays: 2.8,
    overdueApts: [
      { no: "1B", debt: 2400 },
      { no: "3C", debt: 2400 }
    ],
    maintenanceItems: [
      { name: "Su deposu temizliği", date: "2026-02-03", cost: 4200 },
      { name: "Çatı kontrol ve onarım", date: "2026-02-10", cost: 9800 },
      { name: "Isı merkezi bakımı", date: "2026-02-15", cost: 7600 }
    ],
    decisions: [
      "Giriş kapısı otomatik sistemi kurulumu için teklif alınmasına karar verildi.",
      "Misafir otopark ücretleri belirlendi."
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 42e3, color: "#3b82f6" },
      { name: "Personel", value: 28e3, color: "#10b981" },
      { name: "Temizlik", value: 14200, color: "#f59e0b" },
      { name: "Enerji", value: 13100, color: "#ef4444" },
      { name: "Diğer", value: 8e3, color: "#8b5cf6" }
    ],
    incomeTarget: 142e3,
    incomeActual: 138200
  },
  {
    key: "2026-01",
    label: "Ocak 2026",
    collectionRate: 95,
    completedMaintenance: 8,
    totalIncome: 141800,
    totalExpense: 112400,
    avgResolutionDays: 4.1,
    overdueApts: [{ no: "2B", debt: 2400 }],
    maintenanceItems: [
      {
        name: "Yıl başı asansör sertifikasyonu",
        date: "2026-01-08",
        cost: 12400
      },
      { name: "Bodrum kat elektrik panosu", date: "2026-01-14", cost: 5600 },
      { name: "Yangın tüpü dolumu", date: "2026-01-20", cost: 2800 }
    ],
    decisions: [
      "2026 yılı faaliyet planı onaylandı.",
      "Acil durum fonu 50.000 ₺'ye yükseltildi.",
      "Site kuralları güncellendi ve tüm sakine duyurulmasına karar verildi."
    ],
    expenseCategories: [
      { name: "Bakım & Onarım", value: 48e3, color: "#3b82f6" },
      { name: "Personel", value: 28e3, color: "#10b981" },
      { name: "Temizlik", value: 14200, color: "#f59e0b" },
      { name: "Enerji", value: 14200, color: "#ef4444" },
      { name: "Diğer", value: 8e3, color: "#8b5cf6" }
    ],
    incomeTarget: 142e3,
    incomeActual: 141800
  }
];
const duesBarData = (p) => [
  { name: "Hedef", value: p.incomeTarget },
  { name: "Gerçekleşen", value: p.incomeActual }
];
function ManagementActivityReport({
  isOwner
}) {
  const [selectedPeriod, setSelectedPeriod] = reactExports.useState("2026-03");
  const [showReport, setShowReport] = reactExports.useState(false);
  const period = periods.find((p) => p.key === selectedPeriod) || periods[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "activity_report.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-600 font-medium", children: "Dönem:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedPeriod, onValueChange: setSelectedPeriod, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "activity_report.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: periods.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.key, children: p.label }, p.key)) })
        ] })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "ml-auto bg-slate-800 hover:bg-slate-900 text-white",
          onClick: () => setShowReport(true),
          "data-ocid": "activity_report.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2" }),
            " Raporu Görüntüle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Aidat Tahsilat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-700", children: [
            "%",
            period.collectionRate
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Tamamlanan Bakım" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-slate-800", children: period.completedMaintenance })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-emerald-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Toplam Gelir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-slate-800", children: [
            period.totalIncome.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Toplam Gider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-slate-800", children: [
            period.totalExpense.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Aidat Tahsilat Durumu" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: duesBarData(period),
              margin: { top: 5, right: 10, left: 0, bottom: 5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11 },
                    tickFormatter: (v) => `${(v / 1e3).toFixed(0)}K`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v) => [`${v.toLocaleString("tr-TR")} ₺`]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#3b82f6", radius: [4, 4, 0, 0] })
              ]
            }
          ) }),
          period.overdueApts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500 mb-2", children: "Gecikmiş Daireler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: period.overdueApts.map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-700", children: [
                    "Daire ",
                    apt.no
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border-0", children: [
                    apt.debt.toLocaleString("tr-TR"),
                    " ₺"
                  ] })
                ]
              },
              apt.no
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Gider Kategorileri" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: period.expenseCategories,
              dataKey: "value",
              cx: "50%",
              cy: "50%",
              outerRadius: 70,
              innerRadius: 35,
              children: period.expenseCategories.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (v) => [`${v.toLocaleString("tr-TR")} ₺`]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              iconType: "circle",
              iconSize: 8,
              wrapperStyle: { fontSize: 11 }
            }
          )
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Bakım & Onarım Özeti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-blue-600", children: [
            "Ort. ",
            period.avgResolutionDays,
            " gün"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "İş Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Maliyet" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: period.maintenanceItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `activity_report.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-slate-500", children: item.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-sm font-medium", children: [
                  item.cost.toLocaleString("tr-TR"),
                  " ₺"
                ] })
              ]
            },
            item.name
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Toplantı Kararları" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: period.decisions.map((decision, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-3",
            "data-ocid": `activity_report.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-green-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: decision })
            ]
          },
          decision
        )) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showReport, onOpenChange: setShowReport, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-2xl max-h-[80vh] overflow-y-auto",
        "data-ocid": "activity_report.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl", children: [
            "📋 Yönetim Faaliyet Raporu — ",
            period.label
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-lg p-4 border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-3", children: "ÖZET" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Aidat Tahsilat Oranı:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-green-700", children: [
                    "%",
                    period.collectionRate
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Tamamlanan Bakım:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    period.completedMaintenance,
                    " iş"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Toplam Gelir:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    period.totalIncome.toLocaleString("tr-TR"),
                    " ₺"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Toplam Gider:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    period.totalExpense.toLocaleString("tr-TR"),
                    " ₺"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Net:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-bold ${period.totalIncome - period.totalExpense >= 0 ? "text-green-700" : "text-red-700"}`,
                      children: [
                        (period.totalIncome - period.totalExpense).toLocaleString(
                          "tr-TR"
                        ),
                        " ",
                        "₺"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Ort. Çözüm Süresi:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    period.avgResolutionDays,
                    " gün"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-2", children: "GECİKMİŞ AİDAT DAİRELERİ" }),
              period.overdueApts.map((apt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between py-1.5 border-b border-slate-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Daire ",
                      apt.no
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-red-600", children: [
                      apt.debt.toLocaleString("tr-TR"),
                      " ₺"
                    ] })
                  ]
                },
                apt.no
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-2", children: "TAMAMLANAN BAKIM & ONARIMLAR" }),
              period.maintenanceItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between py-1.5 border-b border-slate-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 mr-4", children: item.date }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                        item.cost.toLocaleString("tr-TR"),
                        " ₺"
                      ] })
                    ] })
                  ]
                },
                item.name
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-2", children: "GİDER KATEGORİLERİ" }),
              period.expenseCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between py-1.5 border-b border-slate-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-3 h-3 rounded-full inline-block",
                          style: { backgroundColor: cat.color }
                        }
                      ),
                      cat.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                      cat.value.toLocaleString("tr-TR"),
                      " ₺"
                    ] })
                  ]
                },
                cat.name
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 mb-2", children: "TOPLANTI KARARLARI" }),
              period.decisions.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "py-1.5 border-b border-slate-100 flex gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-bold", children: [
                      i + 1,
                      "."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d })
                  ]
                },
                d
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowReport(false),
              "data-ocid": "activity_report.close_button",
              children: "Kapat"
            }
          ) })
        ]
      }
    ) })
  ] });
}
export {
  ManagementActivityReport as default
};
