import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, e as Badge, T as TriangleAlert, E as Phone, X, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-5GfTJQeF.js";
import { S as Star } from "./star-ChYD0zmy.js";
const CATEGORIES = [
  "Tümü",
  "Tesisatçı",
  "Elektrikçi",
  "Temizlik",
  "Asansör Bakım",
  "Güvenlik",
  "Peyzaj",
  "Çilingir",
  "Boyacı",
  "Diğer"
];
const DEFAULT_PROVIDERS = [
  {
    id: "1",
    name: "Yılmaz Tesisat",
    category: "Tesisatçı",
    phone: "0532 111 22 33",
    email: "",
    notes: "7/24 acil servis mevcut",
    rating: 4,
    ratingCount: 5,
    workHistory: [
      {
        id: "w1",
        date: "2026-02-10",
        description: "Bodrum katta su borusu tamiri"
      }
    ],
    lastCallDate: "2026-02-10"
  },
  {
    id: "2",
    name: "Parlak Elektrik",
    category: "Elektrikçi",
    phone: "0542 333 44 55",
    email: "",
    notes: "",
    rating: 5,
    ratingCount: 3,
    workHistory: [],
    lastCallDate: "2025-08-15"
  },
  {
    id: "3",
    name: "Güneş Temizlik",
    category: "Temizlik",
    phone: "0212 555 66 77",
    email: "",
    notes: "Haftalık ortak alan temizliği yapıyor",
    rating: 4,
    ratingCount: 8,
    workHistory: [],
    lastCallDate: "2026-03-01"
  }
];
function ServiceProviders({
  buildingId,
  isOwner
}) {
  const key = `sitecore_service_providers_${buildingId}`;
  const load = () => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_PROVIDERS;
    } catch {
      return DEFAULT_PROVIDERS;
    }
  };
  const [items, setItems] = reactExports.useState(load);
  const [filter, setFilter] = reactExports.useState("Tümü");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showDetail, setShowDetail] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "Tesisatçı",
    phone: "",
    email: "",
    notes: "",
    lastCallDate: ""
  });
  const [workForm, setWorkForm] = reactExports.useState({ date: "", description: "" });
  const save = (data) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const filtered = filter === "Tümü" ? items : items.filter((p) => p.category === filter);
  const detail = items.find((p) => p.id === showDetail);
  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        rating: 0,
        ratingCount: 0,
        workHistory: []
      }
    ]);
    setShowAdd(false);
    setForm({
      name: "",
      category: "Tesisatçı",
      phone: "",
      email: "",
      notes: "",
      lastCallDate: ""
    });
  };
  const handleRate = (id, stars) => {
    const updated = items.map(
      (p) => p.id !== id ? p : {
        ...p,
        rating: Math.round(
          (p.rating * p.ratingCount + stars) / (p.ratingCount + 1)
        ),
        ratingCount: p.ratingCount + 1
      }
    );
    save(updated);
  };
  const handleAddWork = (id) => {
    if (!workForm.date || !workForm.description) return;
    const updated = items.map(
      (p) => p.id !== id ? p : {
        ...p,
        workHistory: [
          { id: Date.now().toString(), ...workForm },
          ...p.workHistory
        ],
        lastCallDate: workForm.date
      }
    );
    save(updated);
    setWorkForm({ date: "", description: "" });
  };
  const handleDelete = (id) => save(items.filter((p) => p.id !== id));
  const isOldContact = (lastCallDate) => {
    if (!lastCallDate) return false;
    const sixMonthsAgo = /* @__PURE__ */ new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return new Date(lastCallDate) < sixMonthsAgo;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Tedarikçi & Hizmet Rehberi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Tedarikçi Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#0B1B2E]", children: items.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Toplam Tedarikçi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-500", children: items.filter((p) => p.rating >= 4).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Yüksek Puanlı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4A90D9]", children: [...new Set(items.map((p) => p.category))].length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Kategori" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap mb-4", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(cat),
        className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === cat ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`,
        children: cat
      },
      cat
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: p.category }),
                isOldContact(p.lastCallDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-100 text-yellow-700 border-0 text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                  " 6+ ay önce arandı"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-2", children: [
                [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-4 h-4 ${s <= p.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                  },
                  s
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#3A4654] ml-1", children: [
                  "(",
                  p.ratingCount,
                  " değerlendirme)"
                ] })
              ] }),
              p.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-[#3A4654]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                p.phone
              ] }),
              p.lastCallDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-1", children: [
                "Son arama: ",
                p.lastCallDate
              ] }),
              p.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1 italic", children: p.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => setShowDetail(p.id),
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-xs",
                  children: "Detay"
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleDelete(p.id),
                  variant: "ghost",
                  size: "sm",
                  className: "text-red-400 hover:text-red-600 rounded-full",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        },
        p.id
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-10", children: "Tedarikçi bulunamadı." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tedarikçi Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ad / Firma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Firma veya kişi adı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Kategori" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.category,
              onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: CATEGORIES.filter((c) => c !== "Tümü").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Telefon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.phone,
              onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
              placeholder: "0500 000 00 00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Son Arama Tarihi (opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.lastCallDate,
              onChange: (e) => setForm((f) => ({ ...f, lastCallDate: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Not (opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Ek bilgi"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !form.name.trim(),
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Ekle"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!showDetail, onOpenChange: () => setShowDetail(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: detail == null ? void 0 : detail.name }) }),
      detail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mr-2", children: "Puan Ver:" }),
          [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleRate(detail.id, s),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-5 h-5 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 ${s <= detail.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`
                }
              )
            },
            s
          ))
        ] }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 bg-[#F3F6FB] rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "İş Kaydı Ekle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: workForm.date,
              onChange: (e) => setWorkForm((f) => ({ ...f, date: e.target.value }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: workForm.description,
              onChange: (e) => setWorkForm((f) => ({
                ...f,
                description: e.target.value
              })),
              placeholder: "Yapılan iş"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleAddWork(detail.id),
              disabled: !workForm.date || !workForm.description,
              className: "w-full bg-[#4A90D9] text-white rounded-full text-sm",
              children: "Kaydet"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "İş Geçmişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: [
            detail.workHistory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Kayıt bulunmuyor." }),
            detail.workHistory.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white rounded-xl p-3 border border-[#E5EAF2]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654]", children: w.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#0E1116]", children: w.description })
                ]
              },
              w.id
            ))
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ServiceProviders as default
};
