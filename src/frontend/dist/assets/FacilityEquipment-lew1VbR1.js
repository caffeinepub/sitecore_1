import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, P as Plus, T as TriangleAlert, S as Search, I as Input, J as Settings, Z as Zap, O as Shield, W as Wrench, e as Badge, m as Calendar, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-DrmT2NwI.js";
import { W as Wind } from "./wind-DWIewxoi.js";
import { C as Clock } from "./clock-npxEKmqV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode);
const CATEGORIES = [
  { key: "all", label: "Tümü", icon: Settings },
  { key: "elevator", label: "Asansör", icon: Zap },
  { key: "heating", label: "Isıtma", icon: Thermometer },
  { key: "fire", label: "Yangın Sistemi", icon: Shield },
  { key: "hvac", label: "Havalandırma", icon: Wind },
  { key: "pump", label: "Pompa & Su", icon: Settings },
  { key: "generator", label: "Jeneratör", icon: Zap },
  { key: "other", label: "Diğer", icon: Wrench }
];
const STATUS_CONFIG = {
  active: { label: "Aktif", color: "bg-green-100 text-green-700" },
  maintenance: { label: "Bakımda", color: "bg-yellow-100 text-yellow-700" },
  faulty: { label: "Arızalı", color: "bg-red-100 text-red-700" },
  inactive: { label: "Pasif", color: "bg-gray-100 text-gray-600" }
};
const MOCK_EQUIPMENT = [
  {
    id: "1",
    name: "A Blok Asansörü",
    category: "elevator",
    brand: "Otis",
    model: "GEN2 Comfort",
    serialNo: "OT-2019-4521",
    installDate: "2019-03-15",
    warrantyEnd: "2024-03-15",
    lastService: "2026-01-10",
    nextService: "2026-04-10",
    status: "active",
    location: "A Blok Giriş",
    notes: "6 kişilik kapasite",
    serviceHistory: [
      {
        date: "2026-01-10",
        type: "Periyodik Bakım",
        technician: "Otis Servis",
        cost: 1800,
        notes: "Yağlama, makara kontrolü"
      },
      {
        date: "2025-10-05",
        type: "Arıza Onarım",
        technician: "Otis Servis",
        cost: 2400,
        notes: "Kapı sensörü değişimi"
      },
      {
        date: "2025-07-12",
        type: "Periyodik Bakım",
        technician: "Otis Servis",
        cost: 1800,
        notes: "Genel bakım"
      }
    ]
  },
  {
    id: "2",
    name: "Merkezi Isıtma Kazanı",
    category: "heating",
    brand: "Vaillant",
    model: "EcoTec Plus 35",
    serialNo: "VL-2020-8834",
    installDate: "2020-09-01",
    warrantyEnd: "2025-09-01",
    lastService: "2025-11-20",
    nextService: "2026-05-20",
    status: "active",
    location: "Kazan Dairesi B1",
    notes: "35 kW kapasiteli",
    serviceHistory: [
      {
        date: "2025-11-20",
        type: "Yıllık Bakım",
        technician: "Vaillant Yetkili",
        cost: 3200,
        notes: "Filtre değişimi, verim testi"
      },
      {
        date: "2025-03-15",
        type: "Sezon Kapanış",
        technician: "Vaillant Yetkili",
        cost: 800,
        notes: "Sistem durdurma"
      }
    ]
  },
  {
    id: "3",
    name: "Yangın Alarm Sistemi",
    category: "fire",
    brand: "Hochiki",
    model: "PF-Series",
    serialNo: "HK-2021-1123",
    installDate: "2021-06-10",
    warrantyEnd: "2026-06-10",
    lastService: "2025-12-01",
    nextService: "2026-03-01",
    status: "active",
    location: "Tüm Katlar",
    notes: "48 duman dedektörü, 12 zon",
    serviceHistory: [
      {
        date: "2025-12-01",
        type: "3 Aylık Test",
        technician: "Güvenlik A.Ş.",
        cost: 600,
        notes: "Tüm dedektörler test edildi"
      },
      {
        date: "2025-09-01",
        type: "3 Aylık Test",
        technician: "Güvenlik A.Ş.",
        cost: 600,
        notes: "2 dedektör değişimi"
      }
    ]
  },
  {
    id: "4",
    name: "Hidrofor Pompası",
    category: "pump",
    brand: "Grundfos",
    model: "CM 10-3",
    serialNo: "GF-2022-5567",
    installDate: "2022-01-20",
    warrantyEnd: "2025-01-20",
    lastService: "2025-08-15",
    nextService: "2026-02-15",
    status: "maintenance",
    location: "Su Deposu Bodrum",
    notes: "Basınç artırma pompası",
    serviceHistory: [
      {
        date: "2025-08-15",
        type: "Arıza Bakım",
        technician: "Grundfos Servis",
        cost: 4500,
        notes: "Salmastra değişimi"
      }
    ]
  },
  {
    id: "5",
    name: "Dizel Jeneratör",
    category: "generator",
    brand: "Aksa",
    model: "APD-100",
    serialNo: "AK-2020-2299",
    installDate: "2020-04-05",
    warrantyEnd: "2023-04-05",
    lastService: "2025-10-20",
    nextService: "2026-04-20",
    status: "active",
    location: "Jeneratör Odası",
    notes: "100 kVA, otomatik devreye girme",
    serviceHistory: [
      {
        date: "2025-10-20",
        type: "6 Aylık Bakım",
        technician: "Aksa Yetkili",
        cost: 5200,
        notes: "Yağ, filtre değişimi, yük testi"
      }
    ]
  },
  {
    id: "6",
    name: "Havalandırma Ünitesi",
    category: "hvac",
    brand: "Daikin",
    model: "VRV-IV",
    serialNo: "DK-2023-7710",
    installDate: "2023-05-15",
    warrantyEnd: "2026-05-15",
    lastService: "2025-09-01",
    nextService: "2026-03-01",
    status: "faulty",
    location: "Çatı Kat",
    notes: "Ortak alan havalandırması",
    serviceHistory: [
      {
        date: "2025-09-01",
        type: "Mevsimlik Bakım",
        technician: "Daikin Servis",
        cost: 2800,
        notes: "Filtre temizliği"
      }
    ]
  }
];
function FacilityEquipment({ isOwner }) {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("all");
  const [selectedEquipment, setSelectedEquipment] = reactExports.useState(
    null
  );
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const filtered = MOCK_EQUIPMENT.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || e.category === category;
    return matchSearch && matchCat;
  });
  const stats = {
    total: MOCK_EQUIPMENT.length,
    active: MOCK_EQUIPMENT.filter((e) => e.status === "active").length,
    maintenance: MOCK_EQUIPMENT.filter((e) => e.status === "maintenance").length,
    faulty: MOCK_EQUIPMENT.filter((e) => e.status === "faulty").length
  };
  const getDaysUntil = (dateStr) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1e3 * 60 * 60 * 24));
  };
  const isWarrantyExpired = (dateStr) => new Date(dateStr) < /* @__PURE__ */ new Date();
  const isServiceDue = (dateStr) => getDaysUntil(dateStr) <= 30;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B1B2E]", children: "Tesis & Ekipman Envanteri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Kritik ekipmanların teknik bilgileri ve bakım geçmişi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Ekipman Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0B1B2E]", children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Toplam Ekipman" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.active }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Aktif" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.maintenance }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Bakımda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.faulty }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: "Arızalı" })
      ] })
    ] }),
    MOCK_EQUIPMENT.some(
      (e) => isServiceDue(e.nextService) || e.status === "faulty"
    ) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-amber-800", children: "Dikkat Gerektiren Ekipmanlar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        MOCK_EQUIPMENT.filter((e) => e.status === "faulty").map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-amber-700", children: [
          "⚠ ",
          e.name,
          " — Arızalı durumda"
        ] }, e.id)),
        MOCK_EQUIPMENT.filter(
          (e) => isServiceDue(e.nextService) && e.status !== "faulty"
        ).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-amber-700", children: [
          "🔔 ",
          e.name,
          " — Bakım tarihi: ",
          e.nextService,
          " (",
          getDaysUntil(e.nextService),
          " gün)"
        ] }, e.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl p-4 border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Ekipman veya marka ara...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(cat.key),
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${category === cat.key ? "bg-[#2563EB] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
          children: cat.label
        },
        cat.key
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      filtered.map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow w-full text-left",
          onClick: () => setSelectedEquipment(eq),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E]", children: eq.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${STATUS_CONFIG[eq.status].color} border-0`,
                    children: STATUS_CONFIG[eq.status].label
                  }
                ),
                isWarrantyExpired(eq.warrantyEnd) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-orange-100 text-orange-700 border-0", children: "Garanti Bitti" }),
                isServiceDue(eq.nextService) && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-blue-100 text-blue-700 border-0", children: "Bakım Yakın" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-500", children: [
                eq.brand,
                " ",
                eq.model,
                " • S/N: ",
                eq.serialNo
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400 mt-1", children: [
                "📍 ",
                eq.location
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-sm space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 inline mr-1" }),
                "Son bakım:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B1B2E]", children: eq.lastService })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 inline mr-1" }),
                "Sonraki:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-medium ${isServiceDue(eq.nextService) ? "text-red-600" : "text-green-600"}`,
                    children: eq.nextService
                  }
                )
              ] })
            ] })
          ] })
        },
        eq.id
      )),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-12 text-center border border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Ekipman bulunamadı" })
      ] })
    ] }),
    selectedEquipment && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedEquipment,
        onOpenChange: () => setSelectedEquipment(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[85vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            selectedEquipment.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs ${STATUS_CONFIG[selectedEquipment.status].color} border-0`,
                children: STATUS_CONFIG[selectedEquipment.status].label
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Marka / Model" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
                  selectedEquipment.brand,
                  " ",
                  selectedEquipment.model
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Seri No" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: selectedEquipment.serialNo })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Kurulum Tarihi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: selectedEquipment.installDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Garanti Bitiş" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `font-semibold ${isWarrantyExpired(selectedEquipment.warrantyEnd) ? "text-red-600" : "text-green-600"}`,
                    children: [
                      selectedEquipment.warrantyEnd,
                      " ",
                      isWarrantyExpired(selectedEquipment.warrantyEnd) ? "(Sona Erdi)" : "(Aktif)"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Konum" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: selectedEquipment.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 mb-1", children: "Sonraki Bakım" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `font-semibold ${isServiceDue(selectedEquipment.nextService) ? "text-red-600" : "text-[#0B1B2E]"}`,
                    children: selectedEquipment.nextService
                  }
                )
              ] })
            ] }),
            selectedEquipment.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-blue-600 mb-1 font-medium", children: "Notlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: selectedEquipment.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-[#0B1B2E] mb-3", children: "Servis Geçmişi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: selectedEquipment.serviceHistory.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border border-gray-100 rounded-lg p-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: rec.type }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: rec.date })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600", children: [
                      "Teknisyen: ",
                      rec.technician
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600", children: [
                      "Maliyet:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-green-700", children: [
                        rec.cost.toLocaleString("tr-TR"),
                        " ₺"
                      ] })
                    ] }),
                    rec.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 mt-1 italic", children: rec.notes })
                  ]
                },
                `${rec.date}-${rec.type}`
              )) })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Yeni Ekipman Ekle" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "eq-name", className: "text-sm font-medium", children: "Ekipman Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "eq-name",
              placeholder: "örn: B Blok Asansörü",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "eq-brand", className: "text-sm font-medium", children: "Marka" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "eq-brand", placeholder: "Marka adı", className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "eq-model", className: "text-sm font-medium", children: "Model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "eq-model", placeholder: "Model", className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "eq-location", className: "text-sm font-medium", children: "Konum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "eq-location",
              placeholder: "Ekipmanın bulunduğu yer",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white",
              onClick: () => setShowAdd(false),
              children: "Kaydet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => setShowAdd(false),
              children: "İptal"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  FacilityEquipment as default
};
