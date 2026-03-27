import { r as reactExports, j as jsxRuntimeExports, aA as QrCode, B as Button, P as Plus, e as Badge, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-xOs1ph1v.js";
import { C as CircleCheckBig } from "./circle-check-big-7Z2Ce4Ly.js";
import { C as CircleX } from "./circle-x-rHHc3zz_.js";
const KEY = (id) => `sitecore_visitor_preauth_${id}`;
const STATUS_COLORS = {
  waiting: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-blue-100 text-blue-700 border-blue-200",
  arrived: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200"
};
const STATUS_LABELS = {
  waiting: "Bekliyor",
  approved: "Onaylandı",
  arrived: "Geldi",
  cancelled: "İptal"
};
function generateCode() {
  return String(Math.floor(1e5 + Math.random() * 9e5));
}
function VisitorPreAuth({
  buildingId,
  userId: _userId,
  isOwner,
  t: _t
}) {
  const [entries, setEntries] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem(KEY(buildingId));
      if (raw) return JSON.parse(raw);
    } catch {
    }
    const today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return [
      {
        id: "vp1",
        visitorName: "Elif Şahin",
        expectedDate: today2,
        timeFrom: "14:00",
        timeTo: "17:00",
        purpose: "Aile ziyareti",
        hostApartment: "A-5",
        accessCode: "482930",
        status: "arrived",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "vp2",
        visitorName: "Teknisyen Servis",
        expectedDate: today2,
        timeFrom: "10:00",
        timeTo: "12:00",
        purpose: "Klima bakımı",
        hostApartment: "B-8",
        accessCode: "751204",
        status: "waiting",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "vp3",
        visitorName: "Paket Kurye",
        expectedDate: today2,
        timeFrom: "09:00",
        timeTo: "10:00",
        purpose: "Paket teslimi",
        hostApartment: "C-2",
        accessCode: "318475",
        status: "cancelled",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
  });
  const [showForm, setShowForm] = reactExports.useState(false);
  const [selectedEntry, setSelectedEntry] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    visitorName: "",
    expectedDate: "",
    timeFrom: "",
    timeTo: "",
    purpose: "",
    hostApartment: ""
  });
  const save = (list) => {
    setEntries(list);
    localStorage.setItem(KEY(buildingId), JSON.stringify(list));
  };
  const handleSubmit = () => {
    if (!form.visitorName || !form.expectedDate || !form.hostApartment) return;
    const entry = {
      id: Date.now().toString(),
      ...form,
      accessCode: generateCode(),
      status: "waiting",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    save([entry, ...entries]);
    setShowForm(false);
    setForm({
      visitorName: "",
      expectedDate: "",
      timeFrom: "",
      timeTo: "",
      purpose: "",
      hostApartment: ""
    });
  };
  const handleArrived = (id) => save(entries.map((e) => e.id === id ? { ...e, status: "arrived" } : e));
  const handleCancel = (id) => save(entries.map((e) => e.id === id ? { ...e, status: "cancelled" } : e));
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayExpected = entries.filter(
    (e) => e.expectedDate === today && e.status !== "cancelled"
  ).length;
  const todayArrived = entries.filter(
    (e) => e.expectedDate === today && e.status === "arrived"
  ).length;
  const todayCancelled = entries.filter(
    (e) => e.expectedDate === today && e.status === "cancelled"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-6 h-6 text-[#0B1B2E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Ziyaretçi Ön İzni & QR Erişim" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowForm(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " İzin Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      {
        label: "Bugün Beklenen",
        val: todayExpected,
        color: "text-[#0B1B2E]"
      },
      { label: "Geldi", val: todayArrived, color: "text-green-600" },
      { label: "İptal", val: todayCancelled, color: "text-red-500" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-3xl font-bold ${s.color}`, children: s.val }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      entries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#0E1116]", children: entry.visitorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#EEF3FA] text-[#4A90D9] border-0 text-xs", children: entry.hostApartment }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `border text-xs ${STATUS_COLORS[entry.status]}`,
                      children: STATUS_LABELS[entry.status]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-[#3A4654]", children: entry.purpose }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6B7A8D] mt-1", children: [
                  "📅 ",
                  entry.expectedDate,
                  " · ⏰ ",
                  entry.timeFrom,
                  " – ",
                  entry.timeTo
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedEntry(entry),
                  className: "bg-[#0B1B2E] rounded-xl px-4 py-3 text-center flex-shrink-0 hover:bg-[#112843] transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mb-1", children: "Erişim Kodu" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-mono text-xl font-bold tracking-widest", children: entry.accessCode })
                  ]
                }
              )
            ] }),
            isOwner && (entry.status === "waiting" || entry.status === "approved") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-green-500 hover:bg-green-600 text-white rounded-full text-xs gap-1",
                  onClick: () => handleArrived(entry.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                    " Geldi İşaretle"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "text-red-500 border-red-200 hover:bg-red-50 rounded-full text-xs gap-1",
                  onClick: () => handleCancel(entry.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                    " İptal Et"
                  ]
                }
              )
            ] })
          ]
        },
        entry.id
      )),
      entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#3A4654] text-center py-10", children: "Henüz ön izin kaydı bulunmuyor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedEntry,
        onOpenChange: () => setSelectedEntry(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xs text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Ziyaretçi Erişim Kodu" }) }),
          selectedEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-[#0E1116]", children: selectedEntry.visitorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D]", children: [
                selectedEntry.hostApartment,
                " · ",
                selectedEntry.expectedDate
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B1B2E] rounded-2xl p-6 mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mb-2", children: "ERİŞİM KODU" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-mono text-4xl font-bold tracking-[0.3em]", children: selectedEntry.accessCode })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: "Bu kodu güvenlik görevlisine gösterin." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `border mx-auto ${STATUS_COLORS[selectedEntry.status]}`,
                children: STATUS_LABELS[selectedEntry.status]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Ziyaretçi Ön İzni Oluştur" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ziyaretçi Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.visitorName,
              onChange: (e) => setForm((f) => ({ ...f, visitorName: e.target.value })),
              placeholder: "Ad Soyad"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Beklenen Tarih" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.expectedDate,
                onChange: (e) => setForm((f) => ({ ...f, expectedDate: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ev Sahibi Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.hostApartment,
                onChange: (e) => setForm((f) => ({ ...f, hostApartment: e.target.value })),
                placeholder: "A-5"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Saatten" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: form.timeFrom,
                onChange: (e) => setForm((f) => ({ ...f, timeFrom: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Saate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: form.timeTo,
                onChange: (e) => setForm((f) => ({ ...f, timeTo: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ziyaret Amacı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.purpose,
              onChange: (e) => setForm((f) => ({ ...f, purpose: e.target.value })),
              placeholder: "Aile ziyareti, teslimat, vb."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: !form.visitorName || !form.expectedDate || !form.hostApartment,
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "İzin Oluştur & Kod Üret"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  VisitorPreAuth as default
};
