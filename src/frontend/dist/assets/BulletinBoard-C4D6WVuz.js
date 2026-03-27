import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, e as Badge, M as MessageSquare, X, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, m as Image } from "./index-Cr-31AJ2.js";
const TYPES = [
  "Tümü",
  "Satılık",
  "Kiralık",
  "Aranan",
  "Hizmet Teklifi",
  "Duyuru"
];
const TYPE_COLORS = {
  Satılık: "bg-green-100 text-green-700",
  Kiralık: "bg-blue-100 text-blue-700",
  Aranan: "bg-yellow-100 text-yellow-700",
  "Hizmet Teklifi": "bg-purple-100 text-purple-700",
  Duyuru: "bg-gray-100 text-gray-700"
};
const DEFAULT_LISTINGS = [
  {
    id: "1",
    title: "İkinci El Kanepe",
    description: "3+1 koltuk takımı, iyi durumda. Taşınıyorum.",
    type: "Satılık",
    price: "3500",
    contact: "Daire 12",
    createdBy: "user1",
    createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    expiresAt: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10)
  },
  {
    id: "2",
    title: "Çocuk Bisikleti Aranıyor",
    description: "5-7 yaş arası çocuk bisikleti arıyorum.",
    type: "Aranan",
    price: "",
    contact: "Daire 7",
    createdBy: "user2",
    createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  },
  {
    id: "3",
    title: "Ev Temizliği Hizmeti",
    description: "Haftada 2 gün ev temizliği yapıyorum. Uygun fiyat.",
    type: "Hizmet Teklifi",
    price: "200/gün",
    contact: "0533 xxx xx xx",
    createdBy: "user3",
    createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    expiresAt: new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10)
    // already expired
  }
];
function BulletinBoard({
  buildingId,
  userId,
  isOwner
}) {
  const key = `sitecore_bulletin_${buildingId}`;
  const load = () => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_LISTINGS;
    } catch {
      return DEFAULT_LISTINGS;
    }
  };
  const [items, setItems] = reactExports.useState(load);
  const [filter, setFilter] = reactExports.useState("Tümü");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    type: "Satılık",
    price: "",
    contact: "",
    expiresAt: "",
    imageUrl: ""
  });
  const save = (data) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const filtered = filter === "Tümü" ? items : items.filter((i) => i.type === filter);
  const isExpired = (item) => {
    if (!item.expiresAt) return false;
    return new Date(item.expiresAt) < /* @__PURE__ */ new Date();
  };
  const handleAdd = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    save([
      {
        id: Date.now().toString(),
        ...form,
        createdBy: userId,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
      },
      ...items
    ]);
    setShowAdd(false);
    setForm({
      title: "",
      description: "",
      type: "Satılık",
      price: "",
      contact: "",
      expiresAt: "",
      imageUrl: ""
    });
  };
  const handleDelete = (id, createdBy) => {
    if (userId === createdBy || isOwner) save(items.filter((i) => i.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "İlan Panosu / Komşu Pazarı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "İlan Ver"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6", children: TYPES.filter((type) => type !== "Tümü").map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: items.filter((i) => i.type === type).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: type })
        ]
      },
      type
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap mb-4", children: TYPES.map((typeItem) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(typeItem),
        className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === typeItem ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`,
        children: typeItem
      },
      typeItem
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `bg-white rounded-2xl p-5 shadow-sm border ${isExpired(item) ? "border-red-200 opacity-70" : "border-[#E5EAF2]"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              item.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.imageUrl,
                  alt: item.title,
                  className: "w-full max-w-xs h-32 object-cover rounded-xl border border-[#E5EAF2]",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${TYPE_COLORS[item.type]} border-0 text-xs`,
                    children: item.type
                  }
                ),
                item.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-green-600", children: [
                  item.price,
                  " ₺"
                ] }),
                isExpired(item) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs", children: "Süresi Doldu" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mb-2", children: item.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-[#3A4654] flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                  item.contact
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.createdAt }),
                item.expiresAt && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: isExpired(item) ? "text-red-500" : "text-[#6B7A8D]",
                    children: isExpired(item) ? "Süresi doldu" : `Son: ${item.expiresAt}`
                  }
                )
              ] })
            ] }),
            (userId === item.createdBy || isOwner) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => handleDelete(item.id, item.createdBy),
                variant: "ghost",
                size: "sm",
                className: "text-red-400 hover:text-red-600 rounded-full ml-3",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        },
        item.id
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-10", children: "İlan bulunamadı." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni İlan" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başlık" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "İlan başlığı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tür" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.type,
              onChange: (e) => setForm((f) => ({ ...f, type: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: TYPES.filter((typeOpt) => typeOpt !== "Tümü").map(
                (typeOpt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: typeOpt, children: typeOpt }, typeOpt)
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Detaylar...",
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm min-h-[80px] resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Fiyat (opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.price,
              onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
              placeholder: "ör. 1500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "İletişim" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.contact,
              onChange: (e) => setForm((f) => ({ ...f, contact: e.target.value })),
              placeholder: "Telefon veya daire no"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Son Geçerlilik Tarihi (opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.expiresAt,
              onChange: (e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium mb-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
            " Fotoğraf URL (opsiyonel)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.imageUrl,
              onChange: (e) => setForm((f) => ({ ...f, imageUrl: e.target.value })),
              placeholder: "https://..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !form.title.trim() || !form.description.trim(),
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Yayınla"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  BulletinBoard as default
};
