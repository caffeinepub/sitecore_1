import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, W as Wrench, e as Badge, X, T as TriangleAlert, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-FsRbGoem.js";
import { C as Clock } from "./clock-Byb_hc9l.js";
import { C as CircleCheckBig } from "./circle-check-big-C7F36PPW.js";
const DEFAULT_EQUIPMENT = [
  {
    id: "1",
    name: "Asansör A Bloğu",
    type: "Asansör",
    lastMaintenanceDate: "2026-01-15",
    nextMaintenanceDate: "2026-04-15",
    periodMonths: 3,
    history: [
      {
        id: "h1",
        date: "2026-01-15",
        description: "Periyodik bakım yapıldı",
        technician: "Kaya Teknik"
      }
    ],
    photoUrl: ""
  },
  {
    id: "2",
    name: "Jeneratör",
    type: "Elektrik",
    lastMaintenanceDate: "2025-11-01",
    nextMaintenanceDate: "2026-05-01",
    periodMonths: 6,
    history: []
  },
  {
    id: "3",
    name: "Hidrofor Sistemi",
    type: "Su Tesisatı",
    lastMaintenanceDate: "2026-02-10",
    nextMaintenanceDate: "2026-08-10",
    periodMonths: 6,
    history: []
  },
  {
    id: "4",
    name: "Yangın Tüpleri",
    type: "Yangın Güvenliği",
    lastMaintenanceDate: "2025-12-01",
    nextMaintenanceDate: "2026-03-01",
    periodMonths: 3,
    history: []
  }
];
function MaintenanceSchedule({
  buildingId,
  isOwner
}) {
  const storageKey = `sitecore_maint_schedule_${buildingId}`;
  const load = () => {
    try {
      const d = localStorage.getItem(storageKey);
      return d ? JSON.parse(d) : DEFAULT_EQUIPMENT;
    } catch {
      return DEFAULT_EQUIPMENT;
    }
  };
  const [items, setItems] = reactExports.useState(load);
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showHistory, setShowHistory] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    type: "",
    lastMaintenanceDate: "",
    periodMonths: 3,
    photoUrl: ""
  });
  const [histForm, setHistForm] = reactExports.useState({
    date: "",
    description: "",
    technician: ""
  });
  const save = (data) => {
    setItems(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };
  const getStatus = (eq) => {
    const today = /* @__PURE__ */ new Date();
    const next = new Date(eq.nextMaintenanceDate);
    const diff = (next.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24);
    if (diff < 0) return "overdue";
    if (diff <= 30) return "soon";
    return "ok";
  };
  const statusBadge = (status) => {
    if (status === "overdue")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-red-200", children: "Gecikmiş" });
    if (status === "soon")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-700 border-yellow-200", children: "Yaklaşıyor" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-700 border-green-200", children: "Güncel" });
  };
  const handleAdd = () => {
    if (!form.name.trim()) return;
    const last = form.lastMaintenanceDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const nextDate = new Date(last);
    nextDate.setMonth(nextDate.getMonth() + form.periodMonths);
    const eq = {
      id: Date.now().toString(),
      name: form.name.trim(),
      type: form.type.trim() || "Diğer",
      lastMaintenanceDate: last,
      nextMaintenanceDate: nextDate.toISOString().slice(0, 10),
      periodMonths: form.periodMonths,
      history: [],
      photoUrl: form.photoUrl.trim() || void 0
    };
    save([...items, eq]);
    setShowAdd(false);
    setForm({
      name: "",
      type: "",
      lastMaintenanceDate: "",
      periodMonths: 3,
      photoUrl: ""
    });
  };
  const handleComplete = (id) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const updated = items.map((eq) => {
      if (eq.id !== id) return eq;
      const next = new Date(today);
      next.setMonth(next.getMonth() + eq.periodMonths);
      const histEntry = {
        id: Date.now().toString(),
        date: today,
        description: "Periyodik bakım tamamlandı",
        technician: ""
      };
      return {
        ...eq,
        lastMaintenanceDate: today,
        nextMaintenanceDate: next.toISOString().slice(0, 10),
        history: [histEntry, ...eq.history]
      };
    });
    save(updated);
  };
  const handleAddHistory = (id) => {
    if (!histForm.date || !histForm.description) return;
    const updated = items.map(
      (eq) => eq.id !== id ? eq : {
        ...eq,
        history: [
          { id: Date.now().toString(), ...histForm },
          ...eq.history
        ]
      }
    );
    save(updated);
    setHistForm({ date: "", description: "", technician: "" });
  };
  const handleDelete = (id) => save(items.filter((eq) => eq.id !== id));
  const overdue = items.filter((eq) => getStatus(eq) === "overdue").length;
  const soon = items.filter((eq) => getStatus(eq) === "soon").length;
  const selected = items.find((eq) => eq.id === showHistory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Bakım Takvimi & Ekipman Takibi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Ekipman Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#0B1B2E]", children: items.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Toplam Ekipman" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-red-600", children: overdue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Gecikmiş Bakım" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-600", children: soon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Yaklaşan Bakım" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      items.map((eq) => {
        const status = getStatus(eq);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `bg-white rounded-2xl p-5 shadow-sm border ${status === "overdue" ? "border-red-200" : status === "soon" ? "border-yellow-200" : "border-[#E5EAF2]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  eq.photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: eq.photoUrl,
                      alt: eq.name,
                      className: "w-24 h-24 object-cover rounded-xl border border-[#E5EAF2]",
                      onError: (e) => {
                        e.target.style.display = "none";
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4 text-[#4A90D9]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: eq.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#F1F4F8] text-[#3A4654] text-xs", children: eq.type }),
                    statusBadge(status)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mt-2 text-sm text-[#3A4654]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Son Bakım:" }),
                      " ",
                      eq.lastMaintenanceDate
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Sonraki Bakım:" }),
                      " ",
                      eq.nextMaintenanceDate
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Periyot:" }),
                      " ",
                      eq.periodMonths,
                      " ay"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Geçmiş:" }),
                      " ",
                      eq.history.length,
                      " kayıt"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-4 flex-wrap justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => setShowHistory(eq.id),
                      variant: "outline",
                      size: "sm",
                      className: "rounded-full text-xs gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        "Geçmiş"
                      ]
                    }
                  ),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => handleComplete(eq.id),
                      size: "sm",
                      className: "bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                        "Tamamlandı"
                      ]
                    }
                  ),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => handleDelete(eq.id),
                      variant: "ghost",
                      size: "sm",
                      className: "text-red-400 hover:text-red-600 rounded-full",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              status === "overdue" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bakım tarihi geçti! Lütfen en kısa sürede bakım yaptırın." })
              ] })
            ]
          },
          eq.id
        );
      }),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-10", children: "Ekipman kaydı bulunmuyor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Ekipman Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ekipman Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "ör. Asansör B Bloğu"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Tür" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.type,
              onChange: (e) => setForm((f) => ({ ...f, type: e.target.value })),
              placeholder: "ör. Asansör, Elektrik, Su Tesisatı"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Son Bakım Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: form.lastMaintenanceDate,
              onChange: (e) => setForm((f) => ({
                ...f,
                lastMaintenanceDate: e.target.value
              }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Bakım Periyodu (ay)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.periodMonths,
              onChange: (e) => setForm((f) => ({
                ...f,
                periodMonths: Number(e.target.value)
              })),
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "1 ay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 3, children: "3 ay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 6, children: "6 ay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 12, children: "12 ay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 24, children: "24 ay" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Fotoğraf URL (opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.photoUrl,
              onChange: (e) => setForm((f) => ({ ...f, photoUrl: e.target.value })),
              placeholder: "https://..."
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!showHistory, onOpenChange: () => setShowHistory(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        selected == null ? void 0 : selected.name,
        " – Bakım Geçmişi"
      ] }) }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4 p-3 bg-[#F3F6FB] rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Yeni Kayıt Ekle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: histForm.date,
            onChange: (e) => setHistForm((f) => ({ ...f, date: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: histForm.description,
            onChange: (e) => setHistForm((f) => ({ ...f, description: e.target.value })),
            placeholder: "Açıklama"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: histForm.technician,
            onChange: (e) => setHistForm((f) => ({ ...f, technician: e.target.value })),
            placeholder: "Teknisyen / Firma (opsiyonel)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => showHistory && handleAddHistory(showHistory),
            disabled: !histForm.date || !histForm.description,
            className: "w-full bg-[#4A90D9] text-white rounded-full text-sm",
            children: "Kaydet"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: [
        ((selected == null ? void 0 : selected.history) || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-4", children: "Kayıt bulunmuyor." }),
        ((selected == null ? void 0 : selected.history) || []).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-xl p-3 border border-[#E5EAF2]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0E1116]", children: h.date }),
                h.technician && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#3A4654]", children: h.technician })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: h.description })
            ]
          },
          h.id
        ))
      ] })
    ] }) })
  ] });
}
export {
  MaintenanceSchedule as default
};
