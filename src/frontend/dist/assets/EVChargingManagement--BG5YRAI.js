import { r as reactExports, j as jsxRuntimeExports, P as Plus, Z as Zap, R as Car } from "./index-DOWBo6uK.js";
import { C as CircleCheckBig } from "./circle-check-big-BsWFzyi2.js";
import { C as CircleAlert } from "./circle-alert-DqTIyr-z.js";
import { B as Battery } from "./battery-CGI0oGKN.js";
import { C as Clock } from "./clock-CTiRGnN-.js";
const stations = [
  {
    id: "st1",
    name: "Şarj İstasyonu 1",
    location: "B1 - Kapalı Otopark",
    type: "AC 7.4kW",
    status: "available",
    connector: "Type 2",
    power: 7.4
  },
  {
    id: "st2",
    name: "Şarj İstasyonu 2",
    location: "B1 - Kapalı Otopark",
    type: "AC 7.4kW",
    status: "occupied",
    connector: "Type 2",
    power: 7.4
  },
  {
    id: "st3",
    name: "Şarj İstasyonu 3",
    location: "B2 - Açık Otopark",
    type: "DC 50kW",
    status: "available",
    connector: "CCS",
    power: 50
  },
  {
    id: "st4",
    name: "Şarj İstasyonu 4",
    location: "B2 - Açık Otopark",
    type: "AC 22kW",
    status: "maintenance",
    connector: "Type 2",
    power: 22
  },
  {
    id: "st5",
    name: "Şarj İstasyonu 5",
    location: "B3 - Misafir Otopark",
    type: "AC 7.4kW",
    status: "available",
    connector: "Type 2",
    power: 7.4
  }
];
const reservations = [
  {
    id: "r1",
    station: "Şarj İstasyonu 1",
    apartment: "D:12",
    resident: "Ahmet K.",
    date: "2026-03-28",
    startTime: "09:00",
    endTime: "11:00",
    status: "confirmed"
  },
  {
    id: "r2",
    station: "Şarj İstasyonu 2",
    apartment: "D:5",
    resident: "Fatma Ö.",
    date: "2026-03-28",
    startTime: "08:00",
    endTime: "10:00",
    status: "active"
  },
  {
    id: "r3",
    station: "Şarj İstasyonu 3",
    apartment: "D:7",
    resident: "Mehmet S.",
    date: "2026-03-29",
    startTime: "14:00",
    endTime: "15:30",
    status: "confirmed"
  },
  {
    id: "r4",
    station: "Şarj İstasyonu 1",
    apartment: "D:3",
    resident: "Ayşe T.",
    date: "2026-03-29",
    startTime: "10:00",
    endTime: "12:00",
    status: "pending"
  },
  {
    id: "r5",
    station: "Şarj İstasyonu 5",
    apartment: "D:18",
    resident: "Hasan Y.",
    date: "2026-03-30",
    startTime: "16:00",
    endTime: "18:00",
    status: "confirmed"
  }
];
const usageHistory = [
  {
    id: "h1",
    station: "Şarj İstasyonu 2",
    apartment: "D:8",
    date: "2026-03-27",
    duration: "2.5 saat",
    energy: "18.5 kWh",
    cost: "55.50 ₺"
  },
  {
    id: "h2",
    station: "Şarj İstasyonu 1",
    apartment: "D:12",
    date: "2026-03-26",
    duration: "3 saat",
    energy: "22.2 kWh",
    cost: "66.60 ₺"
  },
  {
    id: "h3",
    station: "Şarj İstasyonu 3",
    apartment: "D:5",
    date: "2026-03-25",
    duration: "1.5 saat",
    energy: "75 kWh",
    cost: "225.00 ₺"
  },
  {
    id: "h4",
    station: "Şarj İstasyonu 5",
    apartment: "D:7",
    date: "2026-03-24",
    duration: "2 saat",
    energy: "14.8 kWh",
    cost: "44.40 ₺"
  },
  {
    id: "h5",
    station: "Şarj İstasyonu 2",
    apartment: "D:15",
    date: "2026-03-23",
    duration: "4 saat",
    energy: "29.6 kWh",
    cost: "88.80 ₺"
  },
  {
    id: "h6",
    station: "Şarj İstasyonu 1",
    apartment: "D:3",
    date: "2026-03-22",
    duration: "2 saat",
    energy: "14.8 kWh",
    cost: "44.40 ₺"
  }
];
const monthlyUsage = [
  { month: "Eyl", kwh: 280 },
  { month: "Eki", kwh: 320 },
  { month: "Kas", kwh: 290 },
  { month: "Ara", kwh: 350 },
  { month: "Oca", kwh: 410 },
  { month: "Şub", kwh: 380 },
  { month: "Mar", kwh: 445 }
];
const statusColors = {
  available: "bg-green-100 text-green-700",
  occupied: "bg-blue-100 text-blue-700",
  maintenance: "bg-red-100 text-red-700",
  confirmed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700"
};
const statusLabels = {
  available: "Müsait",
  occupied: "Dolu",
  maintenance: "Bakımda",
  confirmed: "Onaylandı",
  active: "Aktif",
  pending: "Bekliyor"
};
function EVChargingManagement({
  buildingId: _buildingId,
  t: _t
}) {
  const [activeTab, setActiveTab] = reactExports.useState("stations");
  const [showForm, setShowForm] = reactExports.useState(false);
  const available = stations.filter((s) => s.status === "available").length;
  const occupied = stations.filter((s) => s.status === "occupied").length;
  const maintenance = stations.filter((s) => s.status === "maintenance").length;
  const totalEnergy = usageHistory.reduce(
    (sum, h) => sum + Number.parseFloat(h.energy),
    0
  );
  const maxKwh = Math.max(...monthlyUsage.map((m) => m.kwh));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#1a2236]", children: "Elektrikli Araç Şarj İstasyonu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#6b7a8d] mt-1", children: "Şarj noktası yönetimi, rezervasyon ve tüketim takibi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowForm(true),
          className: "flex items-center gap-2 bg-[#4f8ef7] text-white px-4 py-2 rounded-lg hover:bg-[#3a7de0] transition text-sm font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Rezervasyon Yap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, className: "text-green-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-green-600 font-medium", children: "Müsait" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-green-700", children: available }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: "istasyon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, className: "text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-blue-600 font-medium", children: "Kullanımda" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-blue-700", children: occupied }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600", children: "istasyon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, className: "text-red-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-600 font-medium", children: "Bakımda" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-red-700", children: maintenance }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600", children: "istasyon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-purple-50 border border-purple-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Battery, { size: 18, className: "text-purple-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-purple-600 font-medium", children: "Bu Ay Tüketim" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-purple-700", children: totalEnergy.toFixed(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-purple-600", children: "kWh toplam" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 border-b border-gray-200", children: ["stations", "reservations", "history", "stats"].map(
      (tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab),
          className: `px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === tab ? "border-[#4f8ef7] text-[#4f8ef7]" : "border-transparent text-[#6b7a8d] hover:text-[#1a2236]"}`,
          children: tab === "stations" ? "İstasyonlar" : tab === "reservations" ? "Rezervasyonlar" : tab === "history" ? "Kullanım Geçmişi" : "İstatistikler"
        },
        tab
      )
    ) }),
    activeTab === "stations" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: stations.map((station) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl border border-gray-200 p-5 shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `p-2 rounded-lg ${station.status === "available" ? "bg-green-100" : station.status === "occupied" ? "bg-blue-100" : "bg-red-100"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Zap,
                    {
                      size: 20,
                      className: station.status === "available" ? "text-green-600" : station.status === "occupied" ? "text-blue-600" : "text-red-600"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#1a2236] text-sm", children: station.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6b7a8d]", children: station.location })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-1 rounded-full font-medium ${statusColors[station.status]}`,
                children: statusLabels[station.status]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-[#6b7a8d]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tip:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#1a2236]", children: station.type })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Konnektör:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#1a2236]", children: station.connector })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Güç:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-[#1a2236]", children: [
                station.power,
                " kW"
              ] })
            ] })
          ] }),
          station.status === "available" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(true),
              className: "mt-3 w-full bg-[#4f8ef7] text-white text-xs py-2 rounded-lg hover:bg-[#3a7de0] transition",
              children: "Rezervasyon Yap"
            }
          )
        ]
      },
      station.id
    )) }),
    activeTab === "reservations" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "İstasyon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Sakin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Tarih" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Saat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Durum" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: reservations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: i % 2 === 0 ? "bg-white" : "bg-gray-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#1a2236]", children: r.station }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#6b7a8d]", children: [
              r.resident,
              " (",
              r.apartment,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6b7a8d]", children: r.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-[#6b7a8d]", children: [
              r.startTime,
              " - ",
              r.endTime
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-1 rounded-full font-medium ${statusColors[r.status]}`,
                children: statusLabels[r.status]
              }
            ) })
          ]
        },
        r.id
      )) })
    ] }) }),
    activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "İstasyon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Daire" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Tarih" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Süre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Enerji" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-[#6b7a8d]", children: "Tutar" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: usageHistory.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: i % 2 === 0 ? "bg-white" : "bg-gray-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-[#1a2236]", children: h.station }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6b7a8d]", children: h.apartment }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6b7a8d]", children: h.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#6b7a8d]", children: h.duration }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-600", children: h.energy }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-green-600", children: h.cost }) })
          ]
        },
        h.id
      )) })
    ] }) }),
    activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#1a2236] mb-4", children: "Aylık Enerji Tüketimi (kWh)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-40", children: monthlyUsage.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 flex flex-col items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6b7a8d]", children: m.kwh }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full bg-[#4f8ef7] rounded-t-md transition-all",
                  style: { height: `${m.kwh / maxKwh * 120}px` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6b7a8d]", children: m.month })
            ]
          },
          m.month
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 18, className: "text-[#4f8ef7]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-[#1a2236]", children: "Kayıtlı EV" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[#4f8ef7]", children: "12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6b7a8d] mt-1", children: "Binada elektrikli araç sahibi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, className: "text-orange-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-[#1a2236]", children: "Ort. Şarj Süresi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-orange-500", children: "2.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6b7a8d] mt-1", children: "saat / oturum" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Battery, { size: 18, className: "text-green-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-[#1a2236]", children: "Bu Ay Gelir" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-green-500", children: "1.335" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#6b7a8d] mt-1", children: "₺ tahsilat" })
        ] })
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 w-full max-w-md shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-[#1a2236] mb-4", children: "Şarj Rezervasyonu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ev-station",
              className: "block text-xs font-medium text-[#6b7a8d] mb-1",
              children: "İstasyon Seç"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "ev-station",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
              children: stations.filter((s) => s.status === "available").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { children: [
                s.name,
                " - ",
                s.location,
                " (",
                s.type,
                ")"
              ] }, s.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ev-date",
                className: "block text-xs font-medium text-[#6b7a8d] mb-1",
                children: "Tarih"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ev-date",
                type: "date",
                className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
                defaultValue: "2026-03-29"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "ev-time",
                className: "block text-xs font-medium text-[#6b7a8d] mb-1",
                children: "Başlangıç Saati"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ev-time",
                type: "time",
                className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
                defaultValue: "09:00"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ev-duration",
              className: "block text-xs font-medium text-[#6b7a8d] mb-1",
              children: "Tahmini Süre"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "ev-duration",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "1 saat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "1.5 saat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { selected: true, children: "2 saat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "3 saat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "4 saat" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ev-apt",
              className: "block text-xs font-medium text-[#6b7a8d] mb-1",
              children: "Daire No"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ev-apt",
              type: "text",
              placeholder: "Örn: D:12",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(false),
            className: "flex-1 border border-gray-300 text-[#6b7a8d] py-2 rounded-lg text-sm hover:bg-gray-50 transition",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(false),
            className: "flex-1 bg-[#4f8ef7] text-white py-2 rounded-lg text-sm hover:bg-[#3a7de0] transition font-medium",
            children: "Rezervasyonu Onayla"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  EVChargingManagement as default
};
