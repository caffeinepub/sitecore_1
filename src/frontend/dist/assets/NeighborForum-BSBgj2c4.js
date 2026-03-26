import { r as reactExports, j as jsxRuntimeExports, aq as MessagesSquare, B as Button, P as Plus, e as Badge, X, I as Input, ar as Award, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-DuPekrWc.js";
import { T as Textarea } from "./textarea-B6xtSwRN.js";
import { P as Pin } from "./pin-D7PoVlTA.js";
import { T as ThumbsUp } from "./thumbs-up-KmaM7JEz.js";
const KEY = (id) => `sitecore_forum_${id}`;
const CATEGORIES = ["Tümü", "Genel", "Öneri", "Şikayet", "Etkinlik", "Duyuru"];
const CAT_COLORS = {
  Genel: "bg-blue-100 text-blue-700",
  Öneri: "bg-green-100 text-green-700",
  Şikayet: "bg-red-100 text-red-700",
  Etkinlik: "bg-purple-100 text-purple-700",
  Duyuru: "bg-yellow-100 text-yellow-700"
};
const ALL_TAGS = [
  "#duyuru",
  "#öneri",
  "#sorun",
  "#genel",
  "#etkinlik",
  "#önemli"
];
const DEFAULT_TOPICS = [
  {
    id: "f1",
    title: "Asansör bakımı ne zaman yapılacak?",
    category: "Şikayet",
    tags: ["#sorun"],
    content: "Asansör haftadır düzgün çalışmıyor, arıza sesi geliyor. Bakım tarihini öğrenmek istiyorum.",
    author: "Sakin A-3",
    createdAt: "2026-03-20T10:00:00Z",
    comments: [
      {
        id: "c1",
        author: "Yönetici",
        content: "Bu hafta içinde teknisyen gelecek, bilgilendireceğiz.",
        createdAt: "2026-03-20T14:00:00Z"
      }
    ],
    likeCount: 8,
    likedBy: [],
    isPinned: false,
    isClosed: false
  },
  {
    id: "f2",
    title: "Bahçe partisi organizasyonu",
    category: "Etkinlik",
    tags: ["#etkinlik", "#genel"],
    content: "Nisan ayında komşularla birlikte küçük bir bahçe buluşması organize etmeyi düşünüyorum. Katılmak isteyen var mı?",
    author: "Sakin B-5",
    createdAt: "2026-03-18T15:30:00Z",
    comments: [],
    likeCount: 14,
    likedBy: [],
    isPinned: true,
    isClosed: false
  },
  {
    id: "f3",
    title: "Otopark kurallarına uyaLım",
    category: "Duyuru",
    tags: ["#duyuru", "#önemli"],
    content: "Bazı araçların otopark çizgilerinin dışına park ettiği görülüyor. Lütfen kurallara uyaLım.",
    author: "Yönetici",
    createdAt: "2026-03-15T09:00:00Z",
    comments: [
      {
        id: "c2",
        author: "Sakin C-1",
        content: "Haklısınız, dikkat edeceğiz.",
        createdAt: "2026-03-15T11:00:00Z"
      }
    ],
    likeCount: 5,
    likedBy: [],
    isPinned: true,
    isClosed: true
  },
  {
    id: "f4",
    title: "Ortak alan Wi-Fi şifresini güncelleyelim mi?",
    category: "Öneri",
    tags: ["#öneri"],
    content: "Lobideki Wi-Fi şifresi çok kişiye dağıldı, güvenlik için aylık güncelleme öneriyorum.",
    author: "Sakin D-7",
    createdAt: "2026-03-12T11:00:00Z",
    comments: [],
    likeCount: 11,
    likedBy: [],
    isPinned: false,
    isClosed: false
  },
  {
    id: "f5",
    title: "Kapı ziline bakınız, çalışmıyor",
    category: "Şikayet",
    tags: ["#sorun"],
    content: "2. kat giriş kapısı zili 3 haftadır çalışmıyor. Birden fazla komsu mağdur.",
    author: "Sakin C-4",
    createdAt: "2026-03-10T08:00:00Z",
    comments: [],
    likeCount: 9,
    likedBy: [],
    isPinned: false,
    isClosed: false
  }
];
function NeighborForum({
  buildingId,
  userId,
  isOwner,
  t: _t
}) {
  const [topics, setTopics] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    return DEFAULT_TOPICS;
  });
  const [activeCategory, setActiveCategory] = reactExports.useState("Tümü");
  const [activeTag, setActiveTag] = reactExports.useState("");
  const [expandedTopic, setExpandedTopic] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newComment, setNewComment] = reactExports.useState({});
  const [form, setForm] = reactExports.useState({
    title: "",
    category: "Genel",
    content: "",
    tags: []
  });
  const save = (list) => {
    setTopics(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };
  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const t = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      tags: form.tags,
      content: form.content,
      author: `Kullanıcı ${userId.slice(0, 4)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      comments: [],
      likeCount: 0,
      likedBy: [],
      isPinned: false,
      isClosed: false
    };
    save([t, ...topics]);
    setShowForm(false);
    setForm({ title: "", category: "Genel", content: "", tags: [] });
  };
  const handleLike = (id) => {
    save(
      topics.map((t) => {
        if (t.id !== id) return t;
        const liked = t.likedBy.includes(userId);
        return {
          ...t,
          likeCount: liked ? t.likeCount - 1 : t.likeCount + 1,
          likedBy: liked ? t.likedBy.filter((u) => u !== userId) : [...t.likedBy, userId]
        };
      })
    );
  };
  const handleAddComment = (topicId) => {
    const text = newComment[topicId];
    if (!(text == null ? void 0 : text.trim())) return;
    const c = {
      id: Date.now().toString(),
      author: `Kullanıcı ${userId.slice(0, 4)}`,
      content: text.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    save(
      topics.map(
        (t) => t.id === topicId ? { ...t, comments: [...t.comments, c] } : t
      )
    );
    setNewComment((prev) => ({ ...prev, [topicId]: "" }));
  };
  const handlePin = (id) => save(
    topics.map((t) => t.id === id ? { ...t, isPinned: !t.isPinned } : t)
  );
  const handleClose = (id) => save(
    topics.map((t) => t.id === id ? { ...t, isClosed: !t.isClosed } : t)
  );
  const handleDelete = (id) => save(topics.filter((t) => t.id !== id));
  const filtered = topics.filter((t) => activeCategory === "Tümü" || t.category === activeCategory).filter((t) => !activeTag || t.tags.includes(activeTag)).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  const residentActivity = {};
  for (const topic of topics) {
    residentActivity[topic.author] = (residentActivity[topic.author] || 0) + 1;
    for (const c of topic.comments) {
      residentActivity[c.author] = (residentActivity[c.author] || 0) + 1;
    }
  }
  const topResidents = Object.entries(residentActivity).sort(([, a], [, b]) => b - a).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesSquare, { className: "w-6 h-6 text-[#0B1B2E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Komşu Forumu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          "data-ocid": "forum.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Konu Aç"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveCategory(cat),
            className: `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[#0B1B2E] text-white" : "bg-white border border-[#E5EAF2] text-[#3A4654] hover:border-[#0B1B2E]"}`,
            "data-ocid": "forum.tab",
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: ALL_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTag(activeTag === tag ? "" : tag),
            className: `px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${activeTag === tag ? "bg-[#4A90D9] text-white" : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-[#E5EAF2]"}`,
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          filtered.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `bg-white rounded-2xl shadow-sm border transition-all ${topic.isPinned ? "border-[#4A90D9]" : "border-[#E5EAF2]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                      topic.isPinned && /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-3.5 h-3.5 text-[#4A90D9]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#0E1116]", children: topic.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-xs border-0 ${CAT_COLORS[topic.category] || "bg-gray-100 text-gray-600"}`,
                          children: topic.category
                        }
                      ),
                      topic.isClosed && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-500 text-xs border-0", children: "Kapalı" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap mb-1", children: topic.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs text-[#4A90D9] font-medium",
                        children: tag
                      },
                      tag
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] line-clamp-2", children: topic.content }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-[#6B7A8D]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.author }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(topic.createdAt).toLocaleDateString(
                        "tr-TR"
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "💬 ",
                        topic.comments.length,
                        " yorum"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleLike(topic.id),
                        className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${topic.likedBy.includes(userId) ? "bg-blue-100 text-blue-700" : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-blue-50"}`,
                        "data-ocid": "forum.toggle",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                          " ",
                          topic.likeCount
                        ]
                      }
                    ),
                    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handlePin(topic.id),
                          className: "p-1 rounded text-[#6B7A8D] hover:text-[#4A90D9]",
                          title: "Sabitle",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleClose(topic.id),
                          className: "p-1 rounded text-[#6B7A8D] hover:text-orange-500",
                          title: "Kapat/Aç",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleDelete(topic.id),
                          className: "p-1 rounded text-[#6B7A8D] hover:text-red-500",
                          title: "Sil",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedTopic(
                      expandedTopic === topic.id ? null : topic.id
                    ),
                    className: "w-full px-5 py-2 text-xs text-[#4A90D9] text-left hover:bg-[#F8FAFC] transition-colors border-t border-[#F3F6FB]",
                    children: expandedTopic === topic.id ? "▲ Yorumları Gizle" : `▼ ${topic.comments.length} Yorum Göster`
                  }
                ),
                expandedTopic === topic.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4 space-y-3", children: [
                  topic.comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-[#E5EAF2] flex items-center justify-center text-xs font-bold text-[#0B1B2E] flex-shrink-0", children: c.author[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-xl p-3 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[#0B1B2E]", children: c.author }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: c.content })
                    ] })
                  ] }, c.id)),
                  !topic.isClosed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: newComment[topic.id] || "",
                        onChange: (e) => setNewComment((p) => ({
                          ...p,
                          [topic.id]: e.target.value
                        })),
                        placeholder: "Yorum yaz...",
                        className: "text-sm",
                        "data-ocid": "forum.input",
                        onKeyDown: (e) => e.key === "Enter" && handleAddComment(topic.id)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "bg-[#4A90D9] text-white",
                        onClick: () => handleAddComment(topic.id),
                        children: "Gönder"
                      }
                    )
                  ] })
                ] })
              ]
            },
            topic.id
          )),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-center text-[#3A4654] py-10",
              "data-ocid": "forum.empty_state",
              children: "Bu kategoride konu yok."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-[#F2A23A]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-[#0E1116]", children: "En Aktif Sakinler" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topResidents.map(([name, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${[
                    "bg-yellow-400",
                    "bg-gray-400",
                    "bg-orange-400",
                    "bg-[#4A90D9]",
                    "bg-purple-400"
                  ][i]}`,
                  children: i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#0E1116] font-medium truncate max-w-[100px]", children: name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
              count,
              " katkı"
            ] })
          ] }, name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-[#0E1116] mb-3", children: "Forum İstatistikleri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6B7A8D]", children: "Toplam Konu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: topics.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6B7A8D]", children: "Sabitlenmiş" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: topics.filter((t) => t.isPinned).length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6B7A8D]", children: "Açık Konular" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-green-600", children: topics.filter((t) => !t.isClosed).length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6B7A8D]", children: "Toplam Yorum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: topics.reduce((s, t) => s + t.comments.length, 0) })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "forum.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Konu Aç" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.category,
              onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "forum.select",
              children: CATEGORIES.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Etiketler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: ALL_TAGS.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setForm((f) => ({
                ...f,
                tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag]
              })),
              className: `px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${form.tags.includes(tag) ? "bg-[#4A90D9] text-white" : "bg-[#F3F6FB] text-[#6B7A8D] hover:bg-[#E5EAF2]"}`,
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Başlık" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Konu başlığı",
              "data-ocid": "forum.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "İçerik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: form.content,
              onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
              rows: 4,
              placeholder: "Konuyu detaylı anlatın...",
              "data-ocid": "forum.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowForm(false),
              "data-ocid": "forum.cancel_button",
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#4A90D9] text-white",
              onClick: handleSubmit,
              "data-ocid": "forum.confirm_button",
              children: "Gönder"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  NeighborForum as default
};
