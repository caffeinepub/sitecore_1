import { j as jsxRuntimeExports, k as TrendingUp, M as MessageSquare, ar as Award, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, e as Badge } from "./index-DuPekrWc.js";
import { T as TrendingDown } from "./trending-down-CfapM9nA.js";
import { T as ThumbsUp } from "./thumbs-up-KmaM7JEz.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "./BarChart-D6lD0VI2.js";
import { L as LineChart, a as Line } from "./LineChart-Ck32pshA.js";
import { S as Star } from "./star-Bf57LVBB.js";
const NPS_SCORE = 72;
const NPS_TREND = 4;
const CATEGORY_SCORES = [
  { category: "Temizlik", score: 4.2, color: "#4A90D9" },
  { category: "Güvenlik", score: 4.5, color: "#22C55E" },
  { category: "Yönetim", score: 3.8, color: "#F2A23A" },
  { category: "Altyapı", score: 3.6, color: "#8B5CF6" },
  { category: "İletişim", score: 4.1, color: "#06B6D4" }
];
const MONTHLY_TREND = [
  { ay: "Nis", nps: 61 },
  { ay: "May", nps: 63 },
  { ay: "Haz", nps: 65 },
  { ay: "Tem", nps: 60 },
  { ay: "Ağu", nps: 64 },
  { ay: "Eyl", nps: 67 },
  { ay: "Eki", nps: 70 },
  { ay: "Kas", nps: 68 },
  { ay: "Ara", nps: 71 },
  { ay: "Oca", nps: 69 },
  { ay: "Şub", nps: 68 },
  { ay: "Mar", nps: 72 }
];
const FEEDBACK_LIST = [
  {
    id: "fb1",
    daire: "A-12",
    tarih: "2026-03-20",
    puan: 5,
    yorum: "Asansör tamiri çok hızlı yapıldı, teşekkürler!",
    kategori: "Altyapı"
  },
  {
    id: "fb2",
    daire: "B-7",
    tarih: "2026-03-18",
    puan: 4,
    yorum: "Temizlik genel olarak iyi ama bodrum katta eksiklik var.",
    kategori: "Temizlik"
  },
  {
    id: "fb3",
    daire: "A-5",
    tarih: "2026-03-15",
    puan: 3,
    yorum: "Yönetim duyuruları çok geç yapılıyor.",
    kategori: "İletişim"
  },
  {
    id: "fb4",
    daire: "C-2",
    tarih: "2026-03-12",
    puan: 5,
    yorum: "Güvenlik personeli çok ilgili ve profesyonel.",
    kategori: "Güvenlik"
  },
  {
    id: "fb5",
    daire: "B-15",
    tarih: "2026-03-10",
    puan: 4,
    yorum: "Bahçe bakımı bu ay çok güzeldi.",
    kategori: "Temizlik"
  },
  {
    id: "fb6",
    daire: "A-3",
    tarih: "2026-03-08",
    puan: 2,
    yorum: "Otopark düzenlemesi hâlâ çözülmedi.",
    kategori: "Yönetim"
  },
  {
    id: "fb7",
    daire: "C-8",
    tarih: "2026-03-06",
    puan: 5,
    yorum: "Online platformun kullanımı çok kolay ve pratik.",
    kategori: "Yönetim"
  },
  {
    id: "fb8",
    daire: "B-3",
    tarih: "2026-03-04",
    puan: 4,
    yorum: "Su arızası 24 saat içinde giderildi, memnunum.",
    kategori: "Altyapı"
  },
  {
    id: "fb9",
    daire: "A-9",
    tarih: "2026-03-01",
    puan: 3,
    yorum: "Ortak alan rezervasyon sistemi bazen yanıt vermiyor.",
    kategori: "Altyapı"
  },
  {
    id: "fb10",
    daire: "C-11",
    tarih: "2026-02-28",
    puan: 4,
    yorum: "Yönetim ekibine teşekkürler, sorunlar hızlı çözülüyor.",
    kategori: "Yönetim"
  },
  {
    id: "fb11",
    daire: "B-9",
    tarih: "2026-02-25",
    puan: 5,
    yorum: "Güvenlik kameralarının arttırılması güvende hissettiriyor.",
    kategori: "Güvenlik"
  },
  {
    id: "fb12",
    daire: "A-14",
    tarih: "2026-02-22",
    puan: 3,
    yorum: "Zaman zaman asansör bakımı gecikmeli yapılıyor.",
    kategori: "Altyapı"
  }
];
const MGMT_METRICS = [
  {
    label: "Ort. Yanıt Süresi",
    value: "4.2 saat",
    icon: TrendingDown,
    color: "text-green-600"
  },
  {
    label: "Çözüm Oranı",
    value: "%87",
    icon: ThumbsUp,
    color: "text-blue-600"
  },
  {
    label: "Aktif Şikayet",
    value: "7",
    icon: MessageSquare,
    color: "text-[#F2A23A]"
  },
  {
    label: "Bu Ay Geri Bildirim",
    value: "34",
    icon: Award,
    color: "text-purple-600"
  }
];
function StarRating({ score }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-4 h-4 ${i <= Math.round(score) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`
    },
    i
  )) });
}
function ResidentSatisfaction({
  buildingId: _buildingId,
  t: _t
}) {
  const npsColor = "text-green-600";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Sakin Memnuniyet & Geri Bildirim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "NPS skoru, kategori memnuniyeti ve geri bildirim analizi" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-6 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-[#6B7A8D] uppercase tracking-wide", children: "Net Tavsiye Skoru (NPS)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-7xl font-extrabold ${npsColor}`, children: NPS_SCORE }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-sm font-medium ${"text-green-600"}`,
                children: [
                  "+",
                  NPS_TREND
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Geçen aya göre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#6B7A8D] mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kötü (0-49)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "İyi (50-74)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mükemmel (75+)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0B1B2E] rounded-full",
              style: { left: `${NPS_SCORE}%` }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 grid grid-cols-2 gap-3", children: MGMT_METRICS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-[#E5EAF2] p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: `w-5 h-5 ${m.color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: m.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${m.color}`, children: m.value })
          ]
        },
        m.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "categories", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "categories", children: "Kategori Memnuniyeti" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "trend", children: "Aylık Trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "feedback", children: "Geri Bildirimler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "categories", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Kategori Skorları (5 üzerinden)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: CATEGORY_SCORES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#0E1116]", children: c.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { score: c.score }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-[#0B1B2E]", children: c.score })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-[#F3F6FB] rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-2 rounded-full transition-all",
                style: {
                  width: `${c.score / 5 * 100}%`,
                  backgroundColor: c.color
                }
              }
            ) })
          ] }, c.category)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Kategori Karşılaştırması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: CATEGORY_SCORES, layout: "vertical", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", horizontal: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                type: "number",
                domain: [0, 5],
                tick: { fontSize: 11 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                dataKey: "category",
                type: "category",
                tick: { fontSize: 11 },
                width: 70
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [v.toFixed(1), "Puan"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "score", radius: [0, 4, 4, 0], children: CATEGORY_SCORES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { fill: c.color }, c.category)) })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "trend", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "12 Aylık NPS Trendi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: MONTHLY_TREND, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "ay", tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [50, 100], tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [v, "NPS"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "nps",
              stroke: "#4A90D9",
              strokeWidth: 2.5,
              dot: { fill: "#4A90D9", r: 4 }
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "feedback", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FEEDBACK_LIST.map((fb) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-xl border border-[#E5EAF2] p-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-[#4A90D9] text-white text-xs font-bold flex items-center justify-center flex-shrink-0", children: fb.daire }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: fb.yorum }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { score: fb.puan }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6B7A8D]", children: fb.tarih }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#F3F6FB] text-[#6B7A8D] border-0 text-xs", children: fb.kategori })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-[#0B1B2E]", children: [
              fb.puan,
              "/5"
            ] })
          ] })
        },
        fb.id
      )) }) })
    ] })
  ] });
}
export {
  ResidentSatisfaction as default
};
