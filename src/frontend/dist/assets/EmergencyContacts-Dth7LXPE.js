import { r as reactExports, j as jsxRuntimeExports, D as Dialog, s as DialogTrigger, B as Button, P as Plus, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input, o as DialogFooter, S as Search, E as Phone } from "./index-BOtpq-4_.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CQ_ersaZ.js";
import { L as Label } from "./label-4sWjcgw0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7U2ksiM.js";
import { T as Textarea } from "./textarea-CkkoEDVX.js";
import { S as Star } from "./star-qUPx4ymR.js";
import "./index-Cney5w6p.js";
const CATEGORIES = [
  "İtfaiye",
  "Sağlık & Ambulans",
  "Güvenlik & Polis",
  "Bina Acil",
  "Genel Hizmetler"
];
const categoryMeta = {
  İtfaiye: {
    emoji: "🚒",
    color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
  },
  "Sağlık & Ambulans": {
    emoji: "🏥",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
  },
  "Güvenlik & Polis": {
    emoji: "🚔",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
  },
  "Bina Acil": {
    emoji: "🏠",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
  },
  "Genel Hizmetler": {
    emoji: "📞",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
  }
};
const initialContacts = [
  {
    id: "1",
    name: "İtfaiye",
    phone: "110",
    category: "İtfaiye",
    desc: "Yangın, gaz sızıntısı ve acil kurtarma",
    pinned: true,
    updated: "2025-01-01"
  },
  {
    id: "2",
    name: "Ambulans",
    phone: "112",
    category: "Sağlık & Ambulans",
    desc: "Acil tıbbi yardım ve ambulans",
    pinned: true,
    updated: "2025-01-01"
  },
  {
    id: "3",
    name: "Polis İmdat",
    phone: "155",
    category: "Güvenlik & Polis",
    desc: "Güvenlik olayları ve acil polis yardımı",
    pinned: true,
    updated: "2025-01-01"
  },
  {
    id: "4",
    name: "Jandarma",
    phone: "156",
    category: "Güvenlik & Polis",
    desc: "Kırsal alan güvenlik acil hattı",
    pinned: false,
    updated: "2025-01-01"
  },
  {
    id: "5",
    name: "Site Güvenlik",
    phone: "0532 000 11 22",
    category: "Bina Acil",
    desc: "7/24 bina güvenlik birimi",
    pinned: true,
    updated: "2025-03-01"
  },
  {
    id: "6",
    name: "Yönetici - Ahmet Bey",
    phone: "0533 111 22 33",
    category: "Bina Acil",
    desc: "Site yöneticisi, acil durum iletişimi",
    pinned: false,
    updated: "2025-02-15"
  },
  {
    id: "7",
    name: "Tesisat Acil",
    phone: "0541 222 33 44",
    category: "Bina Acil",
    desc: "Su, ısıtma ve boru arızaları",
    pinned: false,
    updated: "2025-02-01"
  },
  {
    id: "8",
    name: "Elektrik Arıza",
    phone: "186",
    category: "Genel Hizmetler",
    desc: "BEDAŞ elektrik arıza hattı",
    pinned: false,
    updated: "2025-01-01"
  },
  {
    id: "9",
    name: "Doğalgaz Arıza",
    phone: "187",
    category: "Genel Hizmetler",
    desc: "İGDAŞ doğalgaz acil hattı",
    pinned: false,
    updated: "2025-01-01"
  },
  {
    id: "10",
    name: "Su Arıza",
    phone: "185",
    category: "Genel Hizmetler",
    desc: "İSKİ su arıza hattı",
    pinned: false,
    updated: "2025-01-01"
  },
  {
    id: "11",
    name: "Zehir Danışma",
    phone: "114",
    category: "Sağlık & Ambulans",
    desc: "Zehirlenme ve ilaç aşımı acil hattı",
    pinned: false,
    updated: "2025-01-01"
  }
];
function EmergencyContacts(_props) {
  const [contacts, setContacts] = reactExports.useState(initialContacts);
  const [search, setSearch] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    category: "",
    desc: ""
  });
  const togglePin = (id) => {
    setContacts(
      (prev) => prev.map((c) => c.id === id ? { ...c, pinned: !c.pinned } : c)
    );
  };
  const addContact = () => {
    if (!form.name || !form.phone || !form.category) return;
    setContacts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...form,
        pinned: false,
        updated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      }
    ]);
    setForm({ name: "", phone: "", category: "", desc: "" });
    setOpen(false);
  };
  const filtered = contacts.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.desc.toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filtered.filter((c) => c.pinned);
  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((c) => !c.pinned && c.category === cat)
  })).filter((g) => g.items.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Acil İletişim Rehberi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Bina ve acil servis iletişim bilgileri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "emergency.open_modal_button", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          " Kişi Ekle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni İletişim Ekle" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "İsim / Kurum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "emergency.name.input",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  placeholder: "Örn: Site Güvenlik"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "emergency.phone.input",
                  value: form.phone,
                  onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                  placeholder: "0532 000 00 00"
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "emergency.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kategori seçin" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Açıklama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "emergency.desc.textarea",
                  value: form.desc,
                  onChange: (e) => setForm((f) => ({ ...f, desc: e.target.value })),
                  placeholder: "Kısa açıklama...",
                  rows: 2
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "İptal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "emergency.submit_button", onClick: addContact, children: "Ekle" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "emergency.search_input",
          className: "pl-9",
          placeholder: "İsim, telefon veya açıklama ara...",
          value: search,
          onChange: (e) => setSearch(e.target.value)
        }
      )
    ] }),
    pinned.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-200 dark:border-yellow-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 fill-yellow-400" }),
        " Önemli Kişiler"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: pinned.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ContactCard,
        {
          contact: c,
          idx: i + 1,
          onPin: togglePin
        },
        c.id
      )) }) })
    ] }),
    byCategory.map(({ cat, items }) => {
      const meta = categoryMeta[cat];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: meta.emoji }),
          " ",
          cat
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: items.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContactCard,
          {
            contact: c,
            idx: i + 1,
            onPin: togglePin
          },
          c.id
        )) }) })
      ] }, cat);
    })
  ] });
}
function ContactCard({
  contact,
  idx,
  onPin
}) {
  const meta = categoryMeta[contact.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `emergency.item.${idx}`,
      className: "rounded-lg border p-4 space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: contact.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${contact.phone}`,
                className: "text-blue-600 font-mono text-sm hover:underline flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  contact.phone
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPin(contact.id),
              "data-ocid": `emergency.toggle.${idx}`,
              className: contact.pinned ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-400",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-4 h-4 ${contact.pinned ? "fill-yellow-400" : ""}`
                }
              )
            }
          )
        ] }),
        contact.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: contact.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`,
              children: contact.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Güncelleme: ",
            contact.updated
          ] })
        ] })
      ]
    }
  );
}
export {
  EmergencyContacts as default
};
