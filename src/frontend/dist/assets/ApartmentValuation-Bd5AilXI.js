import { r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge, k as TrendingUp } from "./index-BJcLL9-x.js";
import { F as Funnel } from "./funnel-CHuKe2lG.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-o-lEiRMi.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./BarChart-ChtE8Chd.js";
import { L as LineChart, a as Line } from "./LineChart-DU22EmeM.js";
const APARTMENTS = [
  {
    id: "A1",
    no: "A-1",
    tip: "2+1",
    alan: 85,
    kat: 1,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 285e4,
    m2Fiyat: 33529
  },
  {
    id: "A2",
    no: "A-2",
    tip: "3+1",
    alan: 120,
    kat: 1,
    yon: "Güney",
    durum: "Satılık",
    deger: 42e5,
    m2Fiyat: 35e3
  },
  {
    id: "A3",
    no: "A-3",
    tip: "1+1",
    alan: 55,
    kat: 2,
    yon: "Doğu",
    durum: "Kiralık",
    deger: 165e4,
    m2Fiyat: 3e4
  },
  {
    id: "A4",
    no: "A-4",
    tip: "2+1",
    alan: 85,
    kat: 2,
    yon: "Batı",
    durum: "Dolu",
    deger: 29e5,
    m2Fiyat: 34118
  },
  {
    id: "B1",
    no: "B-1",
    tip: "2+1",
    alan: 90,
    kat: 3,
    yon: "Güney",
    durum: "Dolu",
    deger: 32e5,
    m2Fiyat: 35556
  },
  {
    id: "B2",
    no: "B-2",
    tip: "3+1",
    alan: 125,
    kat: 3,
    yon: "Güney",
    durum: "Satılık",
    deger: 475e4,
    m2Fiyat: 38e3
  },
  {
    id: "B3",
    no: "B-3",
    tip: "1+1",
    alan: 58,
    kat: 4,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 172e4,
    m2Fiyat: 29655
  },
  {
    id: "B4",
    no: "B-4",
    tip: "2+1",
    alan: 88,
    kat: 4,
    yon: "Güney",
    durum: "Kiralık",
    deger: 335e4,
    m2Fiyat: 38068
  },
  {
    id: "C1",
    no: "C-1",
    tip: "4+1",
    alan: 160,
    kat: 5,
    yon: "Güney",
    durum: "Dolu",
    deger: 72e5,
    m2Fiyat: 45e3
  },
  {
    id: "C2",
    no: "C-2",
    tip: "3+1",
    alan: 130,
    kat: 5,
    yon: "Doğu",
    durum: "Satılık",
    deger: 51e5,
    m2Fiyat: 39231
  },
  {
    id: "C3",
    no: "C-3",
    tip: "2+1",
    alan: 92,
    kat: 5,
    yon: "Batı",
    durum: "Dolu",
    deger: 36e5,
    m2Fiyat: 39130
  },
  {
    id: "D1",
    no: "D-1",
    tip: "1+1",
    alan: 52,
    kat: 1,
    yon: "Kuzey",
    durum: "Dolu",
    deger: 148e4,
    m2Fiyat: 28462
  }
];
const ILCE_ORT_M2 = 32e3;
const BINA_ORT_M2 = Math.round(
  APARTMENTS.reduce((a, b) => a + b.m2Fiyat, 0) / APARTMENTS.length
);
const COMPARISON_DATA = [
  { name: "Bu Bina Ort.", fiyat: BINA_ORT_M2 },
  { name: "İlçe Ort.", fiyat: ILCE_ORT_M2 },
  { name: "Şehir Ort.", fiyat: 35e3 },
  {
    name: "En Düşük Daire",
    fiyat: Math.min(...APARTMENTS.map((a) => a.m2Fiyat))
  },
  {
    name: "En Yüksek Daire",
    fiyat: Math.max(...APARTMENTS.map((a) => a.m2Fiyat))
  }
];
const HISTORY_DATA = [
  { ay: "Nis", ort: 29500 },
  { ay: "May", ort: 30200 },
  { ay: "Haz", ort: 30800 },
  { ay: "Tem", ort: 31200 },
  { ay: "Ağu", ort: 31e3 },
  { ay: "Eyl", ort: 31800 },
  { ay: "Eki", ort: 32500 },
  { ay: "Kas", ort: 33100 },
  { ay: "Ara", ort: 33400 },
  { ay: "Oca", ort: 34e3 },
  { ay: "Şub", ort: 34500 },
  { ay: "Mar", ort: BINA_ORT_M2 }
];
const DURUM_COLORS = {
  Dolu: "bg-green-100 text-green-700",
  Satılık: "bg-blue-100 text-blue-700",
  Kiralık: "bg-purple-100 text-purple-700"
};
const YON_ICONS = {
  Kuzey: "⬆",
  Güney: "⬇",
  Doğu: "➡",
  Batı: "⬅"
};
function ApartmentValuation({
  buildingId: _buildingId,
  t: _t
}) {
  const [filterKat, setFilterKat] = reactExports.useState("Tümü");
  const [filterTip, setFilterTip] = reactExports.useState("Tümü");
  const [filterDurum, setFilterDurum] = reactExports.useState("Tümü");
  const [sortBy, setSortBy] = reactExports.useState("deger");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const katlar = [
    "Tümü",
    ...Array.from(new Set(APARTMENTS.map((a) => String(a.kat)))).sort()
  ];
  const tipler = ["Tümü", ...Array.from(new Set(APARTMENTS.map((a) => a.tip)))];
  const durumlar = ["Tümü", "Dolu", "Satılık", "Kiralık"];
  const filtered = APARTMENTS.filter(
    (a) => filterKat === "Tümü" || String(a.kat) === filterKat
  ).filter((a) => filterTip === "Tümü" || a.tip === filterTip).filter((a) => filterDurum === "Tümü" || a.durum === filterDurum).sort(
    (a, b) => sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
  );
  const totalValue = APARTMENTS.reduce((s, a) => s + a.deger, 0);
  const avgValue = Math.round(totalValue / APARTMENTS.length);
  const satılikCount = APARTMENTS.filter((a) => a.durum === "Satılık").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Daire Değerleme & Piyasa Takibi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Daire değerleri, m² birim fiyatları ve piyasa karşılaştırması" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: [
          (totalValue / 1e6).toFixed(1),
          "M ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Toplam Değer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#4A90D9]", children: [
          (avgValue / 1e6).toFixed(2),
          "M ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Ortalama Değer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
          BINA_ORT_M2.toLocaleString("tr"),
          " ₺"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Ortalama m² Fiyatı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-purple-600", children: satılikCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Satılık Daire" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "list", children: "Daire Listesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "comparison", children: "Piyasa Karşılaştırması" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "history", children: "Değer Geçmişi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "list", className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-[#6B7A8D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Kat:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm",
                value: filterKat,
                onChange: (e) => setFilterKat(e.target.value),
                "data-ocid": "valuation.select",
                children: katlar.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: k }, k))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Tip:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm",
                value: filterTip,
                onChange: (e) => setFilterTip(e.target.value),
                children: tipler.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: k }, k))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Durum:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm",
                value: filterDurum,
                onChange: (e) => setFilterDurum(e.target.value),
                children: durumlar.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: k }, k))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: "Sırala:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "border border-[#D7DEE9] rounded-lg px-2 py-1 text-sm",
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "deger", children: "Değer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "m2Fiyat", children: "m² Fiyatı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "alan", children: "Alan" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSortDir((d) => d === "desc" ? "asc" : "desc"),
                className: "p-1 rounded border border-[#D7DEE9] hover:bg-[#F3F6FB]",
                children: sortDir === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-[#E5EAF2] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Tip" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Alan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Kat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Yön" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "m² Fiyatı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Tahmini Değer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Durum" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#E5EAF2]", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-[#F3F6FB]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-[#0E1116]", children: a.no }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: a.tip }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
              a.alan,
              " m²"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
              a.kat,
              ". Kat"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#3A4654]", children: [
              YON_ICONS[a.yon],
              " ",
              a.yon
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium text-[#0B1B2E]", children: [
              a.m2Fiyat.toLocaleString("tr"),
              " ₺"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-bold text-[#0B1B2E]", children: [
              (a.deger / 1e6).toFixed(2),
              "M ₺"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `border-0 text-xs ${DURUM_COLORS[a.durum]}`,
                children: a.durum
              }
            ) })
          ] }, a.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comparison", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Bölge Karşılaştırması (₺/m²)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: COMPARISON_DATA, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 11 } }),
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
                `${v.toLocaleString("tr")} ₺/m²`,
                "Fiyat"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "fiyat", fill: "#4A90D9", radius: [4, 4, 0, 0] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-[#F3F6FB] rounded-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-green-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
            "Bu binanın ortalama m² fiyatı (",
            BINA_ORT_M2.toLocaleString("tr"),
            " ₺), ilçe ortalamasının",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              ((BINA_ORT_M2 - ILCE_ORT_M2) / ILCE_ORT_M2 * 100).toFixed(
                1
              ),
              "% üzerinde"
            ] }),
            "."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "12 Aylık Ortalama m² Değer Trendi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: HISTORY_DATA, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 12 },
              tickFormatter: (v) => `${(v / 1e3).toFixed(0)}K`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              formatter: (v) => [
                `${v.toLocaleString("tr")} ₺`,
                "Ort. m² Fiyatı"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "ort",
              stroke: "#4A90D9",
              strokeWidth: 2.5,
              dot: { fill: "#4A90D9", r: 4 }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-[#F3F6FB] rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "12 Ay Önceki" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-[#0B1B2E]", children: [
              HISTORY_DATA[0].ort.toLocaleString("tr"),
              " ₺"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-[#F3F6FB] rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Güncel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-[#0B1B2E]", children: [
              BINA_ORT_M2.toLocaleString("tr"),
              " ₺"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Değer Artışı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-green-600", children: [
              "+",
              ((BINA_ORT_M2 - HISTORY_DATA[0].ort) / HISTORY_DATA[0].ort * 100).toFixed(1),
              "%"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ApartmentValuation as default
};
