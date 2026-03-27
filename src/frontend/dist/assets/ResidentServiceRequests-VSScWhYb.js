import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, S as Search, I as Input, e as Badge, M as MessageSquare, aB as Lightbulb, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-Bfd22_yy.js";
import { T as ThumbsUp } from "./thumbs-up-DNexlS61.js";
import { C as CircleCheckBig } from "./circle-check-big-_fqQNjyZ.js";
import { C as CircleX } from "./circle-x-CuTciT7-.js";
import { F as Funnel } from "./funnel-C4QPfJEw.js";
import { C as Clock } from "./clock-BHYbK5oy.js";
const STATUS_CONFIG = {
  pending: {
    label: "Beklemede",
    color: "bg-gray-100 text-gray-600",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
  },
  under_review: {
    label: "İnceleniyor",
    color: "bg-blue-100 text-blue-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3" })
  },
  approved: {
    label: "Onaylandı",
    color: "bg-green-100 text-green-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  },
  rejected: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
  },
  completed: {
    label: "Tamamlandı",
    color: "bg-purple-100 text-purple-700",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
  }
};
const CATEGORIES = [
  { key: "all", label: "Tümü" },
  { key: "guvenlik", label: "Güvenlik" },
  { key: "ulasim", label: "Ulaşım" },
  { key: "erisilebilirlik", label: "Erişilebilirlik" },
  { key: "cevre", label: "Çevre" },
  { key: "teknoloji", label: "Teknoloji" },
  { key: "sosyal", label: "Sosyal Alan" },
  { key: "diger", label: "Diğer" }
];
const MOCK_REQUESTS = [
  {
    id: "1",
    title: "Bisiklet Park Yeri Eklenmesi",
    description: "Binanın girişine veya otopark alanına sakinler için kilitli bisiklet park yeri yapılmasını talep ediyorum. Bisiklet kullananların sayısı giderek artıyor.",
    category: "ulasim",
    submittedBy: "Ahmet Yılmaz",
    apartment: "D:12",
    date: "2026-03-10",
    status: "under_review",
    votes: 18,
    voted: true,
    comments: 5,
    priority: "medium",
    managerNote: "Otopark komisyonuyla görüşülüyor, 2 hafta içinde karar verilecek."
  },
  {
    id: "2",
    title: "Ana Giriş Engelli Rampası",
    description: "Ana giriş kapısı basamaklı olduğundan tekerlekli sandalye kullanıcıları ve bebek arabası olan aileler ciddi güçlük yaşıyor. Rampa eklenmesini talep ediyoruz.",
    category: "erisilebilirlik",
    submittedBy: "Fatma Demir",
    apartment: "B:3",
    date: "2026-03-05",
    status: "approved",
    votes: 34,
    voted: false,
    comments: 12,
    priority: "high",
    managerNote: "Proje onaylandı. Nisan ayında çalışma başlıyor."
  },
  {
    id: "3",
    title: "Çocuk Oyun Alanı Yenilenmesi",
    description: "Mevcut çocuk oyun alanındaki ekipmanlar eskimiş ve bazıları güvensiz. Modern, güvenli ekipmanlarla yenilenmesini istiyoruz.",
    category: "sosyal",
    submittedBy: "Mehmet Kaya",
    apartment: "C:7",
    date: "2026-02-28",
    status: "pending",
    votes: 25,
    voted: false,
    comments: 8,
    priority: "high"
  },
  {
    id: "4",
    title: "Ortak Alanda WiFi Erişim Noktası",
    description: "Bahçe ve ortak oturma alanlarında ücretsiz WiFi olması sakinlerin dışarıda vakit geçirmesini kolaylaştıracak.",
    category: "teknoloji",
    submittedBy: "Ayşe Çelik",
    apartment: "A:15",
    date: "2026-02-20",
    status: "rejected",
    votes: 11,
    voted: false,
    comments: 3,
    priority: "low",
    managerNote: "Güvenlik ve altyapı maliyeti nedeniyle şu an için bütçe karşılanamıyor."
  },
  {
    id: "5",
    title: "Kapı Önü Güvenlik Kamerası",
    description: "A ve B blok arka kapılarında kamera bulunmuyor. Bu alanlarda zaman zaman güvensiz durumlar yaşanıyor. Kamera eklenmesini talep ediyorum.",
    category: "guvenlik",
    submittedBy: "Hasan Özdemir",
    apartment: "A:4",
    date: "2026-02-15",
    status: "completed",
    votes: 29,
    voted: true,
    comments: 6,
    priority: "high",
    managerNote: "Kameralar Mart başında kuruldu."
  },
  {
    id: "6",
    title: "Otopark Aydınlatma İyileştirmesi",
    description: "Otopark giriş ve çıkışı çok karanlık. Özellikle kış aylarında görüş mesafesi çok kısalıyor.",
    category: "guvenlik",
    submittedBy: "Zeynep Aydın",
    apartment: "D:2",
    date: "2026-03-18",
    status: "pending",
    votes: 7,
    voted: false,
    comments: 2,
    priority: "medium"
  },
  {
    id: "7",
    title: "Bahçeye Kompost Kutusu Eklenmesi",
    description: "Mutfak atıklarını kompost haline getirmek için bahçeye uygun bir kompost kutusu konulabilir. Hem atığı azaltır hem de bahçe gübresi üretir.",
    category: "cevre",
    submittedBy: "Burak Şahin",
    apartment: "C:11",
    date: "2026-03-20",
    status: "pending",
    votes: 5,
    voted: false,
    comments: 1,
    priority: "low"
  }
];
function ResidentServiceRequests({ isOwner }) {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [selectedReq, setSelectedReq] = reactExports.useState(null);
  const [requests, setRequests] = reactExports.useState(MOCK_REQUESTS);
  const [sortBy, setSortBy] = reactExports.useState("votes");
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newDesc, setNewDesc] = reactExports.useState("");
  const [newCat, setNewCat] = reactExports.useState("diger");
  const filtered = requests.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || r.category === category;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  }).sort(
    (a, b) => sortBy === "votes" ? b.votes - a.votes : new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    completed: requests.filter((r) => r.status === "completed").length
  };
  const toggleVote = (id) => {
    setRequests(
      (prev) => prev.map(
        (r) => r.id === id ? {
          ...r,
          votes: r.voted ? r.votes - 1 : r.votes + 1,
          voted: !r.voted
        } : r
      )
    );
  };
  const handleSubmit = () => {
    if (!newTitle.trim()) return;
    const newReq = {
      id: String(Date.now()),
      title: newTitle,
      description: newDesc,
      category: newCat,
      submittedBy: "Siz",
      apartment: "D:1",
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      status: "pending",
      votes: 0,
      voted: false,
      comments: 0,
      priority: "medium"
    };
    setRequests((prev) => [newReq, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setNewCat("diger");
    setShowAdd(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B1B2E]", children: "Hizmet Talebi & Bina Geliştirme Önerileri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Yönetime öneri ve iyileştirme talebi gönderin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Öneri Gönder"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0B1B2E]", children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Öneri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.pending }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Beklemede" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.approved }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Onaylandı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.completed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Tamamlandı" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Öneri ara...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            className: "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Durumlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Beklemede" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "under_review", children: "İnceleniyor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Onaylandı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "Reddedildi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Tamamlandı" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sortBy,
            onChange: (e) => setSortBy(e.target.value),
            className: "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "votes", children: "En Çok Oy Alan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "date", children: "En Yeni" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(cat.key),
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${category === cat.key ? "bg-[#2563EB] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: cat.label
        },
        cat.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      filtered.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleVote(req.id),
                className: `flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all flex-shrink-0 ${req.voted ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-gray-200 text-gray-400 hover:border-blue-300"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: req.votes })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex-1 text-left",
                onClick: () => setSelectedReq(req),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E]", children: req.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: `text-xs ${STATUS_CONFIG[req.status].color} border-0 flex items-center gap-1`,
                        children: [
                          STATUS_CONFIG[req.status].icon,
                          " ",
                          STATUS_CONFIG[req.status].label
                        ]
                      }
                    ),
                    req.priority === "high" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-red-100 text-red-700 border-0", children: "Yüksek Öncelik" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 line-clamp-2", children: req.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-gray-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "👤 ",
                      req.submittedBy,
                      " (",
                      req.apartment,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📅 ",
                      req.date
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                      " ",
                      req.comments,
                      " yorum"
                    ] })
                  ] }),
                  req.managerNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm bg-blue-50 text-blue-800 px-3 py-2 rounded-lg", children: [
                    "💬 Yönetici: ",
                    req.managerNote
                  ] })
                ]
              }
            )
          ] }) })
        },
        req.id
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-12 text-center border border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Henüz öneri bulunmuyor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => setShowAdd(true),
            className: "mt-3 bg-[#2563EB] text-white",
            children: "İlk Öneriyi Gönder"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Hizmet Talebi / Öneri" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "req-title", className: "text-sm font-medium", children: "Başlık *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "req-title",
              placeholder: "Kısa ve açıklayıcı bir başlık",
              value: newTitle,
              onChange: (e) => setNewTitle(e.target.value),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "req-desc", className: "text-sm font-medium", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "req-desc",
              placeholder: "Önerinizi veya talebinizi detaylı açıklayın...",
              value: newDesc,
              onChange: (e) => setNewDesc(e.target.value),
              rows: 4,
              className: "w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "req-cat", className: "text-sm font-medium", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "req-cat",
              value: newCat,
              onChange: (e) => setNewCat(e.target.value),
              className: "w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white",
              children: CATEGORIES.filter((c) => c.key !== "all").map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.key, children: cat.label }, cat.key))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white",
              onClick: handleSubmit,
              disabled: !newTitle.trim(),
              children: "Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowAdd(false),
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) }),
    selectedReq && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedReq, onOpenChange: () => setSelectedReq(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: selectedReq.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: `text-xs ${STATUS_CONFIG[selectedReq.status].color} border-0 flex items-center gap-1`,
              children: [
                STATUS_CONFIG[selectedReq.status].icon,
                " ",
                STATUS_CONFIG[selectedReq.status].label
              ]
            }
          ),
          selectedReq.priority === "high" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-red-100 text-red-700 border-0", children: "Yüksek Öncelik" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: selectedReq.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-500 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "👤 ",
            selectedReq.submittedBy,
            " (",
            selectedReq.apartment,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "📅 ",
            selectedReq.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "👍 ",
            selectedReq.votes,
            " oy • 💬 ",
            selectedReq.comments,
            " yorum"
          ] })
        ] }),
        selectedReq.managerNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-blue-600 mb-1", children: "Yönetici Yanıtı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-blue-800", children: selectedReq.managerNote })
        ] }),
        isOwner && selectedReq.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-green-600 hover:bg-green-700 text-white",
              onClick: () => setSelectedReq(null),
              children: "Onayla"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-red-600 hover:bg-red-700 text-white",
              onClick: () => setSelectedReq(null),
              children: "Reddet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setSelectedReq(null),
              children: "Kapat"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ResidentServiceRequests as default
};
