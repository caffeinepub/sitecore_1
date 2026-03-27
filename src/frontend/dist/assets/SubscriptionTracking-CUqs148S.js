import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, F as FileText, T as TriangleAlert, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-Bfd22_yy.js";
import { S as Switch } from "./switch-CHSwkpap.js";
import { C as CircleCheckBig } from "./circle-check-big-_fqQNjyZ.js";
import { R as RefreshCw } from "./refresh-cw-DXNZZMqT.js";
import { P as Pen } from "./pen-Dzs9gEM8.js";
import { T as Trash2 } from "./trash-2-BLfMSVIr.js";
import "./index-QBgf6o7t.js";
const SERVICE_TYPES = [
  "Tümü",
  "Asansör Bakım",
  "Güvenlik Sistemi",
  "Temizlik",
  "Peyzaj",
  "İnternet/Fiber",
  "Doğalgaz Bakım",
  "Jeneratör Bakım",
  "Sigorta",
  "Muhasebe",
  "Diğer"
];
const DEFAULT_SUBSCRIPTIONS = [
  {
    id: "1",
    provider: "AsansörTek A.Ş.",
    serviceType: "Asansör Bakım",
    startDate: "2025-01-01",
    endDate: "2026-12-31",
    monthlyCost: 2800,
    autoRenew: true,
    status: "aktif",
    notes: "Aylık bakım + 24/7 arıza desteği"
  },
  {
    id: "2",
    provider: "GuardPro Güvenlik",
    serviceType: "Güvenlik Sistemi",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    monthlyCost: 3500,
    autoRenew: true,
    status: "aktif",
    notes: "7/24 izleme + alarm sistemi"
  },
  {
    id: "3",
    provider: "Güneş Temizlik Ltd.",
    serviceType: "Temizlik",
    startDate: "2026-01-01",
    endDate: "2026-04-20",
    monthlyCost: 4200,
    autoRenew: false,
    status: "aktif",
    notes: "Haftalık ortak alan temizliği"
  },
  {
    id: "4",
    provider: "YeşilBahçe Peyzaj",
    serviceType: "Peyzaj",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    monthlyCost: 1200,
    autoRenew: false,
    status: "süresi dolmuş",
    notes: "Mevsimlik bakım"
  },
  {
    id: "5",
    provider: "TürkFiber",
    serviceType: "İnternet/Fiber",
    startDate: "2024-09-01",
    endDate: "2026-08-31",
    monthlyCost: 850,
    autoRenew: true,
    status: "aktif",
    notes: "Ortak alan internet"
  },
  {
    id: "6",
    provider: "EnerjiTek Bakım",
    serviceType: "Jeneratör Bakım",
    startDate: "2026-01-01",
    endDate: "2026-04-30",
    monthlyCost: 1600,
    autoRenew: false,
    status: "aktif",
    notes: "Yıllık bakım + yakıt takibi"
  }
];
const KEY = (id) => `sitecore_subscriptions_${id}`;
function daysUntilExpiry(endDate) {
  const end = new Date(endDate);
  const today = /* @__PURE__ */ new Date();
  return Math.ceil((end.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
}
function getExpiryColor(days, status) {
  if (status !== "aktif") return "";
  if (days < 0) return "border-red-300 bg-red-50";
  if (days <= 30) return "border-red-200 bg-red-50";
  if (days <= 60) return "border-yellow-200 bg-yellow-50";
  return "";
}
function SubscriptionTracking({
  buildingId,
  isOwner,
  t: _t
}) {
  const load = () => {
    try {
      const d = localStorage.getItem(KEY(buildingId));
      return d ? JSON.parse(d) : DEFAULT_SUBSCRIPTIONS;
    } catch {
      return DEFAULT_SUBSCRIPTIONS;
    }
  };
  const [subs, setSubs] = reactExports.useState(load);
  const [filterStatus, setFilterStatus] = reactExports.useState("Tümü");
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    provider: "",
    serviceType: "Diğer",
    startDate: "",
    endDate: "",
    monthlyCost: 0,
    autoRenew: false,
    status: "aktif",
    notes: ""
  });
  const save = (data) => {
    setSubs(data);
    localStorage.setItem(KEY(buildingId), JSON.stringify(data));
  };
  const openAdd = () => {
    setEditTarget(null);
    setForm({
      provider: "",
      serviceType: "Diğer",
      startDate: "",
      endDate: "",
      monthlyCost: 0,
      autoRenew: false,
      status: "aktif",
      notes: ""
    });
    setShowDialog(true);
  };
  const openEdit = (s) => {
    setEditTarget(s);
    setForm({
      provider: s.provider,
      serviceType: s.serviceType,
      startDate: s.startDate,
      endDate: s.endDate,
      monthlyCost: s.monthlyCost,
      autoRenew: s.autoRenew,
      status: s.status,
      notes: s.notes
    });
    setShowDialog(true);
  };
  const handleSave = () => {
    if (!form.provider.trim()) return;
    if (editTarget) {
      save(subs.map((s) => s.id === editTarget.id ? { ...s, ...form } : s));
    } else {
      save([...subs, { id: Date.now().toString(), ...form }]);
    }
    setShowDialog(false);
  };
  const filtered = subs.filter(
    (s) => (filterStatus === "Tümü" || s.status === filterStatus) && (filterType === "Tümü" || s.serviceType === filterType)
  );
  const activeSubs = subs.filter((s) => s.status === "aktif");
  const totalMonthlyCost = activeSubs.reduce(
    (sum, s) => sum + s.monthlyCost,
    0
  );
  const expiringThisMonth = subs.filter(
    (s) => s.status === "aktif" && daysUntilExpiry(s.endDate) <= 30 && daysUntilExpiry(s.endDate) >= 0
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Abonelik & Sözleşme Takibi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-0.5", children: "Aktif sözleşmeler ve yaklaşan son kullanma tarihleri" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openAdd,
          className: "bg-[#0B1B2E] text-white rounded-full gap-2",
          "data-ocid": "subscriptions.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Sözleşme Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0E1116]", children: activeSubs.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Aktif Sözleşme" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-[#4A90D9]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#0E1116]", children: [
          "₺",
          totalMonthlyCost.toLocaleString("tr-TR")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Toplam Aylık Maliyet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-orange-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-orange-500", children: expiringThisMonth }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Bu Ay Bitenler" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-[#F3F6FB] rounded-full p-1", children: ["Tümü", "aktif", "süresi dolmuş", "iptal"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterStatus(s),
          className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === s ? "bg-white shadow text-[#0E1116]" : "text-[#6B7A8D] hover:text-[#0E1116]"}`,
          "data-ocid": "subscriptions.toggle",
          children: s === "Tümü" ? "Tümü" : s.charAt(0).toUpperCase() + s.slice(1)
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: filterType,
          onChange: (e) => setFilterType(e.target.value),
          className: "border border-[#D7DEE9] rounded-full px-4 py-1.5 text-sm text-[#3A4654]",
          "data-ocid": "subscriptions.select",
          children: SERVICE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-white rounded-2xl border border-[#E5EAF2]",
        "data-ocid": "subscriptions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-[#D7DEE9] mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#3A4654]", children: "Sözleşme bulunamadı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Yeni sözleşme eklemek için yukarıdaki butonu kullanın" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((s, i) => {
      const days = daysUntilExpiry(s.endDate);
      const expiryBg = getExpiryColor(days, s.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md ${expiryBg || "border-[#E5EAF2]"}`,
          "data-ocid": `subscriptions.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-[#0E1116]", children: s.provider }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs border-0 ${s.status === "aktif" ? "bg-green-50 text-green-700" : s.status === "süresi dolmuş" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`,
                      children: s.status
                    }
                  ),
                  s.autoRenew && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-50 text-blue-600 border-0 text-xs gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    " Otomatik Yenileme"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: s.serviceType }),
                s.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: s.notes })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0 ml-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-[#0E1116]", children: [
                  "₺",
                  s.monthlyCost.toLocaleString("tr-TR"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-[#6B7A8D]", children: "/ay" })
                ] }),
                s.status === "aktif" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs mt-1 font-medium ${days < 0 ? "text-red-600" : days <= 30 ? "text-red-500" : days <= 60 ? "text-yellow-600" : "text-[#6B7A8D]"}`,
                    children: days < 0 ? `${Math.abs(days)} gün önce doldu` : days === 0 ? "Bugün bitiyor!" : `${days} gün kaldı`
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 pt-3 border-t border-[#F3F6FB]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                "Başlangıç:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#3A4654]", children: s.startDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#6B7A8D]", children: [
                "Bitiş:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#3A4654]", children: s.endDate })
              ] }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => openEdit(s),
                    className: "text-[#6B7A8D] hover:text-[#0B1B2E] transition-colors",
                    "data-ocid": `subscriptions.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => save(subs.filter((x) => x.id !== s.id)),
                    className: "text-[#6B7A8D] hover:text-red-500 transition-colors",
                    "data-ocid": `subscriptions.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ]
        },
        s.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "subscriptions.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editTarget ? "Sözleşmeyi Düzenle" : "Yeni Sözleşme" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Sağlayıcı / Firma Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.provider,
              onChange: (e) => setForm((p) => ({ ...p, provider: e.target.value })),
              placeholder: "Firma adı",
              "data-ocid": "subscriptions.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Hizmet Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: form.serviceType,
              onChange: (e) => setForm((p) => ({ ...p, serviceType: e.target.value })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "subscriptions.select",
              children: SERVICE_TYPES.filter((t) => t !== "Tümü").map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Başlangıç Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.startDate,
                onChange: (e) => setForm((p) => ({ ...p, startDate: e.target.value })),
                "data-ocid": "subscriptions.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Bitiş Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.endDate,
                onChange: (e) => setForm((p) => ({ ...p, endDate: e.target.value })),
                "data-ocid": "subscriptions.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Aylık Maliyet (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: form.monthlyCost,
              onChange: (e) => setForm((p) => ({ ...p, monthlyCost: +e.target.value })),
              "data-ocid": "subscriptions.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.status,
              onChange: (e) => setForm((p) => ({
                ...p,
                status: e.target.value
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              "data-ocid": "subscriptions.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "aktif", children: "Aktif" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "süresi dolmuş", children: "Süresi Dolmuş" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "iptal", children: "İptal" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: form.autoRenew,
              onCheckedChange: (v) => setForm((p) => ({ ...p, autoRenew: v })),
              "data-ocid": "subscriptions.switch"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654]", children: "Otomatik Yenileme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.notes,
              onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
              placeholder: "Ek açıklama",
              "data-ocid": "subscriptions.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              "data-ocid": "subscriptions.submit_button",
              children: "Kaydet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              "data-ocid": "subscriptions.cancel_button",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SubscriptionTracking as default
};
