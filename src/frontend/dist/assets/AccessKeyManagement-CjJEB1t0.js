import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, T as TriangleAlert, S as Search, I as Input, C as CreditCard, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as Badge } from "./index-DOWBo6uK.js";
import { C as Card, a as CardContent } from "./card-s7CBtMuC.js";
import { C as CircleCheck } from "./circle-check-DP0xdjv4.js";
import { K as Key } from "./key-BjQ3Xwms.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const INITIAL = [
  {
    id: "1",
    type: "anahtar",
    code: "ANA-001",
    apartment: "A-1",
    holderName: "Mehmet Yılmaz",
    issuedDate: "2025-01-10",
    status: "active",
    notes: "",
    copyAllowed: false
  },
  {
    id: "2",
    type: "kart",
    code: "KRT-045",
    apartment: "A-1",
    holderName: "Mehmet Yılmaz",
    issuedDate: "2025-01-10",
    status: "active",
    notes: "Araç giriş kartı",
    copyAllowed: false
  },
  {
    id: "3",
    type: "kumanda",
    code: "KMD-012",
    apartment: "B-5",
    holderName: "Elif Şahin",
    issuedDate: "2024-06-15",
    status: "active",
    notes: "Otopark bariyeri",
    copyAllowed: false
  },
  {
    id: "4",
    type: "anahtar",
    code: "ANA-023",
    apartment: "C-8",
    holderName: "Hasan Polat",
    issuedDate: "2024-03-20",
    status: "lost",
    notes: "Kayıp bildirildi",
    copyAllowed: false
  },
  {
    id: "5",
    type: "kart",
    code: "KRT-031",
    apartment: "D-2",
    holderName: "Fatma Çelik",
    issuedDate: "2023-11-01",
    returnedDate: "2026-02-28",
    status: "returned",
    notes: "Taşınma nedeniyle iade",
    copyAllowed: false
  },
  {
    id: "6",
    type: "sifre",
    code: "GRS-999",
    apartment: "Ortak",
    holderName: "Tüm Sakinler",
    issuedDate: "2026-01-01",
    status: "active",
    notes: "Misafir girişi şifresi",
    copyAllowed: true
  }
];
const TYPE_LABELS = {
  anahtar: "Anahtar",
  kart: "Giriş Kartı",
  kumanda: "Uzaktan Kumanda",
  sifre: "Şifre / Kod"
};
const TYPE_ICONS = {
  anahtar: Key,
  kart: CreditCard,
  kumanda: Smartphone,
  sifre: Key
};
function statusBadge(status) {
  if (status === "active")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-0", children: "Aktif" });
  if (status === "lost")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0", children: "Kayıp" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gray-100 text-gray-600 border-0", children: "İade Edildi" });
}
function AccessKeyManagement({
  buildingId: _buildingId,
  isOwner
}) {
  const [records, setRecords] = reactExports.useState(INITIAL);
  const [search, setSearch] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showLostConfirm, setShowLostConfirm] = reactExports.useState("");
  const [newForm, setNewForm] = reactExports.useState({
    type: "anahtar",
    code: "",
    apartment: "",
    holderName: "",
    issuedDate: "",
    notes: "",
    copyAllowed: false
  });
  const active = records.filter((r) => r.status === "active").length;
  const lost = records.filter((r) => r.status === "lost").length;
  const returned = records.filter((r) => r.status === "returned").length;
  const filtered = records.filter((r) => {
    const matchSearch = r.code.toLowerCase().includes(search.toLowerCase()) || r.holderName.toLowerCase().includes(search.toLowerCase()) || r.apartment.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "Tümü" || r.type === filterType;
    const matchStatus = filterStatus === "Tümü" || r.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });
  function markLost(id) {
    setRecords(
      (prev) => prev.map((r) => r.id === id ? { ...r, status: "lost" } : r)
    );
    setShowLostConfirm("");
  }
  function markReturned(id) {
    setRecords(
      (prev) => prev.map(
        (r) => r.id === id ? {
          ...r,
          status: "returned",
          returnedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        } : r
      )
    );
  }
  function handleAdd() {
    if (!newForm.code || !newForm.apartment || !newForm.holderName) return;
    const r = {
      id: Date.now().toString(),
      type: newForm.type,
      code: newForm.code,
      apartment: newForm.apartment,
      holderName: newForm.holderName,
      issuedDate: newForm.issuedDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "active",
      notes: newForm.notes,
      copyAllowed: newForm.copyAllowed
    };
    setRecords((prev) => [...prev, r]);
    setShowAdd(false);
    setNewForm({
      type: "anahtar",
      code: "",
      apartment: "",
      holderName: "",
      issuedDate: "",
      notes: "",
      copyAllowed: false
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#0E1116]", children: "Erişim Kontrol & Anahtar Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Daire anahtarları, giriş kartları ve kumandaların envanterini tutun" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Kayıt Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: active }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Aktif" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: lost }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Kayıp" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-5 h-5 text-gray-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: returned }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "İade" })
        ] })
      ] }) }) })
    ] }),
    lost > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-red-700", children: [
        lost,
        " kayıp erişim aracı bildirildi. Güvenlik protokolünü gözden geçirin."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A8D]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Kod, kişi veya daire ara...",
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterType,
          onChange: (e) => setFilterType(e.target.value),
          className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
            Object.entries(TYPE_LABELS).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Tümü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Aktif" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "lost", children: "Kayıp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "returned", children: "İade" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: filtered.map((rec) => {
      const Icon = TYPE_ICONS[rec.type] || Key;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `bg-white border-none shadow-sm ${rec.status === "lost" ? "border-l-4 border-l-red-400" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#F1F4F8] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-[#4A90D9]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: TYPE_LABELS[rec.type] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono bg-[#F1F4F8] px-2 py-0.5 rounded text-[#3A4654]", children: rec.code })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                    rec.holderName,
                    " • Daire ",
                    rec.apartment
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                statusBadge(rec.status),
                rec.status === "active" && isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-orange-600 hover:bg-orange-50 rounded-full text-xs h-7 px-2",
                      onClick: () => setShowLostConfirm(rec.id),
                      children: "Kayıp"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-gray-600 hover:bg-gray-50 rounded-full text-xs h-7 px-2",
                      onClick: () => markReturned(rec.id),
                      children: "İade"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-4 text-xs text-[#6B7A8D]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Teslim: ",
                rec.issuedDate
              ] }),
              rec.returnedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "İade: ",
                rec.returnedDate
              ] }),
              rec.copyAllowed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "Kopyalama izinli" }),
              !rec.copyAllowed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "Kopyalama yasak" }),
              rec.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Not: ",
                rec.notes
              ] })
            ] })
          ] })
        },
        rec.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!showLostConfirm,
        onOpenChange: () => setShowLostConfirm(""),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Kayıp Bildir" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Bu erişim aracını kayıp olarak işaretlemek istediğinizden emin misiniz? Güvenlik birimini haberdar etmeyi unutmayın." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 rounded-full",
                onClick: () => setShowLostConfirm(""),
                children: "İptal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 rounded-full bg-red-600 hover:bg-red-700 text-white",
                onClick: () => markLost(showLostConfirm),
                children: "Kayıp Olarak İşaretle"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Erişim Kaydı" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: newForm.type,
            onChange: (e) => setNewForm((p) => ({ ...p, type: e.target.value })),
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
            children: Object.entries(TYPE_LABELS).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Kod / Seri no (örn. ANA-024)",
            value: newForm.code,
            onChange: (e) => setNewForm((p) => ({ ...p, code: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Daire (örn. A-5)",
            value: newForm.apartment,
            onChange: (e) => setNewForm((p) => ({ ...p, apartment: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Teslim alan kişi",
            value: newForm.holderName,
            onChange: (e) => setNewForm((p) => ({ ...p, holderName: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: newForm.issuedDate,
            onChange: (e) => setNewForm((p) => ({ ...p, issuedDate: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Not (isteğe bağlı)",
            value: newForm.notes,
            onChange: (e) => setNewForm((p) => ({ ...p, notes: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: newForm.copyAllowed,
              onChange: (e) => setNewForm((p) => ({ ...p, copyAllowed: e.target.checked }))
            }
          ),
          "Kopyalama izni var"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !newForm.code || !newForm.apartment || !newForm.holderName,
            className: "w-full bg-[#0B1B2E] text-white rounded-full",
            children: "Kaydet"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AccessKeyManagement as default
};
