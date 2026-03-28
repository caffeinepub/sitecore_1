import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, at as Award, U as Users, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, k as TrendingUp, a1 as Zap, e as Badge } from "./index-CC-G2BYq.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-klDLrOsd.js";
import { P as Progress } from "./progress-bZivyD3x.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-4Y-aM0V_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DGJHAqrO.js";
import { T as Trophy } from "./trophy-DxiJe-8f.js";
import { C as CircleCheckBig } from "./circle-check-big-BNsB4jU7.js";
import { S as Star } from "./star-D_yezlTi.js";
import "./index-DALdMlsI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
const residents = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    apartment: "D:12",
    points: 1850,
    badge: "Altın Sakin"
  },
  {
    id: "2",
    name: "Fatma Demir",
    apartment: "D:7",
    points: 1420,
    badge: "Gümüş Sakin"
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    apartment: "D:3",
    points: 1180,
    badge: "Gümüş Sakin"
  },
  {
    id: "4",
    name: "Zeynep Çelik",
    apartment: "D:15",
    points: 840,
    badge: "Bronz Sakin"
  },
  {
    id: "5",
    name: "Ali Şahin",
    apartment: "D:9",
    points: 720,
    badge: "Bronz Sakin"
  },
  {
    id: "6",
    name: "Ayşe Koç",
    apartment: "D:2",
    points: 540,
    badge: "Bronz Sakin"
  },
  { id: "7", name: "Mustafa Öz", apartment: "D:18", points: 310, badge: null },
  { id: "8", name: "Elif Arslan", apartment: "D:6", points: 200, badge: null }
];
const pointHistory = [
  {
    id: "1",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat"
  },
  {
    id: "2",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-02-15",
    category: "gonullu"
  },
  {
    id: "3",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket"
  },
  {
    id: "4",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti"
  },
  {
    id: "5",
    residentId: "1",
    resident: "Ahmet Yılmaz",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-01-28",
    category: "hasar"
  },
  {
    id: "6",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat"
  },
  {
    id: "7",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti"
  },
  {
    id: "8",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket"
  },
  {
    id: "9",
    residentId: "2",
    resident: "Fatma Demir",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-01-20",
    category: "gonullu"
  },
  {
    id: "10",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat"
  },
  {
    id: "11",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-20",
    category: "hasar"
  },
  {
    id: "12",
    residentId: "3",
    resident: "Mehmet Kaya",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket"
  },
  {
    id: "13",
    residentId: "4",
    resident: "Zeynep Çelik",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat"
  },
  {
    id: "14",
    residentId: "4",
    resident: "Zeynep Çelik",
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    date: "2026-02-18",
    category: "gonullu"
  },
  {
    id: "15",
    residentId: "5",
    resident: "Ali Şahin",
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    date: "2026-03-01",
    category: "aidat"
  },
  {
    id: "16",
    residentId: "5",
    resident: "Ali Şahin",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket"
  },
  {
    id: "17",
    residentId: "6",
    resident: "Ayşe Koç",
    action: "Toplantıya Katılım",
    points: 15,
    date: "2026-02-05",
    category: "toplanti"
  },
  {
    id: "18",
    residentId: "6",
    resident: "Ayşe Koç",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-22",
    category: "hasar"
  },
  {
    id: "19",
    residentId: "7",
    resident: "Mustafa Öz",
    action: "Anket Katılımı",
    points: 20,
    date: "2026-02-10",
    category: "anket"
  },
  {
    id: "20",
    residentId: "8",
    resident: "Elif Arslan",
    action: "Hasar Bildirimi",
    points: 10,
    date: "2026-02-25",
    category: "hasar"
  }
];
const rules = [
  {
    action: "Zamanında Aidat Ödemesi",
    points: 50,
    icon: CircleCheckBig,
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    action: "Gönüllü Görev Tamamlama",
    points: 30,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    action: "Anket Katılımı",
    points: 20,
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50"
  },
  {
    action: "Toplantıya Katılım",
    points: 15,
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    action: "Hasar Bildirimi",
    points: 10,
    icon: Zap,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    action: "Forum Konusu Açma",
    points: 5,
    icon: Star,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    action: "Öneri Gönderme",
    points: 5,
    icon: TrendingUp,
    color: "text-teal-600",
    bg: "bg-teal-50"
  }
];
const rewards = [
  {
    level: "Bronz Sakin",
    points: 500,
    color: "from-orange-400 to-amber-500",
    textColor: "text-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "🥉",
    perks: [
      "Özel profil rozeti",
      "Duyuruları öncelikli görme",
      "Teşekkür sertifikası"
    ]
  },
  {
    level: "Gümüş Sakin",
    points: 1e3,
    color: "from-slate-400 to-gray-500",
    textColor: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
    icon: "🥈",
    perks: [
      "Bronz ayrıcalıkları",
      "Aylık bülten öne çıkarma",
      "Yönetim toplantısına davet"
    ]
  },
  {
    level: "Altın Sakin",
    points: 2e3,
    color: "from-yellow-400 to-amber-400",
    textColor: "text-yellow-800",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "🥇",
    perks: [
      "Gümüş ayrıcalıkları",
      "Yıllık ödül töreni",
      "Yönetim danışma hakkı",
      "Özel park yeri önceliği"
    ]
  }
];
const getMedalIcon = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};
const getBadgeVariant = (badge) => {
  if (badge === "Altın Sakin")
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (badge === "Gümüş Sakin")
    return "bg-slate-100 text-slate-700 border-slate-300";
  if (badge === "Bronz Sakin")
    return "bg-orange-100 text-orange-700 border-orange-300";
  return "bg-gray-100 text-gray-600 border-gray-200";
};
const getCategoryColor = (category) => {
  const map = {
    aidat: "bg-green-100 text-green-700",
    gonullu: "bg-blue-100 text-blue-700",
    anket: "bg-yellow-100 text-yellow-700",
    toplanti: "bg-purple-100 text-purple-700",
    hasar: "bg-orange-100 text-orange-700"
  };
  return map[category] || "bg-gray-100 text-gray-600";
};
function ResidentRewards({
  buildingId: _buildingId,
  isOwner: _isOwner
}) {
  const [selectedResident, setSelectedResident] = reactExports.useState("all");
  const filteredHistory = selectedResident === "all" ? pointHistory : pointHistory.filter((h) => h.residentId === selectedResident);
  const totalPoints = residents.reduce((s, r) => s + r.points, 0);
  const goldCount = residents.filter((r) => r.badge === "Altın Sakin").length;
  const bronzePlus = residents.filter((r) => r.badge !== null).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-yellow-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0B1B2E]", children: "Sakin Ödül & Teşvik Sistemi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Katılım ve katkıya göre puan kazanın, rozet ve ayrıcalıklar edinin" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-yellow-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Toplam Puan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0B1B2E]", children: totalPoints.toLocaleString() })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🥇" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Altın Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0B1B2E]", children: goldCount })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-4 h-4 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Rozetli Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0B1B2E]", children: bronzePlus })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: "Toplam Sakin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-[#0B1B2E]", children: residents.length })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "leaderboard", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-white border border-gray-200 rounded-xl p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "leaderboard",
            "data-ocid": "rewards.tab",
            className: "rounded-lg text-sm",
            children: "🏆 Liderlik Tablosu"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "history",
            "data-ocid": "rewards.tab",
            className: "rounded-lg text-sm",
            children: "📋 Puan Geçmişi"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "rules",
            "data-ocid": "rewards.tab",
            className: "rounded-lg text-sm",
            children: "📖 Puan Kuralları"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "rewards",
            "data-ocid": "rewards.tab",
            className: "rounded-lg text-sm",
            children: "🎁 Ödüller"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "leaderboard", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-[#0B1B2E]", children: "Puan Sıralaması" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: residents.map((resident, index) => {
          const rank = index + 1;
          const medal = getMedalIcon(rank);
          const nextMilestone = resident.badge === "Altın Sakin" ? 2e3 : resident.badge === "Gümüş Sakin" ? 2e3 : resident.badge === "Bronz Sakin" ? 1e3 : resident.points < 500 ? 500 : 1e3;
          const progress = Math.min(
            resident.points / nextMilestone * 100,
            100
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `rewards.item.${rank}`,
              className: `flex items-center gap-4 p-3 rounded-xl border ${rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-100" : "bg-gray-50 border-gray-100"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 text-center", children: medal ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: medal }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-gray-400", children: [
                  "#",
                  rank
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0B1B2E] text-sm", children: resident.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: resident.apartment }),
                    resident.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full border font-medium ${getBadgeVariant(resident.badge)}`,
                        children: resident.badge
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1.5 flex-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 whitespace-nowrap", children: [
                      resident.points,
                      "/",
                      nextMilestone
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-indigo-600", children: resident.points }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "puan" })
                ] })
              ]
            },
            resident.id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-[#0B1B2E]", children: "Puan Kazanma Geçmişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedResident,
              onValueChange: setSelectedResident,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", "data-ocid": "rewards.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sakin seçin" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tüm Sakinler" }),
                  residents.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.name }, r.id))
                ] })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Sakin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Eylem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Puan" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredHistory.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: entry.resident }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: entry.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(entry.category)}`,
                children: entry.category
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-gray-500", children: entry.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-indigo-600", children: [
              "+",
              entry.points
            ] }) })
          ] }, entry.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rules", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold text-[#0B1B2E]", children: "Puan Kazanma Kuralları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Bu eylemler tamamlandığında otomatik olarak puan kazanılır" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: rules.map((rule) => {
          const Icon = rule.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center justify-between p-3 rounded-xl ${rule.bg}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${rule.color}` }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-[#0B1B2E]", children: rule.action })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: `font-bold text-base px-3 ${rule.color} border-current`,
                    children: [
                      "+",
                      rule.points
                    ]
                  }
                )
              ]
            },
            rule.action
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rewards", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4", children: rewards.map((reward) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: `bg-white rounded-xl shadow-sm border-2 ${reward.border}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center text-2xl shadow-md`,
                  children: reward.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CardTitle,
                {
                  className: `text-lg font-bold mt-2 ${reward.textColor}`,
                  children: reward.level
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                reward.points.toLocaleString(),
                " puan gerekli"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Eşiğe ulaşan sakin sayısı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    residents.filter((r) => r.points >= reward.points).length,
                    "/",
                    residents.length
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Progress,
                  {
                    value: residents.filter((r) => r.points >= reward.points).length / residents.length * 100,
                    className: "h-2"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: reward.perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheckBig,
                  {
                    className: `w-3.5 h-3.5 flex-shrink-0 ${reward.textColor}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: perk })
              ] }, perk)) })
            ] })
          ]
        },
        reward.level
      )) }) })
    ] })
  ] });
}
export {
  ResidentRewards as default
};
