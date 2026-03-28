import { r as reactExports, j as jsxRuntimeExports, a7 as Scale, B as Button, P as Plus, n as Calendar, a8 as ChevronUp, G as ChevronDown, E as Phone, F as FileText, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-BQ1lUxTj.js";
const INITIAL_CASES = [
  {
    id: "1",
    apartmentNo: "B-204",
    residentName: "Hüseyin Yıldız",
    debtAmount: 8400,
    debtMonths: 7,
    processType: "icra",
    lawyerName: "Av. Berna Soylu",
    lawyerPhone: "0555 123 4567",
    startDate: "2025-10-01",
    lastUpdateDate: "2026-02-15",
    nextActionDate: "2026-04-10",
    notes: "İcra müdürlüğüne dosya iletildi. Banka hesaplarına haciz kararı bekleniyor.",
    documents: ["ihtar_belgesi.pdf", "noter_ihtari.pdf"]
  },
  {
    id: "2",
    apartmentNo: "A-312",
    residentName: "Selin Arslan",
    debtAmount: 3600,
    debtMonths: 3,
    processType: "noter",
    lawyerName: "Av. Berna Soylu",
    lawyerPhone: "0555 123 4567",
    startDate: "2026-01-20",
    lastUpdateDate: "2026-03-01",
    nextActionDate: "2026-04-01",
    notes: "Noter ihtarnamesi gönderildi. Yanıt bekleniyor.",
    documents: ["noter_ihtari.pdf"]
  },
  {
    id: "3",
    apartmentNo: "C-105",
    residentName: "Mustafa Öztürk",
    debtAmount: 12e3,
    debtMonths: 10,
    processType: "dava",
    lawyerName: "Av. Kadir Alp",
    lawyerPhone: "0532 987 6543",
    startDate: "2025-06-15",
    lastUpdateDate: "2026-03-10",
    nextActionDate: "2026-05-20",
    notes: "Dava devam ediyor. İlk duruşma Mayıs 2026.",
    documents: ["dava_dilekce.pdf", "icra_takip.pdf", "noter_ihtari.pdf"]
  },
  {
    id: "4",
    apartmentNo: "A-208",
    residentName: "Gülşen Kara",
    debtAmount: 2400,
    debtMonths: 2,
    processType: "çözüldü",
    lawyerName: "",
    lawyerPhone: "",
    startDate: "2025-12-10",
    lastUpdateDate: "2026-02-28",
    nextActionDate: "",
    notes: "Tüm borç ödendi, dosya kapatıldı.",
    documents: ["odeme_makbuzu.pdf"]
  }
];
const PROCESS_STEPS = [
  { key: "ihtar", label: "İhtar", color: "bg-yellow-100 text-yellow-800" },
  { key: "noter", label: "Noter", color: "bg-orange-100 text-orange-800" },
  { key: "icra", label: "İcra", color: "bg-red-100 text-red-800" },
  { key: "dava", label: "Dava", color: "bg-purple-100 text-purple-800" },
  { key: "çözüldü", label: "Çözüldü", color: "bg-green-100 text-green-800" }
];
function LegalDebtTracking({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [cases, setCases] = reactExports.useState(INITIAL_CASES);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [filterStatus, setFilterStatus] = reactExports.useState("hepsi");
  const [form, setForm] = reactExports.useState({
    apartmentNo: "",
    residentName: "",
    debtAmount: "",
    debtMonths: "",
    processType: "ihtar",
    lawyerName: "",
    lawyerPhone: "",
    nextActionDate: "",
    notes: ""
  });
  const activeCases = cases.filter((c) => c.processType !== "çözüldü");
  const totalDebt = activeCases.reduce((sum, c) => sum + c.debtAmount, 0);
  const filteredCases = cases.filter(
    (c) => filterStatus === "hepsi" || c.processType === filterStatus
  );
  const handleSave = () => {
    if (!form.apartmentNo || !form.residentName || !form.debtAmount) return;
    const newCase = {
      id: Date.now().toString(),
      apartmentNo: form.apartmentNo,
      residentName: form.residentName,
      debtAmount: Number(form.debtAmount),
      debtMonths: Number(form.debtMonths),
      processType: form.processType,
      lawyerName: form.lawyerName,
      lawyerPhone: form.lawyerPhone,
      startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      lastUpdateDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      nextActionDate: form.nextActionDate,
      notes: form.notes,
      documents: []
    };
    setCases((prev) => [newCase, ...prev]);
    setShowModal(false);
  };
  const getStepColor = (type) => {
    var _a;
    return ((_a = PROCESS_STEPS.find((s) => s.key === type)) == null ? void 0 : _a.color) || "bg-gray-100 text-gray-700";
  };
  const advanceProcess = (id) => {
    const order = ["ihtar", "noter", "icra", "dava", "çözüldü"];
    setCases(
      (prev) => prev.map((c) => {
        if (c.id !== id) return c;
        const idx = order.indexOf(c.processType);
        return {
          ...c,
          processType: order[Math.min(idx + 1, order.length - 1)],
          lastUpdateDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        };
      })
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-7 h-7 text-purple-600" }),
          " Hukuki Süreç & Borç Takibi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Yasal yola başvurulan aidat borçları ve süreç takibi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowModal(true),
          className: "bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Yeni Dosya"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-900", children: cases.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Dosya" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: activeCases.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aktif Süreç" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-orange-600", children: [
          "₺",
          totalDebt.toLocaleString("tr-TR")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Alacak" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: cases.filter((c) => c.processType === "çözüldü").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Çözüme Kavuşan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border border-gray-100 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Süreç Aşamaları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: PROCESS_STEPS.map((step) => {
        const count = cases.filter(
          (c) => c.processType === step.key
        ).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 px-4 py-2 rounded-lg ${step.color} font-medium text-sm`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white bg-opacity-60 rounded-full px-2 py-0.5 font-bold text-xs", children: count })
            ]
          },
          step.key
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-100 flex gap-2 flex-wrap", children: ["hepsi", ...PROCESS_STEPS.map((s) => s.key)].map((f) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterStatus(f),
            className: `px-3 py-1.5 rounded-lg text-sm font-medium transition ${filterStatus === f ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: f === "hepsi" ? "Tümü" : (_a = PROCESS_STEPS.find((s) => s.key === f)) == null ? void 0 : _a.label
          },
          f
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-gray-50", children: [
        filteredCases.map((c) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start justify-between cursor-pointer",
                onClick: () => setExpandedId(expandedId === c.id ? null : c.id),
                onKeyDown: (e) => {
                  if (e.key === "Enter")
                    setExpandedId(expandedId === c.id ? null : c.id);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: c.residentName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
                        "(",
                        c.apartmentNo,
                        ")"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-0.5 rounded-full font-medium ${getStepColor(c.processType)}`,
                          children: (_a = PROCESS_STEPS.find((s) => s.key === c.processType)) == null ? void 0 : _a.label
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-red-600", children: [
                        "₺",
                        c.debtAmount.toLocaleString("tr-TR")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
                        c.debtMonths,
                        " ay borç"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
                        "Son güncelleme: ",
                        c.lastUpdateDate
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    c.nextActionDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-orange-600 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                      " ",
                      c.nextActionDate
                    ] }),
                    expandedId === c.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400" })
                  ] })
                ]
              }
            ),
            expandedId === c.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-gray-100 space-y-3", children: [
              c.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 bg-gray-50 rounded-lg p-3", children: c.notes }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: c.lawyerName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4 text-purple-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.lawyerName }),
                c.lawyerPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  " ",
                  c.lawyerPhone
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: c.documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                    " ",
                    doc
                  ]
                },
                doc
              )) }),
              isOwner && c.processType !== "çözüldü" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => advanceProcess(c.id),
                  className: "text-purple-600 border-purple-200 hover:bg-purple-50",
                  children: "Süreci İlerlet →"
                }
              ) })
            ] })
          ] }, c.id);
        }),
        filteredCases.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-gray-400", children: "Kayıt bulunamadı" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showModal, onOpenChange: setShowModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Hukuki Dosya Aç" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-apt-no",
                className: "text-xs font-medium text-gray-600",
                children: "Daire No"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-apt-no",
                value: form.apartmentNo,
                onChange: (e) => setForm((f) => ({ ...f, apartmentNo: e.target.value })),
                placeholder: "B-204",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-resident-name",
                className: "text-xs font-medium text-gray-600",
                children: "Sakin Adı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-resident-name",
                value: form.residentName,
                onChange: (e) => setForm((f) => ({ ...f, residentName: e.target.value })),
                placeholder: "Ad Soyad",
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-debt-amount",
                className: "text-xs font-medium text-gray-600",
                children: "Borç Tutarı (₺)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-debt-amount",
                type: "number",
                value: form.debtAmount,
                onChange: (e) => setForm((f) => ({ ...f, debtAmount: e.target.value })),
                placeholder: "5000",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-debt-months",
                className: "text-xs font-medium text-gray-600",
                children: "Borç Ay Sayısı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-debt-months",
                type: "number",
                value: form.debtMonths,
                onChange: (e) => setForm((f) => ({ ...f, debtMonths: e.target.value })),
                placeholder: "5",
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ld-process-type",
              className: "text-xs font-medium text-gray-600",
              children: "Süreç Aşaması"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "ld-process-type",
              value: form.processType,
              onChange: (e) => setForm((f) => ({ ...f, processType: e.target.value })),
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1",
              children: PROCESS_STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.key, children: s.label }, s.key))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-lawyer-name",
                className: "text-xs font-medium text-gray-600",
                children: "Avukat Adı"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-lawyer-name",
                value: form.lawyerName,
                onChange: (e) => setForm((f) => ({ ...f, lawyerName: e.target.value })),
                placeholder: "Av. Ad Soyad",
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ld-lawyer-phone",
                className: "text-xs font-medium text-gray-600",
                children: "Avukat Telefonu"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ld-lawyer-phone",
                value: form.lawyerPhone,
                onChange: (e) => setForm((f) => ({ ...f, lawyerPhone: e.target.value })),
                placeholder: "0555 000 0000",
                className: "mt-1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ld-next-action",
              className: "text-xs font-medium text-gray-600",
              children: "Sonraki İşlem Tarihi"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ld-next-action",
              type: "date",
              value: form.nextActionDate,
              onChange: (e) => setForm((f) => ({ ...f, nextActionDate: e.target.value })),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ld-notes",
              className: "text-xs font-medium text-gray-600",
              children: "Notlar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "ld-notes",
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Süreç notları...",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 h-20 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              className: "flex-1 bg-purple-600 hover:bg-purple-700 text-white",
              children: "Dosya Aç"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowModal(false),
              className: "flex-1",
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LegalDebtTracking as default
};
