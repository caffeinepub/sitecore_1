import { r as reactExports, j as jsxRuntimeExports, Z as Zap, aE as Droplets, K as Flame, T as TriangleAlert } from "./index-DrmT2NwI.js";
import { R as RefreshCw } from "./refresh-cw-D6EPw4tE.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip } from "./generateCategoricalChart-CfET5s9r.js";
import { L as LineChart, a as Line } from "./LineChart-xmCEHl3T.js";
import { C as CircleCheckBig } from "./circle-check-big-C5PaMu8B.js";
const monthlyData = [
  { ay: "Oca", elektrik: 4200, su: 320, dogalgaz: 1850 },
  { ay: "Şub", elektrik: 3900, su: 290, dogalgaz: 2100 },
  { ay: "Mar", elektrik: 3600, su: 310, dogalgaz: 1700 },
  { ay: "Nis", elektrik: 3400, su: 350, dogalgaz: 1200 },
  { ay: "May", elektrik: 3200, su: 420, dogalgaz: 600 },
  { ay: "Haz", elektrik: 3800, su: 510, dogalgaz: 200 },
  { ay: "Tem", elektrik: 4800, su: 580, dogalgaz: 150 },
  { ay: "Ağu", elektrik: 5100, su: 560, dogalgaz: 160 },
  { ay: "Eyl", elektrik: 4200, su: 430, dogalgaz: 480 },
  { ay: "Eki", elektrik: 3700, su: 370, dogalgaz: 1100 },
  { ay: "Kas", elektrik: 4100, su: 330, dogalgaz: 1800 },
  { ay: "Ara", elektrik: 4500, su: 300, dogalgaz: 2200 }
];
const meters = [
  {
    id: "1",
    daire: "Daire 1",
    tipi: "Elektrik",
    sonOkuma: "4.821 kWh",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 4750,
    simdiki: 4821,
    fark: 71
  },
  {
    id: "2",
    daire: "Daire 2",
    tipi: "Elektrik",
    sonOkuma: "3.102 kWh",
    tarih: "2026-03-27",
    durum: "yuksek",
    onceki: 2980,
    simdiki: 3102,
    fark: 122
  },
  {
    id: "3",
    daire: "Daire 3",
    tipi: "Su",
    sonOkuma: "182 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 178,
    simdiki: 182,
    fark: 4
  },
  {
    id: "4",
    daire: "Daire 4",
    tipi: "Su",
    sonOkuma: "241 m³",
    tarih: "2026-03-27",
    durum: "anormal",
    onceki: 228,
    simdiki: 241,
    fark: 13
  },
  {
    id: "5",
    daire: "Daire 5",
    tipi: "Doğalgaz",
    sonOkuma: "1.204 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 1198,
    simdiki: 1204,
    fark: 6
  },
  {
    id: "6",
    daire: "Daire 6",
    tipi: "Doğalgaz",
    sonOkuma: "987 m³",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 981,
    simdiki: 987,
    fark: 6
  },
  {
    id: "7",
    daire: "Daire 7",
    tipi: "Elektrik",
    sonOkuma: "5.432 kWh",
    tarih: "2026-03-26",
    durum: "yuksek",
    onceki: 5280,
    simdiki: 5432,
    fark: 152
  },
  {
    id: "8",
    daire: "Ortak Alan",
    tipi: "Elektrik",
    sonOkuma: "12.841 kWh",
    tarih: "2026-03-27",
    durum: "normal",
    onceki: 12700,
    simdiki: 12841,
    fark: 141
  }
];
const okumaTarihleri = [
  {
    tarih: "27 Mar 2026",
    daire: "Daire 1",
    tipi: "Elektrik",
    deger: "4.821 kWh",
    durum: "Otomatik"
  },
  {
    tarih: "27 Mar 2026",
    daire: "Daire 4",
    tipi: "Su",
    deger: "241 m³",
    durum: "Anormallik Tespit"
  },
  {
    tarih: "27 Mar 2026",
    daire: "Daire 2",
    tipi: "Elektrik",
    deger: "3.102 kWh",
    durum: "Yüksek Tüketim"
  },
  {
    tarih: "26 Mar 2026",
    daire: "Daire 7",
    tipi: "Elektrik",
    deger: "5.432 kWh",
    durum: "Yüksek Tüketim"
  },
  {
    tarih: "25 Mar 2026",
    daire: "Tüm Daireler",
    tipi: "Toplu",
    deger: "—",
    durum: "Otomatik Okuma"
  }
];
function SmartMeterManagement({
  buildingId: _buildingId
}) {
  const [aktifSekme, setAktifSekme] = reactExports.useState("sayaclar");
  const [filtreTyp, setFiltreTyp] = reactExports.useState("Tümü");
  const [okumayapiliyor, setOkumayapiliyor] = reactExports.useState(false);
  const anormalSayaclar = meters.filter(
    (m) => m.durum === "anormal" || m.durum === "yuksek"
  );
  const handleOtomatikOkuma = () => {
    setOkumayapiliyor(true);
    setTimeout(() => setOkumayapiliyor(false), 2e3);
  };
  const filtrelenmis = filtreTyp === "Tümü" ? meters : meters.filter((m) => m.tipi === filtreTyp);
  const durumBadge = (durum) => {
    if (durum === "normal")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700", children: "Normal" });
    if (durum === "yuksek")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700", children: "Yüksek" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700", children: "Anormal" });
  };
  const tipIkon = (tipi) => {
    if (tipi === "Elektrik") return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-yellow-500" });
    if (tipi === "Su") return /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 text-blue-500" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-500" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Akıllı Sayaç & Otomatik Okuma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Elektrik, su ve doğalgaz sayaçlarının uzaktan otomatik takibi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleOtomatikOkuma,
          disabled: okumayapiliyor,
          className: "flex items-center gap-2 bg-[#0B1B2E] text-white px-4 py-2 rounded-full text-sm hover:bg-[#112843] disabled:opacity-60",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-4 h-4 ${okumayapiliyor ? "animate-spin" : ""}`
              }
            ),
            okumayapiliyor ? "Okunuyor..." : "Otomatik Oku"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E8EDF4]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-yellow-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: "Elektrik" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0E1116]", children: "4.320 kWh" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Bu ay ortalama/daire" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E8EDF4]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: "Su" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0E1116]", children: "28 m³" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Bu ay ortalama/daire" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E8EDF4]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: "Doğalgaz" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0E1116]", children: "6 m³" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Bu ay ortalama/daire" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E8EDF4]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: "Uyarı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-red-600", children: anormalSayaclar.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Anormal/yüksek tüketim" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["sayaclar", "grafik", "okumalar", "uyarilar"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setAktifSekme(s),
        className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${aktifSekme === s ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#E8EDF4] hover:bg-[#F3F6FB]"}`,
        children: [
          s === "sayaclar" && "Sayaçlar",
          s === "grafik" && "Tüketim Grafiği",
          s === "okumalar" && "Okuma Geçmişi",
          s === "uyarilar" && `Uyarılar (${anormalSayaclar.length})`
        ]
      },
      s
    )) }),
    aktifSekme === "sayaclar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E8EDF4] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-[#E8EDF4] flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filtreTyp,
            onChange: (e) => setFiltreTyp(e.target.value),
            className: "border border-[#D7DEE9] rounded-lg px-3 py-1.5 text-sm text-[#0E1116]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Elektrik" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Su" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Doğalgaz" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-[#3A4654]", children: [
          filtrelenmis.length,
          " sayaç"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Daire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Tip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Son Okuma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Fark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Tarih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Durum" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtrelenmis.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t border-[#F3F6FB] hover:bg-[#F8FAFC]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-[#0E1116]", children: m.daire }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                tipIkon(m.tipi),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: m.tipi })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#0E1116]", children: m.sonOkuma }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: `px-4 py-2 font-medium ${m.fark > 100 ? "text-red-600" : "text-green-600"}`,
                  children: [
                    "+",
                    m.fark
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: m.tarih }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: durumBadge(m.durum) })
            ]
          },
          m.id
        )) })
      ] }) })
    ] }),
    aktifSekme === "grafik" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E8EDF4] p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#0E1116]", children: "12 Aylık Tüketim Trendi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: monthlyData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F6FB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "elektrik",
            stroke: "#F59E0B",
            strokeWidth: 2,
            name: "Elektrik (kWh)",
            dot: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "su",
            stroke: "#3B82F6",
            strokeWidth: 2,
            name: "Su (L×10)",
            dot: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "dogalgaz",
            stroke: "#F97316",
            strokeWidth: 2,
            name: "Doğalgaz (m³)",
            dot: false
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-1 bg-amber-400 inline-block rounded" }),
          "Elektrik"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-1 bg-blue-500 inline-block rounded" }),
          "Su"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-1 bg-orange-500 inline-block rounded" }),
          "Doğalgaz"
        ] })
      ] })
    ] }),
    aktifSekme === "okumalar" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-[#E8EDF4] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Tarih" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Daire" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Değer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-xs font-semibold text-[#3A4654]", children: "Durum" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: okumaTarihleri.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-t border-[#F3F6FB] hover:bg-[#F8FAFC]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: o.tarih }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-[#0E1116]", children: o.daire }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#3A4654]", children: o.tipi }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-[#0E1116]", children: o.deger }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `px-2 py-0.5 rounded-full text-xs ${o.durum === "Otomatik" || o.durum === "Otomatik Okuma" ? "bg-green-100 text-green-700" : o.durum === "Yüksek Tüketim" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`,
                children: o.durum
              }
            ) })
          ]
        },
        `${o.tarih}-${o.daire}`
      )) })
    ] }) }),
    aktifSekme === "uyarilar" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: anormalSayaclar.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E8EDF4] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-500 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654]", children: "Tüm sayaçlar normal aralıkta." })
    ] }) : anormalSayaclar.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bg-white rounded-xl border p-4 flex items-start gap-3 ${m.durum === "anormal" ? "border-red-200" : "border-amber-200"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: `w-5 h-5 mt-0.5 flex-shrink-0 ${m.durum === "anormal" ? "text-red-500" : "text-amber-500"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: m.daire }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#3A4654]", children: [
                "— ",
                m.tipi,
                " Sayacı"
              ] }),
              durumBadge(m.durum)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
              "Son okuma: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: m.sonOkuma }),
              "  |  Önceki dönem farkı: ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "+",
                m.fark
              ] }),
              " (normal üzeri)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1", children: [
              "Okuma tarihi: ",
              m.tarih
            ] })
          ] })
        ]
      },
      m.id
    )) })
  ] });
}
export {
  SmartMeterManagement as default
};
