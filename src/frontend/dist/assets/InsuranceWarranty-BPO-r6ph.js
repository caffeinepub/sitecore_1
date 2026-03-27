import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, X, T as TriangleAlert, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-DWivtUfb.js";
import { C as Clock } from "./clock-DpDpF638.js";
import { C as CircleCheckBig } from "./circle-check-big-3Bpw-0Mf.js";
const TYPES = ["Sigorta", "Garanti", "Sözleşme", "Lisans"];
const TYPE_COLORS = {
  Sigorta: "bg-blue-100 text-blue-700",
  Garanti: "bg-green-100 text-green-700",
  Sözleşme: "bg-purple-100 text-purple-700",
  Lisans: "bg-orange-100 text-orange-700"
};
const DEFAULT_RECORDS = [
  {
    id: "1",
    name: "Bina Zorunlu Deprem Sigortası (DASK)",
    type: "Sigorta",
    policyNo: "DASK-2026-0001",
    provider: "Güven Sigorta",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    amount: "15000",
    notes: "Yıllık yenileme gerekiyor"
  },
  {
    id: "2",
    name: "Asansör Yıllık Muayene",
    type: "Sözleşme",
    policyNo: "ASANSOR-2026",
    provider: "Kaya Teknik",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    amount: "3500",
    notes: "Altı ayda bir yenileniyor"
  },
  {
    id: "3",
    name: "Yangın Tüpü Garantisi",
    type: "Garanti",
    policyNo: "YT-2024-055",
    provider: "Yangın Sistemleri AŞ",
    startDate: "2024-03-15",
    endDate: "2026-03-15",
    amount: "",
    notes: "10 adet yangın tübü"
  },
  {
    id: "4",
    name: "Kazan Servis Sözleşmesi",
    type: "Sözleşme",
    policyNo: "KAZ-2025-012",
    provider: "Isı Teknik",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
    amount: "4200",
    notes: "Yıllık bakım dahil"
  }
];
const KEY = (id) => `sitecore_insurance_${id}`;
function InsuranceWarranty({ buildingId, isOwner, t }) {
  const [records, setRecords] = reactExports.useState(() => {
    const raw = localStorage.getItem(KEY(buildingId));
    return raw ? JSON.parse(raw) : DEFAULT_RECORDS;
  });
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [form, setForm] = reactExports.useState({
    name: "",
    type: "Sigorta",
    policyNo: "",
    provider: "",
    startDate: "",
    endDate: "",
    amount: "",
    notes: "",
    attachment: ""
  });
  const save = (u) => {
    setRecords(u);
    localStorage.setItem(KEY(buildingId), JSON.stringify(u));
  };
  const handleAdd = () => {
    if (!form.name.trim()) return;
    save([{ id: crypto.randomUUID(), ...form }, ...records]);
    setShowDialog(false);
    setForm({
      name: "",
      type: "Sigorta",
      policyNo: "",
      provider: "",
      startDate: "",
      endDate: "",
      amount: "",
      notes: "",
      attachment: ""
    });
  };
  const handleDelete = (id) => save(records.filter((r) => r.id !== id));
  const getDaysLeft = (endDate) => {
    if (!endDate) return null;
    const diff = new Date(endDate).getTime() - Date.now();
    return Math.ceil(diff / 864e5);
  };
  const expiryStatus = (endDate) => {
    const days = getDaysLeft(endDate);
    if (days === null) return null;
    if (days < 0)
      return {
        color: "bg-red-50 border-red-200",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs", children: [
          "Çıktı (",
          Math.abs(days),
          "g önce)"
        ] })
      };
    if (days <= 7)
      return {
        color: "bg-red-50 border-red-200",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border-0 text-xs", children: [
          days,
          " gün kaldı"
        ] })
      };
    if (days <= 30)
      return {
        color: "bg-orange-50 border-orange-200",
        badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-orange-100 text-orange-700 border-0 text-xs", children: [
          days,
          " gün kaldı"
        ] })
      };
    return {
      color: "",
      badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 border-0 text-xs", children: [
        days,
        " gün kaldı"
      ] })
    };
  };
  const filtered = filterType === "Tümü" ? records : records.filter((r) => r.type === filterType);
  const expiringSoon = records.filter((r) => {
    const d = getDaysLeft(r.endDate);
    return d !== null && d <= 30 && d >= 0;
  });
  const expired = records.filter((r) => {
    const d = getDaysLeft(r.endDate);
    return d !== null && d < 0;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: t.insurance || "Sigorta & Garanti Takibi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowDialog(true),
          className: "bg-[#0B1B2E] hover:bg-[#112843] text-white rounded-full",
          "data-ocid": "insurance.primary_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Ekle"
          ]
        }
      )
    ] }),
    (expiringSoon.length > 0 || expired.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      expired.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-red-700 flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
          " Süresi Dolmuş (",
          expired.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600", children: expired.map((r) => r.name).join(", ") })
      ] }),
      expiringSoon.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-orange-700 flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
          " 30 Gün İçinde Dolacak (",
          expiringSoon.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-orange-600", children: expiringSoon.map((r) => r.name).join(", ") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: records.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#3A4654] mt-1", children: "Toplam Kayıt" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-orange-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-orange-600", children: expiringSoon.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
          "Yaklaşan"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-green-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-600", children: records.length - expiringSoon.length - expired.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-1 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
          "Geçerli"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["Tümü", ...TYPES].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: filterType === type ? "default" : "outline",
        onClick: () => setFilterType(type),
        className: filterType === type ? "bg-[#0B1B2E] text-white rounded-full" : "rounded-full",
        children: type
      },
      type
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "insurance.empty_state",
        className: "bg-white rounded-2xl p-10 text-center border border-[#E5EAF2] text-[#6B7A8D]",
        children: "Kayıt bulunamadı."
      }
    ) : filtered.map((r, idx) => {
      const status = expiryStatus(r.endDate);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": `insurance.item.${idx + 1}`,
          className: `bg-white rounded-2xl p-4 shadow-sm border ${(status == null ? void 0 : status.color) || "border-[#E5EAF2]"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `${TYPE_COLORS[r.type] || "bg-gray-100 text-gray-600"} border-0 text-xs`,
                    children: r.type
                  }
                ),
                status == null ? void 0 : status.badge
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654]", children: [
                r.provider,
                r.policyNo ? ` — ${r.policyNo}` : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D] mt-0.5", children: [
                r.startDate,
                " — ",
                r.endDate
              ] }),
              r.amount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#3A4654] mt-0.5", children: [
                Number(r.amount).toLocaleString(),
                " ₺"
              ] }),
              r.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-0.5 italic", children: r.notes }),
              r.attachment && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#4A90D9] mt-0.5", children: [
                "📎 ",
                r.attachment
              ] })
            ] }),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => handleDelete(r.id),
                variant: "ghost",
                size: "sm",
                className: "text-red-400 hover:text-red-600 h-7 w-7 p-0 ml-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        },
        r.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDialog, onOpenChange: setShowDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "insurance.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Kayıt Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ad / Açıklama *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              placeholder: "Bina Sigortası...",
              "data-ocid": "insurance.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tür" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.type,
                onChange: (e) => setForm((p) => ({ ...p, type: e.target.value })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                "data-ocid": "insurance.select",
                children: TYPES.map((tp) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tp, children: tp }, tp))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Poliçe / Seri No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.policyNo,
                onChange: (e) => setForm((p) => ({ ...p, policyNo: e.target.value })),
                placeholder: "ABC-001"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Sağlayıcı / Firma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.provider,
              onChange: (e) => setForm((p) => ({ ...p, provider: e.target.value })),
              placeholder: "Sigorta Firması"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Başlangıç" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.startDate,
                onChange: (e) => setForm((p) => ({ ...p, startDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Bitiş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.endDate,
                onChange: (e) => setForm((p) => ({ ...p, endDate: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tutar (₺)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: form.amount,
              onChange: (e) => setForm((p) => ({ ...p, amount: e.target.value })),
              placeholder: "0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ekli Belge / Dosya Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.attachment,
              onChange: (e) => setForm((p) => ({ ...p, attachment: e.target.value })),
              placeholder: "sigorta-police.pdf"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.notes,
              onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
              placeholder: "Not..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAdd,
              disabled: !form.name.trim(),
              className: "flex-1 bg-[#0B1B2E] text-white rounded-full",
              "data-ocid": "insurance.submit_button",
              children: "Kaydet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDialog(false),
              className: "flex-1 rounded-full",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  InsuranceWarranty as default
};
