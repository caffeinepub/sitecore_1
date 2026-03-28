import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, U as Users, A as Heart, R as Car, W as Wrench, y as BookOpen, e as Badge } from "./index-DOWBo6uK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-s7CBtMuC.js";
import { C as CircleCheck } from "./circle-check-DP0xdjv4.js";
import { S as Star } from "./star-CGMJnKZa.js";
import { S as ShoppingBag } from "./shopping-bag-ZmrUWUmX.js";
import { B as Baby } from "./baby-CbeEpQKN.js";
import { C as Clock } from "./clock-CTiRGnN-.js";
import { M as MessageCircle } from "./message-circle-DIYxIrai.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16", key: "1ifwr1" }],
  [
    "path",
    {
      d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "17abbs"
    }
  ],
  ["path", { d: "m2 15 6 6", key: "10dquu" }],
  [
    "path",
    {
      d: "M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",
      key: "1h3036"
    }
  ]
];
const HandHeart = createLucideIcon("hand-heart", __iconNode);
const categories = [
  { key: "all", label: "Tümü", icon: Heart },
  { key: "alisveris", label: "Alışveriş", icon: ShoppingBag },
  { key: "ulasim", label: "Ulaşım", icon: Car },
  { key: "teknik", label: "Teknik Yardım", icon: Wrench },
  { key: "cocuk", label: "Çocuk Bakımı", icon: Baby },
  { key: "egitim", label: "Eğitim/Ders", icon: BookOpen },
  { key: "sosyal", label: "Sosyal", icon: Users }
];
const mockRequests = [
  {
    id: "1",
    residentName: "Ayşe Kaya",
    apartment: "D-12",
    category: "alisveris",
    title: "Market alışverişi yardımı",
    description: "Dizim ameliyat olduğu için markete gidemiyorum. Haftalık alışveriş listemi paylaşabilirim, ücretini ödeyebilirim.",
    status: "open",
    urgency: "normal",
    postedDate: "2 saat önce",
    helpersCount: 0
  },
  {
    id: "2",
    residentName: "Mehmet Demir",
    apartment: "A-3",
    category: "teknik",
    title: "Bilgisayar kurulumu",
    description: "Yeni aldığım bilgisayarı kurmakta zorlanıyorum. Biraz yardım lazım.",
    status: "matched",
    urgency: "esnek",
    postedDate: "1 gün önce",
    helpersCount: 1
  },
  {
    id: "3",
    residentName: "Fatma Şahin",
    apartment: "B-7",
    category: "cocuk",
    title: "Çocuk bakımı - 2 saatlik",
    description: "Yarın öğleden sonra 2 saatliğine 5 yaşındaki çocuğuma bakabilecek biri var mı? Acil işim çıktı.",
    status: "open",
    urgency: "acil",
    postedDate: "30 dakika önce",
    helpersCount: 0
  },
  {
    id: "4",
    residentName: "Ali Yıldız",
    apartment: "C-15",
    category: "ulasim",
    title: "Hastane ulaşımı",
    description: "Perşembe sabahı hastaneye gidip gelmem gerekiyor. Araçlı biri yardımcı olabilir mi?",
    status: "open",
    urgency: "normal",
    postedDate: "3 saat önce",
    helpersCount: 2
  },
  {
    id: "5",
    residentName: "Zeynep Arslan",
    apartment: "E-4",
    category: "egitim",
    title: "Matematik dersi",
    description: "Lise 2'deki kızıma matematik konularında yardımcı olabilecek biri arıyorum. Ücret öderim.",
    status: "completed",
    urgency: "esnek",
    postedDate: "5 gün önce",
    helpersCount: 1
  }
];
const mockOffers = [
  {
    id: "1",
    residentName: "Emre Çelik",
    apartment: "A-8",
    category: "teknik",
    title: "Elektrik / elektronik yardımı",
    description: "Bilgisayar mühendisiyim. Teknik sorunlarınızda yardımcı olabilirim.",
    availability: "Hafta sonu",
    rating: 4.9,
    helpCount: 12
  },
  {
    id: "2",
    residentName: "Selin Kara",
    apartment: "D-5",
    category: "cocuk",
    title: "Çocuk bakımı",
    description: "Öğretmenim, güvenilir çocuk bakımı sağlayabilirim. Referanslarım var.",
    availability: "Esnek",
    rating: 5,
    helpCount: 8
  },
  {
    id: "3",
    residentName: "Hasan Güneş",
    apartment: "B-11",
    category: "ulasim",
    title: "Araç ile ulaşım",
    description: "Hafta içi sabah saatlerinde hastane veya market gibi yerlere götürüp getirebilirim.",
    availability: "Hafta içi sabah",
    rating: 4.7,
    helpCount: 15
  },
  {
    id: "4",
    residentName: "Nilüfer Öz",
    apartment: "C-2",
    category: "alisveris",
    title: "Market alışverişi",
    description: "Her gün markete gidiyorum, sizi de düşünebilirim. Ücretsiz yaparım.",
    availability: "Her gün öğlen",
    rating: 4.8,
    helpCount: 20
  }
];
const urgencyConfig = {
  acil: { label: "Acil", color: "bg-red-100 text-red-700" },
  normal: { label: "Normal", color: "bg-blue-100 text-blue-700" },
  esnek: { label: "Esnek", color: "bg-green-100 text-green-700" }
};
const statusConfig = {
  open: { label: "Açık", color: "bg-yellow-100 text-yellow-700" },
  matched: { label: "Eşleşti", color: "bg-blue-100 text-blue-700" },
  completed: { label: "Tamamlandı", color: "bg-green-100 text-green-700" }
};
function ResidentSolidarity({
  buildingId: _buildingId,
  t: _t
}) {
  const [activeTab, setActiveTab] = reactExports.useState(
    "requests"
  );
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [showNewRequestForm, setShowNewRequestForm] = reactExports.useState(false);
  const filteredRequests = mockRequests.filter(
    (r) => selectedCategory === "all" || r.category === selectedCategory
  );
  const totalHelps = mockOffers.reduce((sum, o) => sum + o.helpCount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Sakin Dayanışma & Yardım Ağı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Komşularınızla yardımlaşın, birlikte güçlü olun" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowNewRequestForm(!showNewRequestForm),
          className: "bg-rose-500 hover:bg-rose-600 text-white",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Yardım İste"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-rose-50 border-rose-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-8 h-8 text-rose-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-rose-700", children: mockRequests.filter((r) => r.status === "open").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-600", children: "Açık Talep" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-blue-50 border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-700", children: mockOffers.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600", children: "Gönüllü" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-green-50 border-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-700", children: mockRequests.filter((r) => r.status === "completed").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "Tamamlanan" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-purple-50 border-purple-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-8 h-8 text-purple-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-purple-700", children: totalHelps }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-purple-600", children: "Toplam Yardım" })
        ] })
      ] }) }) })
    ] }),
    showNewRequestForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-rose-200 bg-rose-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-rose-800", children: "Yeni Yardım Talebi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "req-title",
                className: "text-sm font-medium text-gray-700",
                children: "Başlık"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "req-title",
                className: "w-full mt-1 px-3 py-2 border rounded-lg text-sm",
                placeholder: "Kısa bir başlık yazın"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "req-cat",
                className: "text-sm font-medium text-gray-700",
                children: "Kategori"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "req-cat",
                className: "w-full mt-1 px-3 py-2 border rounded-lg text-sm",
                children: categories.filter((c) => c.key !== "all").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.key, children: c.label }, c.key))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "req-urgency",
                className: "text-sm font-medium text-gray-700",
                children: "Aciliyet"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "req-urgency",
                className: "w-full mt-1 px-3 py-2 border rounded-lg text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "esnek", children: "Esnek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "normal", children: "Normal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "acil", children: "Acil" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "req-desc",
              className: "text-sm font-medium text-gray-700",
              children: "Açıklama"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "req-desc",
              className: "w-full mt-1 px-3 py-2 border rounded-lg text-sm",
              rows: 3,
              placeholder: "İhtiyacınızı detaylıca açıklayın..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "bg-rose-500 hover:bg-rose-600 text-white",
              children: "Talep Oluştur"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setShowNewRequestForm(false),
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 p-1 rounded-lg w-fit", children: ["requests", "offers", "stats"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`,
        children: tab === "requests" ? "Yardım Talepleri" : tab === "offers" ? "Yardım Teklifleri" : "İstatistikler"
      },
      tab
    )) }),
    activeTab !== "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: categories.map((cat) => {
      const Icon = cat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelectedCategory(cat.key),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.key ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
            cat.label
          ]
        },
        cat.key
      );
    }) }),
    activeTab === "requests" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredRequests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900", children: req.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: urgencyConfig[req.urgency].color, children: urgencyConfig[req.urgency].label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusConfig[req.status].color, children: statusConfig[req.status].label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-2", children: req.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-600", children: [
            req.residentName,
            " (",
            req.apartment,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            req.postedDate
          ] }),
          req.helpersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-blue-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
            req.helpersCount,
            " yardım teklifi"
          ] })
        ] })
      ] }),
      req.status === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "bg-rose-500 hover:bg-rose-600 text-white shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-3.5 h-3.5 mr-1" }),
            " Yardım Et"
          ]
        }
      )
    ] }) }) }, req.id)) }),
    activeTab === "offers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      mockOffers.filter(
        (o) => selectedCategory === "all" || o.category === selectedCategory
      ).map((offer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "hover:shadow-md transition-shadow",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900", children: offer.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                  offer.residentName,
                  " (",
                  offer.apartment,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-yellow-500 fill-yellow-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-yellow-700", children: offer.rating })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-3", children: offer.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  offer.availability
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-green-500" }),
                  offer.helpCount,
                  " yardım"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "border-rose-300 text-rose-600 hover:bg-rose-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5 mr-1" }),
                    " İletişim"
                  ]
                }
              )
            ] })
          ] })
        },
        offer.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed border-2 border-rose-200 hover:border-rose-400 cursor-pointer transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col items-center justify-center h-full min-h-[160px] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-8 h-8 text-rose-300 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-rose-500", children: "Yardım Teklifi Ver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Komşularına yardım etmek için teklif oluştur" })
      ] }) })
    ] }),
    activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Kategori Dağılımı" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: [
          { label: "Alışveriş", count: 8, color: "bg-orange-400" },
          { label: "Ulaşım", count: 12, color: "bg-blue-400" },
          { label: "Teknik Yardım", count: 6, color: "bg-purple-400" },
          { label: "Çocuk Bakımı", count: 5, color: "bg-pink-400" },
          { label: "Eğitim/Ders", count: 4, color: "bg-green-400" },
          { label: "Sosyal", count: 9, color: "bg-yellow-400" }
        ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700", children: cat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
              cat.count,
              " yardım"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `${cat.color} h-2 rounded-full`,
              style: { width: `${cat.count / 12 * 100}%` }
            }
          ) })
        ] }, cat.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "En Aktif Yardımseverler" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: mockOffers.sort((a, b) => b.helpCount - a.helpCount).map((offer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? "bg-yellow-100 text-yellow-700" : idx === 1 ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"}`,
                    children: idx + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: offer.residentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: offer.apartment })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-rose-600", children: [
                  offer.helpCount,
                  " yardım"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-yellow-500 fill-yellow-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: offer.rating })
                ] })
              ] })
            ]
          },
          offer.id
        )) }) })
      ] })
    ] })
  ] });
}
export {
  ResidentSolidarity as default
};
