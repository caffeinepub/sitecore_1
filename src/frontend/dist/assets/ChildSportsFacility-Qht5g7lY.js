import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, Z as Settings, U as Users, a1 as Shield, e as Badge, T as TriangleAlert, B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, I as Input } from "./index-BJcLL9-x.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CjRVpwQL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-XIUooRms.js";
import { W as Waves } from "./waves-Oop7G_wj.js";
import { C as Clock } from "./clock-CkEoOHg6.js";
import { C as CircleCheckBig } from "./circle-check-big-Cn5BVo1T.js";
import "./index-BzmadLbo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
  ["path", { d: "M15 12h.01", key: "1k8ypt" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
      key: "11xh7x"
    }
  ],
  ["path", { d: "M9 12h.01", key: "157uk2" }]
];
const Baby = createLucideIcon("baby", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode);
const initialFacilities = [
  {
    id: "1",
    name: "Çocuk Oyun Alanı",
    type: "playground",
    status: "active",
    capacity: 20,
    ageMin: 3,
    ageMax: 12,
    openTime: "08:00",
    closeTime: "20:00",
    lastMaintenance: "2026-03-01",
    nextMaintenance: "2026-06-01",
    rules: [
      "3-12 yaş arası çocuklar için",
      "Ebeveyn gözetiminde kullanılmalı",
      "Gıda ve içecek getirilmez",
      "Hayvan girişi yasak"
    ],
    damageReports: [
      {
        id: "d1",
        date: "2026-03-20",
        description: "Salıncak zinciri gevşemiş",
        reportedBy: "Daire 12",
        status: "in_progress"
      }
    ]
  },
  {
    id: "2",
    name: "Fitness & Spor Salonu",
    type: "gym",
    status: "active",
    capacity: 15,
    ageMin: 16,
    ageMax: null,
    openTime: "06:00",
    closeTime: "23:00",
    lastMaintenance: "2026-02-15",
    nextMaintenance: "2026-05-15",
    rules: [
      "16 yaş ve üzeri",
      "Spor kıyafeti zorunlu",
      "Aletleri kullandıktan sonra temizle",
      "Maksimum 15 kişi kapasitesi"
    ],
    damageReports: []
  },
  {
    id: "3",
    name: "Yüzme Havuzu",
    type: "pool",
    status: "maintenance",
    capacity: 30,
    ageMin: 5,
    ageMax: null,
    openTime: "09:00",
    closeTime: "21:00",
    lastMaintenance: "2026-03-10",
    nextMaintenance: "2026-04-10",
    rules: [
      "5 yaş altı çocuklar ebeveyn eşliğinde",
      "Mayo zorunlu",
      "Havuz etrafında koşmak yasak",
      "Yemek sonrası 1 saat bekle"
    ],
    damageReports: [
      {
        id: "d2",
        date: "2026-03-10",
        description: "Filtre sistemi arızası, temizlik yapılıyor",
        reportedBy: "Yönetim",
        status: "in_progress"
      }
    ]
  },
  {
    id: "4",
    name: "Basketbol & Tenis Kortu",
    type: "court",
    status: "active",
    capacity: 12,
    ageMin: 10,
    ageMax: null,
    openTime: "07:00",
    closeTime: "22:00",
    lastMaintenance: "2026-01-20",
    nextMaintenance: "2026-07-20",
    rules: [
      "10 yaş ve üzeri",
      "Spor ayakkabısı zorunlu",
      "Gürültü saatlerine dikkat et",
      "Ekipmanları zamanında bırak"
    ],
    damageReports: []
  },
  {
    id: "5",
    name: "Piknik & Yeşil Alan",
    type: "park",
    status: "active",
    capacity: 50,
    ageMin: null,
    ageMax: null,
    openTime: "07:00",
    closeTime: "22:00",
    lastMaintenance: "2026-03-05",
    nextMaintenance: "2026-04-05",
    rules: [
      "Tüm sakinler kullanabilir",
      "Piknik artıklarını topla",
      "Çimlere zarar verme",
      "Barbekü izin gerektirmez"
    ],
    damageReports: []
  }
];
const typeIcons = {
  playground: Baby,
  gym: Dumbbell,
  pool: Waves,
  court: Shield,
  park: Users,
  other: Settings
};
const typeLabels = {
  playground: "Oyun Alanı",
  gym: "Spor Salonu",
  pool: "Yüzme Havuzu",
  court: "Kort / Saha",
  park: "Park / Yeşil Alan",
  other: "Diğer"
};
const statusLabels = {
  active: "Aktif",
  maintenance: "Bakımda",
  closed: "Kapalı"
};
const statusColors = {
  active: "bg-green-100 text-green-700 border-green-200",
  maintenance: "bg-yellow-100 text-yellow-700 border-yellow-200",
  closed: "bg-red-100 text-red-700 border-red-200"
};
const damageStatusLabels = {
  open: "Açık",
  in_progress: "İşlemde",
  resolved: "Çözüldü"
};
const damageStatusColors = {
  open: "bg-red-100 text-red-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700"
};
function ChildSportsFacility({ isOwner }) {
  const [facilities, setFacilities] = reactExports.useState(initialFacilities);
  const [activeTab, setActiveTab] = reactExports.useState(
    "list"
  );
  const [selectedFacility, setSelectedFacility] = reactExports.useState(
    null
  );
  const [showRulesModal, setShowRulesModal] = reactExports.useState(false);
  const [showDamageModal, setShowDamageModal] = reactExports.useState(false);
  const [damageDesc, setDamageDesc] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const filtered = facilities.filter(
    (f) => statusFilter === "all" || f.status === statusFilter
  );
  const allDamageReports = facilities.flatMap(
    (f) => f.damageReports.map((r) => ({ ...r, facilityName: f.name }))
  );
  const openReports = allDamageReports.filter(
    (r) => r.status !== "resolved"
  ).length;
  const maintenanceDue = facilities.filter((f) => {
    const next = new Date(f.nextMaintenance);
    const now = /* @__PURE__ */ new Date();
    const diff = (next.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24);
    return diff <= 30;
  }).length;
  const handleStatusChange = (facilityId, newStatus) => {
    setFacilities(
      (prev) => prev.map((f) => f.id === facilityId ? { ...f, status: newStatus } : f)
    );
  };
  const handleDamageReport = () => {
    if (!selectedFacility || !damageDesc.trim()) return;
    const newReport = {
      id: `d${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: damageDesc,
      reportedBy: "Sakin",
      status: "open"
    };
    setFacilities(
      (prev) => prev.map(
        (f) => f.id === selectedFacility.id ? { ...f, damageReports: [...f.damageReports, newReport] } : f
      )
    );
    setDamageDesc("");
    setShowDamageModal(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B1B2E]", children: "Çocuk & Spor Tesisi Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Ortak tesisler, bakım takibi ve hasar bildirimleri" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-blue-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 font-medium", children: "Toplam Tesis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-700", children: facilities.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 font-medium", children: "Aktif Tesis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-700", children: facilities.filter((f) => f.status === "active").length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600 font-medium", children: "Açık Hasar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-700", children: openReports })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm bg-yellow-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-600 font-medium", children: "Bakım Yaklaşan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-yellow-700", children: maintenanceDue })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-gray-200", children: ["list", "damage", "maintenance"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-[#0B1B2E] text-[#0B1B2E]" : "border-transparent text-gray-500 hover:text-gray-700"}`,
        children: [
          tab === "list" && "Tesisler",
          tab === "damage" && `Hasar Bildirimleri ${openReports > 0 ? `(${openReports})` : ""}`,
          tab === "maintenance" && "Bakım Takvimi"
        ]
      },
      tab
    )) }),
    activeTab === "list" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Tüm Durumlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Aktif" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "maintenance", children: "Bakımda" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Kapalı" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filtered.map((facility) => {
        const Icon = typeIcons[facility.type];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: facility.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: typeLabels[facility.type] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${statusColors[facility.status]}`,
                children: statusLabels[facility.status]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Max ",
                  facility.capacity,
                  " kişi"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  facility.openTime,
                  " - ",
                  facility.closeTime
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Baby, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  facility.ageMin !== null ? `${facility.ageMin}+` : "",
                  facility.ageMin !== null && facility.ageMax !== null ? " - " : "",
                  facility.ageMax !== null ? `${facility.ageMax} yaş` : facility.ageMin !== null ? " yaş" : "Tüm yaşlar"
                ] })
              ] }),
              facility.damageReports.filter(
                (r) => r.status !== "resolved"
              ).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-red-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  facility.damageReports.filter(
                    (r) => r.status !== "resolved"
                  ).length,
                  " ",
                  "hasar"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "flex-1 text-xs",
                  onClick: () => {
                    setSelectedFacility(facility);
                    setShowRulesModal(true);
                  },
                  children: "Kurallar"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "flex-1 text-xs",
                  onClick: () => {
                    setSelectedFacility(facility);
                    setShowDamageModal(true);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                    "Hasar Bildir"
                  ]
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: facility.status,
                  onValueChange: (v) => handleStatusChange(
                    facility.id,
                    v
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-28 h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Aktif" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "maintenance", children: "Bakımda" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Kapalı" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }, facility.id);
      }) })
    ] }),
    activeTab === "damage" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: allDamageReports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-400 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Açık hasar bildirimi yok" })
    ] }) }) : allDamageReports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-[#0B1B2E]", children: report.facilityName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs ${damageStatusColors[report.status]}`,
              children: damageStatusLabels[report.status]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: report.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-1", children: [
          report.date,
          " · ",
          report.reportedBy
        ] })
      ] }),
      isOwner && report.status !== "resolved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "text-xs",
          onClick: () => {
            setFacilities(
              (prev) => prev.map((f) => ({
                ...f,
                damageReports: f.damageReports.map(
                  (r) => r.id === report.id ? {
                    ...r,
                    status: r.status === "open" ? "in_progress" : "resolved"
                  } : r
                )
              }))
            );
          },
          children: report.status === "open" ? "İşleme Al" : "Çözüldü"
        }
      )
    ] }) }) }, report.id)) }),
    activeTab === "maintenance" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: facilities.map((facility) => {
      const next = new Date(facility.nextMaintenance);
      const now = /* @__PURE__ */ new Date();
      const daysLeft = Math.ceil(
        (next.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24)
      );
      const urgent = daysLeft <= 14;
      const soon = daysLeft <= 30;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `border-0 shadow-sm ${urgent ? "border-l-4 border-l-red-400" : soon ? "border-l-4 border-l-yellow-400" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-[#0B1B2E]", children: facility.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [
                "Son bakım: ",
                facility.lastMaintenance
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-semibold ${urgent ? "text-red-600" : soon ? "text-yellow-600" : "text-green-600"}`,
                  children: daysLeft <= 0 ? "Gecikti" : `${daysLeft} gün`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                "Sonraki: ",
                facility.nextMaintenance
              ] })
            ] })
          ] }) })
        },
        facility.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRulesModal, onOpenChange: setShowRulesModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        selectedFacility == null ? void 0 : selectedFacility.name,
        " -- Kullanım Kuralları"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: selectedFacility == null ? void 0 : selectedFacility.rules.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-500 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: rule })
      ] }, rule)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDamageModal, onOpenChange: setShowDamageModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        selectedFacility == null ? void 0 : selectedFacility.name,
        " -- Hasar Bildir"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Gördüğünüz hasarı veya arızayı kısaca açıklayın." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Hasar açıklaması...",
            value: damageDesc,
            onChange: (e) => setDamageDesc(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDamageModal(false),
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleDamageReport,
              disabled: !damageDesc.trim(),
              className: "bg-[#0B1B2E] text-white",
              children: "Gönder"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ChildSportsFacility as default
};
