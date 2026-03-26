import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, x as Package, T as TriangleAlert, S as Search, I as Input, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-rRffLlDS.js";
import { C as Card, a as CardContent } from "./card-D8tvmG8e.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-BgDO6N8e.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode);
const CATEGORIES = [
  "Temizlik",
  "Elektrik",
  "Sıhhi Tesisat",
  "Güvenlik",
  "Bahçe",
  "Genel"
];
const UNITS = ["Adet", "Litre", "Kg", "Kutu", "Rulo", "Paket"];
const INITIAL_ITEMS = [
  {
    id: "1",
    name: "Çamaşır Suyu",
    category: "Temizlik",
    unit: "Litre",
    quantity: 15,
    minQuantity: 5,
    location: "Raf A-1",
    responsible: "Ahmet Y.",
    lastUpdated: "2026-03-20"
  },
  {
    id: "2",
    name: "Mop & Paspas",
    category: "Temizlik",
    unit: "Adet",
    quantity: 8,
    minQuantity: 3,
    location: "Depo Giriş",
    responsible: "Fatma K.",
    lastUpdated: "2026-03-18"
  },
  {
    id: "3",
    name: "Ampul LED 9W",
    category: "Elektrik",
    unit: "Adet",
    quantity: 2,
    minQuantity: 10,
    location: "Raf B-2",
    responsible: "Mehmet D.",
    lastUpdated: "2026-03-15"
  },
  {
    id: "4",
    name: "Boru Contası",
    category: "Sıhhi Tesisat",
    unit: "Paket",
    quantity: 6,
    minQuantity: 2,
    location: "Raf C-1",
    responsible: "Ahmet Y.",
    lastUpdated: "2026-03-10"
  },
  {
    id: "5",
    name: "Güvenlik Teli",
    category: "Güvenlik",
    unit: "Metre",
    quantity: 50,
    minQuantity: 20,
    location: "Raf D-3",
    responsible: "Ali R.",
    lastUpdated: "2026-03-05"
  },
  {
    id: "6",
    name: "Çim Biçme Yağı",
    category: "Bahçe",
    unit: "Litre",
    quantity: 3,
    minQuantity: 1,
    location: "Bahçe Kulübesi",
    responsible: "Mustafa S.",
    lastUpdated: "2026-02-28"
  }
];
const INITIAL_TRANSACTIONS = [
  {
    id: "t1",
    itemId: "1",
    itemName: "Çamaşır Suyu",
    type: "out",
    quantity: 3,
    responsible: "Fatma K.",
    note: "Bodrum kat temizliği",
    date: "2026-03-22"
  },
  {
    id: "t2",
    itemId: "3",
    itemName: "Ampul LED 9W",
    type: "out",
    quantity: 8,
    responsible: "Mehmet D.",
    note: "Koridor yenileme",
    date: "2026-03-21"
  },
  {
    id: "t3",
    itemId: "1",
    itemName: "Çamaşır Suyu",
    type: "in",
    quantity: 10,
    responsible: "Ahmet Y.",
    note: "Satın alma sipariş #1023",
    date: "2026-03-20"
  },
  {
    id: "t4",
    itemId: "2",
    itemName: "Mop & Paspas",
    type: "out",
    quantity: 2,
    responsible: "Fatma K.",
    note: "5. kat merdiven",
    date: "2026-03-18"
  },
  {
    id: "t5",
    itemId: "4",
    itemName: "Boru Contası",
    type: "in",
    quantity: 4,
    responsible: "Ahmet Y.",
    note: "Stok takviyesi",
    date: "2026-03-10"
  }
];
function DepotManagement({
  buildingId: _buildingId,
  isOwner
}) {
  const [items, setItems] = reactExports.useState(INITIAL_ITEMS);
  const [transactions, setTransactions] = reactExports.useState(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = reactExports.useState("stock");
  const [search, setSearch] = reactExports.useState("");
  const [filterCategory, setFilterCategory] = reactExports.useState("Tümü");
  const [showAddItem, setShowAddItem] = reactExports.useState(false);
  const [showTransaction, setShowTransaction] = reactExports.useState(false);
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const [txType, setTxType] = reactExports.useState("out");
  const [txQty, setTxQty] = reactExports.useState("");
  const [txNote, setTxNote] = reactExports.useState("");
  const [txResponsible, setTxResponsible] = reactExports.useState("");
  const [newItem, setNewItem] = reactExports.useState({
    name: "",
    category: "Temizlik",
    unit: "Adet",
    quantity: "",
    minQuantity: "",
    location: "",
    responsible: ""
  });
  const lowStockItems = items.filter((i) => i.quantity <= i.minQuantity);
  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "Tümü" || i.category === filterCategory;
    return matchSearch && matchCat;
  });
  function handleTransaction() {
    if (!selectedItem || !txQty || !txResponsible) return;
    const qty = Number.parseInt(txQty);
    if (Number.isNaN(qty) || qty <= 0) return;
    const tx = {
      id: Date.now().toString(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      type: txType,
      quantity: qty,
      responsible: txResponsible,
      note: txNote,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setTransactions((prev) => [tx, ...prev]);
    setItems(
      (prev) => prev.map(
        (i) => i.id === selectedItem.id ? {
          ...i,
          quantity: txType === "in" ? i.quantity + qty : Math.max(0, i.quantity - qty),
          lastUpdated: tx.date
        } : i
      )
    );
    setShowTransaction(false);
    setTxQty("");
    setTxNote("");
    setTxResponsible("");
  }
  function handleAddItem() {
    if (!newItem.name || !newItem.quantity) return;
    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      unit: newItem.unit,
      quantity: Number.parseInt(newItem.quantity) || 0,
      minQuantity: Number.parseInt(newItem.minQuantity) || 0,
      location: newItem.location,
      responsible: newItem.responsible,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setItems((prev) => [...prev, item]);
    setShowAddItem(false);
    setNewItem({
      name: "",
      category: "Temizlik",
      unit: "Adet",
      quantity: "",
      minQuantity: "",
      location: "",
      responsible: ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "Depo & Malzeme Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Bina deposundaki malzeme ve ekipman stoklarını yönetin" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAddItem(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Malzeme Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: items.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Toplam Kalem" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: lowStockItems.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Düşük Stok" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: transactions.filter((t) => t.type === "in").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Giriş İşlemi" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-5 h-5 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: transactions.filter((t) => t.type === "out").length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Çıkış İşlemi" })
        ] })
      ] }) }) })
    ] }),
    lowStockItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-red-700", children: "Düşük Stok Uyarısı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: lowStockItems.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full",
          children: [
            i.name,
            " (",
            i.quantity,
            " ",
            i.unit,
            ")"
          ]
        },
        i.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-[#E5EAF2]", children: ["stock", "transactions"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-[#4A90D9] text-[#4A90D9]" : "border-transparent text-[#6B7A8D] hover:text-[#0E1116]"}`,
        children: tab === "stock" ? "Stok Listesi" : "İşlem Geçmişi"
      },
      tab
    )) }),
    activeTab === "stock" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Malzeme veya konum ara...",
              className: "pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filterCategory,
            onChange: (e) => setFilterCategory(e.target.value),
            className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm text-[#0E1116]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
              CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: filtered.map((item) => {
        const isLow = item.quantity <= item.minQuantity;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `bg-white border-none shadow-sm ${isLow ? "border-l-4 border-l-red-400" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#F1F4F8] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-[#4A90D9]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                      item.category,
                      " • ",
                      item.location
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-bold text-lg ${isLow ? "text-red-600" : "text-[#0E1116]"}`,
                        children: item.quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: item.unit })
                  ] }),
                  isLow && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Düşük" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "rounded-full gap-1 text-xs",
                      onClick: () => {
                        setSelectedItem(item);
                        setShowTransaction(true);
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" }),
                        " İşlem"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-4 text-xs text-[#6B7A8D]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Min Stok: ",
                  item.minQuantity,
                  " ",
                  item.unit
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Sorumlu: ",
                  item.responsible
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Son güncelleme: ",
                  item.lastUpdated
                ] })
              ] })
            ] })
          },
          item.id
        );
      }) })
    ] }),
    activeTab === "transactions" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: transactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-full flex items-center justify-center ${tx.type === "in" ? "bg-green-100" : "bg-orange-100"}`,
              children: tx.type === "in" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-4 h-4 text-orange-600" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0E1116]", children: tx.itemName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: tx.note || "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `font-bold ${tx.type === "in" ? "text-green-600" : "text-orange-600"}`,
              children: [
                tx.type === "in" ? "+" : "-",
                tx.quantity
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: tx.date })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-2", children: [
        "Sorumlu: ",
        tx.responsible
      ] })
    ] }) }, tx.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddItem, onOpenChange: setShowAddItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Malzeme Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Malzeme adı",
            value: newItem.name,
            onChange: (e) => setNewItem((p) => ({ ...p, name: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: newItem.category,
              onChange: (e) => setNewItem((p) => ({ ...p, category: e.target.value })),
              className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: newItem.unit,
              onChange: (e) => setNewItem((p) => ({ ...p, unit: e.target.value })),
              className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: u }, u))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Mevcut miktar",
              type: "number",
              value: newItem.quantity,
              onChange: (e) => setNewItem((p) => ({ ...p, quantity: e.target.value }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Min. miktar",
              type: "number",
              value: newItem.minQuantity,
              onChange: (e) => setNewItem((p) => ({ ...p, minQuantity: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Depo konumu (örn. Raf A-1)",
            value: newItem.location,
            onChange: (e) => setNewItem((p) => ({ ...p, location: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Sorumlu kişi",
            value: newItem.responsible,
            onChange: (e) => setNewItem((p) => ({ ...p, responsible: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAddItem,
            disabled: !newItem.name || !newItem.quantity,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            children: "Ekle"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showTransaction, onOpenChange: setShowTransaction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Stok İşlemi — ",
        selectedItem == null ? void 0 : selectedItem.name
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: txType === "in" ? "default" : "outline",
              onClick: () => setTxType("in"),
              className: `flex-1 rounded-full ${txType === "in" ? "bg-green-600 hover:bg-green-700 text-white" : ""}`,
              children: "Giriş"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: txType === "out" ? "default" : "outline",
              onClick: () => setTxType("out"),
              className: `flex-1 rounded-full ${txType === "out" ? "bg-orange-600 hover:bg-orange-700 text-white" : ""}`,
              children: "Çıkış"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Miktar",
            type: "number",
            value: txQty,
            onChange: (e) => setTxQty(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Sorumlu kişi",
            value: txResponsible,
            onChange: (e) => setTxResponsible(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Not (isteğe bağlı)",
            value: txNote,
            onChange: (e) => setTxNote(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleTransaction,
            disabled: !txQty || !txResponsible,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            children: "Kaydet"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  DepotManagement as default
};
