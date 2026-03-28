import { r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, A as Heart, t as User, e as Badge, E as Phone, X, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-B-5F0xzF.js";
import { C as CircleCheckBig } from "./circle-check-big-CdQV3eGb.js";
import { C as CircleAlert } from "./circle-alert-CspZijb-.js";
const ACCESSIBILITY_OPTIONS = [
  "Tekerlekli sandalye erişimi",
  "Asansör önceliği",
  "Rampa ihtiyacı",
  "İşitme cihazı",
  "Görme engeli",
  "Yürüme yardımcısı",
  "Özel otopark",
  "Acil müdahale önceliği"
];
const DEFAULT_RESIDENTS = [
  {
    id: "1",
    name: "Fatma Kaya",
    apartment: "Daire 12",
    needType: "Yaşlı",
    priority: "Yüksek",
    phone: "0532 111 22 33",
    emergencyContact: "Ali Kaya (Oğlu)",
    emergencyPhone: "0533 444 55 66",
    accessibilityNeeds: ["Asansör önceliği", "Acil müdahale önceliği"],
    services: [
      {
        id: "s1",
        type: "Evde Sağlık",
        provider: "Aile Sağlığı Merkezi",
        frequency: "Haftada 2 kez",
        notes: "Salı ve Perşembe"
      }
    ],
    notes: "Yalnız yaşıyor, komşu ziyareti öneriliyor.",
    registeredDate: "2025-09-15"
  },
  {
    id: "2",
    name: "Mehmet Demir",
    apartment: "Daire 5",
    needType: "Engelli",
    priority: "Acil",
    phone: "0545 222 33 44",
    emergencyContact: "Ayşe Demir (Eşi)",
    emergencyPhone: "0546 777 88 99",
    accessibilityNeeds: [
      "Tekerlekli sandalye erişimi",
      "Rampa ihtiyacı",
      "Özel otopark"
    ],
    services: [
      {
        id: "s2",
        type: "Fizyoterapi",
        provider: "Özel Klinik",
        frequency: "Haftada 3 kez",
        notes: "Servis ile geliyor"
      }
    ],
    notes: "Giriş rampası hâlâ eksik, teknik ekibe bildirildi.",
    registeredDate: "2025-11-01"
  },
  {
    id: "3",
    name: "Hüseyin Arslan",
    apartment: "Daire 21",
    needType: "Kronik Hasta",
    priority: "Normal",
    phone: "0551 333 44 55",
    emergencyContact: "Zeynep Arslan (Kızı)",
    emergencyPhone: "0552 666 77 88",
    accessibilityNeeds: ["Asansör önceliği"],
    services: [],
    notes: "Kalp hastası, merdiven tırmanma önerilmiyor.",
    registeredDate: "2026-01-20"
  }
];
const NEED_COLORS = {
  Engelli: "bg-blue-100 text-blue-700",
  Yaşlı: "bg-purple-100 text-purple-700",
  "Kronik Hasta": "bg-orange-100 text-orange-700",
  Diğer: "bg-gray-100 text-gray-700"
};
const PRIORITY_COLORS = {
  Acil: "bg-red-100 text-red-700",
  Yüksek: "bg-yellow-100 text-yellow-700",
  Normal: "bg-green-100 text-green-700"
};
const PRIORITY_ICON = {
  Acil: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
  Yüksek: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
  Normal: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" })
};
function DisabledElderlySupport({
  buildingId,
  isOwner
}) {
  const key = `sitecore_disabled_support_${buildingId}`;
  const load = () => {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : DEFAULT_RESIDENTS;
    } catch {
      return DEFAULT_RESIDENTS;
    }
  };
  const [items, setItems] = reactExports.useState(load);
  const [filterType, setFilterType] = reactExports.useState("Tümü");
  const [filterPriority, setFilterPriority] = reactExports.useState("Tümü");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [showDetail, setShowDetail] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    apartment: "",
    needType: "Yaşlı",
    priority: "Normal",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    accessibilityNeeds: [],
    notes: ""
  });
  const save = (data) => {
    setItems(data);
    localStorage.setItem(key, JSON.stringify(data));
  };
  const filtered = items.filter((r) => {
    if (filterType !== "Tümü" && r.needType !== filterType) return false;
    if (filterPriority !== "Tümü" && r.priority !== filterPriority)
      return false;
    return true;
  });
  const detail = items.find((r) => r.id === showDetail);
  const handleAdd = () => {
    if (!form.name.trim() || !form.apartment.trim()) return;
    save([
      ...items,
      {
        id: Date.now().toString(),
        ...form,
        services: [],
        registeredDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
      }
    ]);
    setShowAdd(false);
    setForm({
      name: "",
      apartment: "",
      needType: "Yaşlı",
      priority: "Normal",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      accessibilityNeeds: [],
      notes: ""
    });
  };
  const toggleAccessibility = (opt) => {
    setForm((f) => ({
      ...f,
      accessibilityNeeds: f.accessibilityNeeds.includes(opt) ? f.accessibilityNeeds.filter((x) => x !== opt) : [...f.accessibilityNeeds, opt]
    }));
  };
  const handleDelete = (id) => save(items.filter((r) => r.id !== id));
  const acilCount = items.filter((r) => r.priority === "Acil").length;
  const yuksekCount = items.filter((r) => r.priority === "Yüksek").length;
  const serviceCount = items.reduce((acc, r) => acc + r.services.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Engelli & Yaşlı Destek Rehberi" }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#4A90D9] hover:bg-[#3B82C4] text-white rounded-full gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Sakin Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4A90D9]", children: items.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Kayıtlı Sakin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-red-500", children: acilCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Acil Öncelik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-yellow-500", children: yuksekCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Yüksek Öncelik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-[#E5EAF2] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-600", children: serviceCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Aktif Hizmet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-6 border border-blue-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#0E1116] mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-red-400" }),
        "Bina Erişilebilirlik Durumu"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
        { label: "Rampa", status: "Eksik", color: "text-red-600" },
        {
          label: "Geniş Asansör",
          status: "Mevcut",
          color: "text-green-600"
        },
        { label: "Engelli WC", status: "Mevcut", color: "text-green-600" },
        {
          label: "Sesli Yönlendirme",
          status: "Yok",
          color: "text-gray-400"
        },
        {
          label: "Engelli Otopark",
          status: "2 Alan",
          color: "text-green-600"
        },
        { label: "Dokunsal Zemin", status: "Yok", color: "text-gray-400" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-white rounded-xl p-3 flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#3A4654]", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-semibold ${item.color}`, children: item.status })
          ]
        },
        item.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      ["Tümü", "Engelli", "Yaşlı", "Kronik Hasta", "Diğer"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterType(t),
          className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${filterType === t ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`,
          children: t
        },
        t
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#D7DEE9] mx-1", children: "|" }),
      ["Tümü", "Acil", "Yüksek", "Normal"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilterPriority(p),
          className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${filterPriority === p ? "bg-[#0B1B2E] text-white" : "bg-white text-[#3A4654] border border-[#D7DEE9] hover:bg-[#F1F4F8]"}`,
          children: p
        },
        p
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-white rounded-2xl p-5 shadow-sm border border-[#E5EAF2]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-[#4A90D9]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#6B7A8D]", children: r.apartment }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border-0 ${NEED_COLORS[r.needType]}`,
                    children: r.needType
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: `text-xs border-0 flex items-center gap-1 ${PRIORITY_COLORS[r.priority]}`,
                    children: [
                      PRIORITY_ICON[r.priority],
                      r.priority
                    ]
                  }
                )
              ] }),
              r.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-[#3A4654] mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                " ",
                r.phone
              ] }),
              r.emergencyContact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#6B7A8D]", children: [
                "Acil: ",
                r.emergencyContact,
                " — ",
                r.emergencyPhone
              ] }),
              r.accessibilityNeeds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: r.accessibilityNeeds.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-[#EEF3FA] text-[#4A90D9] px-2 py-0.5 rounded-full",
                  children: a
                },
                a
              )) }),
              r.services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#3A4654] mt-1", children: [
                r.services.length,
                " aktif hizmet"
              ] }),
              r.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1 italic", children: r.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => setShowDetail(r.id),
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-xs",
                  children: "Detay"
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleDelete(r.id),
                  variant: "ghost",
                  size: "sm",
                  className: "text-red-400 hover:text-red-600 rounded-full",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        },
        r.id
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#3A4654] py-10", children: "Kayıt bulunamadı." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Sakin Kaydı Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Ad Soyad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                placeholder: "Ad Soyad"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.apartment,
                onChange: (e) => setForm((f) => ({ ...f, apartment: e.target.value })),
                placeholder: "Daire 12"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "İhtiyaç Türü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.needType,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  needType: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yaşlı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Engelli" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kronik Hasta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Diğer" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Öncelik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: form.priority,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  priority: e.target.value
                })),
                className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Normal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yüksek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Acil" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Telefon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                placeholder: "0500 000 00 00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Acil İletişim Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.emergencyContact,
                onChange: (e) => setForm((f) => ({ ...f, emergencyContact: e.target.value })),
                placeholder: "İsim (yakınlık)"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Acil Telefon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.emergencyPhone,
              onChange: (e) => setForm((f) => ({ ...f, emergencyPhone: e.target.value })),
              placeholder: "0500 000 00 00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Erişilebilirlik İhtiyaçları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ACCESSIBILITY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: form.accessibilityNeeds.includes(opt),
                    onChange: () => toggleAccessibility(opt),
                    className: "rounded"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: opt })
              ]
            },
            opt
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Ek bilgi..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAdd,
            disabled: !form.name.trim() || !form.apartment.trim(),
            className: "w-full bg-[#4A90D9] text-white rounded-full",
            children: "Kaydet"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!showDetail, onOpenChange: () => setShowDetail(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        detail == null ? void 0 : detail.name,
        " — Detay"
      ] }) }),
      detail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Daire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.apartment })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Kayıt Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.registeredDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Telefon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.phone || "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D]", children: "Acil İletişim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: detail.emergencyContact || "-" })
          ] })
        ] }),
        detail.accessibilityNeeds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Erişilebilirlik İhtiyaçları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: detail.accessibilityNeeds.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs bg-[#EEF3FA] text-[#4A90D9] px-2 py-1 rounded-full",
              children: a
            },
            a
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Aktif Destek Hizmetleri" }),
          detail.services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D]", children: "Kayıtlı hizmet yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: detail.services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-[#F3F6FB] rounded-xl p-3 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: s.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#3A4654]", children: [
                  s.provider,
                  " — ",
                  s.frequency
                ] }),
                s.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6B7A8D] italic", children: s.notes })
              ]
            },
            s.id
          )) })
        ] }),
        detail.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 rounded-xl p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-800", children: detail.notes }) })
      ] })
    ] }) })
  ] });
}
export {
  DisabledElderlySupport as default
};
