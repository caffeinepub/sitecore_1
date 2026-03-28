import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Plus, n as Calendar, S as Search, t as User, H as House, a7 as ChevronUp, G as ChevronDown, E as Phone, p as Building2, F as FileText, k as TrendingUp } from "./index-BOtpq-4_.js";
import { C as CircleAlert } from "./circle-alert-vUS6m6oQ.js";
import { C as Clock } from "./clock-D2uzdZz6.js";
import { C as CircleCheckBig } from "./circle-check-big-sXDsIz3a.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
const sampleTenants = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    apartment: "3B",
    floor: 3,
    phone: "0532 111 22 33",
    email: "mehmet@email.com",
    ownerName: "Ayşe Kaya",
    ownerPhone: "0533 444 55 66",
    moveInDate: "2023-03-01",
    contractEnd: "2025-02-28",
    monthlyRent: 12e3,
    deposit: 24e3,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 12e3, paid: true, date: "2025-01-03" },
      { month: "Şubat 2025", amount: 12e3, paid: true, date: "2025-02-02" },
      { month: "Mart 2025", amount: 12e3, paid: false }
    ]
  },
  {
    id: 2,
    name: "Fatma Demir",
    apartment: "5A",
    floor: 5,
    phone: "0545 222 33 44",
    email: "fatma@email.com",
    ownerName: "Ali Çelik",
    ownerPhone: "0536 777 88 99",
    moveInDate: "2022-07-15",
    contractEnd: "2024-07-14",
    monthlyRent: 9500,
    deposit: 19e3,
    status: "bitti",
    payments: [
      { month: "Mayıs 2024", amount: 9500, paid: true, date: "2024-05-05" },
      { month: "Haziran 2024", amount: 9500, paid: true, date: "2024-06-04" },
      { month: "Temmuz 2024", amount: 9500, paid: true, date: "2024-07-01" }
    ]
  },
  {
    id: 3,
    name: "Burak Arslan",
    apartment: "2C",
    floor: 2,
    phone: "0543 333 44 55",
    email: "burak@email.com",
    ownerName: "Zeynep Şahin",
    ownerPhone: "0537 000 11 22",
    moveInDate: "2024-01-01",
    contractEnd: "2025-12-31",
    monthlyRent: 8500,
    deposit: 17e3,
    status: "geciken",
    payments: [
      { month: "Ocak 2025", amount: 8500, paid: true, date: "2025-01-10" },
      { month: "Şubat 2025", amount: 8500, paid: false },
      { month: "Mart 2025", amount: 8500, paid: false }
    ]
  },
  {
    id: 4,
    name: "Selin Kılıç",
    apartment: "7D",
    floor: 7,
    phone: "0541 555 66 77",
    email: "selin@email.com",
    ownerName: "Hasan Öztürk",
    ownerPhone: "0534 222 33 44",
    moveInDate: "2024-06-01",
    contractEnd: "2026-05-31",
    monthlyRent: 15e3,
    deposit: 3e4,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 15e3, paid: true, date: "2025-01-02" },
      { month: "Şubat 2025", amount: 15e3, paid: true, date: "2025-02-01" },
      { month: "Mart 2025", amount: 15e3, paid: true, date: "2025-03-03" }
    ]
  },
  {
    id: 5,
    name: "Can Koç",
    apartment: "1A",
    floor: 1,
    phone: "0542 666 77 88",
    email: "can@email.com",
    ownerName: "Murat Yıldız",
    ownerPhone: "0539 333 44 55",
    moveInDate: "2023-09-01",
    contractEnd: "2025-08-31",
    monthlyRent: 7e3,
    deposit: 14e3,
    status: "aktif",
    payments: [
      { month: "Ocak 2025", amount: 7e3, paid: true, date: "2025-01-05" },
      { month: "Şubat 2025", amount: 7e3, paid: true, date: "2025-02-06" },
      { month: "Mart 2025", amount: 7e3, paid: false }
    ]
  }
];
const statusConfig = {
  aktif: {
    label: "Aktif",
    color: "bg-green-100 text-green-700",
    icon: CircleCheckBig,
    iconColor: "text-green-500"
  },
  geciken: {
    label: "Gecikmiş Ödeme",
    color: "bg-red-100 text-red-700",
    icon: CircleAlert,
    iconColor: "text-red-500"
  },
  bitti: {
    label: "Sözleşme Bitti",
    color: "bg-gray-100 text-gray-600",
    icon: Clock,
    iconColor: "text-gray-400"
  }
};
function TenantManagement({
  buildingId: _buildingId,
  isOwner,
  t: _t
}) {
  const [tenants] = reactExports.useState(sampleTenants);
  const [search, setSearch] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("hepsi");
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("liste");
  const filtered = tenants.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.apartment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "hepsi" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });
  const totalRent = tenants.filter((t) => t.status === "aktif" || t.status === "geciken").reduce((s, t) => s + t.monthlyRent, 0);
  const totalDeposit = tenants.reduce((s, t) => s + t.deposit, 0);
  const overdueCount = tenants.filter((t) => t.status === "geciken").length;
  const activeCount = tenants.filter((t) => t.status === "aktif").length;
  const daysUntilExpiry = (dateStr) => {
    const diff = new Date(dateStr).getTime() - (/* @__PURE__ */ new Date()).getTime();
    return Math.ceil(diff / (1e3 * 60 * 60 * 24));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#3A4654]", children: "Kiracı Yönetimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Kiracı bilgileri, kira ödemeleri ve sözleşme takibi" })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 bg-[#4F8EF7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3a7ae0] transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Yeni Kiracı Ekle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-gray-100 rounded-lg p-1 w-fit", children: ["liste", "ozet"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab),
        className: `px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? "bg-white text-[#3A4654] shadow-sm" : "text-gray-500 hover:text-gray-700"}`,
        children: tab === "liste" ? "Kiracı Listesi" : "Genel Özet"
      },
      tab
    )) }),
    activeTab === "ozet" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aktif Kiracı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[#3A4654] mt-1", children: activeCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-500 mt-1", children: [
            "Toplam ",
            tenants.length,
            " kayıt"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Aylık Kira Geliri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#3A4654] mt-1", children: [
            (totalRent / 1e3).toFixed(0),
            "K ₺"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-500 mt-1", children: "Aktif kira toplamı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Toplam Depozito" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#3A4654] mt-1", children: [
            (totalDeposit / 1e3).toFixed(0),
            "K ₺"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Tüm kiracılar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Gecikmiş Ödeme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-500 mt-1", children: overdueCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1", children: "Aksiyon gerekli" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-[#3A4654] mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-orange-500" }),
          "Yaklaşan Sözleşme Bitişleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          tenants.filter(
            (t) => daysUntilExpiry(t.contractEnd) > 0 && daysUntilExpiry(t.contractEnd) <= 180
          ).sort(
            (a, b) => new Date(a.contractEnd).getTime() - new Date(b.contractEnd).getTime()
          ).map((tenant) => {
            const days = daysUntilExpiry(tenant.contractEnd);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-2 border-b border-gray-50 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654]", children: [
                      tenant.name,
                      " - Daire ",
                      tenant.apartment
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                      tenant.contractEnd,
                      " bitiş"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-medium px-2 py-1 rounded-full ${days <= 30 ? "bg-red-100 text-red-600" : days <= 60 ? "bg-orange-100 text-orange-600" : "bg-yellow-100 text-yellow-600"}`,
                      children: [
                        days,
                        " gün kaldı"
                      ]
                    }
                  )
                ]
              },
              tenant.id
            );
          }),
          tenants.filter(
            (t) => daysUntilExpiry(t.contractEnd) > 0 && daysUntilExpiry(t.contractEnd) <= 180
          ).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 text-center py-3", children: "Yakın 6 ay içinde biten sözleşme yok" })
        ] })
      ] }),
      overdueCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 rounded-xl border border-red-100 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-red-700 mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
          "Gecikmiş Ödemeler"
        ] }),
        tenants.filter((t) => t.status === "geciken").map((tenant) => {
          const unpaidCount = tenant.payments.filter(
            (p) => !p.paid
          ).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-[#3A4654]", children: [
                    tenant.name,
                    " - Daire ",
                    tenant.apartment
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500", children: [
                    unpaidCount,
                    " aylık ödeme gecikmiş"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-red-600", children: [
                  (unpaidCount * tenant.monthlyRent).toLocaleString(
                    "tr-TR"
                  ),
                  " ",
                  "₺"
                ] })
              ]
            },
            tenant.id
          );
        })
      ] })
    ] }),
    activeTab === "liste" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Kiracı adı veya daire ara...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F8EF7]/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["hepsi", "aktif", "geciken", "bitti"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilterStatus(s),
            className: `px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${filterStatus === s ? "bg-[#4F8EF7] text-white border-[#4F8EF7]" : "bg-white text-gray-600 border-gray-200 hover:border-[#4F8EF7]"}`,
            children: s === "hepsi" ? "Tümü" : s === "aktif" ? "Aktif" : s === "geciken" ? "Gecikmiş" : "Bitti"
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        filtered.map((tenant) => {
          const cfg = statusConfig[tenant.status];
          const StatusIcon = cfg.icon;
          const isExpanded = expandedId === tenant.id;
          const days = daysUntilExpiry(tenant.contractEnd);
          const unpaidPayments = tenant.payments.filter((p) => !p.paid);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-xl border border-gray-100 overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "p-4 cursor-pointer hover:bg-gray-50 transition-colors w-full text-left",
                    onClick: () => setExpandedId(isExpanded ? null : tenant.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-[#4F8EF7]" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#3A4654]", children: tenant.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-500", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
                              " Daire",
                              " ",
                              tenant.apartment,
                              " (",
                              tenant.floor,
                              ". kat)"
                            ] }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: `flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${cfg.color}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: `w-3 h-3 ${cfg.iconColor}` }),
                                cfg.label
                              ]
                            }
                          ),
                          isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-gray-400" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Aylık Kira" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-[#3A4654]", children: [
                            tenant.monthlyRent.toLocaleString("tr-TR"),
                            " ₺"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Sözleşme Bitişi" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: `text-sm font-semibold ${days < 0 ? "text-gray-400" : days <= 30 ? "text-red-500" : days <= 90 ? "text-orange-500" : "text-[#3A4654]"}`,
                              children: tenant.contractEnd
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Depozito" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-[#3A4654]", children: [
                            tenant.deposit.toLocaleString("tr-TR"),
                            " ₺"
                          ] })
                        ] })
                      ] })
                    ]
                  }
                ),
                isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-100 p-4 bg-gray-50 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border border-gray-100", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-500 mb-2 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                        " Kiracı İletişim"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-gray-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tenant.phone })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-gray-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tenant.email })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border border-gray-100", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-500 mb-2 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3 h-3" }),
                        " Mal Sahibi"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#3A4654]", children: tenant.ownerName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-gray-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tenant.ownerPhone })
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border border-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-500 mb-2 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                      " Sözleşme Bilgileri"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Başlangıç: ",
                          tenant.moveInDate
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Bitiş: ",
                          tenant.contractEnd
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "bg-[#4F8EF7] h-2 rounded-full",
                          style: {
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                ((/* @__PURE__ */ new Date()).getTime() - new Date(tenant.moveInDate).getTime()) / (new Date(
                                  tenant.contractEnd
                                ).getTime() - new Date(
                                  tenant.moveInDate
                                ).getTime()) * 100
                              )
                            )}%`
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1 text-right", children: days > 0 ? `${days} gün kaldı` : "Sözleşme sona erdi" })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-3 border border-gray-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-500 mb-2 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                      " Kira Ödeme Geçmişi"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tenant.payments.map((payment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `w-2 h-2 rounded-full ${payment.paid ? "bg-green-500" : "bg-red-400"}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#3A4654]", children: payment.month }),
                            payment.date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: payment.date })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                              payment.amount.toLocaleString("tr-TR"),
                              " ₺"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `text-xs px-2 py-0.5 rounded-full ${payment.paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`,
                                children: payment.paid ? "Ödendi" : "Bekliyor"
                              }
                            )
                          ] })
                        ]
                      },
                      payment.month
                    )) }),
                    unpaidPayments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between bg-red-50 rounded-lg px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-red-600", children: [
                        unpaidPayments.length,
                        " aylık gecikmiş ödeme"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-red-700", children: [
                        (unpaidPayments.length * tenant.monthlyRent).toLocaleString("tr-TR"),
                        " ",
                        "₺"
                      ] })
                    ] })
                  ] }),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 py-2 text-sm font-medium bg-[#4F8EF7] text-white rounded-lg hover:bg-[#3a7ae0] transition-colors",
                        children: "Ödeme Kaydet"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 py-2 text-sm font-medium bg-white border border-gray-200 text-[#3A4654] rounded-lg hover:bg-gray-50 transition-colors",
                        children: "Sözleşme Yenile"
                      }
                    )
                  ] })
                ] })
              ]
            },
            tenant.id
          );
        }),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kiracı bulunamadı" })
        ] })
      ] })
    ] })
  ] });
}
export {
  TenantManagement as default
};
