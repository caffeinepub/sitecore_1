import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Plus, T as TriangleAlert, a1 as Zap, a0 as Flame, W as Wrench, E as Phone, a7 as ChevronUp, G as ChevronDown, v as MapPin } from "./index-xOs1ph1v.js";
import { C as Clock } from "./clock-DspyC9Dz.js";
import { L as Lock } from "./lock-C9pzjgxE.js";
import { W as Wind } from "./wind-1KPSNr-U.js";
import { S as Star } from "./star-Cqgk6q6S.js";
import { C as CircleCheckBig } from "./circle-check-big-7Z2Ce4Ly.js";
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode);
const categories = [
  { id: "plumber", label: "Tesisatçı", icon: Droplets, color: "#3B82F6" },
  { id: "electrician", label: "Elektrikçi", icon: Zap, color: "#F59E0B" },
  { id: "locksmith", label: "Çilingir", icon: Lock, color: "#8B5CF6" },
  { id: "hvac", label: "Isıtma/Soğutma", icon: Wind, color: "#10B981" },
  { id: "gas", label: "Doğalgaz", icon: Flame, color: "#EF4444" },
  { id: "general", label: "Genel Tadilat", icon: Wrench, color: "#6B7280" }
];
const initialServices = [
  {
    id: 1,
    name: "Ahmet Usta Tesisat",
    category: "plumber",
    phone: "0532 111 2233",
    available247: true,
    rating: 4.8,
    callCount: 12,
    lastCalled: "2024-01-15",
    notes: "Hızlı müdahale, güvenilir",
    address: "Kadıköy, İstanbul"
  },
  {
    id: 2,
    name: "Elektrik Master",
    category: "electrician",
    phone: "0535 444 5566",
    available247: true,
    rating: 4.6,
    callCount: 8,
    lastCalled: "2024-01-10",
    notes: "Panel ve sigorta uzmanı",
    address: "Üsküdar, İstanbul"
  },
  {
    id: 3,
    name: "Hızlı Çilingir",
    category: "locksmith",
    phone: "0544 777 8899",
    available247: true,
    rating: 4.9,
    callCount: 5,
    lastCalled: "2023-12-20",
    notes: "7/24 kapı açma",
    address: "Beşiktaş, İstanbul"
  },
  {
    id: 4,
    name: "Klima & Kombi Servis",
    category: "hvac",
    phone: "0541 222 3344",
    available247: false,
    rating: 4.5,
    callCount: 6,
    lastCalled: "2024-01-08",
    notes: "Tüm marka kombi bakımı",
    address: "Şişli, İstanbul"
  },
  {
    id: 5,
    name: "Doğalgaz Teknik",
    category: "gas",
    phone: "0533 555 6677",
    available247: true,
    rating: 4.7,
    callCount: 3,
    lastCalled: "2023-11-15",
    notes: "Sertifikalı doğalgaz ustası",
    address: "Maltepe, İstanbul"
  },
  {
    id: 6,
    name: "Mehmet Usta Tesisat",
    category: "plumber",
    phone: "0530 888 9900",
    available247: false,
    rating: 4.3,
    callCount: 4,
    lastCalled: "2023-12-05",
    notes: "Ucuz ve kaliteli iş",
    address: "Ataşehir, İstanbul"
  },
  {
    id: 7,
    name: "Güvenilir Elektrik",
    category: "electrician",
    phone: "0546 333 4455",
    available247: false,
    rating: 4.4,
    callCount: 2,
    lastCalled: "2023-10-20",
    notes: "Aydınlatma ve kablo uzmanı",
    address: "Bakırköy, İstanbul"
  },
  {
    id: 8,
    name: "Genel Tadilat A.Ş.",
    category: "general",
    phone: "0537 666 7788",
    available247: false,
    rating: 4.2,
    callCount: 7,
    lastCalled: "2024-01-12",
    notes: "Boya, alçı, genel tadilat",
    address: "Sarıyer, İstanbul"
  }
];
const callHistory = [
  {
    id: 1,
    serviceId: 1,
    serviceName: "Ahmet Usta Tesisat",
    date: "2024-01-15",
    time: "23:45",
    issue: "Su borusu patladı",
    resolved: true,
    duration: "1.5 saat",
    cost: "350₺"
  },
  {
    id: 2,
    serviceId: 2,
    serviceName: "Elektrik Master",
    date: "2024-01-10",
    time: "02:30",
    issue: "Ana sigorta attı",
    resolved: true,
    duration: "45 dk",
    cost: "200₺"
  },
  {
    id: 3,
    serviceId: 3,
    serviceName: "Hızlı Çilingir",
    date: "2023-12-20",
    time: "22:15",
    issue: "Kapı kilidi bozuldu",
    resolved: true,
    duration: "30 dk",
    cost: "150₺"
  },
  {
    id: 4,
    serviceId: 5,
    serviceName: "Doğalgaz Teknik",
    date: "2023-11-15",
    time: "08:00",
    issue: "Doğalgaz kokusu",
    resolved: true,
    duration: "2 saat",
    cost: "500₺"
  },
  {
    id: 5,
    serviceId: 4,
    serviceName: "Klima & Kombi Servis",
    date: "2024-01-08",
    time: "10:00",
    issue: "Kombi ısınmıyor",
    resolved: true,
    duration: "2.5 saat",
    cost: "800₺"
  }
];
function EmergencyServiceGuide({ isOwner }) {
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [activeTab, setActiveTab] = reactExports.useState(
    "services"
  );
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filter247, setFilter247] = reactExports.useState(false);
  const [expandedService, setExpandedService] = reactExports.useState(null);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [services, setServices] = reactExports.useState(initialServices);
  const [newService, setNewService] = reactExports.useState({
    name: "",
    category: "plumber",
    phone: "",
    available247: false,
    notes: "",
    address: ""
  });
  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === "all" || s.category === selectedCategory;
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.phone.includes(searchTerm);
    const match247 = !filter247 || s.available247;
    return matchCat && matchSearch && match247;
  });
  const getCategoryInfo = (catId) => categories.find((c) => c.id === catId) || categories[5];
  const handleAdd = () => {
    if (!newService.name || !newService.phone) return;
    setServices((prev) => [
      ...prev,
      {
        ...newService,
        id: prev.length + 1,
        rating: 0,
        callCount: 0,
        lastCalled: "-"
      }
    ]);
    setNewService({
      name: "",
      category: "plumber",
      phone: "",
      available247: false,
      notes: "",
      address: ""
    });
    setShowAddModal(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-[#0E1116]", children: "Acil Bakım & 7/24 Servis Rehberi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#3A4654] mt-1", children: "Gece ve hafta sonu çağrılabilecek acil servis hizmetleri" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowAddModal(true),
          className: "flex items-center gap-2 bg-[#1B3A5C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#16324f] transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Servis Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20, className: "text-red-500 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-red-800 text-sm", children: "Acil Durumda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-700 text-sm mt-0.5", children: [
          "Yangın: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "110" }),
          "  |  Gaz kaçağı:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "187" }),
          "  |  Elektrik arıza:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "186" }),
          "  |  Su arıza: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "185" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-[#D7DEE9]", children: ["services", "history"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab ? "border-[#1B3A5C] text-[#1B3A5C]" : "border-transparent text-[#3A4654] hover:text-[#0E1116]"}`,
        children: tab === "services" ? "Servisler" : "Çağrı Geçmişi"
      },
      tab
    )) }),
    activeTab === "services" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Servis adı veya telefon ara...",
            className: "border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm w-64"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-[#3A4654] cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filter247,
              onChange: (e) => setFilter247(e.target.checked),
              className: "rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
          " Sadece 7/24"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedCategory("all"),
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition ${selectedCategory === "all" ? "bg-[#1B3A5C] text-white" : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"}`,
            children: [
              "Tümü (",
              services.length,
              ")"
            ]
          }
        ),
        categories.map((cat) => {
          const Icon = cat.icon;
          const count = services.filter(
            (s) => s.category === cat.id
          ).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedCategory(cat.id),
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${selectedCategory === cat.id ? "text-white" : "bg-white border border-[#D7DEE9] text-[#3A4654] hover:border-[#1B3A5C]"}`,
              style: selectedCategory === cat.id ? { backgroundColor: cat.color } : {},
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12 }),
                cat.label,
                " (",
                count,
                ")"
              ]
            },
            cat.id
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: filtered.map((service) => {
        const cat = getCategoryInfo(service.category);
        const Icon = cat.icon;
        const isExpanded = expandedService === service.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white rounded-xl border border-[#D7DEE9] overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "p-2 rounded-lg",
                      style: { backgroundColor: `${cat.color}20` },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, style: { color: cat.color } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0E1116]", children: service.name }),
                      service.available247 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                        " 7/24"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-2 py-0.5 rounded-full text-white",
                          style: { backgroundColor: cat.color },
                          children: cat.label
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: `tel:${service.phone.replace(/\s/g, "")}`,
                          className: "text-[#1B3A5C] font-semibold text-sm hover:underline flex items-center gap-1",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
                            " ",
                            service.phone
                          ]
                        }
                      ),
                      service.rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-[#3A4654]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Star,
                          {
                            size: 12,
                            className: "text-yellow-400 fill-yellow-400"
                          }
                        ),
                        service.rating
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#3A4654]", children: [
                        service.callCount,
                        " çağrı"
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedService(isExpanded ? null : service.id),
                    className: "text-[#3A4654] hover:text-[#0E1116] mt-1",
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 18 })
                  }
                )
              ] }),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-[#F3F6FB] grid grid-cols-2 gap-3 text-sm text-[#3A4654]", children: [
                service.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13, className: "mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: service.address })
                ] }),
                service.lastCalled !== "-" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "Son çağrı:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0E1116] font-medium", children: service.lastCalled })
                ] }),
                service.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 bg-[#F3F6FB] rounded-lg p-2 text-xs", children: service.notes }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `tel:${service.phone.replace(/\s/g, "")}`,
                    className: "w-full flex items-center justify-center gap-2 bg-[#1B3A5C] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#16324f] transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                      " Şimdi Ara"
                    ]
                  }
                ) })
              ] })
            ] })
          },
          service.id
        );
      }) })
    ] }),
    activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-[#D7DEE9] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F3F6FB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Tarih/Saat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Servis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Sorun" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Süre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Ücret" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-[#3A4654]", children: "Durum" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: callHistory.map((call, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: i % 2 === 0 ? "" : "bg-[#F3F6FB]/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-[#0E1116]", children: call.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#3A4654]", children: call.time })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#0E1116]", children: call.serviceName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: call.issue }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#3A4654]", children: call.duration }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#0E1116]", children: call.cost }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: call.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full w-fit", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10 }),
                " Çözüldü"
              ] }) })
            ]
          },
          call.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#1B3A5C]", children: callHistory.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#3A4654] mt-1", children: "Toplam Çağrı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: callHistory.filter((c) => c.resolved).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#3A4654] mt-1", children: "Çözülen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-[#D7DEE9] p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-[#1B3A5C]", children: [
            callHistory.reduce((sum, c) => sum + Number.parseInt(c.cost), 0).toLocaleString("tr-TR"),
            "₺"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#3A4654] mt-1", children: "Toplam Harcama" })
        ] })
      ] })
    ] }),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0E1116] mb-4", children: "Yeni Servis Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: newService.name,
            onChange: (e) => setNewService((p) => ({ ...p, name: e.target.value })),
            placeholder: "Servis adı *",
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: newService.category,
            onChange: (e) => setNewService((p) => ({ ...p, category: e.target.value })),
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm",
            children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.label }, c.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: newService.phone,
            onChange: (e) => setNewService((p) => ({ ...p, phone: e.target.value })),
            placeholder: "Telefon numarası *",
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: newService.address,
            onChange: (e) => setNewService((p) => ({ ...p, address: e.target.value })),
            placeholder: "Adres/Bölge",
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: newService.notes,
            onChange: (e) => setNewService((p) => ({ ...p, notes: e.target.value })),
            placeholder: "Notlar",
            rows: 2,
            className: "w-full border border-[#D7DEE9] rounded-lg px-3 py-2 text-sm resize-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-[#3A4654] cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: newService.available247,
              onChange: (e) => setNewService((p) => ({
                ...p,
                available247: e.target.checked
              }))
            }
          ),
          "7/24 hizmet veriyor"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAddModal(false),
            className: "flex-1 border border-[#D7DEE9] text-[#3A4654] py-2 rounded-lg text-sm",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleAdd,
            className: "flex-1 bg-[#1B3A5C] text-white py-2 rounded-lg text-sm font-medium",
            children: "Ekle"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  EmergencyServiceGuide as default
};
