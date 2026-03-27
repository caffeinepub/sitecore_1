import { c as createLucideIcon, j as jsxRuntimeExports, k as TrendingUp, ar as Award, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge } from "./index-xOs1ph1v.js";
import { P as Progress } from "./progress-BgveVntt.js";
import { L as Leaf } from "./leaf-X-Nsp9J-.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./BarChart-DhiXVqCS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu"
    }
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5"
    }
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }]
];
const Recycle = createLucideIcon("recycle", __iconNode);
const RECYCLING_SCHEDULE = [
  {
    gun: "Pazartesi",
    tur: "Plastik & Metal",
    renk: "bg-yellow-400",
    icon: "♻️",
    aciklama: "Sarı konteyner"
  },
  {
    gun: "Salı",
    tur: "Organik Atık",
    renk: "bg-green-500",
    icon: "🌿",
    aciklama: "Kahverengi konteyner"
  },
  {
    gun: "Çarşamba",
    tur: "Karışık Atık",
    renk: "bg-gray-500",
    icon: "🗑️",
    aciklama: "Gri konteyner"
  },
  {
    gun: "Perşembe",
    tur: "Kağıt & Karton",
    renk: "bg-blue-500",
    icon: "📄",
    aciklama: "Mavi konteyner"
  },
  {
    gun: "Cuma",
    tur: "Cam",
    renk: "bg-green-300",
    icon: "🫙",
    aciklama: "Yeşil konteyner"
  },
  {
    gun: "Cumartesi",
    tur: "Elektronik Atık",
    renk: "bg-purple-500",
    icon: "📱",
    aciklama: "Mor konteyner (Ayda 1)"
  },
  {
    gun: "Pazar",
    tur: "Kağıt & Karton",
    renk: "bg-blue-500",
    icon: "📄",
    aciklama: "Mavi konteyner (ikinci tur)"
  }
];
const MONTHLY_WASTE = [
  { ay: "Eki", plastik: 125, kagit: 98, cam: 72, organik: 210, elektronik: 15 },
  {
    ay: "Kas",
    plastik: 131,
    kagit: 102,
    cam: 68,
    organik: 198,
    elektronik: 12
  },
  {
    ay: "Ara",
    plastik: 142,
    kagit: 120,
    cam: 85,
    organik: 225,
    elektronik: 20
  },
  { ay: "Oca", plastik: 128, kagit: 95, cam: 71, organik: 205, elektronik: 8 },
  { ay: "Şub", plastik: 119, kagit: 91, cam: 65, organik: 195, elektronik: 11 },
  {
    ay: "Mar",
    plastik: 133,
    kagit: 108,
    cam: 78,
    organik: 215,
    elektronik: 14
  }
];
const LATEST_MONTH = MONTHLY_WASTE[MONTHLY_WASTE.length - 1];
const totalWaste = LATEST_MONTH.plastik + LATEST_MONTH.kagit + LATEST_MONTH.cam + LATEST_MONTH.organik + LATEST_MONTH.elektronik;
const recycledAmount = LATEST_MONTH.plastik + LATEST_MONTH.kagit + LATEST_MONTH.cam + LATEST_MONTH.elektronik;
const recycleRate = Math.round(recycledAmount / totalWaste * 100);
const ENV_SCORE = 73;
const CO2_SAVED_KG = Math.round(recycledAmount * 0.85);
const CATEGORIES = [
  { name: "Plastik", key: "plastik", color: "#F2A23A" },
  { name: "Kağıt", key: "kagit", color: "#4A90D9" },
  { name: "Cam", key: "cam", color: "#22C55E" },
  { name: "Organik", key: "organik", color: "#8B5CF6" },
  { name: "Elektronik", key: "elektronik", color: "#EF4444" }
];
const CERTS = [
  {
    name: "LEED Silver",
    issuer: "USGBC",
    year: "2022",
    status: "Aktif",
    color: "bg-gray-100 text-gray-700"
  },
  {
    name: "ISO 14001",
    issuer: "ISO",
    year: "2021",
    status: "Aktif",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "BREEAM Very Good",
    issuer: "BRE",
    year: "2023",
    status: "Aktif",
    color: "bg-blue-100 text-blue-700"
  }
];
const TODAY_IDX = (/* @__PURE__ */ new Date()).getDay();
const GUN_MAP = [6, 0, 1, 2, 3, 4, 5];
function WasteManagement({
  buildingId: _buildingId,
  t: _t
}) {
  const todayScheduleIdx = GUN_MAP[TODAY_IDX];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Çevre & Atık Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Geri dönüşüm takvimi, atık takibi ve çevre skoru" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-green-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Çevre Skoru" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-green-600", children: ENV_SCORE }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "/100" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Recycle, { className: "w-4 h-4 text-[#4A90D9]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Geri Dönüşüm Oranı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-extrabold text-[#4A90D9]", children: [
          recycleRate,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-purple-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "CO₂ Tasarrufu" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-purple-600", children: CO2_SAVED_KG }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "kg bu ay" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-[#F2A23A]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Sertifikalar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-[#F2A23A]", children: CERTS.length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "schedule", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "schedule", children: "Geri Dönüşüm Takvimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tracking", children: "Atık Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "score", children: "Çevre Skoru & Sertifika" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "schedule", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", children: RECYCLING_SCHEDULE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white rounded-xl border-2 p-4 transition-all ${i === todayScheduleIdx ? "border-[#4A90D9] shadow-md" : "border-[#E5EAF2]"}`,
          children: [
            i === todayScheduleIdx && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#4A90D9] text-white border-0 text-xs mb-2", children: "Bugün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full ${item.renk} flex items-center justify-center text-xl mb-3`,
                children: item.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-[#0E1116]", children: item.gun }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] font-medium", children: item.tur }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: item.aciklama })
          ]
        },
        item.gun
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "tracking", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Bu Ayki Atık Miktarları (kg)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: CATEGORIES.map((c) => {
            const val = LATEST_MONTH[c.key];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0E1116]", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", style: { color: c.color }, children: [
                  val,
                  " kg"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-[#F3F6FB] rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 rounded-full",
                  style: {
                    width: `${val / totalWaste * 100}%`,
                    backgroundColor: c.color
                  }
                }
              ) })
            ] }, c.key);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "6 Aylık Atık Trendi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: MONTHLY_WASTE, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
            CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: c.key,
                name: c.name,
                fill: c.color,
                stackId: "a"
              },
              c.key
            ))
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "score", className: "mt-4 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Çevre Performans Skoru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "transform -rotate-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Çevre Skoru" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "40",
                  fill: "none",
                  stroke: "#E5EAF2",
                  strokeWidth: "12"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "50",
                  cy: "50",
                  r: "40",
                  fill: "none",
                  stroke: "#22C55E",
                  strokeWidth: "12",
                  strokeDasharray: `${ENV_SCORE / 100 * 251.2} 251.2`,
                  strokeLinecap: "round"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-extrabold text-green-600", children: ENV_SCORE }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "/100" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            { label: "Geri Dönüşüm Oranı", val: recycleRate },
            { label: "Enerji Verimliliği", val: 78 },
            { label: "Su Tasarrufu", val: 65 },
            { label: "Karbon Ayak İzi Azaltma", val: 71 }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                item.val,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: item.val, className: "h-1.5" })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Bina Sertifikaları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: CERTS.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 bg-[#F3F6FB] rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-[#F2A23A]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: cert.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                      cert.issuer,
                      " · ",
                      cert.year
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `border-0 text-xs ${cert.color}`, children: cert.status })
              ]
            },
            cert.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-5 h-5 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-green-800", children: "CO₂ Tasarruf Hesabı" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
              CO2_SAVED_KG,
              " kg"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-700 mt-1", children: "Bu ay geri dönüşümle sağlanan CO₂ tasarrufu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-700", children: [
              Math.round(CO2_SAVED_KG * 12),
              " kg yıllık tahmini tasarruf"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  WasteManagement as default
};
