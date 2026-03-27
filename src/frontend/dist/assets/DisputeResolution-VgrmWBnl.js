import { r as reactExports, M as MessageSquare, T as TriangleAlert, j as jsxRuntimeExports, a6 as Scale, P as Plus } from "./index-xOs1ph1v.js";
import { C as CircleX } from "./circle-x-rHHc3zz_.js";
import { C as CircleCheckBig } from "./circle-check-big-7Z2Ce4Ly.js";
import { C as Clock } from "./clock-DspyC9Dz.js";
const SAMPLE_DISPUTES = [
  {
    id: "D001",
    title: "Gece saatlerinde gürültü şikayeti",
    complainant: "Daire 12 - Ayşe Kaya",
    respondent: "Daire 13 - Mehmet Demir",
    category: "Gürültü",
    status: "arabuluculuk",
    priority: "yuksek",
    date: "2026-03-15",
    description: "Her gece 23:00-02:00 saatleri arasında yüksek sesle müzik ve gürültü yapılmaktadır. Uyarılara rağmen devam etmektedir.",
    mediator: "Yönetici Hasan Bey",
    messages: [
      {
        author: "Ayşe Kaya",
        text: "Bu durum artık dayanılmaz hale geldi, acilen çözüm istiyorum.",
        date: "2026-03-15"
      },
      {
        author: "Yönetici",
        text: "Şikayetinizi aldık. Taraflarla görüşeceğiz.",
        date: "2026-03-16",
        isManager: true
      },
      {
        author: "Mehmet Demir",
        text: "Sesimin bu kadar yüksek çıktığını bilmiyordum, özür dilerim.",
        date: "2026-03-17"
      }
    ]
  },
  {
    id: "D002",
    title: "Ortak alan temizlik sorumluluğu",
    complainant: "Daire 5 - Fatma Yılmaz",
    respondent: "Daire 6 - Ali Çelik",
    category: "Ortak Alan",
    status: "cozuldu",
    priority: "orta",
    date: "2026-03-01",
    description: "Kat koridorundaki temizlik sırası konusunda anlaşmazlık yaşanmaktadır.",
    resolution: "Taraflar yönetici arabuluculuğunda haftanın belirli günleri için temizlik takvimi oluşturdu.",
    mediator: "Yönetici Hasan Bey",
    messages: [
      {
        author: "Fatma Yılmaz",
        text: "Komşum temizlik sırasına uymuyur.",
        date: "2026-03-01"
      },
      {
        author: "Yönetici",
        text: "Takvim oluşturduk ve her iki taraf da imzaladı.",
        date: "2026-03-05",
        isManager: true
      }
    ]
  },
  {
    id: "D003",
    title: "Park yeri işgali",
    complainant: "Daire 8 - Kemal Arslan",
    respondent: "Daire 9 - Zeynep Şahin",
    category: "Otopark",
    status: "inceleniyor",
    priority: "orta",
    date: "2026-03-20",
    description: "Tahsis edilmiş park yerim sürekli başkası tarafından işgal edilmektedir.",
    messages: [
      {
        author: "Kemal Arslan",
        text: "3 gündür park yerime park edilemiyor.",
        date: "2026-03-20"
      }
    ]
  },
  {
    id: "D004",
    title: "Balkon eşyaları alt daireye zarar veriyor",
    complainant: "Daire 7 - Selin Öz",
    respondent: "Daire 11 - Okan Yıldız",
    category: "Hasar",
    status: "acik",
    priority: "yuksek",
    date: "2026-03-22",
    description: "Üst komşunun balkonundaki saksılar sulanırken aşağı damlıyor ve balkonumda hasar oluşturuyor.",
    messages: []
  },
  {
    id: "D005",
    title: "Evcil hayvan koridorda bırakılması",
    complainant: "Daire 3 - Murat Koç",
    respondent: "Daire 4 - Elif Doğan",
    category: "Evcil Hayvan",
    status: "reddedildi",
    priority: "dusuk",
    date: "2026-02-20",
    description: "Komşunun kedisi koridorda bırakılıyor.",
    resolution: "Bina kuralları incelendi. Evcil hayvan koridorda bulunmasına dair kural ihlali tespit edilemedi.",
    messages: [
      {
        author: "Murat Koç",
        text: "Kedi koridorda kalmak istemiyor diyorlar ama beni rahatsız ediyor.",
        date: "2026-02-20"
      },
      {
        author: "Yönetici",
        text: "İnceleme sonucu bina kurallarına aykırı bir durum bulunamadı.",
        date: "2026-02-25",
        isManager: true
      }
    ]
  }
];
const CATEGORIES = [
  "Tümü",
  "Gürültü",
  "Ortak Alan",
  "Otopark",
  "Hasar",
  "Evcil Hayvan",
  "Diğer"
];
const STATUS_LABELS = {
  acik: { label: "Açık", color: "bg-blue-100 text-blue-700", icon: Clock },
  inceleniyor: {
    label: "İnceleniyor",
    color: "bg-yellow-100 text-yellow-700",
    icon: TriangleAlert
  },
  arabuluculuk: {
    label: "Arabuluculuk",
    color: "bg-purple-100 text-purple-700",
    icon: MessageSquare
  },
  cozuldu: {
    label: "Çözüldü",
    color: "bg-green-100 text-green-700",
    icon: CircleCheckBig
  },
  reddedildi: {
    label: "Reddedildi",
    color: "bg-red-100 text-red-700",
    icon: CircleX
  }
};
const PRIORITY_LABELS = {
  dusuk: { label: "Düşük", color: "text-green-600" },
  orta: { label: "Orta", color: "text-yellow-600" },
  yuksek: { label: "Yüksek", color: "text-red-600" }
};
function DisputeResolution({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [disputes, setDisputes] = reactExports.useState(SAMPLE_DISPUTES);
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [filterCategory, setFilterCategory] = reactExports.useState("Tümü");
  const [selectedDispute, setSelectedDispute] = reactExports.useState(null);
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [showNewForm, setShowNewForm] = reactExports.useState(false);
  const [newDispute, setNewDispute] = reactExports.useState({
    title: "",
    complainant: "",
    respondent: "",
    category: "Gürültü",
    description: "",
    priority: "orta"
  });
  const filtered = disputes.filter((d) => {
    if (filterStatus !== "Tümü" && STATUS_LABELS[d.status].label !== filterStatus)
      return false;
    if (filterCategory !== "Tümü" && d.category !== filterCategory)
      return false;
    return true;
  });
  const stats = {
    total: disputes.length,
    open: disputes.filter(
      (d) => d.status === "acik" || d.status === "inceleniyor"
    ).length,
    mediation: disputes.filter((d) => d.status === "arabuluculuk").length,
    resolved: disputes.filter((d) => d.status === "cozuldu").length
  };
  const handleAddDispute = () => {
    if (!newDispute.title || !newDispute.complainant || !newDispute.respondent || !newDispute.description)
      return;
    const d = {
      id: `D${String(disputes.length + 1).padStart(3, "0")}`,
      ...newDispute,
      status: "acik",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      messages: []
    };
    setDisputes([d, ...disputes]);
    setNewDispute({
      title: "",
      complainant: "",
      respondent: "",
      category: "Gürültü",
      description: "",
      priority: "orta"
    });
    setShowNewForm(false);
  };
  const handleStatusChange = (id, status) => {
    setDisputes(disputes.map((d) => d.id === id ? { ...d, status } : d));
    if ((selectedDispute == null ? void 0 : selectedDispute.id) === id)
      setSelectedDispute((prev) => prev ? { ...prev, status } : null);
  };
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedDispute) return;
    const msg = {
      author: isOwner ? "Yönetici" : "Ben",
      text: newMessage,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      isManager: isOwner
    };
    const updated = disputes.map(
      (d) => d.id === selectedDispute.id ? { ...d, messages: [...d.messages, msg] } : d
    );
    setDisputes(updated);
    setSelectedDispute(
      (prev) => prev ? { ...prev, messages: [...prev.messages, msg] } : null
    );
    setNewMessage("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-orange-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-6 h-6 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "Anlaşmazlık Çözüm Merkezi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Sakinler arası resmi uzlaşma ve arabuluculuk süreci" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowNewForm(!showNewForm),
          className: "flex items-center gap-2 bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Başvuru"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      {
        label: "Toplam",
        value: stats.total,
        color: "bg-blue-50 border-blue-200",
        textColor: "text-blue-700"
      },
      {
        label: "Açık / İnceleniyor",
        value: stats.open,
        color: "bg-yellow-50 border-yellow-200",
        textColor: "text-yellow-700"
      },
      {
        label: "Arabuluculukta",
        value: stats.mediation,
        color: "bg-purple-50 border-purple-200",
        textColor: "text-purple-700"
      },
      {
        label: "Çözüldü",
        value: stats.resolved,
        color: "bg-green-50 border-green-200",
        textColor: "text-green-700"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border rounded-xl p-4 ${s.color}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-bold ${s.textColor}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-[#3A4654] mt-1", children: s.label })
    ] }, s.label)) }),
    showNewForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#D7DEE9] rounded-xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-[#0E1116]", children: "Yeni Anlaşmazlık Başvurusu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Başlık" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: newDispute.title,
              onChange: (e) => setNewDispute({ ...newDispute, title: e.target.value }),
              placeholder: "Anlaşmazlık konusu"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: newDispute.category,
              onChange: (e) => setNewDispute({ ...newDispute, category: e.target.value }),
              children: [
                "Gürültü",
                "Ortak Alan",
                "Otopark",
                "Hasar",
                "Evcil Hayvan",
                "Diğer"
              ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Şikayetçi (Ad - Daire)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: newDispute.complainant,
              onChange: (e) => setNewDispute({ ...newDispute, complainant: e.target.value }),
              placeholder: "Daire 5 - Adı Soyadı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Şikayet Edilen (Ad - Daire)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: newDispute.respondent,
              onChange: (e) => setNewDispute({ ...newDispute, respondent: e.target.value }),
              placeholder: "Daire 6 - Adı Soyadı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Öncelik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: newDispute.priority,
              onChange: (e) => setNewDispute({
                ...newDispute,
                priority: e.target.value
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "dusuk", children: "Düşük" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "orta", children: "Orta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yuksek", children: "Yüksek" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Açıklama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm h-24 resize-none",
            value: newDispute.description,
            onChange: (e) => setNewDispute({ ...newDispute, description: e.target.value }),
            placeholder: "Anlaşmazlığı detaylı açıklayın..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleAddDispute,
            className: "bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors",
            children: "Başvuruyu Gönder"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowNewForm(false),
            className: "border border-[#D7DEE9] text-[#3A4654] px-4 py-2 rounded-lg text-sm hover:bg-[#F3F6FB] transition-colors",
            children: "İptal"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#D7DEE9] rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Durum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: [
              "Tümü",
              "Açık",
              "İnceleniyor",
              "Arabuluculuk",
              "Çözüldü",
              "Reddedildi"
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFilterStatus(s),
                className: `px-2 py-1 rounded text-xs font-medium transition-colors ${filterStatus === s ? "bg-[#0B1B2E] text-white" : "bg-[#F3F6FB] text-[#3A4654] hover:bg-[#D7DEE9]"}`,
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] block mb-1", children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "w-full border border-[#D7DEE9] rounded-lg px-2 py-1.5 text-xs",
                value: filterCategory,
                onChange: (e) => setFilterCategory(e.target.value),
                children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-[#D7DEE9] rounded-xl p-6 text-center text-sm text-[#3A4654]", children: "Sonuç bulunamadı" }) : filtered.map((d) => {
          const st = STATUS_LABELS[d.status];
          const pr = PRIORITY_LABELS[d.priority];
          const StIcon = st.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setSelectedDispute(d),
              onKeyDown: (e) => {
                if (e.key === "Enter") setSelectedDispute(d);
              },
              className: `bg-white border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${(selectedDispute == null ? void 0 : selectedDispute.id) === d.id ? "border-[#0B1B2E] shadow-md" : "border-[#D7DEE9]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0E1116] text-sm truncate", children: d.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-0.5", children: [
                      d.category,
                      " · ",
                      d.date
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${st.color}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(StIcon, { className: "w-3 h-3" }),
                        st.label
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-xs text-[#3A4654]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.complainant.split(" - ")[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-medium ${pr.color}`, children: [
                    pr.label,
                    " Öncelik"
                  ] })
                ] })
              ]
            },
            d.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: !selectedDispute ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#D7DEE9] rounded-xl p-12 flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-12 h-12 text-[#D7DEE9] mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-sm", children: "Detayları görüntülemek için sol taraftan bir başvuru seçin" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#D7DEE9] rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-[#D7DEE9]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-[#3A4654] bg-[#F3F6FB] px-2 py-0.5 rounded", children: selectedDispute.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_LABELS[selectedDispute.status].color}`,
                  children: STATUS_LABELS[selectedDispute.status].label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs font-medium ${PRIORITY_LABELS[selectedDispute.priority].color}`,
                  children: [
                    PRIORITY_LABELS[selectedDispute.priority].label,
                    " ",
                    "Öncelik"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-[#0E1116]", children: selectedDispute.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1", children: [
              selectedDispute.category,
              " · ",
              selectedDispute.date
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mb-1", children: "Şikayetçi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: selectedDispute.complainant })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F3F6FB] rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mb-1", children: "Şikayet Edilen" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0E1116]", children: selectedDispute.respondent })
            ] })
          ] }),
          selectedDispute.mediator && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs text-purple-700 bg-purple-50 px-3 py-2 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Arabulucu: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedDispute.mediator })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-[#D7DEE9]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-[#0E1116] mb-2", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] leading-relaxed", children: selectedDispute.description }),
          selectedDispute.resolution && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-green-700 mb-1", children: "Karar / Çözüm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-800", children: selectedDispute.resolution })
          ] })
        ] }),
        isOwner && selectedDispute.status !== "cozuldu" && selectedDispute.status !== "reddedildi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-[#D7DEE9] bg-[#F3F6FB]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-[#3A4654] mb-2", children: "Durum Güncelle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
            "inceleniyor",
            "arabuluculuk",
            "cozuldu",
            "reddedildi"
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleStatusChange(selectedDispute.id, s),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedDispute.status === s ? "bg-[#0B1B2E] text-white" : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:bg-[#D7DEE9]"}`,
              children: STATUS_LABELS[s].label
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-[#0E1116] mb-3", children: [
            "İletişim Kaydı (",
            selectedDispute.messages.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-48 overflow-y-auto mb-4", children: selectedDispute.messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] text-center py-4", children: "Henüz mesaj yok" }) : selectedDispute.messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-3 rounded-lg text-sm ${m.isManager ? "bg-blue-50 border border-blue-100" : "bg-[#F3F6FB]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-medium text-xs ${m.isManager ? "text-blue-700" : "text-[#0E1116]"}`,
                      children: m.author
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#3A4654]", children: m.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654]", children: m.text })
              ]
            },
            m.date + m.author
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "flex-1 border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                value: newMessage,
                onChange: (e) => setNewMessage(e.target.value),
                placeholder: "Mesaj yazın...",
                onKeyDown: (e) => e.key === "Enter" && handleSendMessage()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSendMessage,
                disabled: !newMessage.trim(),
                className: "bg-[#0B1B2E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a3a5c] transition-colors disabled:opacity-50",
                children: "Gönder"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  DisputeResolution as default
};
