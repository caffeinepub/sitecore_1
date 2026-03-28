import { r as reactExports, j as jsxRuntimeExports, K as Flame, k as TrendingUp, e as Badge, B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-B-5F0xzF.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DJO9oBoQ.js";
import { L as Label } from "./label-BB8iiS5O.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CQddtzWA.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-D5rfkHG5.js";
import { W as Wallet } from "./wallet-D2n9xGbD.js";
import { C as CircleAlert } from "./circle-alert-CspZijb-.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./BarChart-C3OEAQTJ.js";
import "./index-BHZaq3-H.js";
const apartments = [
  { no: "1A", m2: 85, occupants: 3, paid: true },
  { no: "1B", m2: 70, occupants: 2, paid: false },
  { no: "1C", m2: 95, occupants: 4, paid: true },
  { no: "2A", m2: 85, occupants: 2, paid: true },
  { no: "2B", m2: 70, occupants: 1, paid: false },
  { no: "2C", m2: 95, occupants: 3, paid: true },
  { no: "3A", m2: 85, occupants: 4, paid: true },
  { no: "3B", m2: 70, occupants: 2, paid: true },
  { no: "3C", m2: 95, occupants: 2, paid: false },
  { no: "4A", m2: 85, occupants: 3, paid: true },
  { no: "4B", m2: 70, occupants: 2, paid: true },
  { no: "4C", m2: 95, occupants: 4, paid: false }
];
const chartData = [
  { month: "Ekim", amount: 28400 },
  { month: "Kasım", amount: 34200 },
  { month: "Aralık", amount: 42600 },
  { month: "Ocak", amount: 48500 },
  { month: "Şubat", amount: 45100 },
  { month: "Mart", amount: 38900 }
];
function HeatingCostDistribution({
  isOwner
}) {
  const [method, setMethod] = reactExports.useState("m2");
  const [period, setPeriod] = reactExports.useState("2026-03");
  const [totalCost] = reactExports.useState(38900);
  const [expenseType] = reactExports.useState("Doğalgaz");
  const [showNewModal, setShowNewModal] = reactExports.useState(false);
  const [newForm, setNewForm] = reactExports.useState({
    amount: "",
    period: "",
    type: "Doğalgaz"
  });
  const [aptPaid, setAptPaid] = reactExports.useState(
    Object.fromEntries(apartments.map((a) => [a.no, a.paid]))
  );
  function calcShare(apt) {
    if (method === "m2") {
      const totalM2 = apartments.reduce((s, a) => s + a.m2, 0);
      return Math.round(apt.m2 / totalM2 * totalCost);
    }
    if (method === "kisi") {
      const totalPeople = apartments.reduce((s, a) => s + a.occupants, 0);
      return Math.round(apt.occupants / totalPeople * totalCost);
    }
    return Math.round(totalCost / apartments.length);
  }
  const paidCount = Object.values(aptPaid).filter(Boolean).length;
  const collectionRate = Math.round(paidCount / apartments.length * 100);
  const avgShare = Math.round(totalCost / apartments.length);
  const pending = apartments.filter((a) => !aptPaid[a.no]).length;
  const pendingAmount = apartments.filter((a) => !aptPaid[a.no]).reduce((s, a) => s + calcShare(a), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "heating_cost.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Dönem Toplam Gider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-slate-800", children: [
            totalCost.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Ortalama Daire Payı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-slate-800", children: [
            avgShare.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Tahsilat Oranı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-slate-800", children: [
            "%",
            collectionRate
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Bekleyen Ödeme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-red-700", children: [
            pendingAmount.toLocaleString("tr-TR"),
            " ₺"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
            pending,
            " daire"
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Dönem:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: period, onValueChange: setPeriod, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", "data-ocid": "heating_cost.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2026-03", children: "Mart 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2026-02", children: "Şubat 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2026-01", children: "Ocak 2026" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Dağıtım Yöntemi:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: method,
            onValueChange: (v) => setMethod(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "heating_cost.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "m2", children: "m² Bazlı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "kisi", children: "Kişi Sayısı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "esit", children: "Eşit Pay" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "text-orange-600 border-orange-300",
          children: expenseType
        }
      ) }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "ml-auto bg-orange-600 hover:bg-orange-700 text-white",
          onClick: () => setShowNewModal(true),
          "data-ocid": "heating_cost.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Yeni Dönem Gider Girişi"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daire Bazlı Pay Hesabı" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Daire No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "m²" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kişi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hesaplanan Pay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Ödeme Durumu" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: apartments.map((apt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `heating_cost.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: apt.no }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  apt.m2,
                  " m²"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  apt.occupants,
                  " kişi"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold", children: [
                  calcShare(apt).toLocaleString("tr-TR"),
                  " ₺"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAptPaid((p) => ({ ...p, [apt.no]: !p[apt.no] })),
                    className: `px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${aptPaid[apt.no] ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`,
                    "data-ocid": "heating_cost.toggle",
                    children: aptPaid[apt.no] ? "✓ Ödendi" : "⏳ Bekliyor"
                  }
                ) })
              ]
            },
            apt.no
          )) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Son 6 Ay Isınma Gideri" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: chartData,
            margin: { top: 5, right: 10, left: 0, bottom: 5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: { fontSize: 11 } }),
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
                  formatter: (v) => [
                    `${v.toLocaleString("tr-TR")} ₺`,
                    "Gider"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", fill: "#ea580c", radius: [4, 4, 0, 0] })
            ]
          }
        ) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewModal, onOpenChange: setShowNewModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "heating_cost.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Dönem Gider Girişi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Toplam Tutar (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "45000",
              value: newForm.amount,
              onChange: (e) => setNewForm((p) => ({ ...p, amount: e.target.value })),
              "data-ocid": "heating_cost.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dönem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: newForm.period,
              onChange: (e) => setNewForm((p) => ({ ...p, period: e.target.value })),
              "data-ocid": "heating_cost.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Gider Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: newForm.type,
              onValueChange: (v) => setNewForm((p) => ({ ...p, type: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "heating_cost.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Doğalgaz", children: "Doğalgaz" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Su", children: "Su" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Isınma", children: "Isınma" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Elektrik", children: "Elektrik" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowNewModal(false),
              "data-ocid": "heating_cost.cancel_button",
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-orange-600 hover:bg-orange-700 text-white",
              onClick: () => setShowNewModal(false),
              "data-ocid": "heating_cost.submit_button",
              children: "Kaydet"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  HeatingCostDistribution as default
};
