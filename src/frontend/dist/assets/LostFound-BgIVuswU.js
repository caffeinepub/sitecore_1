import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, D as Dialog, s as DialogTrigger, B as Button, P as Plus, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, o as DialogFooter, x as Package, S as Search, e as Badge } from "./index-rRffLlDS.js";
import { C as Card, a as CardContent } from "./card-D8tvmG8e.js";
import { L as Label } from "./label-DJ4RtnAu.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CMx2a6fj.js";
import { T as Textarea } from "./textarea-Cv7xvIyS.js";
import "./index-7YlidU9p.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const CATEGORIES = [
  "Hepsi",
  "Elektronik",
  "Kıyafet",
  "Anahtar",
  "Evrak",
  "Diğer"
];
const STATUS_FILTER = ["Hepsi", "Aranıyor", "Bulundu", "Teslim Edildi"];
const initialItems = [
  {
    id: "1",
    type: "kayıp",
    title: "Siyah iPhone 14",
    category: "Elektronik",
    status: "Aranıyor",
    date: "2025-03-15",
    owner: "Daire 12 - A. Yılmaz",
    contact: "0532 111 22 33",
    desc: "Giriş holünde unutmuş olabilirim, siyah kılıflı."
  },
  {
    id: "2",
    type: "buluntu",
    title: "Apartman Anahtarı",
    category: "Anahtar",
    status: "Bulundu",
    date: "2025-03-14",
    owner: "Daire 7 - F. Demir",
    contact: "0541 222 33 44",
    desc: "Asansör önünde bulundu, 3 anahtarlık."
  },
  {
    id: "3",
    type: "kayıp",
    title: "Mavi Şemsiye",
    category: "Diğer",
    status: "Teslim Edildi",
    date: "2025-03-10",
    owner: "Daire 22 - M. Kaya",
    contact: "0555 333 44 55",
    desc: "Çatı katında unutulmuş olabilir."
  },
  {
    id: "4",
    type: "buluntu",
    title: "Çocuk Montu",
    category: "Kıyafet",
    status: "Aranıyor",
    date: "2025-03-18",
    owner: "Yönetici",
    contact: "0500 000 00 01",
    desc: "5-6 yaş, kırmızı renkli mont. Bahçede bulundu."
  },
  {
    id: "5",
    type: "kayıp",
    title: "Nüfus Cüzdanı",
    category: "Evrak",
    status: "Bulundu",
    date: "2025-03-17",
    owner: "Daire 18 - Z. Arslan",
    contact: "0533 444 55 66",
    desc: "Posta kutusunda unutulmuş olabilir."
  },
  {
    id: "6",
    type: "buluntu",
    title: "Kablosuz Kulaklık",
    category: "Elektronik",
    status: "Aranıyor",
    date: "2025-03-19",
    owner: "Daire 5 - H. Çelik",
    contact: "0544 555 66 77",
    desc: "Spor salonunda bulundu, beyaz AirPods."
  }
];
const statusConfig = {
  Aranıyor: {
    label: "Aranıyor",
    class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  },
  Bulundu: {
    label: "Bulundu",
    class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  "Teslim Edildi": {
    label: "Teslim Edildi",
    class: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  }
};
function LostFound(_props) {
  const [items, setItems] = reactExports.useState(initialItems);
  const [search, setSearch] = reactExports.useState("");
  const [catFilter, setCatFilter] = reactExports.useState("Hepsi");
  const [statusFilter, setStatusFilter] = reactExports.useState("Hepsi");
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    type: "kayıp",
    title: "",
    category: "",
    desc: "",
    contact: "",
    owner: ""
  });
  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Hepsi" || item.category === catFilter;
    const matchStatus = statusFilter === "Hepsi" || item.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });
  const activeCount = items.filter((i) => i.status === "Aranıyor").length;
  const thisMonthSolved = items.filter(
    (i) => i.status === "Teslim Edildi"
  ).length;
  const addItem = () => {
    if (!form.title || !form.category || !form.contact) return;
    setItems((prev) => [
      {
        id: Date.now().toString(),
        type: form.type,
        title: form.title,
        category: form.category,
        status: "Aranıyor",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        owner: form.owner || "Anonim",
        contact: form.contact,
        desc: form.desc
      },
      ...prev
    ]);
    setForm({
      type: "kayıp",
      title: "",
      category: "",
      desc: "",
      contact: "",
      owner: ""
    });
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Kayıp & Buluntu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Bina içi kayıp ve buluntu ilanları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "lostfound.open_modal_button", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " Yeni İlan Ekle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni İlan Ekle" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "İlan Türü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.type,
                  onValueChange: (v) => setForm((f) => ({ ...f, type: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "lostfound.type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "kayıp", children: "🔍 Kayıp (kaybettim)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "buluntu", children: "📦 Buluntu (buldum)" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Başlık" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "lostfound.title.input",
                  value: form.title,
                  onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                  placeholder: "Örn: Siyah iPhone 14"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kategori" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.category,
                  onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "lostfound.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kategori seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Açıklama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "lostfound.desc.textarea",
                  value: form.desc,
                  onChange: (e) => setForm((f) => ({ ...f, desc: e.target.value })),
                  placeholder: "Detaylı açıklama...",
                  rows: 3
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "İletişim Bilgisi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "lostfound.contact.input",
                  value: form.contact,
                  onChange: (e) => setForm((f) => ({ ...f, contact: e.target.value })),
                  placeholder: "Telefon veya daire no"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "İptal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "lostfound.submit_button", onClick: addItem, children: "İlan Yayınla" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-yellow-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: activeCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aktif İlan" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-8 h-8 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: thisMonthSolved }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bu Ay Çözülen" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "lostfound.search_input",
            className: "pl-9",
            placeholder: "İlan ara...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: catFilter, onValueChange: setCatFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "lostfound.cat_filter.select",
            className: "w-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "data-ocid": "lostfound.status_filter.select",
            className: "w-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_FILTER.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "lostfound.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Arama kriterlerine uyan ilan bulunamadı." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        "data-ocid": `lostfound.item.${idx + 1}`,
        className: "overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-2 ${item.type === "kayıp" ? "bg-red-400" : "bg-blue-400"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  item.date,
                  " · ",
                  item.owner
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusConfig[item.status].class}`,
                  children: item.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: item.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${item.type === "kayıp" ? "border-red-300 text-red-600" : "border-blue-300 text-blue-600"}`,
                  children: item.type === "kayıp" ? "Kayıp" : "Buluntu"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: item.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${item.contact}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": `lostfound.contact.button.${idx + 1}`,
                variant: "outline",
                size: "sm",
                className: "w-full gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                  " ",
                  item.contact
                ]
              }
            ) })
          ] })
        ]
      },
      item.id
    )) })
  ] });
}
export {
  LostFound as default
};
