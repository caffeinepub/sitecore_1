import { r as reactExports, j as jsxRuntimeExports, B as Button, e as Badge } from "./index-BQ1lUxTj.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CmGC2GqD.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, b as Cell, B as BarChart, a as Bar } from "./BarChart-C8vnlGfu.js";
import { L as LineChart, a as Line } from "./LineChart-B5PmDJfd.js";
import { P as PieChart, a as Pie } from "./PieChart-CWWxiJtD.js";
const monthlyData = [
  { ay: "Oca", elektrik: 4200, su: 850, dogalgaz: 3100 },
  { ay: "Şub", elektrik: 3900, su: 800, dogalgaz: 2800 },
  { ay: "Mar", elektrik: 3600, su: 870, dogalgaz: 2200 },
  { ay: "Nis", elektrik: 3200, su: 920, dogalgaz: 1400 },
  { ay: "May", elektrik: 2900, su: 1050, dogalgaz: 600 },
  { ay: "Haz", elektrik: 3400, su: 1200, dogalgaz: 200 },
  { ay: "Tem", elektrik: 4100, su: 1400, dogalgaz: 100 },
  { ay: "Ağu", elektrik: 4300, su: 1350, dogalgaz: 120 },
  { ay: "Eyl", elektrik: 3700, su: 1100, dogalgaz: 400 },
  { ay: "Eki", elektrik: 3500, su: 950, dogalgaz: 1800 },
  { ay: "Kas", elektrik: 3900, su: 880, dogalgaz: 2600 },
  { ay: "Ara", elektrik: 4400, su: 860, dogalgaz: 3200 }
];
const apartmentData = [
  { daire: "D:1", elektrik: 320, su: 68, dogalgaz: 240 },
  { daire: "D:2", elektrik: 280, su: 72, dogalgaz: 195 },
  { daire: "D:3", elektrik: 410, su: 95, dogalgaz: 310 },
  { daire: "D:4", elektrik: 260, su: 58, dogalgaz: 180 },
  { daire: "D:5", elektrik: 350, su: 88, dogalgaz: 270 },
  { daire: "D:6", elektrik: 290, su: 65, dogalgaz: 205 },
  { daire: "D:7", elektrik: 380, su: 82, dogalgaz: 290 },
  { daire: "D:8", elektrik: 240, su: 55, dogalgaz: 165 }
];
const pieData = [
  { name: "Elektrik", value: 43800, color: "#f59e0b" },
  { name: "Su", value: 11230, color: "#3b82f6" },
  { name: "Doğalgaz", value: 18520, color: "#ef4444" }
];
const savingsTips = [
  {
    icon: "💡",
    title: "LED Aydınlatma",
    desc: "Ortak alanlarda LED geçişiyle %40 elektrik tasarrufu sağlanabilir.",
    tasarruf: "1.200 ₺/ay"
  },
  {
    icon: "🌡️",
    title: "Akıllı Termostat",
    desc: "Merkezi ısıtmada akıllı termostat kullanımı %25 doğalgaz tasarrufu sunar.",
    tasarruf: "2.100 ₺/ay"
  },
  {
    icon: "💧",
    title: "Damlama Tespiti",
    desc: "Boru sistemindeki damlama noktaları tespiti %15 su tasarrufu sağlar.",
    tasarruf: "380 ₺/ay"
  },
  {
    icon: "☀️",
    title: "Güneş Paneli",
    desc: "Çatıya kurulacak güneş panelleri ortak alan elektrik ihtiyacını karşılayabilir.",
    tasarruf: "1.800 ₺/ay"
  },
  {
    icon: "🔧",
    title: "Kazan Bakımı",
    desc: "Yıllık kazan bakımı verimliği %20 artırarak yakıt tüketimini düşürür.",
    tasarruf: "950 ₺/ay"
  },
  {
    icon: "🪟",
    title: "Çift Cam Yalıtım",
    desc: "Isı yalıtımlı cam sistemi ısınma maliyetini önemli ölçüde azaltır.",
    tasarruf: "1.500 ₺/ay"
  }
];
const kpiData = [
  {
    label: "Bu Ay Toplam Tüketim",
    value: "9.540 kWh",
    change: "-3.2%",
    positive: true,
    icon: "⚡"
  },
  {
    label: "Aylık Toplam Maliyet",
    value: "28.640 ₺",
    change: "+1.8%",
    positive: false,
    icon: "💰"
  },
  {
    label: "Daire Başı Ortalama",
    value: "3.580 ₺",
    change: "-2.1%",
    positive: true,
    icon: "🏠"
  },
  {
    label: "CO₂ Tasarrufu",
    value: "1.2 ton",
    change: "+0.3 ton",
    positive: true,
    icon: "🌱"
  }
];
function EnergyConsumption(_props) {
  const [activeTab, setActiveTab] = reactExports.useState(
    "genel"
  );
  const [selectedType, setSelectedType] = reactExports.useState("tum");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Bina Enerji Tüketimi & Tasarrufu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Elektrik, su ve doğalgaz tüketimi izleme ve tasarruf önerileri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "📊 Rapor İndir" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: kpiData.map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: kpi.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: kpi.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: kpi.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `text-xs font-medium mt-1 ${kpi.positive ? "text-green-600" : "text-red-500"}`,
          children: [
            kpi.change,
            " geçen aya göre"
          ]
        }
      )
    ] }) }, kpi.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["genel", "daire", "tasarruf"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: activeTab === tab ? "default" : "outline",
        size: "sm",
        onClick: () => setActiveTab(tab),
        children: tab === "genel" ? "📈 Genel Tüketim" : tab === "daire" ? "🏠 Daire Bazlı" : "💡 Tasarruf Önerileri"
      },
      tab
    )) }),
    activeTab === "genel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["tum", "elektrik", "su", "dogalgaz"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: selectedType === type ? "default" : "outline",
          className: "cursor-pointer",
          onClick: () => setSelectedType(type),
          children: type === "tum" ? "Tümü" : type === "elektrik" ? "⚡ Elektrik" : type === "su" ? "💧 Su" : "🔥 Doğalgaz"
        },
        type
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Aylık Tüketim Grafiği (Son 12 Ay)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: monthlyData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          (selectedType === "tum" || selectedType === "elektrik") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "elektrik",
              name: "Elektrik (kWh)",
              stroke: "#f59e0b",
              strokeWidth: 2,
              dot: false
            }
          ),
          (selectedType === "tum" || selectedType === "su") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "su",
              name: "Su (m³)",
              stroke: "#3b82f6",
              strokeWidth: 2,
              dot: false
            }
          ),
          (selectedType === "tum" || selectedType === "dogalgaz") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "dogalgaz",
              name: "Doğalgaz (m³)",
              stroke: "#ef4444",
              strokeWidth: 2,
              dot: false
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Yıllık Tüketim Dağılımı" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: pieData,
                cx: "50%",
                cy: "50%",
                outerRadius: 80,
                dataKey: "value",
                label: ({ name, percent }) => `${name} %${(percent * 100).toFixed(0)}`,
                children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                formatter: (v) => `${v.toLocaleString()} birim`
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Maliyet Özeti (Bu Yıl)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            [
              {
                label: "Elektrik",
                total: "52.400 ₺",
                unit: "43.800 kWh",
                color: "bg-amber-500",
                pct: 71
              },
              {
                label: "Su",
                total: "8.970 ₺",
                unit: "11.230 m³",
                color: "bg-blue-500",
                pct: 12
              },
              {
                label: "Doğalgaz",
                total: "12.340 ₺",
                unit: "18.520 m³",
                color: "bg-red-500",
                pct: 17
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  item.total,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                    "(",
                    item.unit,
                    ")"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `${item.color} h-2 rounded-full`,
                  style: { width: `${item.pct}%` }
                }
              ) })
            ] }, item.label)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t flex justify-between font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Toplam" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "73.710 ₺" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    activeTab === "daire" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Kasım 2024 dönemi -- daire bazlı tüketim karşılaştırması" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daire Bazlı Tüketim Karşılaştırması" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: apartmentData,
            margin: { top: 10, right: 10, left: 0, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "daire", tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "elektrik",
                  name: "Elektrik (kWh)",
                  fill: "#f59e0b"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "su", name: "Su (m³)", fill: "#3b82f6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "dogalgaz", name: "Doğalgaz (m³)", fill: "#ef4444" })
            ]
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "⚡ Elektrik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "💧 Su" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "🔥 Doğalgaz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "Toplam Maliyet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3", children: "Durum" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: apartmentData.map((row) => {
          const total = row.elektrik * 1.2 + row.su * 0.8 + row.dogalgaz * 0.65;
          const avg = 355;
          const status = row.elektrik > avg ? "Yüksek" : row.elektrik < avg * 0.8 ? "Düşük" : "Normal";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium", children: row.daire }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right", children: [
                  row.elektrik,
                  " kWh"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right", children: [
                  row.su,
                  " m³"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right", children: [
                  row.dogalgaz,
                  " m³"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right font-medium", children: [
                  total.toFixed(0),
                  " ₺"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: status === "Yüksek" ? "destructive" : status === "Düşük" ? "secondary" : "default",
                    children: status
                  }
                ) })
              ]
            },
            row.daire
          );
        }) })
      ] }) })
    ] }),
    activeTab === "tasarruf" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-green-800 dark:text-green-200", children: [
        "🌱 Tüm önerilerin uygulanması durumunda tahmini aylık tasarruf:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "7.930 ₺" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: savingsTips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border hover:shadow-md transition-shadow",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: tip.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: tip.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-green-700 bg-green-100",
                    children: tip.tasarruf
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: tip.desc })
            ] })
          ] }) })
        },
        tip.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Yıllık Tasarruf Potansiyeli" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: savingsTips.map((s) => ({
              name: s.title,
              tasarruf: Number.parseInt(
                s.tasarruf.replace(/[^0-9]/g, "")
              )
            })),
            layout: "vertical",
            margin: { left: 80 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  type: "category",
                  dataKey: "name",
                  tick: { fontSize: 11 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (v) => `${v.toLocaleString()} ₺/ay`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bar,
                {
                  dataKey: "tasarruf",
                  name: "Tasarruf (₺/ay)",
                  fill: "#22c55e",
                  radius: [0, 4, 4, 0]
                }
              )
            ]
          }
        ) }) })
      ] })
    ] })
  ] });
}
export {
  EnergyConsumption as default
};
