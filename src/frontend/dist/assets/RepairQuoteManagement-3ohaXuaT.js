import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, B as Button, P as Plus, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-FsRbGoem.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-QyZx3PSn.js";
import { L as Label } from "./label-DkmGoKqH.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DAFLZoY5.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C03f5Z7b.js";
import { T as Textarea } from "./textarea-BuZfr6bT.js";
import { C as Clock } from "./clock-Byb_hc9l.js";
import { C as CircleCheck } from "./circle-check-D209B1-P.js";
import { T as TrendingDown } from "./trending-down-DHb_UjMV.js";
import "./index-CTfFpPz1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
const FileCheck = createLucideIcon("file-check", __iconNode);
const mockRequests = [
  {
    id: "1",
    title: "Çatı Su Yalıtımı Tamiri",
    category: "Genel",
    status: "Değerlendirme",
    requestDate: "2026-03-01",
    deadline: "2026-03-20",
    quoteCount: 3,
    budget: 45e3
  },
  {
    id: "2",
    title: "Asansör Elektrik Panosu Değişimi",
    category: "Elektrik",
    status: "Teklifler Bekleniyor",
    requestDate: "2026-03-05",
    deadline: "2026-03-25",
    quoteCount: 2,
    budget: 3e4
  },
  {
    id: "3",
    title: "Bodrum Kat Boya Badana",
    category: "Boya",
    status: "Tamamlandı",
    requestDate: "2026-02-10",
    deadline: "2026-02-28",
    quoteCount: 3,
    budget: 15e3
  },
  {
    id: "4",
    title: "Ana Su Hattı Onarımı",
    category: "Su Tesisatı",
    status: "Teklifler Bekleniyor",
    requestDate: "2026-03-10",
    deadline: "2026-03-30",
    quoteCount: 1,
    budget: 2e4
  },
  {
    id: "5",
    title: "Giriş Kapısı Otomatik Sistem",
    category: "Elektrik",
    status: "Taslak",
    requestDate: "2026-03-15",
    deadline: "2026-04-05",
    quoteCount: 0,
    budget: 12e3
  }
];
const mockQuotes = [
  {
    id: "q1",
    requestId: "1",
    company: "Yıldız Yapı A.Ş.",
    amount: 38500,
    duration: 7,
    notes: "Malzeme dahil, 2 yıl garanti",
    status: "Kabul Edildi",
    score: 92
  },
  {
    id: "q2",
    requestId: "1",
    company: "Güvenli İnşaat Ltd.",
    amount: 42e3,
    duration: 5,
    notes: "Premium malzeme kullanılacak",
    status: "Reddedildi",
    score: 78
  },
  {
    id: "q3",
    requestId: "1",
    company: "Ekonomik Yapı Hiz.",
    amount: 35e3,
    duration: 10,
    notes: "Standart malzeme, 1 yıl garanti",
    status: "Bekliyor",
    score: 65
  },
  {
    id: "q4",
    requestId: "2",
    company: "Elektro Teknik A.Ş.",
    amount: 28e3,
    duration: 3,
    notes: "Siemens marka panel, CE belgeli",
    status: "Bekliyor",
    score: 88
  },
  {
    id: "q5",
    requestId: "2",
    company: "Güç Sistemleri Ltd.",
    amount: 31500,
    duration: 2,
    notes: "Acil müdahale kapasitesi mevcut",
    status: "Bekliyor",
    score: 82
  },
  {
    id: "q6",
    requestId: "3",
    company: "Boya Usta Hiz.",
    amount: 12800,
    duration: 4,
    notes: "Dış cephe boyası dahil",
    status: "Kabul Edildi",
    score: 90
  },
  {
    id: "q7",
    requestId: "3",
    company: "Renkli Yapı",
    amount: 14500,
    duration: 3,
    notes: "Eco-friendly boyalar kullanılır",
    status: "Reddedildi",
    score: 74
  },
  {
    id: "q8",
    requestId: "3",
    company: "Temiz Boya Ltd.",
    amount: 13200,
    duration: 5,
    notes: "2 kat boya uygulanacak",
    status: "Reddedildi",
    score: 68
  },
  {
    id: "q9",
    requestId: "4",
    company: "Su Teknik Grup",
    amount: 18500,
    duration: 2,
    notes: "Acil müdahale, 24 saat servis",
    status: "Bekliyor",
    score: 85
  }
];
const statusConfig = {
  Taslak: { label: "Taslak", color: "bg-gray-100 text-gray-700" },
  "Teklifler Bekleniyor": {
    label: "Bekleniyor",
    color: "bg-yellow-100 text-yellow-700"
  },
  Değerlendirme: { label: "Değerlendirme", color: "bg-blue-100 text-blue-700" },
  Tamamlandı: { label: "Tamamlandı", color: "bg-green-100 text-green-700" }
};
const quoteStatusConfig = {
  Bekliyor: "bg-yellow-100 text-yellow-700",
  "Kabul Edildi": "bg-green-100 text-green-700",
  Reddedildi: "bg-red-100 text-red-700"
};
function RepairQuoteManagement({
  isOwner
}) {
  const [requests, setRequests] = reactExports.useState(mockRequests);
  const [quotes] = reactExports.useState(mockQuotes);
  const [selectedRequestId, setSelectedRequestId] = reactExports.useState("1");
  const [showNewModal, setShowNewModal] = reactExports.useState(false);
  const [newForm, setNewForm] = reactExports.useState({
    title: "",
    category: "Genel",
    budget: "",
    description: "",
    deadline: ""
  });
  const active = requests.filter((r) => r.status !== "Tamamlandı").length;
  const evaluating = requests.filter(
    (r) => r.status === "Değerlendirme"
  ).length;
  const completed = requests.filter((r) => r.status === "Tamamlandı").length;
  const allAmounts = quotes.map((q) => q.amount);
  const avgAmount = allAmounts.length ? Math.round(allAmounts.reduce((a, b) => a + b, 0) / allAmounts.length) : 0;
  const selectedQuotes = quotes.filter(
    (q) => q.requestId === selectedRequestId
  );
  const minAmount = Math.min(...selectedQuotes.map((q) => q.amount));
  function handleAddRequest() {
    if (!newForm.title) return;
    const newReq = {
      id: String(Date.now()),
      title: newForm.title,
      category: newForm.category,
      status: "Taslak",
      requestDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      deadline: newForm.deadline || "2026-04-30",
      quoteCount: 0,
      budget: Number(newForm.budget) || 0
    };
    setRequests((prev) => [newReq, ...prev]);
    setShowNewModal(false);
    setNewForm({
      title: "",
      category: "Genel",
      budget: "",
      description: "",
      deadline: ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "repair_quotes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Aktif Talepler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-slate-800", children: active })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-yellow-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Değerlendirmedeki" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-slate-800", children: evaluating })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Tamamlanan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-slate-800", children: completed })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-xl shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-5 h-5 text-purple-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Ort. Teklif Tutarı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-slate-800", children: [
            avgAmount.toLocaleString("tr-TR"),
            " ₺"
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "requests", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "requests", "data-ocid": "repair_quotes.tab", children: "Talepler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "quotes", "data-ocid": "repair_quotes.tab", children: "Teklifler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "comparison", "data-ocid": "repair_quotes.tab", children: "Karşılaştırma" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requests", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Teklif Talepleri" }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-blue-600 hover:bg-blue-700 text-white",
              onClick: () => setShowNewModal(true),
              "data-ocid": "repair_quotes.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                " Yeni Talep"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "İş Tanımı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Durum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Talep Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Son Teklif" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Teklif Sayısı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Bütçe" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: requests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `repair_quotes.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: req.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: req.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-2 py-1 rounded-full text-xs font-medium ${statusConfig[req.status].color}`,
                    children: statusConfig[req.status].label
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: req.requestDate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: req.deadline }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-blue-600", children: req.quoteCount }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  req.budget.toLocaleString("tr-TR"),
                  " ₺"
                ] })
              ]
            },
            req.id
          )) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "quotes", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Tedarikçi Teklifleri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedRequestId,
              onValueChange: setSelectedRequestId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-72",
                    "data-ocid": "repair_quotes.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Talep seçin" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: requests.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.title }, r.id)) })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Firma Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Teklif Tutarı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Süre (Gün)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Notlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Durum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "İşlem" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: selectedQuotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: 6,
              className: "text-center text-slate-400 py-8",
              "data-ocid": "repair_quotes.empty_state",
              children: "Bu talep için henüz teklif bulunmuyor"
            }
          ) }) : selectedQuotes.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `repair_quotes.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: q.company }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-slate-800", children: [
                  q.amount.toLocaleString("tr-TR"),
                  " ₺"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  q.duration,
                  " gün"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-slate-600 max-w-xs", children: q.notes }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-2 py-1 rounded-full text-xs font-medium ${quoteStatusConfig[q.status]}`,
                    children: q.status
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: q.status === "Bekliyor" && isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-green-600 border-green-300 hover:bg-green-50",
                    "data-ocid": "repair_quotes.confirm_button",
                    children: "Kabul Et"
                  }
                ) })
              ]
            },
            q.id
          )) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comparison", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "rounded-xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Teklif Karşılaştırması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedRequestId,
              onValueChange: setSelectedRequestId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-72",
                    "data-ocid": "repair_quotes.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Talep seçin" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: requests.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.id, children: r.title }, r.id)) })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: selectedQuotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-slate-400 py-12",
            "data-ocid": "repair_quotes.empty_state",
            children: "Bu talep için karşılaştırılacak teklif bulunmuyor"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Firma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Teklif Tutarı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Süre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Puan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Not" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: selectedQuotes.sort((a, b) => a.amount - b.amount).map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              className: q.amount === minAmount ? "bg-green-50" : "",
              "data-ocid": `repair_quotes.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
                  q.company,
                  q.amount === minAmount && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 bg-green-100 text-green-700 border-0 text-xs", children: "En Düşük" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableCell,
                  {
                    className: `font-semibold ${q.amount === minAmount ? "text-green-700" : "text-slate-800"}`,
                    children: [
                      q.amount.toLocaleString("tr-TR"),
                      " ₺"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  q.duration,
                  " gün"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-blue-500 rounded-full",
                      style: { width: `${q.score}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: q.score })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-slate-600", children: q.notes })
              ]
            },
            q.id
          )) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showNewModal, onOpenChange: setShowNewModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "repair_quotes.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Teklif Talebi" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "İş Tanımı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Yapılacak iş açıklaması",
              value: newForm.title,
              onChange: (e) => setNewForm((p) => ({ ...p, title: e.target.value })),
              "data-ocid": "repair_quotes.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: newForm.category,
              onValueChange: (v) => setNewForm((p) => ({ ...p, category: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "repair_quotes.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Elektrik", children: "Elektrik" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Boya", children: "Boya" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Su Tesisatı", children: "Su Tesisatı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Genel", children: "Genel" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bütçe Üst Limiti (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              placeholder: "50000",
              value: newForm.budget,
              onChange: (e) => setNewForm((p) => ({ ...p, budget: e.target.value })),
              "data-ocid": "repair_quotes.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Son Teklif Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: newForm.deadline,
              onChange: (e) => setNewForm((p) => ({ ...p, deadline: e.target.value })),
              "data-ocid": "repair_quotes.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Ek detaylar...",
              value: newForm.description,
              onChange: (e) => setNewForm((p) => ({ ...p, description: e.target.value })),
              "data-ocid": "repair_quotes.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowNewModal(false),
              "data-ocid": "repair_quotes.cancel_button",
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddRequest,
              className: "bg-blue-600 hover:bg-blue-700 text-white",
              "data-ocid": "repair_quotes.submit_button",
              children: "Talep Oluştur"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RepairQuoteManagement as default
};
