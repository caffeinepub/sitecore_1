import { r as reactExports, j as jsxRuntimeExports, Z as Zap, Q as Leaf, I as Input, P as Plus, B as Button, K as Flame, T as TriangleAlert } from "./index-DOWBo6uK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-s7CBtMuC.js";
import { L as Label } from "./label-luGL3ZNZ.js";
import { P as Progress } from "./progress-CkhTFwzx.js";
import { B as Battery } from "./battery-CGI0oGKN.js";
import { T as Target } from "./target-CYrzoORX.js";
import { T as TrendingDown } from "./trending-down-DRSIHCz-.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, B as Bar } from "./generateCategoricalChart-C_VCRMet.js";
import { B as BarChart } from "./BarChart-CaT4iaZP.js";
const chartData = [
  { ay: "Ekim", elektrik: 4200, dogalgaz: 1800 },
  { ay: "Kasım", elektrik: 4800, dogalgaz: 2600 },
  { ay: "Aralık", elektrik: 5100, dogalgaz: 3400 },
  { ay: "Ocak", elektrik: 5400, dogalgaz: 3800 },
  { ay: "Şubat", elektrik: 4900, dogalgaz: 3200 },
  { ay: "Mart", elektrik: 4100, dogalgaz: 2100 }
];
const suggestions = [
  {
    icon: "💡",
    title: "LED Aydınlatmaya Geçiş",
    desc: "Ortak alanlarda LED ampul kullanarak yıllık %40 enerji tasarrufu sağlayabilirsiniz.",
    savings: "~1.200 kWh/yıl",
    priority: "Yüksek"
  },
  {
    icon: "🏠",
    title: "Çatı Yalıtımı",
    desc: "Çatı katı yalıtımını iyileştirerek ısı kaybını %30 azaltabilirsiniz.",
    savings: "~800 kWh/yıl",
    priority: "Orta"
  },
  {
    icon: "☀️",
    title: "Güneş Paneli Kurulumu",
    desc: "Çatıya kurulacak 20 panel ile yıllık tüketimin %25'ini karşılayabilirsiniz.",
    savings: "~5.000 kWh/yıl",
    priority: "Uzun Vadeli"
  },
  {
    icon: "🌡️",
    title: "Akıllı Termostat",
    desc: "Merkezi ısıtmaya akıllı termostat ekleyerek gereksiz ısıtmayı önleyebilirsiniz.",
    savings: "~600 kWh/yıl",
    priority: "Orta"
  },
  {
    icon: "🚿",
    title: "Düşük Debili Armatürler",
    desc: "Su tasarruflu armatürler hem su hem enerji tasarrufu sağlar.",
    savings: "~300 kWh/yıl",
    priority: "Düşük"
  }
];
const priorityColors = {
  Yüksek: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Orta: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  "Uzun Vadeli": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Düşük: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
};
function EnergyEfficiency(_props) {
  const [co2Input, setCo2Input] = reactExports.useState("");
  const [co2Result, setCo2Result] = reactExports.useState(null);
  const [goalKwh, setGoalKwh] = reactExports.useState("4000");
  const [goalDate, setGoalDate] = reactExports.useState("2025-06-30");
  const [goalSaved, setGoalSaved] = reactExports.useState(false);
  const currentKwh = 4100;
  const targetKwh = Number(goalKwh) || 4e3;
  const goalProgress = Math.max(
    0,
    Math.min(100, Math.round((targetKwh - currentKwh + 1e3) / 1e3 * 100))
  );
  const calcCo2 = () => {
    const kwh = Number.parseFloat(co2Input);
    if (!Number.isNaN(kwh)) setCo2Result(kwh * 0.49);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Enerji Verimliliği Takibi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Bina enerji tüketimi, karşılaştırmalı analiz ve tasarruf önerileri" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Battery, { className: "w-5 h-5 text-green-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Enerji Skoru" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-green-600", children: "B" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Skala: A (en iyi) → G" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Bu Ay Tüketim" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: currentKwh.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "kWh" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "CO₂ Tasarrufu" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-emerald-600", children: "342" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "kg bu ay" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Tasarruf Hedefi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-blue-600", children: [
          goalProgress,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: goalProgress, className: "h-1.5 mt-1" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-5 h-5" }),
        " Son 6 Ay Tüketim Karşılaştırması"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: chartData,
          margin: { top: 5, right: 20, left: 0, bottom: 5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => [`${value} kWh`] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "elektrik",
                name: "Elektrik (kWh)",
                fill: "#3b82f6",
                radius: [4, 4, 0, 0]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "dogalgaz",
                name: "Doğalgaz (kWh)",
                fill: "#f97316",
                radius: [4, 4, 0, 0]
              }
            )
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }),
          " Tasarruf Hedefi Belirle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hedef Aylık Tüketim (kWh)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "energy.goal_input",
                type: "number",
                value: goalKwh,
                onChange: (e) => setGoalKwh(e.target.value),
                placeholder: "Örn: 3500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Hedef Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "energy.date_input",
                type: "date",
                value: goalDate,
                onChange: (e) => setGoalDate(e.target.value)
              }
            )
          ] }),
          goalSaved && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-green-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Hedef kaydedildi!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "energy.save_button",
              className: "w-full",
              onClick: () => setGoalSaved(true),
              children: "Hedefi Kaydet"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }),
          " CO₂ Hesap Makinesi"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enerji tüketiminizi girerek karbon ayak izinizi hesaplayın (0.49 kg CO₂/kWh)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Aylık Tüketim (kWh)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "energy.co2_input",
                type: "number",
                value: co2Input,
                onChange: (e) => setCo2Input(e.target.value),
                placeholder: "Örn: 4100"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "energy.calc_button",
              variant: "outline",
              className: "w-full",
              onClick: calcCo2,
              children: "Hesapla"
            }
          ),
          co2Result !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aylık CO₂ Eşdeğeri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-orange-600", children: [
              co2Result.toFixed(1),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "kg" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              (co2Result / 12).toFixed(1),
              " ağaç/yıl absorbe eder"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-yellow-500" }),
        " Tasarruf Önerileri"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: s.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[s.priority]}`,
              children: s.priority
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-green-600", children: [
          "Tasarruf: ",
          s.savings
        ] })
      ] }, s.title)) }) })
    ] })
  ] });
}
export {
  EnergyEfficiency as default
};
