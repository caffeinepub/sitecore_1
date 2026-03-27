import { r as reactExports, a0 as Flame, T as TriangleAlert, a1 as Zap, j as jsxRuntimeExports, B as Button, P as Plus, f as Tabs, g as TabsList, h as TabsTrigger, i as TabsContent, v as MapPin, U as Users, e as Badge, a2 as Shield, E as Phone, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle } from "./index-xOs1ph1v.js";
import { P as Progress } from "./progress-BgveVntt.js";
import { C as Clock } from "./clock-DspyC9Dz.js";
import { C as CircleCheckBig } from "./circle-check-big-7Z2Ce4Ly.js";
const SCENARIOS = [
  {
    id: "fire",
    title: "Yangın",
    icon: Flame,
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
    assemblyPoint: "Bina önü - Açık otopark alanı",
    routes: [
      { floor: "5. Kat", route: "Acil merdiven A → Zemin kat çıkışı" },
      { floor: "4. Kat", route: "Acil merdiven A → Zemin kat çıkışı" },
      { floor: "3. Kat", route: "Acil merdiven B → Yan çıkış" },
      { floor: "2. Kat", route: "Acil merdiven B → Yan çıkış" },
      { floor: "1. Kat", route: "Ana kapı veya yan kapı" },
      { floor: "Zemin", route: "Ana kapı veya arka bahçe kapısı" }
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "İtfaiyeyi ara, kapıları aç"
      },
      {
        role: "Kat Sorumlusu (4-5)",
        person: "Mehmet Demir",
        duty: "Üst katları boşalt"
      },
      {
        role: "Kat Sorumlusu (1-3)",
        person: "Ayşe Kaya",
        duty: "Alt katları boşalt"
      },
      {
        role: "Yardım Ekibi",
        person: "Fatma Çelik",
        duty: "Yaşlı/engelli sakine yardım"
      }
    ]
  },
  {
    id: "earthquake",
    title: "Deprem",
    icon: TriangleAlert,
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
    assemblyPoint: "Bina karşısı park alanı - Açık alan",
    routes: [
      { floor: "5. Kat", route: "Sallantı bitince: Merdiven A → Açık alana" },
      { floor: "4. Kat", route: "Sallantı bitince: Merdiven A → Açık alana" },
      { floor: "3. Kat", route: "Sallantı bitince: Merdiven B → Açık alana" },
      { floor: "2. Kat", route: "Sallantı bitince: Merdiven B → Açık alana" },
      { floor: "1. Kat", route: "Ana kapıdan çık, duvarlardan uzak dur" },
      { floor: "Zemin", route: "Hemen açık alana çık" }
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "AFAD'ı ara, gaz vanasını kapat"
      },
      {
        role: "İlk Yardım Sorumlusu",
        person: "Dr. Zeynep Arslan",
        duty: "Yaralılara ilk müdahale"
      },
      {
        role: "Hasar Tespiti",
        person: "Mehmet Demir",
        duty: "Yapısal hasar kontrolü"
      },
      {
        role: "İletişim Sorumlusu",
        person: "Selin Yurt",
        duty: "Sakinleri say, kayıp varsa bildir"
      }
    ]
  },
  {
    id: "flood",
    title: "Su Baskını",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
    assemblyPoint: "3. Kat ve üzeri - Bodrum boşaltılır",
    routes: [
      { floor: "Bodrum", route: "Acil çıkış kapısı → Üst kata çık" },
      { floor: "Zemin", route: "Su girmesi durumunda 1. kata çık" },
      { floor: "1. Kat", route: "Bekleme alanı, gerekirse 2. kata çık" },
      { floor: "2-5. Kat", route: "Yerinde bekle, yönetim bilgilendirecek" }
    ],
    tasks: [
      {
        role: "Tesisat Sorumlusu",
        person: "İbrahim Şahin",
        duty: "Ana su vanasını kapat"
      },
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "Acil servisleri ara"
      },
      {
        role: "Bodrum Sorumlusu",
        person: "Recep Aydın",
        duty: "Bodrum katı boşalt"
      },
      { role: "Yönetici", person: "Yönetim", duty: "Sakinleri bilgilendir" }
    ]
  },
  {
    id: "gas",
    title: "Gaz Kaçağı",
    icon: TriangleAlert,
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-700",
    assemblyPoint: "Bina dışı - Rüzgar yönü dikkate alınarak açık alan",
    routes: [
      { floor: "Tüm Katlar", route: "Asansör KULLANMA → Merdiven → Bina dışı" },
      { floor: "Not", route: "Işık anahtarına dokunma, cep telefonu kullanma" }
    ],
    tasks: [
      {
        role: "Güvenlik Görevlisi",
        person: "Ahmet Yılmaz",
        duty: "Doğalgaz şirketini ve itfaiyeyi ara"
      },
      {
        role: "Tesisat Sorumlusu",
        person: "İbrahim Şahin",
        duty: "Ana gaz vanasını kapat"
      },
      {
        role: "Tahliye Sorumlusu",
        person: "Mehmet Demir",
        duty: "Tüm sakinleri tahliye et"
      },
      {
        role: "Elektrik Sorumlusu",
        person: "Kadir Yıldız",
        duty: "Elektriği kes (sigorta kutusu)"
      }
    ]
  }
];
const DRILLS = [
  {
    id: "d1",
    title: "Yangın Tatbikatı",
    date: "2026-04-15",
    type: "Yangın",
    planned: true,
    participation: 0,
    notes: "Tüm sakinlerin katılımı beklenmektedir"
  },
  {
    id: "d2",
    title: "Deprem Tatbikatı",
    date: "2026-06-20",
    type: "Deprem",
    planned: true,
    participation: 0,
    notes: "AFAD uzmanı katılımıyla"
  },
  {
    id: "d3",
    title: "Yangın Tatbikatı",
    date: "2025-10-12",
    type: "Yangın",
    planned: false,
    participation: 78,
    notes: "Başarıyla tamamlandı"
  },
  {
    id: "d4",
    title: "Genel Tahliye Tatbikatı",
    date: "2025-05-08",
    type: "Genel",
    planned: false,
    participation: 85,
    notes: "Tahliye süresi 4 dk 20 sn"
  },
  {
    id: "d5",
    title: "Deprem Tatbikatı",
    date: "2024-11-20",
    type: "Deprem",
    planned: false,
    participation: 72,
    notes: "İyileştirme alanları belirlendi"
  }
];
const EQUIPMENT = [
  {
    id: "e1",
    name: "Yangın Söndürücü",
    location: "Her kat merdiven başı",
    count: 6,
    status: "Aktif",
    lastCheck: "2026-02-10",
    nextCheck: "2026-08-10"
  },
  {
    id: "e2",
    name: "Yangın Söndürücü",
    location: "Bodrum kat teknik oda",
    count: 2,
    status: "Aktif",
    lastCheck: "2026-02-10",
    nextCheck: "2026-08-10"
  },
  {
    id: "e3",
    name: "İlk Yardım Çantası",
    location: "Kapıcı dairesi",
    count: 1,
    status: "Aktif",
    lastCheck: "2026-01-15",
    nextCheck: "2026-07-15"
  },
  {
    id: "e4",
    name: "İlk Yardım Çantası",
    location: "5. Kat ortak alan",
    count: 1,
    status: "Yenileme Gerekli",
    lastCheck: "2025-09-01",
    nextCheck: "2026-03-01"
  },
  {
    id: "e5",
    name: "Sedye",
    location: "Bodrum kat deposu",
    count: 1,
    status: "Aktif",
    lastCheck: "2026-01-20",
    nextCheck: "2027-01-20"
  },
  {
    id: "e6",
    name: "Yangın Alarm Sistemi",
    location: "Tüm kat koridorları",
    count: 12,
    status: "Aktif",
    lastCheck: "2026-03-01",
    nextCheck: "2026-09-01"
  },
  {
    id: "e7",
    name: "Acil Aydınlatma",
    location: "Merdiven boşlukları",
    count: 8,
    status: "Aktif",
    lastCheck: "2026-02-20",
    nextCheck: "2026-08-20"
  },
  {
    id: "e8",
    name: "Toprak Hattı",
    location: "Elektrik panosu",
    count: 1,
    status: "Aktif",
    lastCheck: "2025-12-10",
    nextCheck: "2026-12-10"
  }
];
const COMM_TREE = [
  { level: 1, name: "Yönetici", phone: "0532 111 2233", role: "Koordinatör" },
  {
    level: 2,
    name: "Güvenlik Ahmet Y.",
    phone: "0533 222 3344",
    role: "Saha Sorumlusu"
  },
  {
    level: 2,
    name: "Kapıcı İbrahim Ş.",
    phone: "0534 333 4455",
    role: "Bina İçi Koordinasyon"
  },
  {
    level: 3,
    name: "Kat 4-5 Sorumlusu",
    phone: "0535 444 5566",
    role: "Sakin Tahliye"
  },
  {
    level: 3,
    name: "Kat 2-3 Sorumlusu",
    phone: "0536 555 6677",
    role: "Sakin Tahliye"
  },
  {
    level: 3,
    name: "Kat 0-1 Sorumlusu",
    phone: "0537 666 7788",
    role: "Sakin Tahliye"
  },
  { level: 4, name: "İtfaiye", phone: "110", role: "Acil Hizmet" },
  { level: 4, name: "Ambulans", phone: "112", role: "Acil Hizmet" },
  { level: 4, name: "Polis", phone: "155", role: "Acil Hizmet" },
  { level: 4, name: "Doğalgaz Acil", phone: "187", role: "Acil Hizmet" }
];
function EmergencyActionPlan({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [selectedScenario, setSelectedScenario] = reactExports.useState(SCENARIOS[0]);
  const [showDrillModal, setShowDrillModal] = reactExports.useState(false);
  const [drillForm, setDrillForm] = reactExports.useState({
    title: "",
    date: "",
    type: "Yangın",
    notes: ""
  });
  const plannedDrills = DRILLS.filter((d) => d.planned);
  const pastDrills = DRILLS.filter((d) => !d.planned);
  const avgParticipation = Math.round(
    pastDrills.reduce((a, b) => a + b.participation, 0) / pastDrills.length
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Acil Eylem Planı & Tahliye" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6B7A8D] mt-1", children: "Acil senaryolar, tahliye planları ve tatbikat takvimi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowDrillModal(true),
          className: "bg-[#0B1B2E] hover:bg-[#1a2f48] text-white",
          "data-ocid": "emergency.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Tatbikat Planla"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#0B1B2E]", children: SCENARIOS.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Senaryo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-600", children: plannedDrills.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Planlanan Tatbikat" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
          avgParticipation,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Ort. Katılım" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-[#E5EAF2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#F2A23A]", children: EQUIPMENT.filter((e) => e.status === "Yenileme Gerekli").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Ekipman Uyarısı" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "scenarios", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-[#F3F6FB]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "scenarios", children: "Senaryolar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "drills", children: "Tatbikat Takvimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "equipment", children: "Ekipman" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "commtree", children: "İletişim Ağacı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "scenarios", className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: SCENARIOS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedScenario(s),
            className: `p-4 rounded-xl border-2 text-left transition-all ${selectedScenario.id === s.id ? `${s.bg} border-current ${s.color}` : "bg-white border-[#E5EAF2] hover:border-[#D7DEE9]"}`,
            "data-ocid": `emergency.${s.id}.tab`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                s.icon,
                {
                  className: `w-6 h-6 ${selectedScenario.id === s.id ? s.color : "text-[#6B7A8D]"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm mt-2 text-[#0E1116]", children: s.title })
            ]
          },
          s.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-[#4A90D9]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Toplanma Noktası" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] bg-blue-50 rounded-lg p-3", children: selectedScenario.assemblyPoint }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-[#0E1116] mt-4 mb-3", children: "Tahliye Rotaları" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedScenario.routes.map((r, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static route list
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B1B2E] min-w-[80px]", children: r.floor }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#6B7A8D]", children: [
                  "→ ",
                  r.route
                ] })
              ] }, i)
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-[#4A90D9]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116]", children: "Acil Görev Atamaları" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: selectedScenario.tasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-3 bg-[#F3F6FB] rounded-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${[
                        "bg-[#4A90D9]",
                        "bg-green-500",
                        "bg-purple-500",
                        "bg-[#F2A23A]"
                      ][i % 4]}`,
                      children: i + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0E1116]", children: task.role }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: task.person }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: task.duty })
                  ] })
                ]
              },
              task.role
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "drills", className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-3", children: "Planlanan Tatbikatlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: plannedDrills.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-xl border border-[#E5EAF2] p-4 flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-blue-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: d.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                      d.date,
                      " · ",
                      d.notes
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700 border-0", children: d.type })
              ]
            },
            d.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-3", children: "Geçmiş Tatbikatlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pastDrills.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-xl border border-[#E5EAF2] p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0E1116]", children: d.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6B7A8D]", children: [
                        d.date,
                        " · ",
                        d.notes
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#0B1B2E]", children: [
                    d.participation,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: d.participation, className: "h-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D] mt-1", children: "Katılım Oranı" })
              ]
            },
            d.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "equipment", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-[#E5EAF2] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB] border-b border-[#E5EAF2]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Ekipman" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Konum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Adet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Son Kontrol" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-[#6B7A8D] font-medium", children: "Durum" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[#E5EAF2]", children: EQUIPMENT.map((eq) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-[#F3F6FB]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#0E1116]", children: eq.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: eq.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#0E1116]", children: eq.count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6B7A8D]", children: eq.lastCheck }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `border-0 ${eq.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
              children: eq.status
            }
          ) })
        ] }, eq.id)) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "commtree", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#E5EAF2] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0E1116] mb-4", children: "Acil İletişim Ağacı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((level) => {
          const items = COMM_TREE.filter((c) => c.level === level);
          const levelLabels = [
            "Birincil Koordinatör",
            "Saha Sorumluları",
            "Kat Sorumluları",
            "Acil Servisler"
          ];
          const levelColors = [
            "bg-[#0B1B2E] text-white",
            "bg-[#4A90D9] text-white",
            "bg-purple-500 text-white",
            "bg-red-500 text-white"
          ];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-[#6B7A8D] uppercase mb-2", children: [
              "Seviye ",
              level,
              ": ",
              levelLabels[level - 1]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 p-3 bg-[#F3F6FB] rounded-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${levelColors[level - 1]}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-[#0E1116]", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-[#6B7A8D]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6B7A8D]", children: c.phone })
                    ] })
                  ] })
                ]
              },
              c.name
            )) })
          ] }, level);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDrillModal, onOpenChange: setShowDrillModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "emergency.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tatbikat Planla" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Tatbikat Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: drillForm.title,
              onChange: (e) => setDrillForm((p) => ({ ...p, title: e.target.value })),
              placeholder: "örn. Yangın Tatbikatı",
              "data-ocid": "emergency.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Tarih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: drillForm.date,
              onChange: (e) => setDrillForm((p) => ({ ...p, date: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Senaryo Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
              value: drillForm.type,
              onChange: (e) => setDrillForm((p) => ({ ...p, type: e.target.value })),
              "data-ocid": "emergency.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yangın" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Deprem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Su Baskını" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Gaz Kaçağı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Genel" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654] block mb-1", children: "Notlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none",
              rows: 3,
              value: drillForm.notes,
              onChange: (e) => setDrillForm((p) => ({ ...p, notes: e.target.value })),
              "data-ocid": "emergency.textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowDrillModal(false),
              "data-ocid": "emergency.cancel_button",
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-[#0B1B2E] hover:bg-[#1a2f48] text-white",
              onClick: () => setShowDrillModal(false),
              "data-ocid": "emergency.confirm_button",
              children: "Kaydet"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  EmergencyActionPlan as default
};
