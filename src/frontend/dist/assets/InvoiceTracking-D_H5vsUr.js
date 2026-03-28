import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, F as FileText, k as TrendingUp, S as Search, I as Input, a6 as Receipt, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-huPFjtKr.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BNzburN1.js";
import { C as CircleCheck } from "./circle-check-Bo4pyHpg.js";
import { C as Clock } from "./clock-CTDtSScP.js";
import { C as CircleAlert } from "./circle-alert-BLmDIRW3.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./BarChart-BF-ngLS6.js";
const MONTHLY_DATA = [
  { ay: "Ekim", tahsil: 18400, bekleyen: 3200 },
  { ay: "Kasım", tahsil: 21200, bekleyen: 2800 },
  { ay: "Aralık", tahsil: 19800, bekleyen: 4100 },
  { ay: "Ocak", tahsil: 22600, bekleyen: 3600 },
  { ay: "Şubat", tahsil: 20100, bekleyen: 2900 },
  { ay: "Mart", tahsil: 16800, bekleyen: 5400 }
];
const INITIAL_INVOICES = [
  {
    id: "1",
    apartmentNo: "A-101",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-10"
  },
  {
    id: "2",
    apartmentNo: "A-102",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Gecikmiş",
    description: "Aylık aidat",
    paidAt: null
  },
  {
    id: "3",
    apartmentNo: "B-201",
    type: "Su",
    period: "Mart 2026",
    amount: 320,
    dueDate: "2026-03-20",
    status: "Bekliyor",
    description: "Mart ayı su faturası",
    paidAt: null
  },
  {
    id: "4",
    apartmentNo: "B-202",
    type: "Su",
    period: "Mart 2026",
    amount: 290,
    dueDate: "2026-03-20",
    status: "Ödendi",
    description: "Mart ayı su faturası",
    paidAt: "2026-03-18"
  },
  {
    id: "5",
    apartmentNo: "C-301",
    type: "Doğalgaz",
    period: "Şubat 2026",
    amount: 540,
    dueDate: "2026-03-10",
    status: "Gecikmiş",
    description: "Şubat ayı doğalgaz",
    paidAt: null
  },
  {
    id: "6",
    apartmentNo: "A-103",
    type: "Elektrik",
    period: "Mart 2026",
    amount: 410,
    dueDate: "2026-03-25",
    status: "Bekliyor",
    description: "Ortak alan elektrik payı",
    paidAt: null
  },
  {
    id: "7",
    apartmentNo: "D-401",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-12"
  },
  {
    id: "8",
    apartmentNo: "B-203",
    type: "Aidat",
    period: "Şubat 2026",
    amount: 850,
    dueDate: "2026-02-15",
    status: "Gecikmiş",
    description: "Şubat aidatı gecikmiş",
    paidAt: null
  },
  {
    id: "9",
    apartmentNo: "C-302",
    type: "Su",
    period: "Mart 2026",
    amount: 380,
    dueDate: "2026-03-20",
    status: "Ödendi",
    description: "Mart ayı su faturası",
    paidAt: "2026-03-19"
  },
  {
    id: "10",
    apartmentNo: "A-104",
    type: "Doğalgaz",
    period: "Mart 2026",
    amount: 620,
    dueDate: "2026-03-22",
    status: "Bekliyor",
    description: "Mart ayı doğalgaz faturası",
    paidAt: null
  },
  {
    id: "11",
    apartmentNo: "D-402",
    type: "Elektrik",
    period: "Şubat 2026",
    amount: 390,
    dueDate: "2026-02-25",
    status: "Gecikmiş",
    description: "Ortak alan elektrik payı",
    paidAt: null
  },
  {
    id: "12",
    apartmentNo: "B-204",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-08"
  },
  {
    id: "13",
    apartmentNo: "C-303",
    type: "Diğer",
    period: "Mart 2026",
    amount: 200,
    dueDate: "2026-03-30",
    status: "Bekliyor",
    description: "Asansör bakım payı",
    paidAt: null
  },
  {
    id: "14",
    apartmentNo: "A-105",
    type: "Aidat",
    period: "Mart 2026",
    amount: 850,
    dueDate: "2026-03-15",
    status: "Ödendi",
    description: "Aylık aidat",
    paidAt: "2026-03-14"
  },
  {
    id: "15",
    apartmentNo: "D-403",
    type: "Su",
    period: "Ocak 2026",
    amount: 310,
    dueDate: "2026-02-10",
    status: "Gecikmiş",
    description: "Ocak ayı su faturası gecikmeli",
    paidAt: null
  }
];
const STATUS_CONFIG = {
  Ödendi: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
  },
  Bekliyor: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
  },
  Gecikmiş: {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" })
  }
};
const TYPE_COLORS = {
  Su: "bg-blue-100 text-blue-700",
  Elektrik: "bg-yellow-100 text-yellow-700",
  Doğalgaz: "bg-orange-100 text-orange-700",
  Aidat: "bg-purple-100 text-purple-700",
  Diğer: "bg-gray-100 text-gray-600"
};
function InvoiceTracking({
  buildingId: _buildingId,
  isOwner
}) {
  const [invoices, setInvoices] = reactExports.useState(INITIAL_INVOICES);
  const [search, setSearch] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [filterPeriod, setFilterPeriod] = reactExports.useState("Tümü");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    apartmentNo: "",
    type: "Aidat",
    period: "Mart 2026",
    amount: "",
    dueDate: "",
    description: ""
  });
  const stats = {
    total: invoices.length,
    collected: invoices.filter((i) => i.status === "Ödendi").reduce((s, i) => s + i.amount, 0),
    pending: invoices.filter((i) => i.status === "Bekliyor").reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter((i) => i.status === "Gecikmiş").reduce((s, i) => s + i.amount, 0)
  };
  const periods = [
    "Tümü",
    ...Array.from(new Set(invoices.map((i) => i.period)))
  ];
  const filtered = invoices.filter((i) => {
    const matchSearch = i.apartmentNo.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Tümü" || i.type === filterType;
    const matchStatus = filterStatus === "Tümü" || i.status === filterStatus;
    const matchPeriod = filterPeriod === "Tümü" || i.period === filterPeriod;
    return matchSearch && matchType && matchStatus && matchPeriod;
  });
  function handleCreate() {
    if (!form.apartmentNo || !form.amount || !form.dueDate) return;
    const inv = {
      id: Date.now().toString(),
      apartmentNo: form.apartmentNo,
      type: form.type,
      period: form.period,
      amount: Number(form.amount),
      dueDate: form.dueDate,
      status: "Bekliyor",
      description: form.description,
      paidAt: null
    };
    setInvoices((prev) => [inv, ...prev]);
    setShowForm(false);
    setForm({
      apartmentNo: "",
      type: "Aidat",
      period: "Mart 2026",
      amount: "",
      dueDate: "",
      description: ""
    });
  }
  function markAsPaid(id) {
    setInvoices(
      (prev) => prev.map(
        (i) => i.id === id ? {
          ...i,
          status: "Ödendi",
          paidAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        } : i
      )
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "Fatura & Servis Bedeli Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Daire bazlı fatura ve servis ödemelerini yönetin" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          "data-ocid": "invoice.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Fatura"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      {
        label: "Toplam Fatura",
        value: stats.total,
        isCount: true,
        color: "bg-blue-100",
        iconColor: "text-blue-600",
        Icon: FileText
      },
      {
        label: "Tahsil Edilen",
        value: stats.collected,
        isCount: false,
        color: "bg-green-100",
        iconColor: "text-green-600",
        Icon: CircleCheck
      },
      {
        label: "Bekleyen",
        value: stats.pending,
        isCount: false,
        color: "bg-yellow-100",
        iconColor: "text-yellow-600",
        Icon: Clock
      },
      {
        label: "Gecikmiş",
        value: stats.overdue,
        isCount: false,
        color: "bg-red-100",
        iconColor: "text-red-600",
        Icon: CircleAlert
      }
    ].map(({ label, value, isCount, color, iconColor, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-xl ${color} flex items-center justify-center`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: isCount ? value : `₺${value.toLocaleString("tr-TR")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: label })
      ] })
    ] }) }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white border-none shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-[#4A90D9]" }),
        "Aylık Tahsilat Analizi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: MONTHLY_DATA,
            margin: { top: 4, right: 8, left: 0, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F1F4F8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "ay",
                  tick: { fontSize: 12, fill: "#6B7A8D" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11, fill: "#6B7A8D" },
                  axisLine: false,
                  tickLine: false,
                  tickFormatter: (v) => `₺${(v / 1e3).toFixed(0)}K`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (value, name) => [
                    `₺${value.toLocaleString("tr-TR")}`,
                    name === "tahsil" ? "Tahsil Edilen" : "Bekleyen"
                  ],
                  contentStyle: {
                    borderRadius: "8px",
                    border: "1px solid #E5EAF2",
                    fontSize: 12
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "tahsil",
                  fill: "#22c55e",
                  radius: [4, 4, 0, 0],
                  name: "tahsil"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "bekleyen",
                  fill: "#f59e0b",
                  radius: [4, 4, 0, 0],
                  name: "bekleyen"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-[#6B7A8D]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-sm bg-green-500 inline-block" }),
            " ",
            "Tahsil Edilen"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-[#6B7A8D]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-sm bg-amber-400 inline-block" }),
            " ",
            "Bekleyen"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Daire veya açıklama ara...",
            className: "pl-9",
            "data-ocid": "invoice.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterType,
          onChange: (e) => setFilterType(e.target.value),
          className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
          "data-ocid": "invoice.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
            ["Su", "Elektrik", "Doğalgaz", "Aidat", "Diğer"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
            ["Ödendi", "Bekliyor", "Gecikmiş"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: filterPeriod,
          onChange: (e) => setFilterPeriod(e.target.value),
          className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
          children: periods.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: p }, p))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-white rounded-xl shadow-sm overflow-hidden",
        "data-ocid": "invoice.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F1F4F8]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
              "Daire",
              "Fatura Türü",
              "Dönem",
              "Tutar",
              "Son Ödeme",
              "Durum",
              "İşlemler"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-3 text-left text-xs font-semibold text-[#6B7A8D] uppercase tracking-wide",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#F1F4F8]", children: filtered.map((inv, idx) => {
              const sc = STATUS_CONFIG[inv.status];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-[#F8FAFC] transition-colors",
                  "data-ocid": `invoice.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: inv.apartmentNo }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[inv.type]}`,
                        children: inv.type
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: inv.period }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-[#0E1116]", children: [
                      "₺",
                      inv.amount.toLocaleString("tr-TR")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: inv.dueDate }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${sc.color}`,
                        children: [
                          sc.icon,
                          inv.status
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: inv.status !== "Ödendi" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "rounded-full text-xs gap-1 h-7 border-green-300 text-green-700 hover:bg-green-50",
                        onClick: () => markAsPaid(inv.id),
                        "data-ocid": `invoice.confirm_button.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                          " Ödendi"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: inv.paidAt }) })
                  ]
                },
                inv.id
              );
            }) })
          ] }),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 text-[#6B7A8D]",
              "data-ocid": "invoice.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-8 h-8 mx-auto mb-2 text-[#B0BAC7]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fatura bulunamadı" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "invoice.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Fatura Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Daire No (örn. A-101)",
            value: form.apartmentNo,
            onChange: (e) => setForm((p) => ({ ...p, apartmentNo: e.target.value })),
            "data-ocid": "invoice.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Fatura Türü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.type,
                onChange: (e) => setForm((p) => ({
                  ...p,
                  type: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  "Su",
                  "Elektrik",
                  "Doğalgaz",
                  "Aidat",
                  "Diğer"
                ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Dönem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "örn. Mart 2026",
                value: form.period,
                onChange: (e) => setForm((p) => ({ ...p, period: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Tutar (₺)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                placeholder: "0.00",
                value: form.amount,
                onChange: (e) => setForm((p) => ({ ...p, amount: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Son Ödeme Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.dueDate,
                onChange: (e) => setForm((p) => ({ ...p, dueDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mb-1 block", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Fatura açıklaması",
              value: form.description,
              onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
              "data-ocid": "invoice.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCreate,
            disabled: !form.apartmentNo || !form.amount || !form.dueDate,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            "data-ocid": "invoice.submit_button",
            children: "Fatura Ekle"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  InvoiceTracking as default
};
