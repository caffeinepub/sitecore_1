import { r as reactExports, $ as Flame, a0 as Zap, j as jsxRuntimeExports, a1 as Shield, E as Phone, T as TriangleAlert, v as MapPin, F as FileText, a6 as ChevronUp, a7 as ChevronDown } from "./index-Gmz9ZzBN.js";
import { W as Waves } from "./waves-fLHLefdb.js";
import { C as CircleCheckBig } from "./circle-check-big-CSPjFcVd.js";
import { C as Circle } from "./circle-Ci5-qD5V.js";
const scenarios = [
  {
    id: "earthquake",
    icon: Waves,
    color: "#E67E22",
    bg: "#FEF9F0",
    label: "Deprem",
    beforeSteps: [
      "Mobilyaları duvara sabitleyin",
      "Gaz vanasını nerede olduğunu öğrenin",
      "Acil çanta hazırlayın (su, yiyecek, ilaç, belgeler)",
      "Toplanma noktalarını tüm sakinlerle paylaşın",
      "Yapı güvenlik raporunu güncel tutun"
    ],
    duringSteps: [
      "Çök, Kapan, Tutun pozisyonu alın",
      "Pencere ve dış duvarlardan uzak durun",
      "Asansör kullanmayın",
      "Panik yapmadan sakin kalın"
    ],
    afterSteps: [
      "Binadan çıkın ve toplanma noktasına gidin",
      "Gaz kaçağı kontrolü yapın",
      "Hasarlı yapıya girmeyin",
      "AFAD bildirim hattını arayın: 122"
    ]
  },
  {
    id: "fire",
    icon: Flame,
    color: "#E74C3C",
    bg: "#FDF5F5",
    label: "Yangın",
    beforeSteps: [
      "Yangın söndürücülerin yerini öğrenin",
      "Acil çıkış yollarını ezberleyin",
      "Yangın dedektörlerini düzenli test edin",
      "Elektrik panelinin yerini bilin"
    ],
    duringSteps: [
      "Yangın alarmını çalıştırın",
      "İtfaiyeyi arayın: 110",
      "Kapı aralığından duman kontrolü yapın",
      "Merdiveni kullanın, asansöre binmeyin",
      "Dumanın altında kalarak hareket edin"
    ],
    afterSteps: [
      "Binadan tamamen çıkın",
      "Hiçbir şey almak için geri dönmeyin",
      "Toplanma noktasında tüm sakinleri sayın",
      "İtfaiyenin onayı olmadan binaya girmeyin"
    ]
  },
  {
    id: "flood",
    icon: Waves,
    color: "#2980B9",
    bg: "#F0F7FF",
    label: "Su Baskını",
    beforeSteps: [
      "Bodrum katta değerli eşyaları yüksekte tutun",
      "Su vanasının yerini öğrenin",
      "Drenaj kanallarını düzenli temizletin",
      "Su pompasının çalışırlığını kontrol edin"
    ],
    duringSteps: [
      "Su vanasını kapatın",
      "Elektrik panosunu devre dışı bırakın",
      "Üst katlara çıkın",
      "Akan suya girmeyin"
    ],
    afterSteps: [
      "Bina yapısal hasarını kontrol ettirin",
      "Elektrik bağlantılarını kontrol ettirin",
      "Islak alanları hızla kurulayın (nem/mantar riski)"
    ]
  },
  {
    id: "power",
    icon: Zap,
    color: "#8E44AD",
    bg: "#F9F0FF",
    label: "Uzun Süreli Elektrik Kesintisi",
    beforeSteps: [
      "Jeneratörün yakıt durumunu düzenli kontrol edin",
      "El feneri ve pil stoğu bulundurun",
      "UPS ve kesintisiz güç kaynaklarını test edin"
    ],
    duringSteps: [
      "Jeneratörü devreye alın",
      "Asansör bloke ise sakinlere duyurun",
      "DASK veya sigorta şirketini bilgilendirin"
    ],
    afterSteps: [
      "Elektrik geldiğinde tüm sistemleri kontrol edin",
      "Bozulan gıdaları imha edin",
      "Tekrar eden kesintileri TEDAŞ'a bildirin"
    ]
  }
];
const assemblyPoints = [
  {
    id: 1,
    name: "Ana Toplanma Noktası",
    location: "Bina önü - Ana Giriş Karşısı",
    capacity: 120,
    type: "primary"
  },
  {
    id: 2,
    name: "Yedek Toplanma Noktası",
    location: "Otopark arkası - Açık alan",
    capacity: 80,
    type: "secondary"
  },
  {
    id: 3,
    name: "3. Toplanma Noktası",
    location: "Park - Kuzey çıkışı",
    capacity: 60,
    type: "tertiary"
  }
];
const insuranceData = {
  dask: {
    label: "DASK (Zorunlu Deprem Sigortası)",
    policyNo: "DASK-2024-00341",
    insurer: "Mapfre Sigorta",
    coverage: "450.000 ₺",
    expiry: "31.12.2025",
    status: "active"
  },
  building: {
    label: "Bina Yangın & Doğal Afet Sigortası",
    policyNo: "YNG-2024-8821",
    insurer: "Allianz Türkiye",
    coverage: "2.500.000 ₺",
    expiry: "15.06.2025",
    status: "active"
  },
  liability: {
    label: "Sorumluluk Sigortası",
    policyNo: "SOR-2023-4491",
    insurer: "AXA Sigorta",
    coverage: "500.000 ₺",
    expiry: "01.03.2025",
    status: "expiring"
  }
};
const emergencyContacts = [
  { label: "İtfaiye", number: "110", color: "#E74C3C" },
  { label: "Ambulans", number: "112", color: "#27AE60" },
  { label: "Polis", number: "155", color: "#2980B9" },
  { label: "AFAD", number: "122", color: "#E67E22" },
  { label: "Gaz Arıza", number: "187", color: "#8E44AD" },
  { label: "Elektrik Arıza", number: "186", color: "#F39C12" }
];
const preparednessChecklist = [
  { id: 1, item: "Acil durum çantası hazırlandı", category: "Hazırlık" },
  {
    id: 2,
    item: "Toplanma noktaları tüm sakenlere duyuruldu",
    category: "Hazırlık"
  },
  {
    id: 3,
    item: "Yangın söndürücüler kontrol edildi (son 6 ay)",
    category: "Güvenlik"
  },
  { id: 4, item: "Yangın dedektörleri test edildi", category: "Güvenlik" },
  { id: 5, item: "Gaz vanası konumu işaretlendi", category: "Altyapı" },
  { id: 6, item: "Su vanası konumu işaretlendi", category: "Altyapı" },
  { id: 7, item: "Elektrik panosu etiketi güncellendi", category: "Altyapı" },
  { id: 8, item: "DASK poliçesi geçerli", category: "Sigorta" },
  { id: 9, item: "Bina sigortası geçerli", category: "Sigorta" },
  {
    id: 10,
    item: "Acil tahliye tatbikatı yapıldı (son 1 yıl)",
    category: "Tatbikat"
  },
  { id: 11, item: "Jeneratör yakıt kontrolü yapıldı", category: "Altyapı" },
  { id: 12, item: "İlk yardım kiti güncellendi", category: "Hazırlık" }
];
function DisasterPreparedness({ isOwner }) {
  const [activeScenario, setActiveScenario] = reactExports.useState("earthquake");
  const [expandedStep, setExpandedStep] = reactExports.useState("before");
  const [checked, setChecked] = reactExports.useState(/* @__PURE__ */ new Set([1, 3, 8, 9]));
  const [activeTab, setActiveTab] = reactExports.useState("scenarios");
  const scenario = scenarios.find((s) => s.id === activeScenario);
  const Icon = scenario.icon;
  const toggleCheck = (id) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };
  const completionRate = Math.round(
    checked.size / preparednessChecklist.length * 100
  );
  const tabs = [
    { key: "scenarios", label: "Senaryo Rehberleri", icon: TriangleAlert },
    { key: "assembly", label: "Toplanma Noktaları", icon: MapPin },
    { key: "insurance", label: "Sigorta Poliçeleri", icon: FileText },
    { key: "checklist", label: "Hazırlık Kontrol", icon: CircleCheckBig }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0B1B2E]", children: "Doğal Afet Hazırlık & Sigorta Kılavuzu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Acil senaryolar, sigorta poliçeleri ve hazırlık kontrol listesi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-green-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-green-700", children: [
          "Hazırlık: ",
          completionRate,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-red-600 uppercase tracking-wide mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
        " Acil Numaralar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-2", children: emergencyContacts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center bg-white rounded-lg py-2 px-1 border border-red-100",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: c.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold", style: { color: c.color }, children: c.number })
          ]
        },
        c.number
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap", children: tabs.map(({ key, label, icon: TabIcon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(key),
        className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === key ? "bg-white text-[#0B1B2E] shadow-sm" : "text-gray-500 hover:text-gray-700"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabIcon, { className: "w-4 h-4" }),
          label
        ]
      },
      key
    )) }),
    activeTab === "scenarios" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: scenarios.map((s) => {
        const SIcon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveScenario(s.id),
            className: `w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${activeScenario === s.id ? "border-2 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`,
            style: activeScenario === s.id ? { borderColor: s.color, backgroundColor: s.bg } : {},
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-lg flex items-center justify-center",
                  style: { backgroundColor: `${s.color}20` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SIcon, { className: "w-5 h-5", style: { color: s.color } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B1B2E]", children: s.label })
            ]
          },
          s.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-5 flex items-center gap-3 border-b",
            style: { backgroundColor: scenario.bg },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center",
                  style: { backgroundColor: `${scenario.color}20` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6", style: { color: scenario.color } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-[#0B1B2E] text-lg", children: [
                  scenario.label,
                  " Senaryo Rehberi"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Önce / Sırasında / Sonrasında yapılacaklar" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: ["before", "during", "after"].map((phase) => {
          const phaseLabels = {
            before: "Öncesinde",
            during: "Sırasında",
            after: "Sonrasında"
          };
          const phaseColors = {
            before: "#3498DB",
            during: "#E67E22",
            after: "#27AE60"
          };
          const steps = scenario[`${phase}Steps`];
          const isOpen = expandedStep === phase;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setExpandedStep(phase),
                className: "w-full flex items-center justify-between p-4 hover:bg-gray-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                        style: { backgroundColor: phaseColors[phase] },
                        children: phase === "before" ? "1" : phase === "during" ? "2" : "3"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0B1B2E]", children: [
                      scenario.label,
                      " ",
                      phaseLabels[phase]
                    ] })
                  ] }),
                  isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400" })
                ]
              }
            ),
            isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-3 text-sm text-gray-700",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5",
                      style: { backgroundColor: phaseColors[phase] },
                      children: i + 1
                    }
                  ),
                  step
                ]
              },
              step
            )) }) })
          ] }, phase);
        }) })
      ] })
    ] }),
    activeTab === "assembly" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-700", children: "Acil tahliye durumunda tüm sakinler aşağıdaki toplanma noktalarına yönlendirilmelidir. En yakın noktayı kullanın ve personel yokluğunda kıdemli komşunuza bildirin." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: assemblyPoints.map((point) => {
        const colors = {
          primary: "#27AE60",
          secondary: "#F39C12",
          tertiary: "#3498DB"
        };
        const labels = {
          primary: "Birincil",
          secondary: "İkincil",
          tertiary: "Üçüncül"
        };
        const color = colors[point.type];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-4 text-white",
                  style: { backgroundColor: color },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium opacity-90", children: labels[point.type] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 opacity-80" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mt-1", children: point.name })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                  point.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                  "Kapasite:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0B1B2E]", children: [
                    point.capacity,
                    " kişi"
                  ] })
                ] })
              ] })
            ]
          },
          point.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B1B2E] mb-4", children: "Tatbikat Geçmişi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            date: "15 Mart 2024",
            type: "Yangın Tatbikatı",
            participants: 87,
            result: "Başarılı"
          },
          {
            date: "20 Eylül 2023",
            type: "Deprem Tatbikatı",
            participants: 72,
            result: "Başarılı"
          },
          {
            date: "10 Mart 2023",
            type: "Yangın Tatbikatı",
            participants: 65,
            result: "Kısmen Başarılı"
          }
        ].map((drill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-3 border-b last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-[#0B1B2E] text-sm", children: drill.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  drill.date,
                  " • ",
                  drill.participants,
                  " katılımcı"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `px-2 py-1 rounded-full text-xs font-medium ${drill.result === "Başarılı" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
                  children: drill.result
                }
              )
            ]
          },
          drill.date
        )) }),
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "mt-4 w-full py-2 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors",
            children: "+ Yeni Tatbikat Kaydı Ekle"
          }
        )
      ] })
    ] }),
    activeTab === "insurance" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.values(insuranceData).map((ins) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-gray-200 p-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-lg flex items-center justify-center ${ins.status === "active" ? "bg-green-100" : "bg-yellow-100"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FileText,
                    {
                      className: `w-5 h-5 ${ins.status === "active" ? "text-green-600" : "text-yellow-600"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0B1B2E]", children: ins.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  "Poliçe No: ",
                  ins.policyNo
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `px-3 py-1 rounded-full text-xs font-medium ${ins.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`,
                children: ins.status === "active" ? "Geçerli" : "Yenileme Gerekli"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mt-4 pt-4 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Sigorta Şirketi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#0B1B2E]", children: ins.insurer })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Teminat Tutarı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[#0B1B2E]", children: ins.coverage })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Bitiş Tarihi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-medium ${ins.status === "expiring" ? "text-yellow-600" : "text-[#0B1B2E]"}`,
                  children: ins.expiry
                }
              )
            ] })
          ] })
        ]
      },
      ins.policyNo
    )) }),
    activeTab === "checklist" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0B1B2E]", children: "Genel Hazırlık Durumu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-lg font-bold ${completionRate >= 80 ? "text-green-600" : completionRate >= 50 ? "text-yellow-600" : "text-red-600"}`,
              children: [
                completionRate,
                "%"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full transition-all ${completionRate >= 80 ? "bg-green-500" : completionRate >= 50 ? "bg-yellow-500" : "bg-red-500"}`,
            style: { width: `${completionRate}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
          checked.size,
          " / ",
          preparednessChecklist.length,
          " madde tamamlandı"
        ] })
      ] }),
      ["Hazırlık", "Güvenlik", "Altyapı", "Sigorta", "Tatbikat"].map(
        (cat) => {
          const items = preparednessChecklist.filter(
            (i) => i.category === cat
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-xl border border-gray-200 overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 bg-gray-50 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-[#0B1B2E]", children: cat }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 px-5 py-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleCheck(item.id),
                          className: "flex-shrink-0",
                          children: checked.has(item.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-5 h-5 text-gray-300" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-sm ${checked.has(item.id) ? "text-gray-400 line-through" : "text-[#0B1B2E]"}`,
                          children: item.item
                        }
                      )
                    ]
                  },
                  item.id
                )) })
              ]
            },
            cat
          );
        }
      )
    ] })
  ] });
}
export {
  DisasterPreparedness as default
};
